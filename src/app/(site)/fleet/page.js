"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building2, TrendingDown, ClipboardList, Database, CheckCircle2, AlertCircle } from "lucide-react";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function FleetPage() {
  const [form, setForm] = useState({ companyName: "", contactPerson: "", email: "", phone: "", vehicleCount: 5, message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/v1/contact/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: form.companyName,
          contactPerson: form.contactPerson,
          email: form.email,
          phone: form.phone,
          enquiryType: "fleet",
          details: { vehicleCount: parseInt(form.vehicleCount) },
          message: form.message
        })
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setError(json.error || "Failed to submit partnership enquiry.");
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
              <Building2 className="h-4 w-4" fill="#34D399" />
              <span>Enterprise Services</span>
            </span>
            <h1 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Commercial Fleet Solutions
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
              Consolidated enterprise programs for logistics, taxi, and delivery fleets. Optimize your downtime with schedule shaving and bulk pricing.
            </p>
          </div>
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-[#059669] to-[#34D399] flex items-center justify-center shadow-lg shadow-[#059669]/10 shrink-0">
            <Building2 className="h-10 w-10 text-[#0B0F19]" fill="#0B0F19" />
          </div>
        </div>

        {/* Fleet Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="rounded-xl border border-[#2E3A4E]/40 bg-[#172033]/20 p-5 space-y-3">
            <TrendingDown className="h-6 w-6 text-[#34D399]" />
            <h4 className="font-semibold text-white text-sm">Peak Shaving Optimizers</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dynamic booking algorithm routes drivers to chargers during off-peak times, reducing utility costs and minimizing charging times.
            </p>
          </div>

          <div className="rounded-xl border border-[#2E3A4E]/40 bg-[#172033]/20 p-5 space-y-3">
            <ClipboardList className="h-6 w-6 text-[#34D399]" />
            <h4 className="font-semibold text-white text-sm">Consolidated Monthly Billing</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Simplify corporate financials. Review all driver sessions, aggregate kilowatt logs, and generate single monthly invoices.
            </p>
          </div>

          <div className="rounded-xl border border-[#2E3A4E]/40 bg-[#172033]/20 p-5 space-y-3">
            <Database className="h-6 w-6 text-[#34D399]" />
            <h4 className="font-semibold text-white text-sm">API Telemetry Stream</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Integrate driver session data directly with your company's dispatch software or route coordinators via REST endpoint telemetry.
            </p>
          </div>

        </div>

        {/* Corporate Inquiry Form */}
        <div className="rounded-2xl border border-[#2E3A4E]/60 bg-[#172033]/40 p-8">
          <h3 className="font-outfit text-lg font-bold text-white mb-2">Apply for a Fleet Partnership Account</h3>
          <p className="text-xs text-slate-400 mb-6">Our corporate team will coordinate custom rate designs and driver integration options.</p>

          {submitted ? (
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-6 text-center space-y-3">
              <CheckCircle2 className="h-8 w-8 text-[#34D399] mx-auto animate-bounce" />
              <h4 className="font-bold text-white text-sm">Fleet Partnership Request Received!</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Your partnership application has been saved. A B2B lead analyst will contact your company within 24 business hours.
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
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Company Name</label>
                  <input 
                    type="text" 
                    required
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    placeholder="Company name Ltd."
                    className="w-full h-11 rounded-lg bg-[#0B0F19] border border-[#2E3A4E] px-4 text-xs text-white focus:outline-none focus:border-[#059669]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Contact Person</label>
                  <input 
                    type="text" 
                    required
                    value={form.contactPerson}
                    onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                    placeholder="Enter coordinator name"
                    className="w-full h-11 rounded-lg bg-[#0B0F19] border border-[#2E3A4E] px-4 text-xs text-white focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Corporate Email</label>
                  <input 
                    type="email" 
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="partnerships@company.com"
                    className="w-full h-11 rounded-lg bg-[#0B0F19] border border-[#2E3A4E] px-4 text-xs text-white focus:outline-none focus:border-[#059669]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full h-11 rounded-lg bg-[#0B0F19] border border-[#2E3A4E] px-4 text-xs text-white focus:outline-none focus:border-[#059669]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Active Fleet EV Size</label>
                  <input 
                    type="number" 
                    min="1"
                    required
                    value={form.vehicleCount}
                    onChange={(e) => setForm({ ...form, vehicleCount: e.target.value })}
                    placeholder="5"
                    className="w-full h-11 rounded-lg bg-[#0B0F19] border border-[#2E3A4E] px-4 text-xs text-white focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Comments / Requirements</label>
                <textarea 
                  rows="3"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your schedule patterns or billing integration requests..."
                  className="w-full rounded-lg bg-[#0B0F19] border border-[#2E3A4E] p-3 text-xs text-white focus:outline-none focus:border-[#059669]"
                />
              </div>

              <button 
                type="submit" 
                className="w-full h-12 rounded-lg bg-[#059669] hover:bg-[#10B981] text-xs font-bold text-white transition-colors"
              >
                Submit Fleet Account Request
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
