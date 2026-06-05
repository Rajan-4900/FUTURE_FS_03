import ImpactCalculator from "@/components/calculator/ImpactCalculator";

export default function CalculatorPage() {
  return (
    <section className="py-20 px-6 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#34D399] mb-3 block">
            Impact Calculator
          </span>
          <h1 className="font-outfit text-3xl sm:text-4xl font-bold text-white">Estimate Your Savings</h1>
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            See how much fuel cost and carbon dioxide you offset with EVRE.
          </p>
        </div>
        <ImpactCalculator />
      </div>
    </section>
  );
}
