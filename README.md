<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
<div align="center">

# ⚡ EVRE Charging Hub

### 🔋 Charge Your Car · ☕ Recharge Yourself

**Premium full-stack EV charging network portal — global station finder, booking flows, and admin CMS.**

<br />

[![GitHub Repo](https://img.shields.io/badge/GitHub-FUTURE__FS__03-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Rajan-4900/FUTURE_FS_03)
![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express-4.19-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=flat-square)
![SEO](https://img.shields.io/badge/SEO-Optimized-blue?style=flat-square)
![Global Search](https://img.shields.io/badge/Station%20Finder-Worldwide-orange?style=flat-square)

<br />

**[🌐 Getting Started](#-getting-started)** · **[📖 Docs](#-documentation)** · **[🔌 API](#-api-reference)** · **[🚀 Deploy](./deployment_guide.md)**

</div>

---

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [🖼️ App Preview](#️-app-preview)
- [✨ Key Features](#-key-features)
- [🔄 User Flows](#-user-flows)
- [🏗️ Architecture](#️-architecture)
- [🧰 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🌐 Frontend Pages](#-frontend-pages)
- [🔌 API Reference](#-api-reference)
- [🗄️ Database Models](#️-database-models)
- [🛡️ Admin Dashboard](#️-admin-dashboard)
- [🌍 Live Station Finder](#-live-station-finder)
- [🔒 Security](#-security)
- [⚙️ Environment Variables](#️-environment-variables)
- [📜 NPM Scripts](#-npm-scripts)
- [🚀 Getting Started](#-getting-started)
- [🩺 Troubleshooting](#-troubleshooting)
- [📦 Production Deployment](#-production-deployment)
- [📚 Documentation](#-documentation)
- [🗺️ Project Phases](#️-project-phases)
- [👤 Author](#-author)

---

## 🎯 Project Overview

**EVRE Charging Hub** is a production-ready web platform for a premium electric vehicle charging network. It delivers ultra-fast **350kW DC charging**, **passenger lounges**, and **commercial fleet solutions** through a modern digital experience.

| Layer | Icon | Description |
|-------|------|-------------|
| Public Website | 🖥️ | 12 marketing & booking pages with shared navbar/footer |
| REST API | 🔧 | Express backend with JWT auth, rate limiting & validation |
| Admin CMS | 📊 | Dashboard for enquiries, bookings, services & testimonials |
| Station Finder | 🌍 | Worldwide EV charger search via geocoding + OpenStreetMap |
| SEO Layer | 🔍 | Sitemap, robots.txt, Open Graph metadata & JSON-LD schema |

> **Monorepo layout:** `client/` (Next.js 16) + `server/` (Express API)

---

## 🖼️ App Preview

| Page | Route | Highlights |
|------|-------|------------|
| 🏠 Homepage | `/` | Hero section, live station finder widget, service cards |
| 🌍 Locator | `/locator` | Full-page global charger search with map pins |
| ⚡ Charging | `/charging` | 350kW DC pre-booking form → saved to admin inbox |
| ☕ Lounge | `/lounge` | Premium lounge membership request form |
| 🏢 Fleet | `/fleet` | B2B fleet partnership enquiry with vehicle count |
| 🔐 Dashboard | `/dashboard` | JWT-secured admin CMS portal |

**Design theme:** Dark UI (`#0B0F19`) · Emerald accent (`#34D399`) · Outfit + Inter fonts · Glassmorphism cards

---

## ✨ Key Features

| | Feature | Details |
|---|---------|---------|
| ⚡ | **Ultra-Fast Charging** | Pre-booking for 350kW DC ports (NACS, CCS, Type 2) |
| ☕ | **Premium Lounges** | Lounge membership & amenity inquiry capture |
| 🏢 | **Fleet Solutions** | B2B enquiry forms with vehicle count & contact details |
| 🌍 | **Global Station Finder** | Search **any city, address, or postal code** worldwide |
| 🗺️ | **Interactive Map** | List + map views with real charger pins & distance (km) |
| 📊 | **Impact Calculator** | Monthly fuel savings & CO₂ offset estimator |
| ⭐ | **Reviews** | Testimonial carousel with eco-impact badges |
| 🔐 | **Admin Dashboard** | Manage leads, bookings, services, gallery & reviews |
| 🛡️ | **API Security** | Helmet, CORS, JWT, bcrypt, rate limits, NoSQL sanitization |
| 📈 | **SEO Ready** | Server components, sitemap, robots, structured data |
| 💾 | **Dev-Friendly DB** | Auto in-memory MongoDB fallback when local DB is unavailable |

---

## 🔄 User Flows

### 👤 Public Visitor Flow
```
🏠 Homepage  →  🌍 Search location  →  📋 View nearby chargers
     ↓
⚡ /charging  or  ☕ /lounge  or  🏢 /fleet  →  📝 Submit form  →  ✅ Confirmation
```

### 🔐 Admin Flow
```
🔐 /dashboard  →  📧 Login (admin@gmail.com)  →  📊 Overview stats
     ↓
📥 Enquiries & Forms  →  View bookings + B2B leads  →  Update status
     ↓
🛠️ Services / 🖼️ Gallery / ⭐ Testimonials  →  CRUD & moderation
```

### 🌍 Station Finder Flow
```
📍 Enter city / pincode / address  (e.g. 560061, London, Tokyo)
        ↓
🌐 Nominatim Geocoding  →  resolve latitude & longitude
        ↓
🔌 Photon / OpenStreetMap  →  fetch real public EV charging stations
        ↓
📋 List View  or  🗺️ Map View  →  results within ~45 km, sorted by distance
```

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                   🌐 CLIENT  —  Next.js 16 App Router            │
│                                                                  │
│   (site)/          dashboard/         api/stations/search/       │
│   Marketing Pages  Admin CMS          Global Charger API         │
│        │                │                      │                 │
│        └────────────────┴──────────────────────┘                 │
│                         │ fetch / REST                           │
└─────────────────────────┼────────────────────────────────────────┘
                          ▼
┌──────────────────────────────────────────────────────────────────┐
│                   ⚙️ SERVER  —  Express + Node.js                │
│                                                                  │
│   auth · contact · services · testimonials · gallery · admin     │
│                         │ Mongoose                               │
└─────────────────────────┼────────────────────────────────────────┘
                          ▼
                 ┌─────────────────┐
                 │  🍃 MongoDB     │
                 │  (in-memory dev │
                 │   fallback)     │
                 └─────────────────┘
```

---

## 🧰 Tech Stack

### 🖥️ Frontend — `client/`

| Tech | Version | Role |
|------|---------|------|
| ⚛️ Next.js | 16.2 | App Router, SSR, API routes, SEO |
| ⚛️ React | 19.2 | UI components |
| 🎨 Tailwind CSS | 4.0 | Styling & responsive design |
| ✨ Framer Motion | 12.x | Animations |
| 🎯 Lucide React | 1.x | Icon library |
| 🔤 Google Fonts | — | Outfit + Inter |

### ⚙️ Backend — `server/`

| Tech | Version | Role |
|------|---------|------|
| 🟢 Node.js | 18+ | Runtime |
| 🚂 Express | 4.19 | REST API |
| 🍃 Mongoose | 8.3 | MongoDB ODM |
| 🔑 jsonwebtoken | 9.x | JWT authentication |
| 🔒 bcryptjs | 2.x | Password hashing |
| 🪖 Helmet | 7.x | Security headers |
| ⏱️ express-rate-limit | 7.x | Rate limiting |
| 💾 mongodb-memory-server | 11.x | Dev DB fallback |

### 🌐 External APIs (Station Finder)

| API | Purpose |
|-----|---------|
| 📍 Nominatim (OSM) | Geocode any location worldwide |
| 🔌 Photon (Komoot) | Fetch real EV charging station POIs |
| 🗺️ CARTO / Mapbox | Map tile rendering |

---

## 📁 Project Structure

```
FUTURE_FS_03/
│
├── 📂 client/
│   └── src/
│       ├── app/
│       │   ├── (site)/                  # Public routes (shared layout)
│       │   │   ├── layout.js            # Navbar + Footer shell
│       │   │   ├── loading.js           # Page transition loader
│       │   │   ├── page.js              # 🏠 Homepage
│       │   │   ├── about/               # ℹ️ About + gallery
│       │   │   ├── services/            # 🛠️ Service verticals
│       │   │   ├── advantages/          # 🏆 Why EVRE
│       │   │   ├── calculator/          # 📊 Impact calculator
│       │   │   ├── reviews/             # ⭐ Testimonials
│       │   │   ├── contact/             # 📬 Contact form
│       │   │   ├── locator/             # 🌍 Full station finder
│       │   │   ├── charging/            # ⚡ Charging booking
│       │   │   ├── lounge/              # ☕ Lounge booking
│       │   │   └── fleet/               # 🏢 Fleet enquiry
│       │   ├── dashboard/               # 🔐 Admin CMS
│       │   ├── api/stations/search/     # 🔍 Global charger API route
│       │   ├── layout.js                # Root layout + fonts
│       │   ├── sitemap.js               # SEO sitemap
│       │   └── robots.js                # Crawler rules
│       ├── components/
│       │   ├── layout/                  # Navbar.js, Footer.js
│       │   ├── locator/                 # StationFinder.js
│       │   ├── contact/                 # ContactForm.js
│       │   ├── calculator/              # ImpactCalculator.js
│       │   └── reviews/                 # TestimonialCarousel.js
│       ├── lib/stationSearch.js         # Geocoding + charger fetch logic
│       └── data/content.js              # Nav links, hints, gallery data
│
├── 📂 server/
│   ├── config/db.js                     # MongoDB + in-memory fallback
│   ├── controllers/                     # Business logic
│   ├── middleware/                      # Auth, rate limit, errors
│   ├── models/                          # 8 Mongoose schemas
│   ├── routes/                          # 6 API route files
│   ├── utils/ensureAdmin.js             # Auto-create default admin
│   ├── seed.js                          # Database seed script
│   └── server.js                        # API entry point
│
└── 📄 docs/                             # Phase specifications
    ├── business_research_blueprint.md
    ├── ui_ux_design_specs.md
    ├── project_architecture.md
    ├── database_design.md
    ├── local_seo_strategy.md
    ├── deployment_guide.md
    └── business_owner_pitch.md
```

---

## 🌐 Frontend Pages

| Route | Icon | Description |
|-------|------|-------------|
| `/` | 🏠 | Homepage with hero, station finder widget & service cards |
| `/about` | ℹ️ | Company story, hub statistics & photo gallery |
| `/services` | 🛠️ | Charging, lounge & fleet service verticals |
| `/advantages` | 🏆 | Competitive differentiators (reservations, speed, green energy) |
| `/calculator` | 📊 | Fuel savings & CO₂ offset calculator |
| `/reviews` | ⭐ | Customer testimonial carousel |
| `/contact` | 📬 | General enquiry contact form |
| `/locator` | 🌍 | Full-page global EV charger search |
| `/charging` | ⚡ | Ultra-fast DC charging pre-booking |
| `/lounge` | ☕ | Premium lounge membership request |
| `/fleet` | 🏢 | B2B commercial fleet enquiry |
| `/dashboard` | 🔐 | JWT-protected admin CMS portal |

---

## 🔌 API Reference

**Base URL:** `http://localhost:5000/api/v1`

### 🟢 Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | ❤️ API health check |
| `POST` | `/auth/login` | 🔑 Admin login → returns JWT |
| `POST` | `/contact` | 📬 Contact / charging / lounge booking |
| `POST` | `/contact/enquiry` | 🏢 B2B fleet or host enquiry |
| `GET` | `/services` | 🛠️ List active services |
| `GET` | `/testimonials` | ⭐ Approved testimonials |
| `GET` | `/gallery` | 🖼️ Gallery images |

### 🔒 Protected Endpoints *(Bearer JWT)*

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/auth/me` | Admin | 👤 Current admin profile |
| `GET` | `/contact/submissions` | Admin | 📥 All contact & booking forms |
| `GET` | `/contact/enquiries` | Admin | 🏢 All B2B enquiries |
| `PUT` | `/contact/enquiries/:id` | Admin | ✏️ Update enquiry status |
| `POST` | `/services` | Admin | ➕ Create service |
| `PUT` | `/services/:id` | Admin | ✏️ Update service |
| `DELETE` | `/services/:id` | Superadmin | 🗑️ Delete service |
| `GET` | `/testimonials/all` | Admin | ⭐ All testimonials |
| `PUT` | `/testimonials/:id/moderate` | Admin | ✅ Approve / reject review |
| `GET` | `/admin/stats` | Admin | 📊 Dashboard counters |
| `GET` | `/admin/audit-logs` | Superadmin | 📋 Audit trail |

### 🔍 Next.js Internal API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/stations/search?q={query}` | 🌍 Global EV charger search |

**Example:**
```bash
curl "http://localhost:3000/api/stations/search?q=560061"
```

---

## 🗄️ Database Models

| Collection | Icon | Purpose |
|------------|------|---------|
| `adminusers` | 👤 | Admin accounts (superadmin, moderator, support) |
| `contact_forms` | 📬 | Contact, charging & lounge booking submissions |
| `customer_enquiries` | 🏢 | B2B fleet & host partnership leads |
| `services` | 🛠️ | Station amenity service catalog |
| `testimonials` | ⭐ | Customer reviews with moderation |
| `gallery_images` | 🖼️ | Hub photo gallery references |
| `system_settings` | ⚙️ | Configurable key-value settings |
| `audit_logs` | 📋 | Admin action audit trail |

---

## 🛡️ Admin Dashboard

**URL:** `http://localhost:3000/dashboard`

### 🔑 Default Login

| Field | Value |
|-------|-------|
| 📧 Email | `admin@gmail.com` |
| 🔒 Password | `Admin123` |

> 💡 Auto-created on first server startup. Also set via `npm run db:seed` in `server/`.

### 📊 Dashboard Sections

| Tab | Icon | What you can do |
|-----|------|-----------------|
| Overview | 📊 | View stats, recent B2B leads & testimonial queue |
| Enquiries & Forms | 📥 | See all bookings, charging requests & contact messages |
| Services | 🛠️ | Create, edit & delete station services |
| Gallery | 🖼️ | Manage hub image references |
| Testimonials | ⭐ | Approve, reject or delete reviews |

### 📬 Where bookings appear

| Public form page | Saved as | Visible in admin tab |
|------------------|----------|----------------------|
| `/charging` | Contact form (booking subject) | 📥 Enquiries & Forms |
| `/lounge` | Contact form (lounge request) | 📥 Enquiries & Forms |
| `/contact` | Contact form | 📥 Enquiries & Forms |
| `/fleet` | B2B customer enquiry | 📥 Enquiries & Forms → B2B table |

---

## 🌍 Live Station Finder

Search **any location worldwide** — cities, addresses, postal codes, pincodes.

| Search example | Result |
|----------------|--------|
| `560061` | 🔌 Chargers near Bengaluru, India |
| `London` | 🔌 Chargers in London, UK |
| `New York` | 🔌 Chargers in NYC, USA |
| `Tokyo` | 🔌 Chargers in Tokyo, Japan |
| `Dubai` | 🔌 Chargers in Dubai, UAE |
| Any address | 🔌 Nearest public EV charging stations |

**Quick-search chips:** `560061` · `London` · `New York` · `Tokyo` · `Dubai` · `Sydney`

---

## 🔒 Security

| Feature | Icon | Implementation |
|---------|------|----------------|
| Password hashing | 🔒 | bcryptjs pre-save hook |
| Admin auth | 🔑 | JWT with 15-minute expiry |
| Role-based access | 👥 | superadmin · moderator · support |
| HTTP headers | 🪖 | Helmet middleware |
| Rate limiting | ⏱️ | Auth: 10/15min · Forms: 5/hr · API: 100/15min |
| NoSQL injection | 🛡️ | express-mongo-sanitize |
| Input validation | ✅ | Mongoose schema validators |

---

## ⚙️ Environment Variables

### 🖥️ Client — `client/.env.local`

```env
# Backend API URL (required for forms & dashboard)
NEXT_PUBLIC_API_URL=http://localhost:5000

# Optional — enhanced map tiles
NEXT_PUBLIC_MAPBOX_TOKEN=

# Optional — extra charger data source (used in API route)
OPEN_CHARGE_MAP_API_KEY=
```

### ⚙️ Server — `server/.env`

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/evre_db
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=15m
JWT_COOKIE_EXPIRE=7
NODE_ENV=development
```

> 💡 Copy from `server/.env.example`. No MongoDB? Server uses **in-memory DB** automatically in development.

---

## 📜 NPM Scripts

### 🖥️ Client (`client/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | 🟢 Start dev server → `http://localhost:3000` |
| `npm run build` | 📦 Production build |
| `npm run start` | 🚀 Start production server |
| `npm run lint` | 🔍 Run ESLint |

### ⚙️ Server (`server/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | 🟢 Start API with nodemon → `http://localhost:5000` |
| `npm start` | 🚀 Start production API |
| `npm run db:seed` | 🌱 Seed services, testimonials, gallery & admin |

---

## 🚀 Getting Started

### 📋 Prerequisites

| Requirement | Version | Required |
|-------------|---------|----------|
| 🟢 Node.js | 18+ | ✅ Yes |
| 📦 npm | latest | ✅ Yes |
| 🍃 MongoDB | any | ⬜ Optional (in-memory fallback) |

### 1️⃣ Clone

```bash
git clone https://github.com/Rajan-4900/FUTURE_FS_03.git
cd FUTURE_FS_03
```

### 2️⃣ Start Backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

✅ Expected output:
```
MongoDB Connected (or in-memory fallback)
Default admin created: admin@gmail.com / Admin123
Server running in development mode on port 5000
```

### 3️⃣ Seed Database *(optional)*

```bash
npm run db:seed
```

### 4️⃣ Start Frontend

```bash
cd ../client
npm install
npm run dev
```

### 5️⃣ Open in Browser

| URL | Page |
|-----|------|
| 🌐 http://localhost:3000 | Public website |
| 🌍 http://localhost:3000/locator | Station finder |
| 🔐 http://localhost:3000/dashboard | Admin portal |
| ❤️ http://localhost:5000/api/v1/health | API health check |

---

## 🩺 Troubleshooting

| Problem | Icon | Solution |
|---------|------|----------|
| Dashboard login fails | 🔐 | Ensure backend is running on port `5000` |
| "Could not connect to API" | 🔌 | Run `cd server && npm run dev` |
| MongoDB connection error | 🍃 | Server auto-uses in-memory DB in dev — just restart |
| Station search returns nothing | 🌍 | Try a major city name or 6-digit pincode (e.g. `560061`) |
| Admin inbox is empty | 📥 | Submit a test booking at `/charging` first |
| Bookings not showing | 📬 | Open **Enquiries & Forms** tab in dashboard |

---

## 📦 Production Deployment

| Service | Platform | Directory |
|---------|----------|-----------|
| 🖥️ Frontend | [Vercel](https://vercel.com) | `client/` |
| ⚙️ Backend | [Render](https://render.com) | `server/` |
| 🍃 Database | [MongoDB Atlas](https://mongodb.com/atlas) | Cloud |

📖 Full guide → **[deployment_guide.md](./deployment_guide.md)**

---

## 📚 Documentation

| Document | Icon | Contents |
|----------|------|----------|
| [business_research_blueprint.md](./business_research_blueprint.md) | 📊 | Market research & personas |
| [ui_ux_design_specs.md](./ui_ux_design_specs.md) | 🎨 | Design system & wireframes |
| [project_architecture.md](./project_architecture.md) | 🏗️ | System architecture |
| [database_design.md](./database_design.md) | 🗄️ | Mongoose schemas & indexes |
| [local_seo_strategy.md](./local_seo_strategy.md) | 📈 | SEO strategy |
| [deployment_guide.md](./deployment_guide.md) | 🚀 | Vercel + Render + Atlas setup |
| [business_owner_pitch.md](./business_owner_pitch.md) | 💼 | Business pitch deck |

---

## 🗺️ Project Phases

| # | Phase | Status | Deliverable |
|---|-------|--------|-------------|
| 1️⃣ | Business Research | ✅ | Market analysis, personas, sitemap |
| 2️⃣ | UI/UX Design | ✅ | Design system, wireframes |
| 3️⃣ | Architecture | ✅ | System design, folder structure |
| 4️⃣ | Database Design | ✅ | Mongoose schemas, indexes |
| 5️⃣ | Homepage | ✅ | Marketing landing page |
| 6️⃣ | Backend API | ✅ | Express REST API |
| 7️⃣ | Admin Dashboard | ✅ | JWT-secured CMS |
| 8️⃣ | SEO | ✅ | Sitemap, robots, metadata |
| 9️⃣ | Deployment | ✅ | Vercel + Render + Atlas guide |
| 🌍 | Global Station Finder | ✅ | Worldwide geocoding + real charger data |

---

## 👤 Author

**Rajan**

[![GitHub](https://img.shields.io/badge/GitHub-@Rajan--4900-181717?style=flat-square&logo=github)](https://github.com/Rajan-4900)

---

<div align="center">

### ⚡ EVRE Charging Hub © 2026

🔋 *Accelerating clean transport infrastructure, one charge at a time.*

⭐ Star this repo if you found it useful! And download this Project

</div>
>>>>>>> 2ba5425 (chore: add README.md)
