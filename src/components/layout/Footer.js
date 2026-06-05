"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Zap, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [globalCarbonCounter, setGlobalCarbonCounter] = useState(1429482);
  const [emailInput, setEmailInput] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalCarbonCounter((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!emailInput) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterSubscribed(false);
      setEmailInput("");
    }, 4000);
  };

  return (
    <footer className="bg-[#0B0F19] border-t border-[#2E3A4E]/60 text-slate-400 text-xs mt-auto">
      <div className="bg-[#172033]/40 border-b border-[#2E3A4E]/40 py-4 px-6 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px]">
            Global Net Impact: EVRE Drivers Have Saved
          </span>
          <div className="inline-flex items-center gap-1 bg-black border border-[#2E3A4E] rounded px-3 py-1 font-mono text-sm text-[#34D399] font-bold shadow-inner">
            {globalCarbonCounter.toLocaleString()}{" "}
            <span className="text-[10px] text-slate-500 font-normal">kg CO₂</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#059669] to-[#34D399]">
              <Zap className="h-5 w-5 text-[#0B0F19]" fill="#0B0F19" />
            </div>
            <span className="font-outfit text-lg font-bold text-white">EVRE</span>
          </div>
          <p className="text-slate-500 leading-relaxed">
            Accelerating green transport infrastructure. Sourcing 100% renewable power to keep your vehicles charged and commuters comfortable.
          </p>
        </div>

        <div className="md:col-span-2 space-y-3">
          <h5 className="font-bold text-white uppercase tracking-wider text-[10px]">Locations</h5>
          <ul className="space-y-2 text-slate-500">
            <li><Link href="/locator" className="hover:text-white">Los Angeles Lounge</Link></li>
            <li><Link href="/locator" className="hover:text-white">Seattle Waterfront</Link></li>
            <li><Link href="/locator" className="hover:text-white">San Francisco HQ</Link></li>
            <li><Link href="/locator" className="hover:text-white">New York Soho</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-3">
          <h5 className="font-bold text-white uppercase tracking-wider text-[10px]">Partnership</h5>
          <ul className="space-y-2 text-slate-500">
            <li><Link href="/contact" className="hover:text-white">Host a Hub</Link></li>
            <li><Link href="/fleet" className="hover:text-white">Fleet Programs</Link></li>
            <li><Link href="/advantages" className="hover:text-white">Tax Incentives</Link></li>
            <li><Link href="/advantages" className="hover:text-white">CO2 Badges</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4 space-y-4">
          <h5 className="font-bold text-white uppercase tracking-wider text-[10px]">Newsletter</h5>
          <p className="text-slate-500 leading-relaxed">
            Get the latest station launches and EV charging discounts.
          </p>

          {newsletterSubscribed ? (
            <div className="text-[#34D399] font-medium text-[11px] flex items-center gap-1.5 py-1">
              <CheckCircle2 className="h-4 w-4" />
              <span>Subscription confirmed!</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="flex-1 h-9 rounded bg-[#172033] border border-[#2E3A4E] px-3 text-[11px] text-white focus:outline-none focus:border-[#059669]"
              />
              <button
                type="submit"
                className="h-9 px-4 rounded bg-[#059669] hover:bg-[#10B981] text-[11px] font-bold text-white transition-colors"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-[#2E3A4E]/40 py-6 text-center text-slate-600 px-6">
        <p>© 2026 EVRE Charging Hubs Inc. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
