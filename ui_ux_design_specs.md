# EVRE Charging Hub: UI/UX Design Specifications
*Prepared by Antigravity Senior UI/UX Design Team*

This document outlines the complete visual identity, design system tokenization, layout structure, and wireframe specifications for the **EVRE Charging Hub** web platform.

---

## 1. Visual Identity & Color Palette

To evoke a high-tech, premium, and ecological aesthetic, EVRE utilizes a **Premium Dark Theme** featuring rich charcoal backgrounds, vivid energy-accents, and clean typography.

```
+-------------------------------------------------------------+
|  Primary (Emerald)      |  Secondary (Deep Slate)           |
|  #059669                |  #0B0F19                          |
|  Sustainability, Growth |  Base Background, Tech Luxury     |
+-------------------------------------------------------------+
|  Accent (Electric Cyan) |  Interactive (Mint Neon)          |
|  #06B6D4                |  #34D399                          |
|  Technology, Power      |  Hover States, Active Selection   |
+-------------------------------------------------------------+
|  Surface (Dark Card)    |  Text (Primary / Secondary)       |
|  #172033                |  #F8FAFC / #94A3B8                |
|  Card background, Glass  |  High-contrast white / Muted slate|
+-------------------------------------------------------------+
```

### Color Palette Specification Table

| Token Name | Hex Code | Tailwind Equivalent | Use Case |
| :--- | :--- | :--- | :--- |
| **Brand Primary** | `#059669` | `emerald-600` | Primary buttons, brand highlights, active icons. |
| **Brand Secondary** | `#0B0F19` | `slate-950` | Main site-wide background. |
| **Accent Tech** | `#06B6D4` | `cyan-500` | Power/charger metrics, secondary alerts. |
| **Interactive Mint** | `#34D399` | `emerald-400` | Hover states, active text links, positive statuses. |
| **Surface Dark** | `#172033` | `slate-900` | Grid cards, modal backgrounds, inputs. |
| **Border Muted** | `#2E3A4E` | `slate-800` | Inner borders, card outlines. |
| **Text Primary** | `#F8FAFC` | `slate-50` | Headings, primary labels, main body. |
| **Text Muted** | `#94A3B8` | `slate-400` | Sub-labels, descriptive body, footer links. |

---

## 2. Typography

We use Google Fonts to establish a hierarchy that balances clean legibility with a geometric, futuristic feel.

- **Primary Headings Font:** **Outfit** (Geometric Sans-serif)
  - *Rationale:* Features clean circular curves and vertical cuts, giving a premium, automotive-tech feeling.
- **Body & Interface Font:** **Inter** (Neo-grotesque Sans-serif)
  - *Rationale:* Outstanding legibility at small sizes, excellent character spacing for user interface elements, dashboards, and tables.

### Type Hierarchy Specifications

| Element | Font Family | Weight | Size (Desktop) | Size (Mobile) | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **H1 (Hero Heading)** | Outfit | Bold (700) | `3.75rem` (60px) | `2.5rem` (40px) | 1.1 | `-0.02em` |
| **H2 (Section Header)**| Outfit | SemiBold (600) | `2.25rem` (36px) | `1.75rem` (28px)| 1.2 | `-0.01em` |
| **H3 (Card Titles)** | Outfit | Medium (500) | `1.5rem` (24px) | `1.25rem` (20px)| 1.3 | `0` |
| **Body (Regular)** | Inter | Regular (400) | `1.0rem` (16px) | `0.95rem` (15px)| 1.6 | `0` |
| **Interface/Labels** | Inter | Medium (500) | `0.875rem` (14px)| `0.875rem` (14px)| 1.4 | `+0.05em` (caps) |
| **Caption/Metrics** | Inter | Bold (700) | `0.75rem` (12px) | `0.75rem` (12px) | 1.2 | `+0.1em` (caps) |

---

## 3. Design System & Components

### Buttons
- **Primary Button:** Pill-shaped (`border-radius: 9999px`), background: `#059669` gradient to `#047857`, text: `#F8FAFC`. Subtle outer glow on hover (`box-shadow: 0 0 15px rgba(5, 150, 105, 0.4)`).
- **Secondary Button:** Pill-shaped, transparent background, border: `1.5px solid #2E3A4E`, text: `#F8FAFC`. On hover, border shifts to `#059669` and background turns to `rgba(5, 150, 105, 0.05)`.
- **Micro-Interaction:** Hovering triggers a micro-slide of the text + icon to the right by `4px` with a `200ms ease-out` transition.

