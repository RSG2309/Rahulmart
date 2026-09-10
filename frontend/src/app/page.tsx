'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { api, getImageUrl } from '@/services/api';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ShoppingCart, AlertCircle, CheckCircle, ArrowRight, ChevronLeft, ChevronRight, Sparkles, X, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Marquee = 'marquee' as any;

export default function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [notifMessage, setNotifMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Today Deals horizontal scroll carousel ref and handler
  const dealsScrollRef = useRef<HTMLDivElement>(null);
  const scrollDeals = (direction: 'left' | 'right') => {
    if (dealsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      dealsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Auto-scrolling slides list (only images and redirection links)
  const slides = [
    {
      image: '/Demo1.jpeg.jpg?v=20260904',
      title: 'Grocery Supplies',
      link: '/catalog?category=grocery'
    },
    {
      image: '/demo2.jpg?v=20260904',
      title: 'Cosmetics Care',
      link: '/catalog?category=cosmetic'
    },
    {
      image: '/banner1.jpg?v=20260904',
      title: 'Electronics',
      link: '/catalog?category=electronics'
    },
    {
      image: '/banner2.jpg?v=20260904',
      title: 'Wholesale Warehousing',
      link: '/catalog'
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeenNotice = sessionStorage.getItem('hasSeenDemoNotice');
      if (!hasSeenNotice) {
        setShowNoticeModal(true);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await api.get('/products');
        if (prodRes.success) setProducts(prodRes.products);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Autoplay slideshow effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      }
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleNextSlide = (e?: React.MouseEvent | any) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = (e?: React.MouseEvent | any) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleQuickAdd = (product: any) => {
    const result = addToCart(product, product.moq);
    if (result.success) {
      setNotifMessage({ type: 'success', text: `Added to cart (${product.moq})` });
    } else {
      setNotifMessage({ type: 'error', text: result.message || 'Failed to add item' });
    }
    setTimeout(() => setNotifMessage(null), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Navbar />

      {/* Floating Notification - Compact Pill */}
      {notifMessage && (
        <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 md:bottom-6 md:right-6 md:left-auto md:translate-x-0 z-50 px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold border transition-all duration-300 pointer-events-none animate-in fade-in zoom-in-95 ${
          notifMessage.type === 'success' 
            ? 'bg-slate-900/95 text-white border-slate-700/60 backdrop-blur-md' 
            : 'bg-rose-900/95 text-white border-rose-700/60 backdrop-blur-md'
        }`}>
          {notifMessage.type === 'success' ? (
            <CheckCircle size={14} className="text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle size={14} className="text-rose-400 shrink-0" />
          )}
          <span>{notifMessage.text}</span>
        </div>
      )}

      {/* 1. Hero Section - Flipkart-Style Banners (Image Only, Clickable Links) */}
      <section 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative overflow-hidden w-full group cursor-pointer"
      >
        <Link href={slides[activeSlide].link}>
          <div className="relative w-full aspect-[23/15] lg:aspect-[16/5] max-w-[1920px] mx-auto bg-slate-200 overflow-hidden shadow-sm border border-slate-200/50 my-2">
            <AnimatePresence>
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(event, info) => {
                  const swipeThreshold = 50;
                  if (info.offset.x < -swipeThreshold) {
                    handleNextSlide();
                  } else if (info.offset.x > swipeThreshold) {
                    handlePrevSlide();
                  }
                }}
              >

                
                <img
                  src={slides[activeSlide].image}
                  alt={slides[activeSlide].title}
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>

            {/* Hover Navigation Arrows (Flipkart Style) */}
            <button 
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/95 hover:bg-white hover:scale-105 text-slate-800 p-1.5 sm:p-2.5 rounded-full shadow-lg transition opacity-0 group-hover:opacity-100 border border-slate-200"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/95 hover:bg-white hover:scale-105 text-slate-800 p-1.5 sm:p-2.5 rounded-full shadow-lg transition opacity-0 group-hover:opacity-100 border border-slate-200"
            >
              <ChevronRight size={16} />
            </button>

            {/* Slide Navigation Dots */}
            <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveSlide(i); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeSlide === i ? 'bg-white w-7 scale-110' : 'bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </Link>
      </section>

      {/* 2. Running Announcement Marquee (Above Browse Sourcing Categories) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mt-3 mb-2">
        <div className="bg-gradient-to-r from-red-50 via-amber-50 to-emerald-50 border border-amber-200/90 rounded-2xl p-2.5 overflow-hidden flex items-center shadow-sm">
          <span className="bg-gradient-to-r from-red-600 to-amber-600 text-white font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-lg shadow-sm flex-shrink-0 mr-3 animate-pulse">
            📢 Notice
          </span>
          <Marquee behavior="scroll" direction="left" className="text-slate-900 font-bold text-xs tracking-wide cursor-default">
            🎉 RAHUL SUPER MART – GRAND OPENING SALE शुरू हो गई है! 🛒 &nbsp;अब आप ऑनलाइन ऑर्डर कर सकते हैं और अपने पसंदीदा सामान को सबसे कम दाम में खरीद सकते हैं। 🛍️💰 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 🎉 RAHUL SUPER MART – GRAND OPENING SALE शुरू हो गई है! 🛒 &nbsp;अब आप ऑनलाइन ऑर्डर कर सकते हैं और अपने पसंदीदा सामान को सबसे कम दाम में खरीद सकते हैं। 🛍️💰
          </Marquee>
        </div>
      </section>

      {/* 2.8 Today's Deals - Horizontal Scroll Carousel with Left/Right Cursors */}
      {products.length > 0 && (
        <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="bg-gradient-to-r from-red-500/5 via-rose-500/5 to-amber-500/5 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-rose-200/80 shadow-sm relative">
            {/* Header with Title and Left/Right Cursor Buttons */}
            <div className="flex justify-between items-center mb-4 text-left">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-1.5">
                    <Flame className="text-red-500 fill-red-500" size={20} />
                    Today's Deals
                  </h2>
                  <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse hidden sm:inline-block">
                    Deal of the Day
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Special wholesale rates refreshed daily • Swipe or use arrows</p>
              </div>

              {/* Cursor controls & View all link */}
              <div className="flex items-center gap-2 sm:gap-3">
                <Link href="/catalog" className="text-xs font-bold text-red-600 hover:text-red-700 hidden sm:inline-flex items-center gap-1">
                  View All <ArrowRight size={13} />
                </Link>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => scrollDeals('left')}
                    className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-100 hover:border-slate-300 flex items-center justify-center text-slate-700 transition active:scale-95 cursor-pointer"
                    aria-label="Scroll deals left"
                    title="Previous Deals"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => scrollDeals('right')}
                    className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-100 hover:border-slate-300 flex items-center justify-center text-slate-700 transition active:scale-95 cursor-pointer"
                    aria-label="Scroll deals right"
                    title="Next Deals"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Horizontal Scrollable Product Track */}
            <div
              ref={dealsScrollRef}
              className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {products.map((product) => {
                const mrp = Number(product.mrp || 0);
                const isVerifiedRetailer = user && user.kycStatus === 'verified';
                const targetPrice = isVerifiedRetailer
                  ? Number(product.wholesalePrice || 0)
                  : Number(product.retailerPrice || 0);
                const calculatedDiscount = mrp > 0 && targetPrice > 0 && targetPrice < mrp
                  ? Math.round(((mrp - targetPrice) / mrp) * 100)
                  : 0;

                return (
                  <div
                    key={`today-deal-${product.id}`}
                    className="w-[170px] sm:w-[205px] flex-shrink-0 snap-start bg-white rounded-2xl border border-slate-200/90 hover:border-red-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden text-left"
                  >
                    <Link href={`/products/${product.id}`} className="block">
                      <div className="p-2 sm:p-3 relative bg-slate-50/50">
                        {calculatedDiscount > 0 ? (
                          <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
                            {calculatedDiscount}% OFF
                          </span>
                        ) : (
                          <span className="absolute top-2 left-2 z-10 bg-rose-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                            Deal
                          </span>
                        )}

                        {product.stock <= 0 && (
                          <span className="absolute top-2 right-2 z-10 bg-slate-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                            Sold Out
                          </span>
                        )}

                        <div className="overflow-hidden rounded-xl bg-white p-1.5 border border-slate-100 flex items-center justify-center h-28 sm:h-32">
                          <img
                            src={getImageUrl(product.images?.[0])}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </Link>

                    <div className="p-2.5 flex-grow flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] text-red-600 font-extrabold uppercase tracking-wider block truncate">
                          {product.brand || 'Today Deal'}
                        </span>
                        <Link
                          href={`/products/${product.id}`}
                          title={product.name}
                          className="font-bold text-slate-800 text-xs mt-0.5 line-clamp-2 overflow-hidden text-ellipsis leading-tight min-h-[2rem] hover:text-red-600 transition-colors block"
                        >
                          {product.name}
                        </Link>
                        <p className="text-slate-400 text-[9px] mt-0.5 font-semibold">MOQ: {product.moq} {product.unit}s</p>

                        <div className="mt-1.5 bg-slate-50 border border-slate-100/90 p-1.5 rounded-xl">
                          <div className="flex items-baseline justify-between gap-1">
                            <div>
                              <span className="text-[8px] text-red-600 uppercase font-black block leading-none mb-0.5">Bulk Rate</span>
                              {user ? (
                                user.kycStatus === 'verified' ? (
                                  <span className="font-black text-red-600 text-xs sm:text-sm">₹{product.wholesalePrice}</span>
                                ) : (
                                  <Link href="/profile" className="text-[8px] sm:text-[9px] font-bold text-amber-600 hover:underline block leading-tight">
                                    🔒 KYC Req.
                                  </Link>
                                )
                              ) : (
                                <Link href="/auth/login" className="text-[8px] sm:text-[10px] font-bold text-[#fb641b] hover:underline block leading-tight">
                                  🔒 Login
                                </Link>
                              )}
                            </div>
                            <div className="text-right leading-tight">
                              <span className="text-[8px] text-slate-500 block">Retail: <strong className="text-slate-700 font-bold">₹{product.retailerPrice}</strong></span>
                              {mrp > Number(product.retailerPrice || 0) && (
                                <span className="text-[8px] text-slate-400 line-through block">M.R.P: ₹{mrp}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {product.stock <= 0 ? (
                        <button
                          disabled
                          className="w-full mt-2 bg-slate-100 text-slate-400 font-bold py-1.5 rounded-lg text-[11px] cursor-not-allowed"
                        >
                          Out of Stock
                        </button>
                      ) : (
                        <button
                          onClick={() => handleQuickAdd(product)}
                          className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 rounded-lg text-[11px] transition shadow-sm flex items-center justify-center gap-1"
                        >
                          <ShoppingCart size={12} /> Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 2.9 Offer Zone */}
      {(loading || products.some(p => p.isOfferZone === true)) && (
        <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="bg-amber-500/5 p-6 rounded-2xl border border-amber-200/65 shadow-sm">
            <div className="flex justify-between items-end mb-8 text-left">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="text-amber-500 fill-amber-500 stroke-[2.5]" size={20} />
                  Offer Zone
                </h2>
                <p className="text-xs text-slate-500 mt-1">Super discounted prices on hot wholesale deals.</p>
              </div>
              <Link href="/catalog?offerZone=true" className="text-sm font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1 transition">
                View All Offers <ArrowRight size={14} />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-slate-55 p-6 rounded-3xl border border-slate-200/80 animate-pulse h-85"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
                {products.filter(p => p.isOfferZone === true).slice(0, 4).map((product) => (
                  <div key={product.id} className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/85 hover:border-amber-300 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between text-left">
                    <Link href={`/products/${product.id}`} className="block">
                      <div className="p-2 sm:p-4 relative bg-slate-50/50">
                        {(() => {
                          const mrp = Number(product.mrp || 0);
                          if (mrp <= 0) return null;
                          
                          const isVerifiedRetailer = user && user.kycStatus === 'verified';
                          const targetPrice = isVerifiedRetailer 
                            ? Number(product.wholesalePrice || 0) 
                            : Number(product.retailerPrice || 0);
                            
                          if (targetPrice <= 0 || targetPrice >= mrp) return null;
                          
                          const calculatedDiscount = Math.round(((mrp - targetPrice) / mrp) * 100);
                          if (calculatedDiscount <= 0) return null;
                          
                          return (
                            <span className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 bg-amber-500 text-white text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 sm:px-2.5 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
                              {calculatedDiscount}% OFF
                            </span>
                          );
                        })()}
                        {product.stock <= 0 && (
                          <span className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-rose-600 text-white text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 sm:px-2.5 rounded-full uppercase tracking-wider shadow-sm">
                            Out of Stock
                          </span>
                        )}
                        <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-white p-1.5 sm:p-3 border border-slate-100 flex items-center justify-center h-28 sm:h-36 md:h-40">
                          <img
                            src={getImageUrl(product.images?.[0])}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </Link>
                    
                    <div className="p-2.5 sm:p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] sm:text-[10px] text-amber-600 font-extrabold uppercase tracking-widest block truncate">{product.brand}</span>
                        <Link 
                          href={`/products/${product.id}`} 
                          title={product.name}
                          className="font-bold text-slate-800 text-xs sm:text-sm mt-0.5 line-clamp-2 overflow-hidden text-ellipsis leading-tight sm:leading-snug min-h-[2rem] sm:min-h-[2.5rem] hover:text-amber-600 transition-colors block"
                        >
                          {product.name}
                        </Link>
                        <p className="text-slate-400 text-[9px] sm:text-[10px] mt-0.5 font-semibold">MOQ: {product.moq} {product.unit}s</p>
                        
                        {/* Amazon-Style Compact Price Box */}
                        <div className="mt-2 bg-slate-50 border border-slate-100/90 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl">
                          <div className="flex items-baseline justify-between gap-1">
                            <div>
                              <span className="text-[8px] sm:text-[9px] text-amber-600 uppercase font-black block leading-none mb-0.5">Bulk Rate</span>
                              {user ? (
                                user.kycStatus === 'verified' ? (
                                  <span className="font-black text-amber-600 text-xs sm:text-sm">₹{product.wholesalePrice}</span>
                                ) : (
                                  <Link href="/profile" className="text-[8px] sm:text-[9px] font-bold text-amber-600 hover:underline block leading-tight">
                                    🔒 KYC Req.
                                  </Link>
                                )
                              ) : (
                                <Link href="/auth/login" className="text-[8px] sm:text-[10px] font-bold text-[#fb641b] hover:underline block leading-tight">
                                  🔒 Login
                                </Link>
                              )}
                            </div>
                            <div className="text-right leading-tight">
                              <span className="text-[8px] sm:text-[9px] text-slate-500 block">Retail: <strong className="text-slate-700 font-bold">₹{product.retailerPrice}</strong></span>
                              {Number(product.mrp || 0) > Number(product.retailerPrice || 0) && (
                                <span className="text-[8px] sm:text-[9px] text-slate-400 line-through block">M.R.P: ₹{product.mrp}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {product.stock <= 0 ? (
                        <button
                          disabled
                          className="w-full mt-2.5 sm:mt-4 bg-slate-100 border border-slate-300 text-slate-400 font-bold py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs flex items-center justify-center gap-1 cursor-not-allowed"
                        >
                          ⚠️ Out of Stock
                        </button>
                      ) : (
                        <button
                          onClick={() => handleQuickAdd(product)}
                          className="w-full mt-2.5 sm:mt-4 bg-amber-500 hover:bg-amber-600 text-white font-bold py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs transition shadow-sm flex items-center justify-center gap-1"
                        >
                          <ShoppingCart size={12} /> Add
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3. Featured Deals */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex justify-between items-end mb-8 text-left">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Featured Bulk Slabs</h2>
              <p className="text-xs text-slate-500 mt-1">Place bulk orders to trigger auto bulk discount rates.</p>
            </div>
            <Link href="/catalog" className="text-sm font-bold text-[#2874f0] hover:text-[#1b5ec2] inline-flex items-center gap-1 transition">
              View Catalog <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 animate-pulse h-85"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-2.5 sm:gap-6">
              {products.slice(0, 6).map((product) => (
                <div key={product.id} className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/85 hover:border-blue-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between text-left">
                  <Link href={`/products/${product.id}`} className="block">
                    <div className="p-2 sm:p-4 relative bg-slate-50/50">
                      {(() => {
                        const mrp = Number(product.mrp || 0);
                        if (mrp <= 0) return null;
                        
                        const isVerifiedRetailer = user && user.kycStatus === 'verified';
                        const targetPrice = isVerifiedRetailer 
                          ? Number(product.wholesalePrice || 0) 
                          : Number(product.retailerPrice || 0);
                          
                        if (targetPrice <= 0 || targetPrice >= mrp) return null;
                        
                        const calculatedDiscount = Math.round(((mrp - targetPrice) / mrp) * 100);
                        if (calculatedDiscount <= 0) return null;
                        
                        return (
                          <span className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 bg-rose-500 text-white text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 sm:px-2.5 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
                            {calculatedDiscount}% OFF
                          </span>
                        );
                      })()}
                      {product.stock <= 0 && (
                        <span className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-rose-600 text-white text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 sm:px-2.5 rounded-full uppercase tracking-wider shadow-sm">
                          Out of Stock
                        </span>
                      )}
                      <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-white p-1.5 sm:p-3 border border-slate-100 flex items-center justify-center h-28 sm:h-36 md:h-40">
                        <img
                          src={getImageUrl(product.images?.[0])}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </Link>
                  
                  <div className="p-2.5 sm:p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-[#2874f0] font-extrabold uppercase tracking-widest block truncate">{product.brand}</span>
                      <Link 
                        href={`/products/${product.id}`} 
                        title={product.name}
                        className="font-bold text-slate-805 text-xs sm:text-sm mt-0.5 line-clamp-2 overflow-hidden text-ellipsis leading-tight sm:leading-snug min-h-[2rem] sm:min-h-[2.5rem] hover:text-[#2874f0] transition-colors block"
                      >
                        {product.name}
                      </Link>
                      <p className="text-slate-400 text-[9px] sm:text-[10px] mt-0.5 font-semibold">MOQ: {product.moq} {product.unit}s</p>
                      
                      {/* Amazon-Style Compact Price Box */}
                      <div className="mt-2 bg-slate-50 border border-slate-100/90 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl">
                        <div className="flex items-baseline justify-between gap-1">
                          <div>
                            <span className="text-[8px] sm:text-[9px] text-[#2874f0] uppercase font-black block leading-none mb-0.5">Bulk Rate</span>
                            {user ? (
                              user.kycStatus === 'verified' ? (
                                <span className="font-black text-[#2874f0] text-xs sm:text-sm">₹{product.wholesalePrice}</span>
                              ) : (
                                <Link href="/profile" className="text-[8px] sm:text-[9px] font-bold text-amber-600 hover:underline block leading-tight">
                                  🔒 KYC Req.
                                </Link>
                              )
                            ) : (
                              <Link href="/auth/login" className="text-[8px] sm:text-[10px] font-bold text-[#fb641b] hover:underline block leading-tight">
                                🔒 Login
                              </Link>
                            )}
                          </div>
                          <div className="text-right leading-tight">
                            <span className="text-[8px] sm:text-[9px] text-slate-500 block">Retail: <strong className="text-slate-700 font-bold">₹{product.retailerPrice}</strong></span>
                            {Number(product.mrp || 0) > Number(product.retailerPrice || 0) && (
                              <span className="text-[8px] sm:text-[9px] text-slate-400 line-through block">M.R.P: ₹{product.mrp}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {product.stock <= 0 ? (
                      <button
                        disabled
                        className="w-full mt-2.5 sm:mt-4 bg-slate-100 border border-slate-300 text-slate-400 font-bold py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs flex items-center justify-center gap-1 cursor-not-allowed"
                      >
                        ⚠️ Out of Stock
                      </button>
                    ) : (
                      <button
                        onClick={() => handleQuickAdd(product)}
                        className="w-full mt-2.5 sm:mt-4 bg-[#2874f0] hover:bg-[#1b5ec2] text-white font-bold py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs transition shadow-sm flex items-center justify-center gap-1"
                      >
                        <ShoppingCart size={12} /> Add
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>


      {/* 5. Demo Welcome Notice Modal Overlay */}
      {showNoticeModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl border border-slate-100 flex flex-col items-center p-6 space-y-4 animate-scaleUp relative">
            
            {/* Top close button */}
            <button
              onClick={() => {
                setShowNoticeModal(false);
                sessionStorage.setItem('hasSeenDemoNotice', 'true');
              }}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 bg-slate-100/80 hover:bg-slate-155 p-2 rounded-full transition z-20 shadow-sm hover:scale-105"
              aria-label="Close Notice"
            >
              <X size={20} className="stroke-[2.5]" />
            </button>
            
            {/* Aspect box containing notice image */}
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl border border-slate-100/80 bg-slate-50 flex items-center justify-center">
              <img 
                src="/demo-notice.jpg.jpg?v=20260904" 
                alt="Demo Notice" 
                className="w-full h-full object-contain hover:scale-101 transition duration-300" 
              />
            </div>

            {/* Action button */}
            <button
              onClick={() => {
                setShowNoticeModal(false);
                sessionStorage.setItem('hasSeenDemoNotice', 'true');
              }}
              className="w-full bg-[#2874f0] hover:bg-[#1b5ec2] text-white font-extrabold py-3.5 rounded-xl text-xs transition tracking-wider uppercase shadow-md shadow-blue-500/10 hover:scale-[1.01]"
            >
              I Understand / समझ गया (Proceed)
            </button>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
