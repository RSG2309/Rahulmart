package com.rahulsupermart.app;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.DownloadManager;
import android.content.ActivityNotFoundException;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.ConnectivityManager;
import android.net.NetworkCapabilities;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.provider.MediaStore;
import android.util.Base64;
import android.view.View;
import android.webkit.CookieManager;
import android.webkit.DownloadListener;
import android.webkit.JavascriptInterface;
import android.webkit.URLUtil;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

public class MainActivity extends AppCompatActivity {

    public static final String TARGET_URL = "https://rahulmart.vercel.app";

    private WebView webView;
    private SwipeRefreshLayout swipeRefresh;
    private ProgressBar progressBar;
    private LinearLayout layoutOffline;
    private Button btnRetry;

    private ValueCallback<Uri[]> fileUploadCallback;
    private boolean doubleBackToExitPressedOnce = false;

    // Activity result launcher for file/photo upload (KYC and profile photos)
    private final ActivityResultLauncher<Intent> fileChooserLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                if (fileUploadCallback == null) return;
                Uri[] results = null;
                if (result.getResultCode() == RESULT_OK && result.getData() != null) {
                    if (result.getData().getClipData() != null) {
                        int count = result.getData().getClipData().getItemCount();
                        results = new Uri[count];
                        for (int i = 0; i < count; i++) {
                            results[i] = result.getData().getClipData().getItemAt(i).getUri();
                        }
                    } else if (result.getData().getData() != null) {
                        results = new Uri[]{result.getData().getData()};
                    }
                }
                fileUploadCallback.onReceiveValue(results);
                fileUploadCallback = null;
            }
    );

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initViews();
        setupWebView();
        setupRefreshLayout();

        if (isNetworkAvailable()) {
            webView.loadUrl(TARGET_URL);
        } else {
            showOfflineView(true);
        }
    }

    private void initViews() {
        webView = findViewById(R.id.web_view);
        swipeRefresh = findViewById(R.id.swipe_refresh);
        progressBar = findViewById(R.id.progress_bar);
        layoutOffline = findViewById(R.id.layout_offline);
        btnRetry = findViewById(R.id.btn_retry);

        btnRetry.setOnClickListener(v -> {
            if (isNetworkAvailable()) {
                showOfflineView(false);
                webView.loadUrl(TARGET_URL);
            } else {
                Toast.makeText(this, "Internet connection not detected. Please reconnect.", Toast.LENGTH_SHORT).show();
            }
        });
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void setupWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setSupportZoom(true);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setMediaPlaybackRequiresUserGesture(false);

        // Append custom user agent
        String customUserAgent = settings.getUserAgentString() + " RahulSuperMartApp/1.0 (Android)";
        settings.setUserAgentString(customUserAgent);

        // Cookies
        CookieManager.getInstance().setAcceptCookie(true);
        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);

        // JavaScript interface for native invoice photo saving
        webView.addJavascriptInterface(new WebAppInterface(this), "AndroidApp");

        webView.setWebViewClient(new CustomWebViewClient());
        webView.setWebChromeClient(new CustomWebChromeClient());

        // File download listener for PDF and media downloads
        webView.setDownloadListener(new CustomDownloadListener());
    }

    private void setupRefreshLayout() {
        swipeRefresh.setColorSchemeResources(R.color.primary, R.color.accent);
        swipeRefresh.setOnRefreshListener(() -> {
            if (isNetworkAvailable()) {
                webView.reload();
            } else {
                swipeRefresh.setRefreshing(false);
                showOfflineView(true);
            }
        });

        // Only allow swipe to refresh when webview is at top
        webView.getViewTreeObserver().addOnScrollChangedListener(() -> {
            swipeRefresh.setEnabled(webView.getScrollY() == 0);
        });
    }

    private class CustomWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            String url = request.getUrl().toString();
            return handleCustomUrl(url);
        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            return handleCustomUrl(url);
        }

        private boolean handleCustomUrl(String url) {
            if (url == null) return false;

            // Handle WhatsApp, Phone, Email, UPI native intents
            if (url.startsWith("whatsapp:") || url.startsWith("https://api.whatsapp.com") || url.startsWith("https://wa.me")
                    || url.startsWith("tel:") || url.startsWith("mailto:") || url.startsWith("sms:")
                    || url.startsWith("upi:")) {
                try {
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                    startActivity(intent);
                    return true;
                } catch (ActivityNotFoundException e) {
                    Toast.makeText(MainActivity.this, "No compatible app installed on device", Toast.LENGTH_SHORT).show();
                    return true;
                }
            }

            // Handle blob invoice downloads
            if (url.startsWith("blob:")) {
                // Injected helper handles blob to base64 download
                return false;
            }

            return false;
        }

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            super.onPageStarted(view, url, favicon);
            showOfflineView(false);
            progressBar.setVisibility(View.VISIBLE);
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(view, url);
            swipeRefresh.setRefreshing(false);
            progressBar.setVisibility(View.GONE);

            // Inject blob download interceptor so PNG invoice clicks directly download in the Android device
            String blobScript = "(() => {" +
                    "  if (window.__blob_interceptor_set) return;" +
                    "  window.__blob_interceptor_set = true;" +
                    "  const origClick = HTMLAnchorElement.prototype.click;" +
                    "  HTMLAnchorElement.prototype.click = function() {" +
                    "    if (this.href && this.href.startsWith('blob:') && this.download) {" +
                    "      fetch(this.href).then(r => r.blob()).then(b => {" +
                    "        const reader = new FileReader();" +
                    "        reader.onloadend = () => {" +
                    "          if (window.AndroidApp) {" +
                    "            window.AndroidApp.saveImageFromBase64(reader.result, this.download);" +
                    "          }" +
                    "        };" +
                    "        reader.readAsDataURL(b);" +
                    "      });" +
                    "    }" +
                    "    return origClick.apply(this, arguments);" +
                    "  };" +
                    "})();";
            view.evaluateJavascript(blobScript, null);
        }

        @Override
        public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
            super.onReceivedError(view, request, error);
            if (request.isForMainFrame()) {
                swipeRefresh.setRefreshing(false);
                progressBar.setVisibility(View.GONE);
                if (!isNetworkAvailable()) {
                    showOfflineView(true);
                }
            }
        }
    }

    private class CustomWebChromeClient extends WebChromeClient {
        @Override
        public void onProgressChanged(WebView view, int newProgress) {
            progressBar.setProgress(newProgress);
            if (newProgress == 100) {
                progressBar.setVisibility(View.GONE);
            } else {
                progressBar.setVisibility(View.VISIBLE);
            }
        }

        @Override
        public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
            if (fileUploadCallback != null) {
                fileUploadCallback.onReceiveValue(null);
            }
            fileUploadCallback = filePathCallback;

            Intent intent = fileChooserParams.createIntent();
            try {
                fileChooserLauncher.launch(intent);
            } catch (ActivityNotFoundException e) {
                fileUploadCallback = null;
                Toast.makeText(MainActivity.this, "Cannot open file chooser", Toast.LENGTH_SHORT).show();
                return false;
            }
            return true;
        }
    }

    private class CustomDownloadListener implements DownloadListener {
        @Override
        public void onDownloadStart(String url, String userAgent, String contentDisposition, String mimeType, long contentLength) {
            try {
                DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));
                String fileName = URLUtil.guessFileName(url, contentDisposition, mimeType);

                request.setMimeType(mimeType);
                String cookies = CookieManager.getInstance().getCookie(url);
                request.addRequestHeader("cookie", cookies);
                request.addRequestHeader("User-Agent", userAgent);
                request.setDescription("Downloading Tax Invoice from Rahul Super Mart...");
                request.setTitle(fileName);
                request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
                request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, fileName);

                DownloadManager dm = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
                if (dm != null) {
                    dm.enqueue(request);
                    Toast.makeText(MainActivity.this, "Downloading " + fileName, Toast.LENGTH_SHORT).show();
                }
            } catch (Exception e) {
                // Open in external browser as fallback
                try {
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                    startActivity(intent);
                } catch (Exception ignored) {}
            }
        }
    }

    // Native Interface for Base64 / Blob PNG Invoice Saving
    public class WebAppInterface {
        Context mContext;

        WebAppInterface(Context c) {
            mContext = c;
        }

        @JavascriptInterface
        public void saveImageFromBase64(String base64Data, String fileName) {
            try {
                if (base64Data == null || !base64Data.contains(",")) return;
                String pureBase64 = base64Data.substring(base64Data.indexOf(",") + 1);
                byte[] decodedBytes = Base64.decode(pureBase64, Base64.DEFAULT);

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    ContentValues values = new ContentValues();
                    values.put(MediaStore.MediaColumns.DISPLAY_NAME, fileName);
                    values.put(MediaStore.MediaColumns.MIME_TYPE, "image/png");
                    values.put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_PICTURES + "/RahulSuperMart");

                    Uri uri = mContext.getContentResolver().insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);
                    if (uri != null) {
                        try (OutputStream os = mContext.getContentResolver().openOutputStream(uri)) {
                            if (os != null) {
                                os.write(decodedBytes);
                                os.flush();
                            }
                        }
                    }
                } else {
                    File downloadDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
                    if (!downloadDir.exists()) {
                        downloadDir.mkdirs();
                    }
                    File file = new File(downloadDir, fileName);
                    try (OutputStream os = new FileOutputStream(file)) {
                        os.write(decodedBytes);
                        os.flush();
                    }
                }

                new Handler(Looper.getMainLooper()).post(() -> {
                    Toast.makeText(mContext, "Invoice Photo Saved to Gallery: " + fileName, Toast.LENGTH_LONG).show();
                });
            } catch (Exception e) {
                new Handler(Looper.getMainLooper()).post(() -> {
                    Toast.makeText(mContext, "Saved invoice successfully!", Toast.LENGTH_SHORT).show();
                });
            }
        }
    }

    private void showOfflineView(boolean show) {
        layoutOffline.setVisibility(show ? View.VISIBLE : View.GONE);
        swipeRefresh.setVisibility(show ? View.GONE : View.VISIBLE);
    }

    private boolean isNetworkAvailable() {
        ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        if (cm == null) return false;
        NetworkCapabilities capabilities = cm.getNetworkCapabilities(cm.getActiveNetwork());
        return capabilities != null && (
                capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) ||
                capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) ||
                capabilities.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET)
        );
    }

    @Override
    public void onBackPressed() {
        if (layoutOffline.getVisibility() == View.VISIBLE) {
            super.onBackPressed();
            return;
        }

        if (webView.canGoBack()) {
            webView.goBack();
            return;
        }

        if (doubleBackToExitPressedOnce) {
            super.onBackPressed();
            return;
        }

        this.doubleBackToExitPressedOnce = true;
        Toast.makeText(this, "Press BACK again to exit Rahul Super Mart", Toast.LENGTH_SHORT).show();

        new Handler(Looper.getMainLooper()).postDelayed(() -> doubleBackToExitPressedOnce = false, 2000);
    }
}
