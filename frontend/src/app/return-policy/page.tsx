'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  RotateCcw, 
  Calendar, 
  ShieldCheck, 
  AlertTriangle, 
  Package, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Globe, 
  ArrowLeft 
} from 'lucide-react';

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-left">
        
        {/* Breadcrumb / Top Bar */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <span>/</span>
            <span className="text-blue-600">Return Policy</span>
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
              Return Policy
            </h1>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
              <Calendar size={13} className="text-slate-400" />
              <span><strong>Effective Date:</strong> 28 September 2026</span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-xs">
            <ShieldCheck size={14} className="text-emerald-600" /> Official Policy
          </span>
        </div>

        {/* Content Container */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm">
          
          <div className="p-5 bg-blue-50/70 border border-blue-100 rounded-2xl text-slate-700 text-xs sm:text-sm">
            <p className="font-medium leading-relaxed">
              This Return Policy outlines the guidelines and conditions under which products purchased on the Platform can be returned, replaced, or reported.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3 pt-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">
                1
              </span>
              Return &amp; Replacement Eligibility (5 Days)
            </h2>
            <div className="space-y-3 text-slate-600 pl-9 text-xs sm:text-sm">
              <p>
                In case of receipt of damaged, defective, or incorrect items, please report to our customer service team within <strong>5 days of receipt of products</strong>.
              </p>
              <p>
                The return request will be entertained once the seller/merchant listed on the Platform has checked and determined the condition at its own end.
              </p>
              <p>
                In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within <strong>5 days of receiving the product</strong>. The customer service team after looking into your complaint will take an appropriate decision.
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">
                2
              </span>
              Perishable Goods
            </h2>
            <div className="space-y-2 text-slate-600 pl-9 text-xs sm:text-sm">
              <p>
                <strong>9110176882</strong> does not accept returns or cancellations for perishable items like flowers, eatables, etc.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 flex items-start gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>However, refund or replacement can be made if the user establishes that the quality of the product delivered is not satisfactory upon arrival.</span>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">
                3
              </span>
              Manufacturer Warranty
            </h2>
            <div className="space-y-2 text-slate-600 pl-9 text-xs sm:text-sm">
              <p>
                In case of complaints regarding products that come with a warranty from the manufacturer, please refer the issue directly to the authorized manufacturer service center.
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                4
              </span>
              Refund Processing Following Return
            </h2>
            <div className="pl-9 text-xs sm:text-sm">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-950">
                <p className="font-semibold text-xs sm:text-sm">
                  In case of any returns/refunds approved by <strong>9110176882</strong>, it will take <strong>1 days</strong> for the refund to be processed to you.
                </p>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Customer Service Contact */}
          <div className="space-y-4 pt-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">
                5
              </span>
              Contact Us for Return Requests
            </h2>
            
            <p className="text-slate-600 pl-9 text-xs sm:text-sm">
              To initiate a return or replacement request, please contact our support desk:
            </p>

            <div className="ml-0 sm:ml-9 bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-3">
              <div className="font-extrabold text-slate-900 text-base">
                Rahul Super Mart / Vishal Telecom
              </div>
              <div className="text-xs text-slate-600">
                <strong>Registered Office:</strong> Sikta bazar, Near SBI Bank, West Champaran, Bihar – 845307, India
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
                  <span>+91 8210302931 / 9110176882</span>
                </a>
              </div>

              <div className="pt-2 text-left">
                <a
                  href="https://wa.me/918210302931?text=Hi%20Rahul%20Super%20Mart,%20I%20have%20a%20query%20regarding%20return%20request"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-sm"
                >
                  WhatsApp Return Assistance
                </a>
              </div>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
