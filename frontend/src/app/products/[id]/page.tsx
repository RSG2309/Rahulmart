'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { api, getImageUrl } from '@/services/api';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ShoppingCart, ArrowLeft, ShieldCheck, Check, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetails({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  
  const router = useRouter();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [notif, setNotif] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [related, setRelated] = useState<any[]>([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/${productId}`);
        if (res.success) {
          setProduct(res.product);
          setQuantity(res.product.moq);
          
          // Fetch related products of the same category
          const relRes = await api.get(`/products?category=${res.product.category}`);
          if (relRes.success) {
            setRelated(relRes.products.filter((p: any) => p.id !== productId).slice(0, 4));
          }
        } else {
          router.push('/catalog');
        }
      } catch (e) {
        console.error(e);
        router.push('/catalog');
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-650"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) return null;

  // Calculate pricing slab details
  const isKycVerified = user?.kycStatus === 'verified';
  const isBulkSlab = quantity >= product.moq && isKycVerified;
  const currentPrice = isBulkSlab ? product.wholesalePrice : product.retailerPrice;
  const totalAmount = currentPrice * quantity;
  
  // Calculate potential savings if not in bulk slab yet
  const qtyToBulk = product.moq - quantity;
  const potentialSavings = (qtyToBulk > 0 && isKycVerified) ? (product.retailerPrice - product.wholesalePrice) * product.moq : 0;

  const mrp = Number(product.mrp || 0);
  const targetPrice = isKycVerified 
    ? Number(product.wholesalePrice || 0) 
    : Number(product.retailerPrice || 0);
  const calculatedDiscount = mrp > 0 && targetPrice > 0 && targetPrice < mrp
    ? Math.round(((mrp - targetPrice) / mrp) * 100)
    : 0;

  const handleQtyChange = (val: number) => {
    if (val < 1) val = 1;
    if (val > product.stock) val = product.stock;
    setQuantity(val);
  };

  const handleAddToCart = () => {
    const res = addToCart(product, quantity);
    if (res.success) {
      setNotif({ type: 'success', text: `Added to cart (${quantity})` });
    } else {
      setNotif({ type: 'error', text: res.message || 'Failed to add item' });
    }
    setTimeout(() => setNotif(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Floating Notification - Compact Pill */}
      {notif && (
        <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 md:bottom-6 md:right-6 md:left-auto md:translate-x-0 z-50 px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold border transition duration-300 pointer-events-none animate-in fade-in zoom-in-95 ${
          notif.type === 'success' 
            ? 'bg-slate-900/95 text-white border-slate-700/60 backdrop-blur-md' 
            : 'bg-rose-900/95 text-white border-rose-700/60 backdrop-blur-md'
        }`}>
          {notif.type === 'success' ? (
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle size={14} className="text-rose-400 shrink-0" />
          )}
          <span>{notif.text}</span>
        </div>
      )}

      <main className="flex-grow max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-6 pb-20 md:pb-12 w-full">
        {/* Back Link - Minimal Gap */}
        <div className="mb-1.5 sm:mb-4">
          <Link href="/catalog" className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-slate-500 hover:text-indigo-650 transition">
            <ArrowLeft size={13} /> Back to Sourcing Catalog
          </Link>
        </div>

        {/* Dynamic Card Container */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-3 sm:p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 text-left">
          
          {/* Left: Product Images & Gallery */}
          <div>
            <div className="relative w-full h-44 sm:h-64 lg:h-[340px] rounded-xl sm:rounded-2xl border border-slate-100 bg-slate-50/50 p-2 sm:p-6 flex items-center justify-center overflow-hidden group">
              <img
                src={getImageUrl(product.images?.[0])}
                alt={product.name}
                className="max-h-40 sm:max-h-56 lg:max-h-[300px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-indigo-50 text-indigo-700 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border border-indigo-100 uppercase">
                {product.unit} Unit Pack
              </span>
              {calculatedDiscount > 0 && (
                <span className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-600 text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse shadow-sm">
                  {calculatedDiscount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Right: Product Details & Buying Control */}
          <div className="space-y-3 sm:space-y-5 flex flex-col justify-between">
            <div className="space-y-2.5 sm:space-y-4">
              
              {/* Brand & Name Header */}
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[9px] sm:text-[10px] text-red-600 font-black uppercase tracking-wider block">{product.brand || 'Rahul Super Mart'}</span>
                <h1 className="text-base sm:text-2xl font-black text-slate-900 leading-snug">{product.name}</h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono">SKU: {product.sku}</span>
                  <span className="text-slate-300">•</span>
                  {product.stock <= 0 ? (
                    <span className="bg-rose-50 text-rose-700 text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded border border-rose-100 uppercase tracking-wide">
                      Out of Stock
                    </span>
                  ) : (
                    <span className="bg-emerald-50 text-emerald-700 text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-wide">
                      In Stock ({product.stock} available)
                    </span>
                  )}
                </div>
              </div>

              {/* Compact Rate & MRP Bar */}
              <div className="flex items-center justify-between flex-wrap gap-2 py-1.5 px-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <div className="flex items-baseline gap-2">
                  <span className="text-base sm:text-xl font-black text-red-600">
                    ₹{currentPrice}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">/ {product.unit}</span>
                  {product.mrp > currentPrice && (
                    <span className="text-[11px] text-slate-400 line-through">M.R.P: ₹{product.mrp}</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span className="text-slate-500">Retail: <strong className="text-slate-700">₹{product.retailerPrice}</strong></span>
                  {isKycVerified && (
                    <span className="bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.5 rounded">Wholesale: ₹{product.wholesalePrice}</span>
                  )}
                </div>
              </div>

              {/* Quantity Selector & Desktop Add to Cart */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between md:justify-start gap-2 sm:gap-3">
                  {/* Quantity Selector with Label */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">Quantity:</span>
                    <div className="flex items-center border border-slate-200 rounded-xl p-0.5 bg-slate-50 shadow-sm">
                      <button
                        disabled={product.stock <= 0}
                        onClick={() => handleQtyChange(quantity - 1)}
                        className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center font-black text-slate-600 rounded-lg transition ${
                          product.stock <= 0 ? 'cursor-not-allowed opacity-50' : 'hover:bg-white active:scale-95'
                        }`}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        disabled={product.stock <= 0}
                        value={product.stock <= 0 ? 0 : quantity}
                        onChange={(e) => handleQtyChange(parseInt(e.target.value) || product.moq)}
                        className="w-10 sm:w-12 text-center bg-transparent border-none text-xs font-bold focus:outline-none"
                      />
                      <button
                        disabled={product.stock <= 0}
                        onClick={() => handleQtyChange(quantity + 1)}
                        className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center font-black text-slate-600 rounded-lg transition ${
                          product.stock <= 0 ? 'cursor-not-allowed opacity-50' : 'hover:bg-white active:scale-95'
                        }`}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Desktop Only Add to Cart Button (On Mobile, sticky bottom bar is used) */}
                  {product.stock <= 0 ? (
                    <button
                      disabled
                      className="hidden md:flex flex-1 bg-slate-100 border border-slate-200 text-slate-400 font-extrabold text-xs py-3.5 rounded-xl items-center justify-center gap-1.5 cursor-not-allowed"
                    >
                      ⚠️ Out of Stock
                    </button>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      className="hidden md:flex flex-1 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-black text-sm py-3.5 rounded-xl shadow-md hover:shadow-red-500/25 transition-all items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                    >
                      <ShoppingCart size={18} /> Add to Cart • ₹{(product.stock <= 0 ? 0 : totalAmount).toLocaleString('en-IN')}
                    </button>
                  )}
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium px-1">
                  <span>MOQ: {product.moq} {product.unit}s</span>
                  <span className="md:hidden font-bold text-slate-700">Subtotal: ₹{(product.stock <= 0 ? 0 : totalAmount).toLocaleString('en-IN')}</span>
                  <span className="hidden md:inline">Total: ₹{(product.stock <= 0 ? 0 : totalAmount).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Pricing slabs panel */}
              <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  <div 
                    onClick={() => handleQtyChange(1)}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center transition cursor-pointer hover:border-[#2874f0]/40 ${
                      !isBulkSlab 
                        ? 'bg-blue-50/90 text-[#2874f0] border-[#2874f0]/80 shadow-sm ring-2 ring-[#2874f0]/10 font-bold' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`block text-[8px] sm:text-[9px] font-bold uppercase ${!isBulkSlab ? 'text-[#2874f0]' : 'text-slate-400'}`}>Retailer Rate</span>
                    <span className="text-base sm:text-lg font-extrabold block mt-0.5">₹{product.retailerPrice}</span>
                    <span className={`block text-[8px] sm:text-[9px] mt-0.5 ${!isBulkSlab ? 'text-[#2874f0]/80' : 'text-slate-400'}`}>Quantity &lt; {product.moq}</span>
                  </div>
                  
                  <div 
                    onClick={() => {
                      if (!user) {
                        router.push('/auth/login');
                      } else if (!isKycVerified) {
                        router.push('/profile');
                      } else {
                        handleQtyChange(product.moq);
                      }
                    }}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center transition cursor-pointer hover:border-indigo-350/40 ${
                      isBulkSlab
                        ? 'bg-indigo-50/90 text-indigo-700 border-indigo-500 shadow-sm ring-2 ring-indigo-500/10 font-bold' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`block text-[8px] sm:text-[9px] font-bold uppercase ${isBulkSlab ? 'text-indigo-650' : 'text-indigo-500'}`}>
                      Bulk Rate
                    </span>
                    {user ? (
                      isKycVerified ? (
                        <>
                          <span className="text-base sm:text-lg font-black block mt-0.5">₹{product.wholesalePrice}</span>
                          <span className={`block text-[8px] sm:text-[9px] mt-0.5 ${isBulkSlab ? 'text-indigo-550' : 'text-slate-400'}`}>
                            Save ₹{product.retailerPrice - product.wholesalePrice}/unit
                          </span>
                        </>
                      ) : (
                        <div className="py-1.5">
                          <Link href="/profile" className="text-[9px] sm:text-[10px] font-bold text-amber-600 hover:underline block leading-tight">
                            🔒 KYC Req.
                          </Link>
                        </div>
                      )
                    ) : (
                      <div className="py-1.5">
                        <Link href="/auth/login" className="text-[10px] sm:text-xs font-bold text-[#fb641b] hover:underline block">
                          🔒 Login
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Savings helper notification */}
                {!user ? (
                  <div className="bg-slate-100 border border-slate-200 rounded-xl p-2.5 flex items-start gap-2 text-[10px] text-slate-650 leading-normal text-left">
                    <AlertCircle size={13} className="text-[#fb641b] flex-shrink-0 mt-0.5" />
                    <div>
                      Please <Link href="/auth/login" className="text-[#fb641b] font-bold hover:underline">login</Link> to unlock wholesale bulk rates.
                    </div>
                  </div>
                ) : !isKycVerified ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-start gap-2 text-[10px] text-amber-800 leading-normal text-left">
                    <AlertCircle size={13} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      Profile pending KYC. <Link href="/profile" className="text-amber-700 font-bold hover:underline">Complete KYC</Link> to unlock bulk rates.
                    </div>
                  </div>
                ) : qtyToBulk > 0 ? (
                  <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-2.5 flex items-start gap-2 text-[10px] text-indigo-800 leading-normal">
                    <Sparkles size={13} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      Add <strong className="text-indigo-900 font-black">{qtyToBulk} more</strong> to unlock bulk rate! Save <strong className="text-indigo-900">₹{potentialSavings.toLocaleString('en-IN')}</strong>.
                    </div>
                  </div>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 flex items-start gap-2 text-[10px] text-emerald-800 leading-normal">
                    <Check size={13} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Bulk Pricing unlocked!</strong> Saving ₹{(product.retailerPrice - product.wholesalePrice) * quantity}.
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 leading-relaxed pt-1">
                {product.description || 'Premium retail store supplies directly sourced from manufacturing units.'}
              </p>

            </div>

            {/* Specifications table */}
            <div className="pt-4 border-t border-slate-150 space-y-2.5">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Specifications</h3>
              <div className="border border-slate-150 rounded-xl overflow-hidden text-xs">
                <table className="min-w-full divide-y divide-slate-150 text-left">
                  <tbody className="divide-y divide-slate-150 bg-white">
                    {product.specifications?.map((spec: any, idx: number) => (
                      <tr key={idx}>
                        <td className="px-3 py-1.5 bg-slate-50 text-slate-500 font-medium w-1/3 border-r border-slate-150 text-[11px]">{spec.key}</td>
                        <td className="px-3 py-1.5 text-slate-800 font-semibold text-[11px]">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

        {/* Mobile Sticky Floating Bottom Add to Cart Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2 flex items-center justify-between gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
          <div className="text-left leading-tight">
            <span className="text-[9px] text-slate-400 font-bold uppercase block">Total Price</span>
            <span className="text-sm font-black text-slate-900">₹{(product.stock <= 0 ? 0 : totalAmount).toLocaleString('en-IN')}</span>
          </div>
          {product.stock <= 0 ? (
            <button disabled className="bg-slate-100 text-slate-400 font-bold text-xs px-4 py-2 rounded-lg cursor-not-allowed">
              Out of Stock
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex-1 max-w-[220px] bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-xs py-2.5 rounded-xl shadow-md flex items-center justify-center gap-1.5 uppercase tracking-wider"
            >
              <ShoppingCart size={15} /> Add to Cart
            </button>
          )}
        </div>

        {/* Related Sourcing Products Grid */}
        {related.length > 0 && (
          <div className="mt-16 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 text-left">Related Sourcing Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <div key={p.id} className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition">
                  <div className="p-4 relative">
                    <Link href={`/products/${p.id}`} className="block">
                      <img
                        src={p.images?.[0] || 'https://via.placeholder.com/150'}
                        alt={p.name}
                        className="w-full h-32 object-contain rounded-lg bg-slate-50 cursor-pointer hover:opacity-90 transition"
                      />
                    </Link>
                  </div>
                  <div className="px-4 pb-4 flex-grow flex flex-col justify-between">
                    <div className="text-left">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">{p.brand}</span>
                      <Link href={`/products/${p.id}`} className="font-bold text-slate-800 text-xs mt-0.5 line-clamp-1 hover:underline">
                        {p.name}
                      </Link>
                      <p className="text-slate-500 text-[10px] mt-0.5">MOQ: {p.moq} {p.unit}s</p>
                    </div>
                    <Link
                      href={`/products/${p.id}`}
                      className="w-full mt-3 bg-indigo-50 text-indigo-700 hover:bg-indigo-650 hover:text-white py-1.5 rounded-lg font-bold text-[10px] text-center block transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
