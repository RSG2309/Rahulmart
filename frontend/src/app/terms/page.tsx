'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  FileText, 
  Calendar, 
  Scale, 
  ShieldCheck, 
  AlertCircle, 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Globe 
} from 'lucide-react';

export default function TermsOfService() {
  const termsList = [
    {
      num: "1.",
      text: "To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account on the Platform.."
    },
    {
      num: "2.",
      text: "Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.."
    },
    {
      num: "3.",
      text: "Your use of our Services and the Platform is solely and entirely at your own risk and discretion for which we shall not be liable to you in any manner. You are required to independently assess and ensure that the Services meet your requirements.."
    },
    {
      num: "4.",
      text: "The contents of the Platform and the Services are proprietary to us and are licensed to us. You will not have any authority to claim any intellectual property rights, title, or interest in its contents. The contents includes and is not limited to the design, layout, look and graphics.."
    },
    {
      num: "5.",
      text: "You acknowledge that unauthorized use of the Platform and/or the Services may lead to action against you as per these Terms of Use and/or applicable laws.."
    },
    {
      num: "6.",
      text: "You agree to pay us the charges associated with availing the Services.."
    },
    {
      num: "7.",
      text: "You agree not to use the Platform and/ or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you."
    },
    {
      num: "8.",
      text: "You agree and acknowledge that website and the Services may contain links to other third party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third party websites. These links are provided for your convenience for provide further information.."
    },
    {
      num: "9.",
      text: "You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with the Platform Owner for the Services.."
    },
    {
      num: "10.",
      text: "You shall indemnify and hold harmless Platform Owner, its affiliates, group companies (as applicable) and their respective officers, directors, agents, and employees, from any claim or demand, or actions including reasonable attorney's fees, made by any third party or penalty imposed due to or arising out of Your breach of this Terms of Use, privacy Policy and other Policies, or Your violation of any law, rules or regulations or the rights (including infringement of intellectual property rights) of a third party."
    },
    {
      num: "11.",
      text: "Notwithstanding anything contained in these Terms of Use, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event.."
    },
    {
      num: "12.",
      text: "These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India.."
    },
    {
      num: "13.",
      text: "All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in West Champaran, Bihar."
    },
    {
      num: "14.",
      text: "All concerns or communications relating to these Terms must be communicated to us using the contact information provided on this website"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-left">
        
        {/* Breadcrumb / Top Bar */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <span>/</span>
            <span className="text-blue-600">Terms &amp; Conditions</span>
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
                <FileText size={26} />
              </span>
              Terms &amp; Conditions
            </h1>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
              <Calendar size={13} className="text-slate-400" />
              <span><strong>Effective Date:</strong> 28 September 2026</span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-xs">
            <ShieldCheck size={14} className="text-emerald-600" /> Official Terms of Use
          </span>
        </div>

        {/* Content Container */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm">
          
          {/* Paragraph 1 */}
          <div className="flex items-start gap-3">
            <span className="font-bold text-slate-900 mt-0.5">1.</span>
            <p>
              This document is an electronic record in terms of Information Technology Act, 2000 and rules there under as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This electronic record is generated by a computer system and does not require any physical or digital signatures.
            </p>
          </div>

          {/* Paragraph 2 */}
          <div className="flex items-start gap-3">
            <span className="font-bold text-slate-900 mt-0.5">2.</span>
            <p>
              This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of domain name{' '}
              <a href="https://rahulmart.vercel.app/" target="_blank" rel="noreferrer" className="text-blue-600 font-semibold hover:underline">
                https://rahulmart.vercel.app/
              </a>{' '}
              (&apos;Website&apos;), including the related mobile site and mobile application (hereinafter referred to as &apos;Platform&apos;).
            </p>
          </div>

          {/* Paragraph 3 */}
          <div className="flex items-start gap-3">
            <span className="font-bold text-slate-900 mt-0.5">3.</span>
            <p>
              The Platform is owned by <strong>9110176882</strong>, a company incorporated under the Companies Act, 1956 with its registered office at{' '}
              <strong>Sikta bazar, Near SBI Bank, West Champaran, Bihar 845307</strong> (hereinafter referred to as &lsquo;Platform Owner&rsquo;, &apos;we&apos;, &apos;us&apos;, &apos;our&apos;)..
            </p>
          </div>

          {/* Paragraph 4 */}
          <div className="flex items-start gap-3">
            <span className="font-bold text-slate-900 mt-0.5">4.</span>
            <p>
              Your use of the Platform and services and tools are governed by the following terms and conditions (&ldquo;Terms of Use&rdquo;) as applicable to the Platform including the applicable policies which are incorporated herein by way of reference. If You transact on the Platform, You shall be subject to the policies that are applicable to the Platform for such transaction. By mere use of the Platform, You shall be contracting with the Platform Owner and these terms and conditions including the policies constitute Your binding obligations, with Platform Owner. These Terms of Use relate to your use of our website, goods (as applicable) or services (as applicable) (collectively, &apos;Services&apos;). Any terms and conditions proposed by You which are in addition to or which conflict with these Terms of Use are expressly rejected by the Platform Owner and shall be of no force or effect. These Terms of Use can be modified at any time without assigning any reason. It is your responsibility to periodically review these Terms of Use to stay informed of updates..
            </p>
          </div>

          {/* Paragraph 5 */}
          <div className="flex items-start gap-3">
            <span className="font-bold text-slate-900 mt-0.5">5.</span>
            <p>
              For the purpose of these Terms of Use, wherever the context so requires &lsquo;you&rsquo;, &apos;your&apos; or &lsquo;user&rsquo; shall mean any natural or legal person who has agreed to become a user/buyer on the Platform..
            </p>
          </div>

          {/* Paragraph 6 */}
          <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex items-start gap-3 text-amber-900">
            <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wide leading-relaxed">
              6. ACCESSING, BROWSING OR OTHERWISE USING THE PLATFORM INDICATES YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS OF USE, SO PLEASE READ THE TERMS OF USE CAREFULLY BEFORE PROCEEDING..
            </p>
          </div>

          {/* Paragraph 7 */}
          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3">
              <span className="font-bold text-slate-900 mt-0.5">7.</span>
              <p className="font-bold text-slate-900">
                The use of Platform and/or availing of our Services is subject to the following Terms of Use:
              </p>
            </div>

            <div className="space-y-3 pl-4 sm:pl-7">
              {termsList.map((item) => (
                <div 
                  key={item.num}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed hover:bg-slate-50 transition"
                >
                  <span className="font-black text-blue-600 flex-shrink-0 mt-0.5">
                    {item.num}
                  </span>
                  <p className="flex-1">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Contact Box */}
          <div className="space-y-3 pt-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Contact Information
            </h2>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="font-extrabold text-slate-900 text-base">
                Rahul Super Mart / Vishal Telecom
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-600">
                <MapPin size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <span><strong>Registered Office:</strong> Sikta bazar, Near SBI Bank, West Champaran, Bihar – 845307, India</span>
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
