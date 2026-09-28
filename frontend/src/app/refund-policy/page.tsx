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
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  Globe, 
  MapPin,
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
            <span className="text-blue-600">Refund &amp; Cancellation policy</span>
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
              Refund and Cancellation policy
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
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm">
          
          {/* Preamble */}
          <div className="p-5 bg-blue-50/70 border border-blue-100 rounded-2xl text-slate-700 text-xs sm:text-sm">
            <p className="font-medium leading-relaxed">
              This refund and cancellation policy outlines how you can cancel or seek a refund for a product / service that you have purchased through the Platform. Under this policy:
            </p>
          </div>

          {/* Point 1 */}
          <div className="flex items-start gap-3">
            <span className="font-bold text-slate-900 mt-0.5">1.</span>
            <div className="space-y-2 flex-1">
              <p>
                Cancellations will only be considered if the request is made <strong>5 days of placing the order</strong>. However, cancellation requests may not be entertained if the orders have been communicated to such sellers / merchant(s) listed on the Platform and they have initiated the process of shipping them, or the product is out for delivery. In such an event, you may choose to reject the product at the doorstep.
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Point 2 */}
          <div className="flex items-start gap-3">
            <span className="font-bold text-slate-900 mt-0.5">2.</span>
            <div className="space-y-2 flex-1">
              <p>
                <strong>9110176882</strong> does not accept cancellation requests for perishable items like flowers, eatables, etc. However, the refund / replacement can be made if the user establishes that the quality of the product delivered is not good.
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Point 3 */}
          <div className="flex items-start gap-3">
            <span className="font-bold text-slate-900 mt-0.5">3.</span>
            <div className="space-y-2 flex-1">
              <p>
                In case of receipt of damaged or defective items, please report to our customer service team. The request would be entertained once the seller/ merchant listed on the Platform, has checked and determined the same at its own end. This should be reported within <strong>5 days of receipt of products</strong>. In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within <strong>5 days of receiving the product</strong>. The customer service team after looking into your complaint will take an appropriate decision.
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Point 4 */}
          <div className="flex items-start gap-3">
            <span className="font-bold text-slate-900 mt-0.5">4.</span>
            <div className="space-y-2 flex-1">
              <p>
                In case of complaints regarding the products that come with a warranty from the manufacturers, please refer the issue to them.
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Point 5 */}
          <div className="flex items-start gap-3">
            <span className="font-bold text-slate-900 mt-0.5">5.</span>
            <div className="space-y-2 flex-1">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-950">
                <p className="font-semibold text-xs sm:text-sm">
                  In case of any refunds approved by <strong>9110176882</strong>, it will take <strong>1 days</strong> for the refund to be processed to you.
                </p>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Contact Box */}
          <div className="space-y-3 pt-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Customer Support &amp; Contact Information
            </h2>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-3">
              <div className="font-extrabold text-slate-900 text-base">
                Rahul Super Mart / Vishal Telecom
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-600">
                <MapPin size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Sikta bazar, Near SBI Bank, West Champaran, Bihar – 845307, India</span>
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
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
