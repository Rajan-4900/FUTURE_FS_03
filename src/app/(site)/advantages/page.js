import { ShieldCheck, Timer, Leaf } from "lucide-react";

const ADVANTAGES = [
  {
    icon: ShieldCheck,
    iconBg: "bg-[#059669]/10 border-[#059669]/30 text-[#34D399]",
    title: "Guaranteed Bay Reservations",
    description:
      "Pre-book your exact bay time slot through our dashboard or mobile app. Say goodbye to long charger queues.",
  },
  {
    icon: Timer,
    iconBg: "bg-[#06B6D4]/10 border-[#06B6D4]/30 text-[#06B6D4]",
    title: "Blazing Charging Speeds",
    description:
      "Our dynamic grid load-sharing modules deliver high power (up to 350kW per bay) even when stations are fully loaded.",
  },
  {
    icon: Leaf,
    iconBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    title: "100% Verified Renewable Energy",
    description:
      "Every electron is backed by verified Renewable Energy Certificates (RECs) and our on-site micro-grid solar canopies.",
  },
];

export default function AdvantagesPage() {
  return (
    <section className="py-20 bg-[#172033]/20 px-6 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#34D399] mb-3 block">Why EVRE</span>
          <h1 className="font-outfit text-3xl sm:text-4xl font-bold text-white">The Clean Infrastructure Standard</h1>
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            Discover what sets EVRE apart from conventional charging networks.
          </p>
        </div>

        <div className="space-y-8">
          {ADVANTAGES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex gap-4 rounded-2xl border border-[#2E3A4E]/50 bg-[#172033]/30 p-6">
                <div className={`mt-1 h-10 w-10 shrink-0 rounded border flex items-center justify-center ${item.iconBg}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white mb-2">{item.title}</h2>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
