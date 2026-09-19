/**
 * Utility to generate and download high-resolution PNG Tax Invoices directly in the browser.
 * Works universally on mobile phones, tablets, and desktops with zero external dependencies.
 */

export const downloadInvoicePNG = (order: any) => {
  if (typeof window === 'undefined' || !order) return;

  const items = order.items || [];
  const width = 960;
  // Calculate dynamic height based on number of items and address length
  const baseHeight = 650;
  const itemsHeight = Math.max(items.length * 38, 50);
  const totalHeight = baseHeight + itemsHeight;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Use 2x scale for crisp high-DPI rendering on mobile & desktop screens
  const scale = 2;
  canvas.width = width * scale;
  canvas.height = totalHeight * scale;
  ctx.scale(scale, scale);

  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, totalHeight);

  // Top Accent Bar (Brand Blue)
  ctx.fillStyle = '#1E3A8A';
  ctx.fillRect(0, 0, width, 14);

  // Header Left: Company Branding
  ctx.fillStyle = '#1E293B';
  ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Rahul Super Mart', 48, 56);

  ctx.fillStyle = '#475569';
  ctx.font = '500 11.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Vishal Telecom Pvt LTD, Sikta Bazar, W. Champaran, Bihar - 845307', 48, 76);
  ctx.fillText('Email: vishalstoresikta@gmail.com   |   BUSINESS PAN: AAUFV9462B', 48, 93);

  // Header Right: Invoice Title & Badge
  ctx.textAlign = 'right';
  ctx.fillStyle = '#1E3A8A';
  ctx.font = '900 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('TAX INVOICE', width - 48, 56);

  ctx.fillStyle = '#059669';
  ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('ORIGINAL FOR RECIPIENT', width - 48, 76);

  // Header Divider
  ctx.textAlign = 'left';
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(48, 110);
  ctx.lineTo(width - 48, 110);
  ctx.stroke();

  // Information Section (Bill To vs Invoice Metadata)
  const infoY = 135;

  const orderId = (order.id || order._id || '').toString();
  const buyerName = order.businessName || order.user?.businessName || order.user?.fullName || order.customerName || 'Valued Retailer';
  const buyerMobile = order.mobile || order.user?.mobile || order.phone || order.user?.phone || '';

  // Left Box: Bill To
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(48, infoY, 410, 105);
  ctx.strokeStyle = '#E2E8F0';
  ctx.strokeRect(48, infoY, 410, 105);

  ctx.fillStyle = '#1E293B';
  ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('BILL TO (BUYER DETAILS):', 62, infoY + 22);

  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(buyerName, 62, infoY + 42);

  ctx.fillStyle = '#475569';
  ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const address = order.deliveryAddress || order.shippingAddress || 'Store Pickup / Counter Delivery';
  const truncatedAddress = address.length > 55 ? address.substring(0, 52) + '...' : address;
  ctx.fillText(`Address: ${truncatedAddress}`, 62, infoY + 62);
  ctx.fillText(`Pin Code: ${order.pincode || '845307'}`, 62, infoY + 79);
  if (buyerMobile) {
    ctx.fillText(`Mobile: ${buyerMobile}`, 62, infoY + 95);
  }

  // Right Box: Invoice Details
  const rightBoxX = 502;
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(rightBoxX, infoY, 410, 105);
  ctx.strokeStyle = '#E2E8F0';
  ctx.strokeRect(rightBoxX, infoY, 410, 105);

  ctx.fillStyle = '#1E293B';
  ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('INVOICE METADATA:', rightBoxX + 14, infoY + 22);

  ctx.fillStyle = '#475569';
  ctx.font = '11.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Invoice No:', rightBoxX + 14, infoY + 44);
  ctx.fillText('Invoice Date:', rightBoxX + 14, infoY + 63);
  ctx.fillText('Order Status:', rightBoxX + 14, infoY + 82);
  ctx.fillText('Payment Mode:', rightBoxX + 14, infoY + 99);

  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 11.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`INV-${orderId.toUpperCase()}`, rightBoxX + 120, infoY + 44);
  ctx.fillText(new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), rightBoxX + 120, infoY + 63);
  
  // Status Badge
  const status = (order.orderStatus || 'received').toUpperCase();
  ctx.fillStyle = status === 'DELIVERED' ? '#059669' : '#2563EB';
  ctx.fillText(status, rightBoxX + 120, infoY + 82);

  ctx.fillStyle = '#0F172A';
  const payMethod = (order.paymentMethod || 'online').toUpperCase();
  const payStatus = (order.paymentStatus || 'pending').toUpperCase();
  ctx.fillText(`${payMethod} (${payStatus})`, rightBoxX + 120, infoY + 99);

  // Table Section
  const tableY = 265;
  const tableW = width - 96;

  // Table Header
  ctx.fillStyle = '#1E3A8A';
  ctx.fillRect(48, tableY, tableW, 28);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('#', 60, tableY + 18);
  ctx.fillText('Item Description', 96, tableY + 18);
  ctx.textAlign = 'right';
  ctx.fillText('Rate (INR)', 610, tableY + 18);
  ctx.fillText('Qty', 710, tableY + 18);
  ctx.fillText('Subtotal (INR)', width - 64, tableY + 18);

  // Table Body Rows
  ctx.textAlign = 'left';
  let currentY = tableY + 28;

  items.forEach((item: any, idx: number) => {
    // Alternating background
    if (idx % 2 === 0) {
      ctx.fillStyle = '#FFFFFF';
    } else {
      ctx.fillStyle = '#F8FAFC';
    }
    ctx.fillRect(48, currentY, tableW, 36);

    ctx.strokeStyle = '#F1F5F9';
    ctx.strokeRect(48, currentY, tableW, 36);

    // Number
    ctx.fillStyle = '#64748B';
    ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`${idx + 1}`, 60, currentY + 22);

    // Item Name
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 11.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const rawName = (item.name || item.title || item.product?.name || 'Product Item').toString();
    const itemName = rawName.length > 50 ? rawName.substring(0, 48) + '...' : rawName;
    ctx.fillText(itemName, 96, currentY + 22);

    // Rate
    ctx.textAlign = 'right';
    ctx.fillStyle = '#334155';
    ctx.font = '11.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`₹${Number(item.price || 0).toFixed(2)}`, 610, currentY + 22);

    // Qty
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 11.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`${item.quantity || 1}`, 710, currentY + 22);

    // Subtotal
    const itemSub = Number(item.subtotal || (item.price * item.quantity) || 0);
    ctx.fillText(`₹${itemSub.toFixed(2)}`, width - 64, currentY + 22);

    ctx.textAlign = 'left';
    currentY += 36;
  });

  // Totals & Summary Block
  const summaryY = currentY + 16;
  const summaryBoxW = 380;
  const summaryBoxX = width - 48 - summaryBoxW;

  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(summaryBoxX, summaryY, summaryBoxW, 140);
  ctx.strokeStyle = '#E2E8F0';
  ctx.strokeRect(summaryBoxX, summaryY, summaryBoxW, 140);

  let sumLineY = summaryY + 22;
  const drawSummaryRow = (label: string, val: string, isTotal = false) => {
    ctx.fillStyle = isTotal ? '#1E3A8A' : '#475569';
    ctx.font = isTotal
      ? '900 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      : '500 11.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(label, summaryBoxX + 16, sumLineY);

    ctx.textAlign = 'right';
    ctx.fillText(val, summaryBoxX + summaryBoxW - 16, sumLineY);
    ctx.textAlign = 'left';
    sumLineY += isTotal ? 24 : 18;
  };

  const amounts = order.amounts || {};
  drawSummaryRow('Subtotal:', `₹${Number(amounts.subtotal || 0).toFixed(2)}`);

  if (amounts.codCharge && amounts.codCharge > 0) {
    drawSummaryRow('COD Handling Fee:', `₹${Number(amounts.codCharge).toFixed(2)}`);
  }

  if (amounts.discount && amounts.discount > 0) {
    drawSummaryRow(`Discount (${order.couponCode || 'Promo'}):`, `-₹${Number(amounts.discount).toFixed(2)}`);
  }

  if (amounts.promoDeduction && amounts.promoDeduction > 0) {
    drawSummaryRow('Promo Wallet Deduction:', `-₹${Number(amounts.promoDeduction).toFixed(2)}`);
  }

  // Divider before final total
  ctx.strokeStyle = '#CBD5E1';
  ctx.beginPath();
  ctx.moveTo(summaryBoxX + 16, sumLineY - 4);
  ctx.lineTo(summaryBoxX + summaryBoxW - 16, sumLineY - 4);
  ctx.stroke();
  sumLineY += 6;

  drawSummaryRow('GRAND TOTAL:', `₹${Number(amounts.finalTotal || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, true);

  // Left Stamp Box (Digitally Verified by Rahul Super Mart)
  const stampW = 340;
  ctx.fillStyle = '#F0FDF4';
  ctx.fillRect(48, summaryY, stampW, 140);
  ctx.strokeStyle = '#BBF7D0';
  ctx.strokeRect(48, summaryY, stampW, 140);

  ctx.fillStyle = '#166534';
  ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('✓ VERIFIED OFFICIAL B2B TAX INVOICE', 64, summaryY + 28);

  ctx.fillStyle = '#374151';
  ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Thank you for sourcing with Rahul Super Mart!', 64, summaryY + 54);
  ctx.fillText('For bulk order inquiries or delivery support:', 64, summaryY + 74);
  ctx.fillText('WhatsApp / Call: Rahul Super Mart Support', 64, summaryY + 94);
  ctx.fillText('Location: Sikta Bazar, West Champaran, Bihar', 64, summaryY + 114);

  // Footer: Terms & Legal Notes
  const footerY = summaryY + 160;
  ctx.strokeStyle = '#E2E8F0';
  ctx.beginPath();
  ctx.moveTo(48, footerY);
  ctx.lineTo(width - 48, footerY);
  ctx.stroke();

  ctx.fillStyle = '#64748B';
  ctx.font = 'bold 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Terms & Conditions:', 48, footerY + 16);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '9.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('1. Goods once sold will not be returned unless damaged or incorrect on arrival.', 48, footerY + 30);
  ctx.fillText('2. All trade disputes are strictly subject to W. Champaran, Bihar jurisdiction only.', 48, footerY + 44);
  ctx.fillText('3. This is a computer-generated tax invoice and requires no physical ink signature.', 48, footerY + 58);

  // Bottom Copyright
  ctx.textAlign = 'right';
  ctx.fillText('rahulmart.vercel.app  •  Rahul Super Mart Wholesale', width - 48, footerY + 58);

  // Convert to Blob and Trigger Direct Browser PNG Download
  canvas.toBlob((blob) => {
    if (!blob) return;
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `Invoice_INV-${orderId.toUpperCase() || 'ORDER'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);
  }, 'image/png');
};
