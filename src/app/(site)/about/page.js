import { CheckCircle2 } from "lucide-react";
import { GALLERY_ITEMS } from "@/data/content";

export default function AboutPage() {
  return (
    <>
      <section className="py-20 bg-[#172033]/20 border-b border-[#2E3A4E]/20 px-6 sm:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#059669] to-[#06B6D4] opacity-20 blur-2xl rounded-2xl" />
            <div className="relative rounded-2xl border border-[#2E3A4E] bg-[#172033] p-8 max-w-sm w-full shadow-lg">
              <div className="absolute top-4 right-4 text-xs font-bold text-[#34D399] tracking-wider uppercase">
                Hub Statistics
              </div>
              <div className="space-y-6 mt-4">
                <div>
                  <div className="text-3xl font-bold font-outfit text-white">100%</div>
                  <div className="text-xs text-slate-400 mt-1">Solar & Wind Grid Energy Source</div>
                </div>
                <div className="border-t border-[#2E3A4E] pt-6">
                  <div className="text-3xl font-bold font-outfit text-white">99.98%</div>
                  <div className="text-xs text-slate-400 mt-1">Verified Charger Uptime Rating</div>
                </div>
                <div className="border-t border-[#2E3A4E] pt-6">
                  <div className="text-3xl font-bold font-outfit text-white">&lt; 15 min</div>
                  <div className="text-xs text-slate-400 mt-1">Average Charge Session to 80%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#34D399] mb-3">Who We Are</span>
            <h1 className="font-outfit text-3xl sm:text-4xl font-bold text-white mb-6">
              Green Infrastructure Reimagined for People
            </h1>
            <p className="text-slate-300 leading-relaxed mb-6">
              At EVRE Charging Hub, we believe that transition to clean transport shouldn&apos;t mean sacrificing comfort. Founded with the mission to eliminate charging downtime anxiety, we configure our sites in convenient highway and metropolitan sectors.
            </p>
            <p className="text-slate-300 leading-relaxed mb-6">
              We design physical lounge centers directly attached to our high-voltage infrastructure. While your vehicle is plugged into our advanced liquid-cooled terminal systems, you can relax, finish remote tasks, or grab custom food offerings in a secure climate-controlled workspace.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {[
                "Renewable Green Energy Grid",
                "ISO 15118 Plug-and-Charge",
                "Guaranteed Bay Bookings",
                "Heated & Cooled Workspaces",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="h-5 w-5 text-[#34D399]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#34D399] mb-3 block">Inside the Hubs</span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-bold text-white">Visual Gallery Showcase</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.title}
                className="group relative h-64 rounded-2xl border border-[#2E3A4E] overflow-hidden bg-slate-900"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${item.tagColor}`}>
                    {item.tag}
                  </span>
                  <h3 className="text-sm font-semibold text-white mt-1.5">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
