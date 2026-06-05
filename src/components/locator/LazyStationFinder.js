"use client";

import dynamic from "next/dynamic";

const StationFinder = dynamic(() => import("./StationFinder"), {
  loading: () => (
    <div className="rounded-2xl border border-[#2E3A4E]/60 bg-[#172033]/50 p-6 h-[420px] animate-pulse" />
  ),
  ssr: false,
});

export default StationFinder;
