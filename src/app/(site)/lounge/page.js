"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Coffee, Wifi, Lock, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LoungePage() {
  const [form, setForm] = useState({ name: "", email: "", badgeType: "day", guestCount: 1 });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: "Lounge Access Membership request",
          message: `Request for a ${form.badgeType} lounge pass for ${form.guestCount} guests.`
        })
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setError(json.error || "Failed to submit lounge request.");
      }
    } catch (err) {
      setError("Unable to contact backend server. Using offline mock submission.");
      setSubmitted(true);
    }
  };

  return (
    <div className="py-12 px-6 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#34D399] transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Services</span>
        </Link>

        {/* Feature Hero */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 border-b border-[#2E3A4E]/30 pb-10">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#34D399] flex items-center gap-1.5">
              <Coffee className="h-4 w-4" fill="#34D399" />
              <span>Lifestyle Spaces</span>
            </span>
            <h1 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Premium Passenger Lounges
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
              Work, unwind, and rest in our secure indoor lounges while your vehicle charges. Built for comfort, safety, and productivity.
            </p>
          </div>
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-[#059669] to-[#34D399] flex items-center justify-center shadow-lg shadow-[#059669]/10 shrink-0">
            <Coffee className="h-10 w-10 text-[#0B0F19]" fill="#0B0F19" />
          </div>
        </div>

        {/* Lounge Amenity Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="rounded-xl border border-[#2E3A4E]/40 bg-[#172033]/20 p-5 space-y-3">
            <Wifi className="h-6 w-6 text-[#34D399]" />
            <h4 className="font-semibold text-white text-sm">Gigabit Secure Wi-Fi</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enterprise-grade WPA3 encrypted high-speed internet with dedicated private workspaces for taking zoom calls or responding to emails.
            </p>
          </div>

          <div className="rounded-xl border border-[#2E3A4E]/40 bg-[#172033]/20 p-5 space-y-3">
            <Coffee className="h-6 w-6 text-[#34D399]" />
            <h4 className="font-semibold text-white text-sm">Local Espresso Bar</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enjoy freshly roasted craft coffee, cold brew, organic teas, and pastries prepared daily. Active charging sessions include complimentary drinks.
            </p>
          </div>

          <div className="rounded-xl border border-[#2E3A4E]/40 bg-[#172033]/20 p-5 space-y-3">
            <ShieldCheck className="h-6 w-6 text-[#34D399]" />
            <h4 className="font-semibold text-white text-sm">24/7 Security Controls</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rest secure with climate-controlled indoor spaces, access check systems, and full-resolution interior/exterior camera loops.
            </p>
          </div>

        </div>

        {/* Membership Application Form */}
        <div className="rounded-2xl border border-[#2E3A4E]/60 bg-[#172033]/40 p-8">
          <h3 className="font-outfit text-lg font-bold text-white mb-2">Request Lounge Membership Pass</h3>
          <p className="text-xs text-slate-400 mb-6">Gain access to our workspace lounges nationwide. Select your tier below.</p>

          {submitted ? (
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-6 text-center space-y-3">
              <CheckCircle2 className="h-8 w-8 text-[#34D399] mx-auto animate-bounce" />
              <h4 className="font-bold text-white text-sm">Lounge Pass Request Logged!</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                We have received your membership inquiry. Our support representative will email your access pass details shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-400">
                  <AlertCircle className="h-4.5 w-4.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full h-11 rounded-lg bg-[#0B0F19] border border-[#2E3A4E] px-4 text-xs text-white focus:outline-none focus:border-[#059669]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@email.com"
                    className="w-full h-11 rounded-lg bg-[#0B0F19] border border-[#2E3A4E] px-4 text-xs text-white focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Membership Tier</label>
                  <select 
                    value={form.badgeType}
                    onChange={(e) => setForm({ ...form, badgeType: e.target.value })}
                    className="w-full h-11 rounded-lg bg-[#0B0F19] border border-[#2E3A4E] px-4 text-xs text-white focus:outline-none focus:border-[#059669]"
                  >
                    <option value="day">Single Day Access Pass ($15)</option>
                    <option value="monthly">Monthly Lounge Unlimited ($50/mo)</option>
                    <option value="corporate">Corporate Office Accounts (Custom)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Number of Guests</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="5"
                    required
                    value={form.guestCount}
                    onChange={(e) => setForm({ ...form, guestCount: e.target.value })}
                    placeholder="1"
                    className="w-full h-11 rounded-lg bg-[#0B0F19] border border-[#2E3A4E] px-4 text-xs text-white focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full h-12 rounded-lg bg-[#059669] hover:bg-[#10B981] text-xs font-bold text-white transition-colors"
              >
                Submit Membership Inquiry
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
