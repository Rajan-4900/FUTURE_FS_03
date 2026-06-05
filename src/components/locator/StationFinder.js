"use client";

import { useState } from "react";
import { MapPin, Search, Zap } from "lucide-react";
import { MOCK_STATIONS } from "@/data/content";

export default function StationFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedStations, setSearchedStations] = useState(MOCK_STATIONS.default);
  const [hasSearched, setHasSearched] = useState(false);
  const [viewMode, setViewMode] = useState("list");

  const zoom = 13;
  const centerStation = searchedStations[0] || { lat: 37.4275, lon: -122.1697 };
  const latRad = (centerStation.lat * Math.PI) / 180;

  const centerX = Math.floor(((centerStation.lon + 180) / 360) * Math.pow(2, zoom));
  const centerY = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * Math.pow(2, zoom)
  );

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
  const tilesetId = "mapbox.streets";

  const getTileSrc = (tx, ty) => {
    if (mapboxToken) {
      return `https://api.mapbox.com/v4/${tilesetId}/${zoom}/${tx}/${ty}.png?access_token=${mapboxToken}`;
    }
    return `https://tile.openstreetmap.org/${zoom}/${tx}/${ty}.png`;
  };

  const tileGrid = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      tileGrid.push({ tx: centerX + dx, ty: centerY + dy });
    }
  }

  const getPinOffset = (sLat, sLon) => {
    const sLatRad = (sLat * Math.PI) / 180;
    const fx = ((sLon + 180) / 360) * Math.pow(2, zoom);
    const fy =
      ((1 - Math.log(Math.tan(sLatRad) + 1 / Math.cos(sLatRad)) / Math.PI) / 2) * Math.pow(2, zoom);
    const leftPct = ((fx - (centerX - 1)) / 3) * 100;
    const topPct = ((fy - (centerY - 1)) / 3) * 100;
    return { left: `${leftPct}%`, top: `${topPct}%` };
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().trim();
    if (!query) return;

    if (query.includes("90001") || query.includes("angeles") || query.includes("la")) {
      setSearchedStations(MOCK_STATIONS["90001"]);
    } else if (query.includes("seattle") || query.includes("washington")) {
      setSearchedStations(MOCK_STATIONS.seattle);
    } else {
      setSearchedStations(MOCK_STATIONS.default);
    }
    setHasSearched(true);
  };

  return (
    <div className="rounded-2xl border border-[#2E3A4E]/60 bg-[#172033]/50 p-6 backdrop-blur-xl shadow-xl shadow-black/40">
      <h3 className="font-outfit text-xl font-semibold text-white mb-2">Live Station Finder</h3>
      <p className="text-xs text-slate-400 mb-6">Search near you for active charger slots and lounges</p>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <MapPin className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
          <input
            type="text"
            placeholder="Enter Zip Code or City (e.g. 90001, Seattle)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 rounded-xl bg-[#0B0F19] border border-[#2E3A4E] pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20 transition-all"
          />
        </div>
        <button
          type="submit"
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#059669] hover:bg-[#10B981] text-white transition-colors"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>

      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {hasSearched ? "Search Results" : "Featured Station Networks"}
        </span>
        <div className="flex bg-[#0B0F19] border border-[#2E3A4E] rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 rounded text-[10px] font-bold transition-all ${
              viewMode === "list" ? "bg-[#059669] text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            List
          </button>
          <button
            type="button"
            onClick={() => setViewMode("map")}
            className={`px-3 py-1 rounded text-[10px] font-bold transition-all ${
              viewMode === "map" ? "bg-[#059669] text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Map
          </button>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="space-y-4">
          {searchedStations.map((station, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#2E3A4E]/40 bg-[#0B0F19]/50 p-4 transition-all hover:border-[#2E3A4E]"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-semibold text-white">{station.name}</h4>
                <span className="text-xs font-bold text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded">
                  {station.speed}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3">{station.address}</p>
              <div className="flex justify-between items-center text-xs">
                <div className="flex gap-3 text-slate-400">
                  <span>
                    CCS: <strong className="text-white">{station.ccs}</strong>
                  </span>
                  <span>
                    NACS: <strong className="text-white">{station.nacs}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      station.status.includes("Available")
                        ? "bg-[#34D399]"
                        : station.status.includes("Free")
                          ? "bg-amber-400"
                          : "bg-rose-500"
                    } animate-pulse`}
                  />
                  <span className="text-slate-300 font-medium text-[11px]">{station.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative w-full h-[320px] rounded-xl border border-[#2E3A4E] overflow-hidden bg-[#0B0F19] flex items-center justify-center">
          <div className="relative w-[768px] h-[768px] shrink-0">
            <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
              {tileGrid.map((tile, i) => (
                <img
                  key={i}
                  src={getTileSrc(tile.tx, tile.ty)}
                  alt=""
                  className="w-[256px] h-[256px] object-cover select-none filter brightness-[0.4] contrast-[1.3] saturate-[0.5] invert-[0.9] hue-rotate-[180deg]"
                />
              ))}
            </div>

            {searchedStations.map((station, idx) => {
              const offset = getPinOffset(station.lat, station.lon);
              return (
                <div
                  key={idx}
                  style={{ position: "absolute", left: offset.left, top: offset.top }}
                  className="-translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer"
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute inline-flex h-6 w-6 rounded-full bg-[#34D399] opacity-40 animate-ping" />
                    <div className="relative h-5 w-5 rounded-full bg-[#059669] border border-white flex items-center justify-center shadow-lg shadow-black/80 hover:bg-[#10B981] hover:scale-110 transition-all">
                      <Zap className="h-2.5 w-2.5 text-white" fill="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#172033]/90 border border-[#2E3A4E] text-white px-2.5 py-1 rounded text-[10px] font-bold whitespace-nowrap opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                    <div className="font-outfit">{station.name}</div>
                    <div className="text-[8px] text-slate-400 font-normal mt-0.5">
                      {station.address} • {station.speed}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-2 right-2 bg-[#0B0F19]/80 border border-[#2E3A4E]/60 px-2 py-0.5 rounded text-[8px] text-slate-400 select-none backdrop-blur-sm">
            {mapboxToken ? "© Mapbox" : "© OpenStreetMap"}
          </div>
        </div>
      )}
    </div>
  );
}
