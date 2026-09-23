'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  Truck, 
  Calendar, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  DollarSign, 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Phone, 
  Mail, 
  Globe, 
  ArrowLeft,
  Navigation
} from 'lucide-react';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-left">
        
        {/* Breadcrumb / Top Bar */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <span>/</span>
            <span className="text-blue-600">Shipping & Delivery Policy</span>
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
                <Truck size={26} />
              </span>
              Shipping & Delivery Policy
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
              At <strong>Rahul Super Mart</strong>, we aim to deliver your grocery, wholesale supplies, and other purchased products safely, securely, and on time to your doorstep or retail shop.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3 pt-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">
                1
              </span>
              Delivery Area
            </h2>
            <div className="space-y-2 text-slate-600 pl-9">
              <p>
                We currently provide fast delivery services in selected geographic areas based on our local delivery fleet and wholesale hub coverage.
              </p>
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-xs text-slate-700 flex items-start gap-2.5">
                <MapPin size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Delivery availability will be automatically confirmed based on the delivery pincode and address provided while placing your order.</span>
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
              Order Processing
            </h2>
            <div className="space-y-2 text-slate-600 pl-9">
              <p>
                Orders are generally processed promptly after successful payment confirmation or Cash on Delivery (COD) verification.
              </p>
              <p className="text-xs text-slate-500">
                Orders may take some time to process depending on stock availability, wholesale bulk volume, packaging requirements, and operational factors.
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
              Delivery Time
            </h2>
            <div className="space-y-2 text-slate-600 pl-9">
              <p>
                The estimated delivery timeframe will be communicated or displayed to the customer at the time of ordering or via order status SMS/WhatsApp alerts.
              </p>
              <p className="text-xs text-slate-500">
                Delivery time may vary due to external factors such as adverse weather conditions, highway traffic, public holidays, product restock timelines, or other circumstances beyond our control.
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">
                4
              </span>
              Delivery Charges
            </h2>
            <div className="space-y-2 text-slate-600 pl-9">
              <p>
                Delivery charges, if applicable based on weight, distance, or minimum order value, will be clearly displayed to the customer before completing checkout.
              </p>
              <p className="text-xs text-slate-600 font-medium">
                Any applicable delivery or handling fees will be transparently itemized in the final invoice amount.
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 5 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-black">
                5
              </span>
              Delayed Delivery
            </h2>
            <div className="space-y-2 text-slate-600 pl-9">
              <p>
                While we make reasonable efforts to dispatch and deliver orders within the estimated timeframe, delays may occasionally occur due to unforeseen logistics circumstances.
              </p>
              <p className="text-xs text-slate-500">
                In case of a significant delay, customers are requested to contact Rahul Super Mart customer support for a live update regarding their consignment.
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 6 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                6
              </span>
              Delivery Confirmation
            </h2>
            <div className="space-y-2 text-slate-600 pl-9">
              <p>
                The order may be considered delivered once the consignment has been handed over to the customer or an authorized representative at the delivery address provided during checkout.
              </p>
              <p className="text-xs text-slate-500">
                For Cash on Delivery orders, an OTP verification code or digital signature confirmation may be verified by our delivery agent upon handover.
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 7 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center text-xs font-black">
                7
              </span>
              Incorrect or Incomplete Address
            </h2>
            <div className="space-y-2 text-slate-600 pl-9">
              <p>
                Customers are responsible for providing an accurate and complete delivery address, correct pincode, and active mobile phone number.
              </p>
              <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-3 text-xs text-rose-900 flex items-start gap-2">
                <AlertCircle size={16} className="text-rose-600 flex-shrink-0 mt-0.5" />
                <span>Rahul Super Mart may not be held responsible for transit delays, failed delivery attempts, or return fees caused by incorrect, inaccessible, or incomplete address details provided by the customer.</span>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 8 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">
                8
              </span>
              Damaged or Incorrect Products
            </h2>
            <div className="space-y-2 text-slate-600 pl-9">
              <p>
                If you receive a damaged, defective, expired, or incorrect product upon delivery, please contact us as soon as possible with your order details and invoice receipt.
              </p>
              <p className="text-xs text-slate-500">
                We may request photographs or other packaging evidence for prompt audit verification, following which a replacement or refund will be initiated under our Refund Policy.
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 9 - Contact Box */}
          <div className="space-y-4 pt-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">
                9
              </span>
              Contact Us
            </h2>
            
            <p className="text-slate-600 pl-9 text-xs sm:text-sm">
              For any delivery tracking or shipping-related assistance, please contact our dispatch desk:
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
                  href="https://wa.me/918210302931?text=Hi%20Rahul%20Super%20Mart,%20I%20have%20a%20query%20regarding%20my%20order%20delivery%20status"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-sm"
                >
                  WhatsApp Delivery Helpline
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
