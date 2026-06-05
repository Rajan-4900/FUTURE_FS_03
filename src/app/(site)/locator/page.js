import LazyStationFinder from "@/components/locator/LazyStationFinder";

export default function LocatorPage() {
  return (
    <section className="py-20 px-6 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#34D399] mb-3 block">Station Locator</span>
          <h1 className="font-outfit text-3xl sm:text-4xl font-bold text-white">Find a Charger Near You</h1>
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            Search for active EVRE charging hubs and premium lounges in your area.
          </p>
        </div>
        <LazyStationFinder />
      </div>
    </section>
  );
}