### Cards
- **Structure:** `backdrop-filter: blur(16px)`, background: `rgba(23, 32, 51, 0.65)`, border: `1px solid rgba(46, 58, 78, 0.5)`, `border-radius: 16px`.
- **Shadows:** Muted outer shadow (`box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3)`).
- **Hover State:** Card lifts upward by `6px`, border color brightens to `#06B6D4` (Accent Tech), and custom inner radial glow appears tracking the cursor.

### Inputs & Form Fields
- **Default State:** Height `48px`, background `#172033`, border `1px solid #2E3A4E`, `border-radius: 8px`, placeholder color `#475569`.
- **Focused State:** Border transitions to `#059669` with a subtle ring: `box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.2)`. Label slides upwards as a micro-animation.

---

## 4. Layout & Grid Structure

- **Desktop (1200px+):** 12-column grid. Col width: `72px`, Gutters: `24px`, Max-width: `1280px`. Horizontal padding: `48px`.
- **Tablet (768px - 1024px):** 8-column grid. Gutters: `16px`. Horizontal padding: `32px`.
- **Mobile (Under 768px):** 4-column grid. Gutters: `16px`. Horizontal padding: `16px`.

### Global Spacing Scale (CSS variables)
- `--space-xs`: `0.5rem` (8px) - Inner items, label gaps
- `--space-sm`: `1.0rem` (16px) - Card paddings, small lists
- `--space-md`: `2.0rem` (32px) - Content blocks, container headers
- `--space-lg`: `4.0rem` (64px) - Section paddings (Mobile)
- `--space-xl`: `6.0rem` (96px) - Section paddings (Desktop)

---

## 5. Mobile Design Strategy

Given that over 65% of EV drivers look for chargers while active on mobile devices, the EVRE website must implement a **Mobile-First Utility Workflow**:

- **Thumb-Zone Navigation:** Desktop header navigation transforms on mobile into a floating sticky bottom-bar for easy thumb access.
- **Tap Targets:** Interactive targets (buttons, map markers) have a minimum size of `44px x 44px` to prevent mis-clicks.
- **Drawer Panels (Bottom-Sheets):** Rather than standard popups, clicking a station on the mobile locator slides up a native-feeling drawer from the bottom containing pictures, charging speeds, pricing, and directions.
- **Data Conservation:** Automated compression of map tile weights and lazy loading of lounge graphics.

---

## 6. Hero Section Design

The Hero Section is split into a 60/40 layout to capture retail drivers immediately while introducing the lifestyle value proposition.

```
+---------------------------------------------------------------------------------+
| [HEADER] Logo                   Find Station   Fleet   Pricing   [APP DOWNLOAD] |
+---------------------------------------------------------------------------------+
| (60% Left Panel)                                 | (40% Right Panel)            |
|                                                  |                              |
| TAGLINE:                                         | STATION WIDGET:              |
| Charge your car.                                 | [Search bar: Enter Zip/City] |
| Recharge yourself.                               |                              |
|                                                  | LIVE STATUS:                 |
| SUB: Experience ultra-fast charging (350kW)      | o LA Lounge: 4/5 Available   |
| powered by 100% green energy, paired with our    | o NY Hub:    2/4 Available   |
| luxury passenger lounges.                        | o Seattle:   Full           |
|                                                  |                              |
| CTAs:                                            | MAP PREVIEW:                 |
| [Find a Charger]   [Learn More]                  | [Mini glowing radar map]     |
+---------------------------------------------------------------------------------+
```

### Visual Specifications
- **Background:** Soft gradient mesh transitioning from a dark slate `#0B0F19` to a deep emerald green `#022C22` in the top right. A subtle pattern of glowing green electricity lines runs through the background.
- **Left Panel (Copy):** Huge H1 Outfit text. Primary CTA button is vivid emerald green with a pulsing glow, secondary is transparent with high-contrast text.
- **Right Panel (Interactive Widget):** Floating glassmorphic card. Includes input field, search button, and live tickers of stations with green pulsing status dots.

---

## 7. Service Section Design

Presented as a 3-column asymmetric grid showcasing the core service verticals of EVRE.

