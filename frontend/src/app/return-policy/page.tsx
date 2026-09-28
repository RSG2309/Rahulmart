'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  RotateCcw, 
  Calendar, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Globe, 
  MapPin,
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
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm">
          
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              We offer refund / exchange within first <strong>7 days</strong> from the date of your purchase. If 7 days have passed since your purchase, you will not be offered a return, exchange or refund of any kind. In order to become eligible for a return or an exchange, (i) the purchased item should be unused and in the same condition as you received it, (ii) the item must have original packaging, (iii) if the item that you purchased on a sale, then the item may not be eligible for a return / exchange. Further, only such items are replaced by us (based on an exchange request), if such items are found defective or damaged.
            </p>

            <p>
              You agree that there may be a certain category of products / items that are exempted from returns or refunds. Such categories of the products would be identified to you at the item of purchase. For exchange / return accepted request(s) (as applicable), once your returned product / item is received and inspected by us, we will send you an email to notify you about receipt of the returned / exchanged product. Further. If the same has been approved after the quality check at our end, your request (i.e. return / exchange) will be processed in accordance with our policies.
            </p>
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
