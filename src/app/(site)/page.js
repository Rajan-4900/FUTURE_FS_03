import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Coffee, Building2, ShieldCheck, Calculator, Star, Mail } from "lucide-react";
import StationFinder from "@/components/locator/StationFinder";

const FEATURE_LINKS = [
  { href: "/about", label: "About", icon: Zap, color: "text-[#34D399]" },
  { href: "/services", label: "Services", icon: Coffee, color: "text-[#06B6D4]" },
  { href: "/advantages", label: "Advantages", icon: ShieldCheck, color: "text-emerald-400" },
  { href: "/calculator", label: "Impact Calculator", icon: Calculator, color: "text-amber-400" },
  { href: "/reviews", label: "Reviews", icon: Star, color: "text-amber-300" },
  { href: "/contact", label: "Contact", icon: Mail, color: "text-[#34D399]" },
];

export default function Home() {
  return (
    <>
      <section className="relative py-20 lg:py-32 px-6 sm:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-[#022C22]/30 blur-[130px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-[#06B6D4]/10 blur-[120px] -translate-x-1/4 translate-y-1/4" />

        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2E3A4E] bg-[#172033]/40 px-3.5 py-1.5 text-xs font-semibold text-[#34D399] mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Introducing Guaranteed Pre-Bookings</span>
            </div>

            <h1 className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              Charge your car.
              <br />
              <span className="bg-gradient-to-r from-[#34D399] to-[#06B6D4] bg-clip-text text-transparent">
                Recharge yourself.
              </span>
            </h1>

            <p className="text-lg text-slate-300 max-w-xl mb-8 leading-relaxed">
              Experience ultra-fast 350kW charging powered by 100% green energy. Unwind in our premium passenger lounges featuring workstations, secure Wi-Fi, and gourmet coffee.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
              <Link
                href="/locator"
                prefetch
                className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#059669] to-[#34D399] px-8 py-4 text-sm font-bold text-[#0B0F19] hover:from-[#10B981] hover:to-[#34D399] transition-all duration-300 shadow-lg shadow-[#059669]/20"
              >
                <span>Find a Charger</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/lounge"
                prefetch
                className="flex items-center justify-center gap-2 rounded-full border border-[#2E3A4E] hover:border-[#34D399] hover:bg-[#172033]/40 px-8 py-4 text-sm font-semibold text-white transition-all duration-300"
              >
                <span>Explore Lounge Options</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xl">
              {FEATURE_LINKS.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Link
                    key={feature.href}
                    href={feature.href}
                    prefetch
                    className="flex items-center gap-2 rounded-xl border border-[#2E3A4E]/50 bg-[#172033]/30 px-4 py-3 text-xs font-semibold text-slate-300 hover:border-[#34D399] hover:text-white transition-all"
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${feature.color}`} />
                    <span>{feature.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5">
            <StationFinder />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 sm:px-8 border-t border-[#2E3A4E]/20 bg-[#172033]/20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/charging" prefetch className="rounded-2xl border border-[#2E3A4E]/50 bg-[#172033]/30 p-6 hover:border-[#34D399] transition-all group">
            <Zap className="h-8 w-8 text-[#34D399] mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="font-outfit text-lg font-semibold text-white mb-2">Ultra-Fast Charging</h2>
            <p className="text-xs text-slate-400">350kW DC ports with NACS, CCS, and Type 2 compatibility.</p>
          </Link>
          <Link href="/lounge" prefetch className="rounded-2xl border border-[#2E3A4E]/50 bg-[#172033]/30 p-6 hover:border-[#06B6D4] transition-all group">
            <Coffee className="h-8 w-8 text-[#06B6D4] mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="font-outfit text-lg font-semibold text-white mb-2">Premium Lounges</h2>
            <p className="text-xs text-slate-400">Wi-Fi, workstations, espresso bar, and 24/7 security.</p>
          </Link>
          <Link href="/fleet" prefetch className="rounded-2xl border border-[#2E3A4E]/50 bg-[#172033]/30 p-6 hover:border-amber-500 transition-all group">
            <Building2 className="h-8 w-8 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="font-outfit text-lg font-semibold text-white mb-2">Fleet Solutions</h2>
            <p className="text-xs text-slate-400">Consolidated billing and schedule shaving for commercial fleets.</p>
          </Link>
        </div>
      </section>
    </>
  );
}
