# EVRE Charging Hub - Local SEO Strategy

This document outlines the optimization strategy to rank the **EVRE Charging Hub** for local search terms, targeting electric vehicle drivers, commercial fleet operators, and site host partners.

---

## 1. Local Search Meta & Graph Setup
Standard Meta Title, Descriptions, and Open Graph tags have been configured dynamically in `layout.js` and `page.js`.
- **Title Structure:** `EVRE Charging Hub | Premium EV Charging & Lounge Network`
- **Focus Description:** Sells ultra-fast 350kW charging backed by 100% renewable power, highlighting coworker lounges, Wi-Fi, and coffee amenities.
- **OG Properties:** Open Graph cards configured for visual link shares on social channels.

---

## 2. Google Business Profile (GBP) Optimization
To capture high-intent "near me" local queries, manage the Google Business Profile with these rules:

### A. Core Listing Identity
- **Business Name:** `EVRE Charging Hub` (Avoid keyword stuffing like "EVRE Fast Charger Station Lounge Near Me"; keep it clean to prevent suspensions).
- **Primary Category:** `Electric Vehicle Charging Station`
- **Secondary Categories:** `Coworking Space`, `Coffee Shop`, `Parking Lot`.
- **Business Description:** Include local keywords naturally: *"Premium EV charging hub in San Francisco featuring 350kW DC ultra-fast charging. Includes secure co-working lounges, high-speed Wi-Fi, and an espresso coffee bar. Open 24/7."*

### B. Rich Profile Content
- **Photo Upload Guidelines:** Upload high-resolution pictures of:
  1. Liquid-cooled charger terminals showing connector types (CCS and NACS).
  2. Co-working lounge interiors, workspaces, and coffee bars.
  3. Safe night lighting and security cameras to address driver safety concerns.
- **Attributes:** Select tags for *Wheelchair Accessible*, *Restrooms Available*, *Free Wi-Fi*, and *Good for working*.
- **Weekly Google Updates:** Post updates detailing new station locations, fleet discounts, or lounge upgrades.

---

## 3. Local Search Keyword Map

| Query Group | Target Focus Keyword | Search Intent | Landing Page Alignment |
| :--- | :--- | :--- | :--- |
| **Broad Category** | `EV charging station near me` | Transactional (High) | Live locator search widget (Hero) |
| **High Power** | `350kW DC fast charger [City]` | Transactional | Speed comparison statistics (About) |
| **Lifestyle/Safety** | `EV charger with lounge workspace` | Informational / Search | Lounge amenity grid (Services) |
| **Fleet Commercial** | `commercial EV fleet charging solutions` | B2B Commercial | Fleet account contact portal (Contact CTA) |
| **Host Partnerships** | `become EV charging station host` | B2B Commercial | Partner request selector (Contact Form) |

---

## 4. Structured Data (JSON-LD)
A schema block has been embedded directly on the homepage layout (`client/src/app/page.js`) conforming to schema.org guidelines:
- **Type:** `AutoChargingStation` (inherits from `LocalBusiness` and `AutomotiveBusiness`).
- **GeoCoordinates:** Hardcoded geolocation for local search map indexes.
- **Amenity Features:** Declares co-working lounges, espresso bars, and free Wi-Fi values for Google search snippet integrations.