### Layout Spec (Grid of Cards)
1. **Card 1: Ultra-Fast DC Charging (Retail Focus)**
   - *Visual:* An abstract icon of a lightning bolt merging with a tachometer (neon cyan gradient).
   - *Copy:* "Under 15 minutes." Highlights liquid-cooled 350kW systems.
   - *CTA:* "Check Compatibility" (inline link with hover arrow).
2. **Card 2: Premium Lounge & Amenities (Lifestyle Focus)**
   - *Visual:* Icon of a coffee cup combined with a Wi-Fi signal (emerald gradient).
   - *Copy:* "Work, Relax, Refresh." Details modern co-working tables, clean showers, and local roasted coffee.
   - *CTA:* "Explore Amenities" (inline link).
3. **Card 3: Host a Station (B2B/Partnership Focus)**
   - *Visual:* Icon of a parking space with a revenue line graph (gold gradient).
   - *Copy:* "Monetize Your Lot." Outlines passive income generation, tenant attraction, and green building certifications.
   - *CTA:* "Calculate Partner Revenue" (inline link).

---

## 8. Testimonials Section Design

Designed to combat trust issues commonly associated with public charging networks (broken chargers, bad billing).

### Layout Spec (Horizontal Cards Slider)
- **Structure:** 3 cards visible on desktop, sliding horizontally.
- **Card Content:**
  - Standard user feedback quote.
  - Driver details: Profile picture, Name, verified badge: `"Verified EVRE Member"`.
  - EV model indicator (e.g., `"Tesla Model Y"`, `"Hyundai Ioniq 5"`).
  - Personal eco-impact badge: `"Saved 420kg CO2"`.
- **Navigation Controls:** Two minimalist circular arrow buttons (`#2E3A4E` borders) in the bottom-right corner. Active state highlights with a neon green border.

---

## 9. Contact Section Design

A split 50/50 container that separates consumer assistance from high-value corporate inquiries.

```
+---------------------------------------------------------------------------------+
|                                 GET IN TOUCH                                    |
+---------------------------------------------------------------------------------+
| (50% Left Panel: Quick Links)                    | (50% Right Panel: Smart Form)|
|                                                  |                              |
| Urgent Support:                                  | Subject: [Drop down selector]|
| "Need immediate charger help? Call our           |   - Fleet Sales Inquiry      |
| 24/7 hotline: 1-800-EVRE-HELP"                   |   - Host Partner Assessment  |
|                                                  |   - Driver Support           |
| Location Map Link:                               |                              |
| "Find our corporate office in San Francisco"     | Name:   [Text input]         |
|                                                  | Email:  [Text input]         |
| Social Handles:                                  | Message: [Text area]         |
| [LinkedIn]  [Twitter]  [Instagram]               |                              |
|                                                  | [Submit Inquiry ->]          |
+---------------------------------------------------------------------------------+
```

### Form Visual Design
- Form surface is `#172033` (Surface Dark) with a subtle vertical grid line.
- Input focus uses the green shadow ring.
- Submit Button spans the full width of the card, turning emerald green on successful validation.

---

## 10. Footer Design

A structured, 4-column footer that frames the website with clean layout, app access, and live global environmental counters.

```
+---------------------------------------------------------------------------------+
|  [EVRE Logo]               LOCATIONS       PARTNERSHIP      RESOURCES           |
|  Eco-charging and lounges  Los Angeles     Host Hubs        EV Blog             |
|  for a sustainable future  Seattle         Fleet Pricing    FAQ & Support       |
|                            San Francisco   Tax Rebates      Terms of Service    |
+---------------------------------------------------------------------------------+
|  NEWSLETTER SIGNUP:                                  APP STORES:                |
|  [Email input] [Subscribe]                           [AppStore] [PlayStore]     |
+---------------------------------------------------------------------------------+
|  LIVE NET IMPACT: Global EVRE Users have saved: [ 1,429,482 kg CO2 ]            |
+---------------------------------------------------------------------------------+
|  (C) 2026 EVRE Charging Hubs Inc. All Rights Reserved.                          |
+---------------------------------------------------------------------------------+
```

### Visual Specifications
- **Background:** Slate Black (`#0B0F19`) with a thick emerald top border (`4px`).
- **Live Net Impact Bar:** Centered ticker box with a digital mono font (reminiscent of odometer meters), letters glow slightly in electric green (`#34D399`). Number increments in real-time.
- **App Store Badges:** Clean outline vector icons to match the dark-theme aesthetic.

---
*End of UI/UX Specifications Document. Ready for Phase 3.*
