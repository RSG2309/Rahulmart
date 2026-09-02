'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { KeyRound, AlertCircle, CheckCircle2, ArrowRight, ShieldCheck, Clock, Eye, EyeOff, RefreshCw, XCircle } from 'lucide-react';
import { api } from '@/services/api';

export default function ForgotPassword() {
  const router = useRouter();
  
  const [mobile, setMobile] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // States
  const [submitted, setSubmitted] = useState(false);
  const [requestStatus, setRequestStatus] = useState<'pending' | 'approved' | 'rejected' | null>(null);
  const [adminNotes, setAdminNotes] = useState<string | null>(null);
  
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (newPassword !== confirmPassword) {
      setErrorMsg('New password and confirm password do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const data = await api.post('/auth/forgot-password-request', { mobile, newPassword });
      setLoading(false);

      if (data.success) {
        setSubmitted(true);
        setRequestStatus('pending');
        setSuccessMsg(data.message || 'Password reset request submitted. Awaiting Admin Approval.');
      } else {
        setErrorMsg(data.message || 'Mobile number is not registered.');
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg('Failed to connect to backend server.');
    }
  };

  const handleCheckStatus = async () => {
    if (!mobile.trim()) {
      setErrorMsg('Please enter your mobile number first.');
      return;
    }

    setCheckingStatus(true);
    setErrorMsg(null);

    try {
      const data = await api.get(`/auth/forgot-password-status?mobile=${encodeURIComponent(mobile.trim())}`);
      setCheckingStatus(false);

      if (data.success && data.hasRequest) {
        setSubmitted(true);
        setRequestStatus(data.request.status);
        setAdminNotes(data.request.adminNotes || null);

        if (data.request.status === 'approved') {
          setSuccessMsg('Your password reset request has been APPROVED by Admin! You can now log in with your new password.');
        } else if (data.request.status === 'rejected') {
          setErrorMsg(`Your request was rejected by Admin: ${data.request.adminNotes || 'Contact support'}`);
        } else {
          setSuccessMsg('Your request is currently PENDING approval from Admin.');
        }
      } else {
        setErrorMsg('No password reset request found for this mobile number.');
      }
    } catch (err: any) {
      setCheckingStatus(false);
      setErrorMsg('Failed to check request status.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 glassmorphism p-8 rounded-3xl shadow-xl border border-white relative overflow-hidden">
        
        {/* Header Title */}
        <div className="text-center">
          <Link href="/" className="text-2xl font-black gradient-text tracking-wide">
            Rahul Super Mart
          </Link>
          <h2 className="mt-4 text-2xl font-extrabold text-slate-900">
            Recover Password
          </h2>
          <p className="mt-1.5 text-xs text-slate-500">
            Admin Approval required for account security & wallet safety
          </p>
        </div>

        {/* Message Banner */}
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-xl text-xs font-medium flex items-center gap-2">
            <AlertCircle size={16} className="flex-shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 size={16} className="flex-shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Status Card (When Request is Submitted or Found) */}
        {submitted && (
          <div className="space-y-4">
            <div className={`p-5 rounded-2xl border text-left space-y-3 ${
              requestStatus === 'approved'
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                : requestStatus === 'rejected'
                ? 'bg-rose-50/80 border-rose-200 text-rose-950'
                : 'bg-amber-50/80 border-amber-200 text-amber-950'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {requestStatus === 'approved' ? (
                    <CheckCircle2 size={18} className="text-emerald-600" />
                  ) : requestStatus === 'rejected' ? (
                    <XCircle size={18} className="text-rose-600" />
                  ) : (
                    <Clock size={18} className="text-amber-600 animate-pulse" />
                  )}
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {requestStatus === 'approved' ? 'Request Approved' : requestStatus === 'rejected' ? 'Request Rejected' : 'Awaiting Admin Approval'}
                  </span>
                </div>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                  requestStatus === 'approved'
                    ? 'bg-emerald-200 text-emerald-800'
                    : requestStatus === 'rejected'
                    ? 'bg-rose-200 text-rose-800'
                    : 'bg-amber-200 text-amber-800'
                }`}>
                  {requestStatus}
                </span>
              </div>

              <p className="text-xs leading-relaxed text-slate-600">
                {requestStatus === 'approved' ? (
                  <>Admin has approved your password reset. Your new password is now active!</>
                ) : requestStatus === 'rejected' ? (
                  <>Admin rejected this password reset request. {adminNotes && `Reason: ${adminNotes}`}</>
                ) : (
                  <>Aapka password reset request admin portal par approval ke liye bhej diya gaya hai. Admin approve karega tabhi password change hoga.</>
                )}
              </p>

              <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/50 flex justify-between items-center">
                <span>Mobile: <strong className="text-slate-800">{mobile}</strong></span>
                <button
                  type="button"
                  onClick={handleCheckStatus}
                  disabled={checkingStatus}
                  className="inline-flex items-center gap-1 text-[#2874f0] hover:underline font-bold"
                >
                  <RefreshCw size={12} className={checkingStatus ? "animate-spin" : ""} /> Check Status
                </button>
              </div>
            </div>

            {requestStatus === 'approved' ? (
              <Link
                href="/auth/login"
                className="w-full bg-[#2874f0] hover:bg-blue-600 text-white py-2.5 rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-1.5 text-center"
              >
                Sign In With New Password <ArrowRight size={14} />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setRequestStatus(null);
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl font-semibold text-xs transition"
              >
                Modify or Submit Another Request
              </button>
            )}
          </div>
        )}

        {/* Request Form (Visible when not submitted) */}
        {!submitted && (
          <form className="mt-4 space-y-4 text-left" onSubmit={handleSubmitRequest}>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase">Registered Mobile Number</label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="e.g. 9888888888"
                className="w-full bg-white/70 border border-slate-200 text-slate-900 rounded-lg px-3.5 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* New Password with Eye visibility toggle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase">New Password</label>
              <div className="relative mt-1">
                <input
                  type={showNewPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 6 characters)"
                  className="w-full bg-white/70 border border-slate-200 text-slate-900 rounded-lg pl-3.5 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm New Password with Eye visibility toggle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase">Confirm New Password</label>
              <div className="relative mt-1">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full bg-white/70 border border-slate-200 text-slate-900 rounded-lg pl-3.5 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2874f0] hover:bg-blue-600 text-white py-2.5 rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-1.5"
              >
                {loading ? 'Submitting Request...' : 'Submit For Admin Approval'} <ShieldCheck size={16} />
              </button>

              <button
                type="button"
                onClick={handleCheckStatus}
                disabled={checkingStatus}
                className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-2 rounded-xl font-semibold text-xs transition flex items-center justify-center gap-1.5"
              >
                <RefreshCw size={13} className={checkingStatus ? "animate-spin" : ""} /> Check Previous Request Status
              </button>
            </div>
          </form>
        )}

        {/* Footer redirection */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">
            Remembered password?{' '}
            <Link href="/auth/login" className="font-bold text-[#2874f0] hover:underline">
              Back to Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
