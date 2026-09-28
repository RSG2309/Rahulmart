'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Calendar, 
  Lock, 
  Eye, 
  FileText, 
  Phone, 
  Mail, 
  Globe, 
  MapPin,
  ArrowLeft 
} from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-left">
        
        {/* Breadcrumb / Top Bar */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <span>/</span>
            <span className="text-blue-600">Privacy Policy</span>
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
                <Lock size={26} />
              </span>
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
              <Calendar size={13} className="text-slate-400" />
              <span><strong>Effective Date:</strong> 28 September 2026</span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-xs">
            <ShieldCheck size={14} className="text-emerald-600" /> Data Protection
          </span>
        </div>

        {/* Content Container */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm">
          
          <div className="p-5 bg-blue-50/70 border border-blue-100 rounded-2xl text-slate-700 text-xs sm:text-sm">
            <p className="font-medium leading-relaxed">
              This Privacy Policy describes how <strong>9110176882</strong> (Rahul Super Mart / Vishal Telecom) collects, uses, and protects your personal information when you visit or make a purchase from{' '}
              <a href="https://rahulmart.vercel.app/" target="_blank" rel="noreferrer" className="text-blue-600 font-semibold hover:underline">
                https://rahulmart.vercel.app/
              </a>{' '}
              (the &apos;Platform&apos;). We are committed to safeguarding the privacy and security of our users and business partners.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3 pt-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">
                1
              </span>
              Information We Collect
            </h2>
            <div className="space-y-2 text-slate-600 pl-9 text-xs sm:text-sm">
              <p>When you register, browse, or place an order on our Platform, we may collect the following details:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Contact Information:</strong> Full name, phone number, email address, shop name, and delivery address with pincode.</li>
                <li><strong>Account Credentials:</strong> Login credentials, OTP verification logs, and order history.</li>
                <li><strong>Transaction Details:</strong> Payment method, transaction ID, UTR number, and order billing data (we do NOT store complete debit/credit card numbers or CVVs).</li>
                <li><strong>Device Information:</strong> IP address, browser type, and operating device details for fraud prevention.</li>
              </ul>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">
                2
              </span>
              How We Use Your Information
            </h2>
            <div className="space-y-2 text-slate-600 pl-9 text-xs sm:text-sm">
              <p>We use the collected information for legitimate business purposes including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Processing, packing, and delivering your orders.</li>
                <li>Communicating order status updates, dispatch tracking, and invoices.</li>
                <li>Processing refunds, returns, or handling customer support queries.</li>
                <li>Preventing unauthorized transactions, fraudulent activities, and ensuring platform security.</li>
                <li>Complying with statutory tax and regulatory reporting requirements under Indian law.</li>
              </ul>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">
                3
              </span>
              Information Sharing &amp; Disclosure
            </h2>
            <div className="space-y-2 text-slate-600 pl-9 text-xs sm:text-sm">
              <p>We respect your privacy and do not sell, rent, or trade your personal data. We share information only with:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Payment Processors:</strong> Secure authorized payment gateways (e.g. PhonePe) to process transactions.</li>
                <li><strong>Logistics Partners:</strong> Delivery executives and transport carriers to fulfill consignments.</li>
                <li><strong>Legal Authorities:</strong> Government or statutory enforcement agencies when strictly required by applicable Indian law.</li>
              </ul>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">
                4
              </span>
              Data Security
            </h2>
            <div className="space-y-2 text-slate-600 pl-9 text-xs sm:text-sm">
              <p>
                We implement industry-standard 256-bit SSL encryption, restricted administrative access, and secure cloud databases to safeguard your personal and business records against unauthorized access, loss, or disclosure.
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 5 - Grievance Officer & Contact */}
          <div className="space-y-4 pt-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">
                5
              </span>
              Grievance Officer &amp; Contact Us
            </h2>
            
            <p className="text-slate-600 pl-9 text-xs sm:text-sm">
              In accordance with Information Technology Act, 2000 and rules made there under, if you have any questions, feedback, or grievances regarding this Privacy Policy, please contact our Grievance Officer:
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
                  href="https://wa.me/918210302931?text=Hi%20Rahul%20Super%20Mart,%20I%20have%20a%20query%20regarding%20privacy%20policy"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-sm"
                >
                  WhatsApp Privacy &amp; Support Helpdesk
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
