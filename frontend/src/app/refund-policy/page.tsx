'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  RotateCcw, 
  Calendar, 
  ShieldCheck, 
  XCircle, 
  CreditCard, 
  AlertTriangle, 
  Ban, 
  RefreshCw, 
  Phone, 
  Mail, 
  Globe, 
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-left">
        
        {/* Breadcrumb / Top Bar */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <span>/</span>
            <span className="text-blue-600">Refund & Cancellation Policy</span>
          </div>
          <Link 
            href="/"
            className="inline-flex items-center gap-1 text-slate-600 hover:text-blue-600 transition normal-case font-bold"
          >
            <ArrowLeft size={14} /> Back to Store
          </Link>
        </div>

        {/* Page Header */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <RotateCcw size={26} />
              </span>
              Refund & Cancellation Policy
            </h1>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
              <Calendar size={13} className="text-slate-400" />
              <span><strong>Effective Date:</strong> 23 September 2026</span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-xs">
            <ShieldCheck size={14} className="text-emerald-600" /> Official Policy
          </span>
        </div>

        {/* Content Container */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm">
          
          <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl text-slate-700 text-xs sm:text-sm">
            <p className="font-medium">
              Welcome to <strong>Rahul Super Mart</strong>. We value our customers and aim to provide a smooth, transparent, and reliable shopping experience for all our retail and wholesale buyers.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3 pt-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">
                1
              </span>
              Order Cancellation
            </h2>
            <div className="space-y-2 text-slate-600 pl-9">
              <p>
                Customers can request cancellation of an order <strong>before the order is dispatched</strong> from our facility or warehouse.
              </p>
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
                <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <span>Once an order has been dispatched or out for delivery, cancellation may not be possible.</span>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">
                2
              </span>
              Refund Policy
            </h2>
            <div className="space-y-2 text-slate-600 pl-9">
              <p>
                If an eligible order is cancelled or a refund is approved by our audit team, the refund will be processed to the <strong>original payment method</strong> used for the transaction (Bank Account, UPI, Card, or Store Wallet).
              </p>
              <p className="text-xs text-slate-500">
                Refund processing time may vary depending on the customer&apos;s bank, card issuer, or payment service provider (typically 3 to 7 business banking days).
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">
                3
              </span>
              Damaged or Incorrect Products
            </h2>
            <div className="space-y-2 text-slate-600 pl-9">
              <p>
                If you receive a <strong>damaged, defective, expired, or incorrect product</strong>, please contact Rahul Super Mart as soon as possible after delivery with your order details and, where required, clear photographs of the package and product.
              </p>
              <p className="flex items-center gap-1.5 text-emerald-700 font-medium text-xs sm:text-sm">
                <CheckCircle2 size={16} className="text-emerald-600" />
                After verification, we may provide a replacement or refund as applicable.
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-black">
                4
              </span>
              Non-Refundable Situations
            </h2>
            <div className="space-y-2 text-slate-600 pl-9">
              <p>
                Refunds may not be provided in the following cases:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
                <li>Products that have been opened, consumed, altered, or used after delivery.</li>
                <li>Products damaged after delivery by the customer.</li>
                <li>Where the issue is caused by incorrect storage, heat exposure, or improper handling after handover.</li>
                <li>Certain products may also be non-returnable due to their hygiene, perishable, or packaged grocery nature.</li>
              </ul>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 5 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">
                5
              </span>
              Payment Failure
            </h2>
            <div className="space-y-2 text-slate-600 pl-9">
              <p>
                If money is deducted from your bank account or UPI wallet but the order is not successfully placed, the amount will normally be automatically reversed by the payment gateway or issuing bank.
              </p>
              <p className="text-xs text-slate-500">
                If the deducted amount is not received within the applicable banking timeline (typically 48 to 72 hours), please contact us with the transaction UTR number / payment screenshot for immediate tracking.
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 6 - Contact Box */}
          <div className="space-y-4 pt-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">
                6
              </span>
              Contact Us
            </h2>
            
            <p className="text-slate-600 pl-9 text-xs sm:text-sm">
              For cancellation, refund, return, or order-related queries, please reach out to our support desk:
            </p>

            <div className="ml-0 sm:ml-9 bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-3">
              <div className="font-extrabold text-slate-900 text-base">
                Rahul Super Mart
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                <a 
                  href="https://rahulmart.vercel.app" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:text-blue-600 transition"
                >
                  <Globe size={16} className="text-blue-600 flex-shrink-0" />
                  <span className="truncate">rahulmart.vercel.app</span>
                </a>
                <a 
                  href="mailto:vishaltelecomskt@gmail.com"
                  className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:text-blue-600 transition"
                >
                  <Mail size={16} className="text-blue-600 flex-shrink-0" />
                  <span className="truncate">vishaltelecomskt@gmail.com</span>
                </a>
                <a 
                  href="tel:+918210302931"
                  className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl hover:border-emerald-400 hover:text-emerald-700 transition"
                >
                  <Phone size={16} className="text-emerald-600 flex-shrink-0" />
                  <span>+91 8210302931</span>
                </a>
              </div>

              <div className="pt-2 text-left">
                <a
                  href="https://wa.me/918210302931?text=Hi%20Rahul%20Super%20Mart,%20I%20have%20a%20query%20regarding%20refund%20and%20cancellation"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-sm"
                >
                  WhatsApp Support Assistance
                </a>
              </div>
            </div>

            <p className="text-xs text-slate-500 italic pl-0 sm:pl-9 pt-2">
              * We reserve the right to verify refund and cancellation requests before processing them.
            </p>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
