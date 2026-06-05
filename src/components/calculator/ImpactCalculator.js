"use client";

import { useState } from "react";

export default function ImpactCalculator() {
  const [weeklyMiles, setWeeklyMiles] = useState(150);

  const electricCostPerMile = 0.04;
  const gasCostPerMile = 0.15;
  const gasCo2PerMile = 0.404;
  const greenMultiplier = 0.02;

  const monthlyGasCost = weeklyMiles * 4 * gasCostPerMile;
  const monthlyElectricCost = weeklyMiles * 4 * electricCostPerMile;
  const monthlySavings = monthlyGasCost - monthlyElectricCost;
  const monthlyCo2Saved = weeklyMiles * 4 * gasCo2PerMile - weeklyMiles * 4 * greenMultiplier;

  return (
    <div className="rounded-2xl border border-[#2E3A4E] bg-[#172033] p-8 shadow-xl">
      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-xs text-slate-300">
          <span>Weekly Mileage</span>
          <span className="font-bold text-[#34D399] text-sm">{weeklyMiles} miles</span>
        </div>
        <input
          type="range"
          min="50"
          max="1000"
          step="50"
          value={weeklyMiles}
          onChange={(e) => setWeeklyMiles(Number(e.target.value))}
          className="w-full h-2 rounded bg-[#0B0F19] appearance-none cursor-pointer accent-[#059669]"
        />
        <div className="flex justify-between text-[10px] text-slate-500">
          <span>50 miles</span>
          <span>500 miles</span>
          <span>1,000 miles</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[#2E3A4E]/60 bg-[#0B0F19]/40 p-6 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
            Monthly Cost Savings
          </span>
          <div className="text-3xl font-bold font-outfit text-white mt-2">${monthlySavings.toFixed(0)}</div>
          <span className="text-[9px] text-slate-500 block mt-1">Compared to average fuel vehicle</span>
        </div>

        <div className="rounded-xl border border-[#2E3A4E]/60 bg-[#0B0F19]/40 p-6 text-center">
          <span className="text-[10px] font-bold text-[#34D399] uppercase tracking-wide">
            CO2 Offsets Generated
          </span>
          <div className="text-3xl font-bold font-outfit text-[#34D399] mt-2">
            {monthlyCo2Saved.toFixed(0)} kg
          </div>
          <span className="text-[9px] text-slate-500 block mt-1">Clean green grid conversion rate</span>
        </div>
      </div>
    </div>
  );
}
