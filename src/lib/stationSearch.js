const NOMINATIM_HEADERS = {
  "User-Agent": "EVRE-Charging-Hub/1.0 (https://evrehub.com)",
  Accept: "application/json",
};

function normalizeSearchQuery(query) {
  const q = query.trim();
  if (/^\d{6}$/.test(q)) return `${q}, India`;
  if (/^\d{5}(-\d{4})?$/.test(q)) return `${q}, USA`;
  return q;
}

function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function pickZoom(maxDistanceKm) {
  if (maxDistanceKm > 25) return 11;
  if (maxDistanceKm > 12) return 12;
  return 13;
}

export async function geocodePlace(query) {
  const normalized = normalizeSearchQuery(query);
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", normalized);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("addressdetails", "1");

  const res = await fetch(url.toString(), {
    headers: NOMINATIM_HEADERS,
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Geocoding service unavailable");

  const results = await res.json();
  if (!results?.length) return null;

  const place = results[0];
  const shortLabel =
    place.address?.city ||
    place.address?.town ||
    place.address?.village ||
    place.address?.suburb ||
    place.address?.state ||
    place.display_name?.split(",")[0] ||
    query;

  return {
    lat: parseFloat(place.lat),
    lon: parseFloat(place.lon),
    label: `${shortLabel}${place.address?.country ? `, ${place.address.country}` : ""}`,
    displayName: place.display_name,
  };
}

function mapConnectionCounts(connections = []) {
  let ccs = 0;
  let nacs = 0;
  let type2 = 0;
  let maxKw = 0;

  for (const conn of connections) {
    const title = (conn.ConnectionType?.Title || "").toLowerCase();
    const kw = conn.PowerKW || 0;
    if (kw > maxKw) maxKw = kw;

    if (/ccs|combo/.test(title)) ccs += 1;
    else if (/nacs|tesla/.test(title)) nacs += 1;
    else type2 += 1;
  }

  return { ccs, nacs, type2, maxKw };
}

function mapOcmStation(poi, centerLat, centerLon) {
  const addr = poi.AddressInfo || {};
  const { ccs, nacs, type2, maxKw } = mapConnectionCounts(poi.Connections);
  const operational = poi.StatusType?.IsOperational !== false;
  const lat = addr.Latitude;
  const lon = addr.Longitude;

  return {
    id: `ocm-${poi.ID}`,
    name: addr.Title || "EV Charging Station",
    address:
      [addr.AddressLine1, addr.Town, addr.StateOrProvince, addr.Postcode]
        .filter(Boolean)
        .join(", ") || "Charging location",
    ccs,
    nacs,
    type2,
    status: operational ? "Available" : "Offline",
    speed: maxKw >= 50 ? `${Math.round(maxKw)}kW` : maxKw > 0 ? `${Math.round(maxKw)}kW AC` : "AC Charge",
    lat,
    lon,
    distKm: distanceKm(centerLat, centerLon, lat, lon),
  };
}

export async function fetchOpenChargeMapStations(lat, lon) {
  const apiKey = process.env.OPEN_CHARGE_MAP_API_KEY;
  if (!apiKey) return [];

  const url = new URL("https://api.openchargemap.io/v3/poi/");
  url.searchParams.set("output", "json");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("distance", "40");
  url.searchParams.set("distanceunit", "KM");
  url.searchParams.set("maxresults", "15");
  url.searchParams.set("compact", "true");
  url.searchParams.set("verbose", "false");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) return [];

  const data = await res.json();
  if (!Array.isArray(data)) return [];

  return data
    .filter((poi) => poi.AddressInfo?.Latitude && poi.AddressInfo?.Longitude)
    .map((poi) => mapOcmStation(poi, lat, lon));
}

function mapPhotonStation(feature, centerLat, centerLon) {
  const props = feature.properties || {};
  const [lon, lat] = feature.geometry?.coordinates || [];
  if (lat == null || lon == null) return null;

  const isCharger =
    props.osm_value === "charging_station" ||
    /charg|ev\s|ather|tata\s+power|zeon|magenta|blusmart|volttic/i.test(props.name || "");

  if (!isCharger) return null;

  const distKm = distanceKm(centerLat, centerLon, lat, lon);
  if (distKm > 45) return null;

  const address = [
    props.street,
    props.locality,
    props.city || props.district,
    props.state,
    props.postcode,
    props.country,
  ]
    .filter(Boolean)
    .join(", ");

  const name = props.name || props.operator || "EV Charging Station";
  const isFast = /dc|fast|350|150|120|100|super/i.test(name);

  return {
    id: `photon-${props.osm_type}-${props.osm_id}`,
    name,
    address: address || "Public charging location",
    ccs: /ccs|combo/i.test(name) ? 1 : 0,
    nacs: /nacs|tesla/i.test(name) ? 1 : 0,
    type2: isFast ? 0 : 2,
    status: "Available",
    speed: isFast ? "DC Fast" : "AC Charge",
    lat,
    lon,
    distKm,
  };
}

async function photonSearch(lat, lon, q) {
  const url = new URL("https://photon.komoot.io/api/");
  url.searchParams.set("q", q);
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));
  url.searchParams.set("limit", "30");

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) return [];

  const data = await res.json();
  if (!Array.isArray(data.features)) return [];

  return data.features.map((f) => mapPhotonStation(f, lat, lon)).filter(Boolean);
}

export async function fetchPhotonChargingStations(lat, lon, locationLabel) {
  const cityName = locationLabel.split(",")[0].trim();
  const batches = await Promise.all([
    photonSearch(lat, lon, "charging station"),
    photonSearch(lat, lon, `ev charging ${cityName}`),
    photonSearch(lat, lon, "electric vehicle charging"),
  ]);

  return batches
    .flat()
    .sort((a, b) => a.distKm - b.distKm);
}

function dedupeStations(stations) {
  const seen = new Set();
  return stations.filter((s) => {
    const key = `${s.name.toLowerCase()}-${s.lat.toFixed(4)}-${s.lon.toFixed(4)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function searchChargingStations(query) {
  const location = await geocodePlace(query);
  if (!location) {
    return { success: false, error: `Could not find location "${query}". Try a city, address, or postal code.` };
  }

  let stations = await fetchOpenChargeMapStations(location.lat, location.lon);
  let source = "openchargemap";

  if (stations.length === 0) {
    stations = await fetchPhotonChargingStations(location.lat, location.lon, location.label);
    source = "openstreetmap";
  }

  stations = dedupeStations(stations).slice(0, 12);

  const maxDist = stations.length
    ? Math.max(...stations.map((s) => s.distKm || 0))
    : 0;

  return {
    success: true,
    location,
    stations,
    source,
    zoom: pickZoom(maxDist),
  };
}
