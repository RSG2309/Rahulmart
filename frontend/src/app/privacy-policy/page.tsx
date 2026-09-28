'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Calendar, 
  Lock, 
  Phone, 
  Mail, 
  Globe, 
  MapPin,
  Clock,
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
            <ShieldCheck size={14} className="text-emerald-600" /> Official Policy
          </span>
        </div>

        {/* Content Container */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm">
          
          {/* Introduction */}
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              Introduction
            </h2>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              This Privacy Policy describes how <strong>9110176882</strong> and its affiliates (collectively &quot;9110176882, we, our, us&quot;) collect, use, share, protect or otherwise process your information/ personal data through our website{' '}
              <a href="https://rahulmart.vercel.app/" target="_blank" rel="noreferrer" className="text-blue-600 font-semibold hover:underline">
                https://rahulmart.vercel.app/
              </a>{' '}
              (hereinafter referred to as Platform). Please note that you may be able to browse certain sections of the Platform without registering with us.We do not offer any product/service under this Platform outside India and your personal data will primarily be stored and processed in India. By visiting this Platform, providing your information or availing any product/service offered on the Platform, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use and the applicable service/product terms and conditions, and agree to be governed by the laws of India including but not limited to the laws applicable to data protection and privacy. If you do not agree please do not use or access our Platform.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Collection */}
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              Collection
            </h2>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              We collect your personal data when you use our Platform, services or otherwise interact with us during the course of our relationship.and related information provided from time to time. Some of the information that we may collect includes but is not limited to personal data / information provided to us during sign-up/registering or using our Platform such as name, date of birth, address, telephone/mobile number, email IDand/or any such information shared as proof of identity or address. Some of the sensitive personal data may be collected with your consent, such as your bank account or credit or debit card or other payment instrument information or biometric information such as your facial features or physiological information (in order to enable use of certain features when opted for, available on the Platform) etc all of the above being in accordance with applicable law(s) You always have the option to not provide information, by choosing not to use a particular service or feature on the Platform. We may track your behaviour, preferences, and other information that you choose to provide on our Platform. This information is compiled and analysed on an aggregated basis. We will also collect your information related to your transactions on Platform and such third-party business partner platforms. When such a third-party business partner collects your personal data directly from you, you will be governed by their privacy policies. We shall not be responsible for the third-party business partner’s privacy practices or the content of their privacy policies, and we request you to read their privacy policies prior to disclosing any information. If you receive an email, a call from a person/association claiming to be 9110176882 seeking any personal data like debit/credit card PIN, net-banking or mobile banking password, we request you to never provide such information. If you have already revealed such information, report it immediately to an appropriate law enforcement agency.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Usage */}
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              Usage
            </h2>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              We use personal data to provide the services you request. To the extent we use your personal data to market to you, we will provide you the ability to opt-out of such uses. We use your personal data to assist sellers and business partners in handling and fulfilling orders; enhancing customer experience; to resolve disputes; troubleshoot problems; inform you about online and offline offers, products, services, and updates; customise your experience; detect and protect us against error, fraud and other criminal activity; enforce our terms and conditions; conduct marketing research, analysis and surveys; and as otherwise described to you at the time of collection of information. You understand that your access to these products/services may be affected in the event permission is not provided to us.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Sharing */}
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              Sharing
            </h2>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              We may share your personal data internally within our group entities, our other corporate entities, and affiliates to provide you access to the services and products offered by them. These entities and affiliates may market to you as a result of such sharing unless you explicitly opt-out. We may disclose personal data to third parties such as sellers, business partners, third party service providers including logistics partners, prepaid payment instrument issuers, third-party reward programs and other payment opted by you. These disclosure may be required for us to provide you access to our services and products offered to you, to comply with our legal obligations, to enforce our user agreement, to facilitate our marketing and advertising activities, to prevent, detect, mitigate, and investigate fraudulent or illegal activities related to our services. We may disclose personal and sensitive personal data to government agencies or other authorised law enforcement agencies if required to do so by law or in the good faith belief that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal process. We may disclose personal data to law enforcement offices, third party rights owners, or others in the good faith belief that such disclosure is reasonably necessary to: enforce our Terms of Use or Privacy Policy; respond to claims that an advertisement, posting or other content violates the rights of a third party; or protect the rights, property or personal safety of our users or the general public.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Security Precautions */}
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              Security Precautions
            </h2>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              To protect your personal data from unauthorised access or disclosure, loss or misuse we adopt reasonable security practices and procedures. Once your information is in our possession or whenever you access your account information, we adhere to our security guidelines to protect it against unauthorised access and offer the use of a secure server. However, the transmission of information is not completely secure for reasons beyond our control. By using the Platform, the users accept the security implications of data transmission over the internet and the World Wide Web which cannot always be guaranteed as completely secure, and therefore, there would always remain certain inherent risks regarding use of the Platform. Users are responsible for ensuring the protection of login and password records for their account.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Data Deletion and Retention */}
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              Data Deletion and Retention
            </h2>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              You have an option to delete your account by visiting your profile and settings on our Platform , this action would result in you losing all information related to your account. You may also write to us at the contact information provided below to assist you with these requests. We may in event of any pending grievance, claims, pending shipments or any other services we may refuse or delay deletion of the account. Once the account is deleted, you will lose access to the account. We retain your personal data information for a period no longer than is required for the purpose for which it was collected or as required under any applicable law. However, we may retain data related to you if we believe it may be necessary to prevent fraud or future abuse or for other legitimate purposes. We may continue to retain your data in anonymised form for analytical and research purposes.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Your Rights */}
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              Your Rights
            </h2>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              You may access, rectify, and update your personal data directly through the functionalities provided on the Platform.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Consent */}
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              Consent
            </h2>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              By visiting our Platform or by providing your information, you consent to the collection, use, storage, disclosure and otherwise processing of your information on the Platform in accordance with this Privacy Policy. If you disclose to us any personal data relating to other people, you represent that you have the authority to do so and permit us to use the information in accordance with this Privacy Policy. You, while providing your personal data over the Platform or any partner platforms or establishments, consent to us (including our other corporate entities, affiliates, lending partners, technology partners, marketing channels, business partners and other third parties) to contact you through SMS, instant messaging apps, call and/or e-mail for the purposes specified in this Privacy Policy. You have an option to withdraw your consent that you have already provided by writing to the Grievance Officer at the contact information provided below. Please mention “Withdrawal of consent for processing personal data” in your subject line of your communication. We may verify such requests before acting on our request. However, please note that your withdrawal of consent will not be retrospective and will be in accordance with the Terms of Use, this Privacy Policy, and applicable laws. In the event you withdraw consent given to us under this Privacy Policy, we reserve the right to restrict or deny the provision of our services for which we consider such information to be necessary.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Changes to this Privacy Policy */}
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              Changes to this Privacy Policy
            </h2>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              Please check our Privacy Policy periodically for changes. We may update this Privacy Policy to reflect changes to our information practices. We may alert / notify you about the significant changes to the Privacy Policy, in the manner as may be required under applicable laws.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Grievance Officer & Contact Us */}
          <div className="space-y-3 pt-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Grievance Officer
            </h2>
            
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-3">
              <div className="font-extrabold text-slate-900 text-base uppercase">
                RINKI DEVI
              </div>
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                OWNER
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-600">
                <MapPin size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <span>RINKI DEVI, WARD 03, NEAR SBI BANK, PO SIKTA, WEST CHAMPARAN BIHAR, 845307</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <Phone size={16} className="text-emerald-600 flex-shrink-0" />
                <span><strong>Contact us:</strong> +91 8210302931</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <Clock size={16} className="text-slate-400 flex-shrink-0" />
                <span><strong>Phone Time:</strong> Monday - Friday (9:00 - 18:00)</span>
              </div>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
