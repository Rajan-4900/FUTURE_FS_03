"use client";

import { useState } from "react";
import { MapPin, Search, Zap, AlertCircle, Loader2 } from "lucide-react";
import { STATION_REGIONS, SEARCH_HINTS } from "@/data/content";

const TILE_SIZE = 256;
const GRID_SIZE = 3;

function latLonToTile(lat, lon, zoom) {
  const latRad = (lat * Math.PI) / 180;
  const x = ((lon + 180) / 360) * Math.pow(2, zoom);
  const y =
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * Math.pow(2, zoom);
  return { x, y };
}

function getTileUrl(z, x, y, mapboxToken) {
  if (mapboxToken) {
    return `https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/${z}/${x}/${y}?access_token=${mapboxToken}`;
  }
  return `https://basemaps.cartocdn.com/dark_all/${z}/${x}/${y}.png`;
}

export default function StationFinder() {
  const defaultRegion = STATION_REGIONS["bay-area"];
  const [searchQuery, setSearchQuery] = useState("");
  const [regionLabel, setRegionLabel] = useState(defaultRegion.label);
  const [stations, setStations] = useState(defaultRegion.stations);
  const [mapCenter, setMapCenter] = useState(defaultRegion.center);
  const [zoom, setZoom] = useState(defaultRegion.zoom);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState("");
  const [viewMode, setViewMode] = useState("list");

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

  const centerTile = latLonToTile(mapCenter.lat, mapCenter.lon, zoom);
  const centerX = Math.floor(centerTile.x);
  const centerY = Math.floor(centerTile.y);

  const tileGrid = [];
  const half = Math.floor(GRID_SIZE / 2);
  for (let dy = -half; dy <= half; dy++) {
    for (let dx = -half; dx <= half; dx++) {
      tileGrid.push({ tx: centerX + dx, ty: centerY + dy, key: `${centerX + dx}-${centerY + dy}` });
    }
  }

  const getPinOffset = (sLat, sLon) => {
    const point = latLonToTile(sLat, sLon, zoom);
    const gridOriginX = centerX - half;
    const gridOriginY = centerY - half;
    const leftPct = ((point.x - gridOriginX) / GRID_SIZE) * 100;
    const topPct = ((point.y - gridOriginY) / GRID_SIZE) * 100;
    return { left: `${leftPct}%`, top: `${topPct}%` };
  };

  const runSearch = async (query) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    setError("");
    setSearchQuery(trimmed);

    try {
      const res = await fetch(`/api/stations/search?q=${encodeURIComponent(trimmed)}`);
      const json = await res.json();

      if (!json.success) {
        setError(json.error || "No charging stations found for this location.");
        setHasSearched(true);
        return;
      }

      setStations(json.stations);
      setRegionLabel(json.location.label);
      setMapCenter({ lat: json.location.lat, lon: json.location.lon });
      setZoom(json.zoom || 13);
      setDataSource(json.source === "openstreetmap" ? "OpenStreetMap" : "Open Charge Map");
      setHasSearched(true);
    } catch {
      setError("Search failed. Check your internet connection and try again.");
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    runSearch(searchQuery);
  };

  const handleQuickSearch = (hint) => {
    runSearch(hint);
  };

  const mapPixelSize = TILE_SIZE * GRID_SIZE;
  const mapScale = 320 / mapPixelSize;

  return (
    <div className="rounded-2xl border border-[#2E3A4E]/60 bg-[#172033]/50 p-6 backdrop-blur-xl shadow-xl shadow-black/40">
      <h3 className="font-outfit text-xl font-semibold text-white mb-2">Live Station Finder</h3>
      <p className="text-xs text-slate-400 mb-4">
        Search any city, address, or postal code worldwide for real EV charging stations nearby.
      </p>

      <form onSubmit={handleSearch} className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="City, address, or postal code (e.g. 560061, London, Tokyo)"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (error) setError("");
            }}
            className="w-full h-12 rounded-xl bg-[#0B0F19] border border-[#2E3A4E] pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#059669] hover:bg-[#10B981] disabled:opacity-60 text-white transition-colors"
          aria-label="Search stations"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
        </button>
      </form>

      <div className="flex flex-wrap gap-2 mb-6">
        {SEARCH_HINTS.map((hint) => (
          <button
            key={hint}
            type="button"
            disabled={loading}
            onClick={() => handleQuickSearch(hint)}
            className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[#2E3A4E] text-slate-400 hover:border-[#34D399] hover:text-[#34D399] disabled:opacity-50 transition-colors"
          >
            {hint}
          </button>
        ))}
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-lg bg-amber-500/10 border border-amber-500/30 p-3 mb-4 text-xs text-amber-300">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {!error && (
        <>
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                {hasSearched ? "Charging Stations Nearby" : "Featured Station Networks"}
              </span>
              <span className="text-[11px] text-[#34D399] font-medium">{regionLabel}</span>
              {dataSource && hasSearched && (
                <span className="text-[9px] text-slate-500 block mt-0.5">Data: {dataSource}</span>
              )}
            </div>
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

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin text-[#34D399] mb-3" />
              <p className="text-xs">Searching for charging stations...</p>
            </div>
          ) : viewMode === "list" ? (
            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
              {stations.map((station) => (
                <div
                  key={station.id || station.name}
                  className="rounded-xl border border-[#2E3A4E]/40 bg-[#0B0F19]/50 p-4 transition-all hover:border-[#2E3A4E]"
                >
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h4 className="text-sm font-semibold text-white">{station.name}</h4>
                    <span className="text-xs font-bold text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded shrink-0">
                      {station.speed}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">
                    {station.address}
                    {station.distKm != null && (
                      <span className="text-[#34D399] ml-2">• {station.distKm.toFixed(1)} km away</span>
                    )}
                  </p>
                  <div className="flex justify-between items-center text-xs flex-wrap gap-2">
                    <div className="flex gap-3 text-slate-400">
                      {station.ccs > 0 && (
                        <span>
                          CCS: <strong className="text-white">{station.ccs}</strong>
                        </span>
                      )}
                      {station.nacs > 0 && (
                        <span>
                          NACS: <strong className="text-white">{station.nacs}</strong>
                        </span>
                      )}
                      {station.type2 > 0 && (
                        <span>
                          Type 2: <strong className="text-white">{station.type2}</strong>
                        </span>
                      )}
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
            <div className="relative w-full h-[320px] rounded-xl border border-[#2E3A4E] overflow-hidden bg-[#0B0F19]">
              <div
                className="absolute left-1/2 top-1/2 origin-center"
                style={{ transform: `translate(-50%, -50%) scale(${mapScale})` }}
              >
                <div className="relative" style={{ width: mapPixelSize, height: mapPixelSize }}>
                  <div
                    className="grid"
                    style={{
                      gridTemplateColumns: `repeat(${GRID_SIZE}, ${TILE_SIZE}px)`,
                      gridTemplateRows: `repeat(${GRID_SIZE}, ${TILE_SIZE}px)`,
                    }}
                  >
                    {tileGrid.map((tile) => (
                      <img
                        key={tile.key}
                        src={getTileUrl(zoom, tile.tx, tile.ty, mapboxToken)}
                        alt=""
                        width={TILE_SIZE}
                        height={TILE_SIZE}
                        className="block object-cover select-none"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>

                  {stations.map((station) => {
                    const offset = getPinOffset(station.lat, station.lon);
                    return (
                      <div
                        key={station.id || station.name}
                        style={{ position: "absolute", left: offset.left, top: offset.top }}
                        className="-translate-x-1/2 -translate-y-1/2 group z-20"
                      >
                        <div className="relative flex items-center justify-center">
                          <span className="absolute inline-flex h-6 w-6 rounded-full bg-[#34D399] opacity-40 animate-ping" />
                          <div className="relative h-5 w-5 rounded-full bg-[#059669] border border-white flex items-center justify-center shadow-lg shadow-black/80">
                            <Zap className="h-2.5 w-2.5 text-white" fill="white" />
                          </div>
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#172033]/95 border border-[#2E3A4E] text-white px-2.5 py-1 rounded text-[10px] font-bold whitespace-nowrap opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-30">
                          <div className="font-outfit">{station.name}</div>
                          <div className="text-[8px] text-slate-400 font-normal mt-0.5">
                            {station.speed} • {station.status}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="absolute bottom-2 right-2 bg-[#0B0F19]/80 border border-[#2E3A4E]/60 px-2 py-0.5 rounded text-[8px] text-slate-400 select-none backdrop-blur-sm z-10">
                {mapboxToken ? "© Mapbox" : "© CARTO © OpenStreetMap"}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
