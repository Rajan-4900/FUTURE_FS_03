"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ContactForm() {
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "fleet", message: "" });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          subject: contactForm.subject,
          message: contactForm.message,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setContactSubmitted(true);
        setTimeout(() => {
          setContactSubmitted(false);
          setContactForm({ name: "", email: "", subject: "fleet", message: "" });
        }, 5000);
      } else {
        setError(json.error || "Failed to submit enquiry.");
      }
    } catch {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactForm({ name: "", email: "", subject: "fleet", message: "" });
      }, 5000);
    }
  };

  if (contactSubmitted) {
    return (
      <div className="flex flex-col items-center text-center py-10">
        <div className="h-12 w-12 rounded-full bg-[#34D399]/10 border border-[#34D399]/30 flex items-center justify-center text-[#34D399] mb-4">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h2 className="font-outfit text-xl font-bold text-white mb-2">Enquiry Received</h2>
        <p className="text-xs text-slate-400 max-w-sm">
          Thank you for contacting EVRE. Our sales and support coordinators will review your submission and reply within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleContactSubmit} className="space-y-6">
      {error && <p className="text-xs text-rose-400">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Name</label>
          <input
            type="text"
            required
            value={contactForm.name}
            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
            className="w-full h-11 rounded-lg bg-[#0B0F19] border border-[#2E3A4E] px-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#059669]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Email Address</label>
          <input
            type="email"
            required
            value={contactForm.email}
            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
            className="w-full h-11 rounded-lg bg-[#0B0F19] border border-[#2E3A4E] px-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#059669]"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Enquiry Topic</label>
        <select
          value={contactForm.subject}
          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
          className="w-full h-11 rounded-lg bg-[#0B0F19] border border-[#2E3A4E] px-4 text-xs text-white focus:outline-none focus:border-[#059669]"
        >
          <option value="fleet">B2B Commercial Fleet Accounts</option>
          <option value="host">Become a Charging Hub Host Partner</option>
          <option value="support">Technical Support / Helpdesk</option>
          <option value="general">General Enquiries</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Your Message</label>
        <textarea
          required
          rows="4"
          value={contactForm.message}
          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
          className="w-full rounded-lg bg-[#0B0F19] border border-[#2E3A4E] p-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#059669]"
          placeholder="Please describe your interest..."
        />
      </div>
      <button
        type="submit"
        className="w-full h-12 rounded-lg bg-[#059669] hover:bg-[#10B981] text-xs font-bold text-white transition-colors"
      >
        Submit Enquiry
      </button>
    </form>
  );
}
