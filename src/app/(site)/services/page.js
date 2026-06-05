import Link from "next/link";
import { Zap, Coffee, Building2, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    href: "/charging",
    icon: Zap,
    iconBg: "bg-[#059669]/10 border-[#059669]/30 text-[#34D399]",
    hoverBorder: "hover:border-[#34D399]",
    linkColor: "text-[#34D399]",
    title: "Ultra-Fast DC Charging",
    description:
      "Connect your vehicle to our liquid-cooled 350kW charging ports. Compatible with NACS (Tesla), CCS, and Type 2 connectors for fast energy transfers.",
    cta: "Book a charging session",
  },
  {
    href: "/lounge",
    icon: Coffee,
    iconBg: "bg-[#06B6D4]/10 border-[#06B6D4]/30 text-[#06B6D4]",
    hoverBorder: "hover:border-[#06B6D4]",
    linkColor: "text-[#06B6D4]",
    title: "Premium Passenger Lounges",
    description:
      "Avoid sitting in dark parking lots. Our secure indoor lounges feature high-speed Wi-Fi, work desks, local coffee, clean restrooms, and 24/7 security.",
    cta: "Explore lounge amenities",
  },
  {
    href: "/fleet",
    icon: Building2,
    iconBg: "bg-amber-500/10 border-amber-500/30 text-amber-500",
    hoverBorder: "hover:border-amber-500",
    linkColor: "text-amber-500",
    title: "Commercial Fleet Solutions",
    description:
      "Customized business platforms for taxi, logistics, and delivery fleets. Access peak schedule shaving, consolidated monthly billing, and driver telemetry API integration.",
    cta: "Contact corporate team",
  },
];

export default function ServicesPage() {
  return (
    <section className="py-20 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#34D399] mb-3 block">What We Offer</span>
        <h1 className="font-outfit text-3xl sm:text-4xl font-bold text-white">EVRE Premium Charging Verticals</h1>
        <p className="text-slate-400 max-w-xl mx-auto mt-4 text-sm sm:text-base">
          Structured solutions for personal transport, daily commuters, and enterprise logistics networks.
        </p>
      </div>

      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className={`rounded-2xl border border-[#2E3A4E]/50 bg-[#172033]/30 p-8 ${service.hoverBorder} transition-all duration-300 group flex flex-col justify-between`}
            >
              <div>
                <div
                  className={`h-12 w-12 rounded-xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${service.iconBg}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="font-outfit text-xl font-semibold text-white mb-3">{service.title}</h2>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">{service.description}</p>
              </div>
              <Link
                href={service.href}
                prefetch
                className={`inline-flex items-center gap-2 text-xs font-bold hover:underline ${service.linkColor}`}
              >
                <span>{service.cta}</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
