# EVRE Charging Hub - Production Deployment Guide

This guide describes the steps required to deploy the **EVRE Charging Hub** full-stack application to production infrastructure using **MongoDB Atlas** (Database), **Render** (Backend API), and **Vercel** (Frontend Web Client).

---

## 1. Database Setup: MongoDB Atlas

### Step 1: Create a Cluster
1. Sign up or log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Click **Create** to deploy a new database cluster.
3. Select the **M0 Free Tier** (shared RAM/Storage, perfect for initial production launches).
4. Choose your preferred cloud provider (AWS/GCP/Azure) and a region close to your primary audience.

### Step 2: Configure Network Access & Security
1. In the Atlas dashboard sidebar under **Security**, click **Network Access**.
2. Click **Add IP Address**.
3. Choose **Allow Access From Anywhere** (`0.0.0.0/0`) since Render uses dynamic outbound IP ranges on their standard plan, or find Render's specific regional outgoing IPs.
4. Go to **Database Access** under Security.
5. Click **Add New Database User**. Choose **Read and write to any database** privileges, enter a secure password, and save.

### Step 3: Extract the Connection String
1. In the Atlas **Database** view, click **Connect** next to your cluster.
2. Select **Drivers** (Node.js).
3. Copy the connection string. Replace `<password>` with your database user's password and change the database namespace to `/evre_db`.
   *Example: `mongodb+srv://admin_user:<password>@cluster0.mongodb.net/evre_db?retryWrites=true&w=majority`*

---

## 2. Backend Deployment: Render

Render will host the Node.js/Express.js server from your repository.

### Step 1: Create Web Service
1. Log in to [Render](https://render.com).
2. Click **New +** and select **Web Service**.
3. Connect your Git repository.
4. Configure the following parameters:
   - **Name:** `evre-charging-api`
   - **Environment:** `Node`
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free`

### Step 2: Input Environment Variables
In the service settings, click **Environment** and add:
- `PORT`: `5000` (Render binds ports dynamically, but keeping this explicitly ensures consistency).
- `NODE_ENV`: `production`
- `MONGODB_URI`: *[Your MongoDB Atlas connection string from Section 1]*
- `JWT_SECRET`: *[Generate a 32-character secure random hash]*
- `JWT_EXPIRE`: `15m`

### Step 3: Trigger Seeding (Optional)
Once Render finishes the initial deploy, you can open the Render shell/terminal tab or temporarily adjust the **Start Command** to `npm run db:seed` for one run to load initial database values. Ensure to change it back to `npm start` immediately afterward.

---

## 3. Frontend Deployment: Vercel

Vercel will build and serve the Next.js static and dynamic routing nodes.

### Step 1: Initialize Project
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Import your Git repository.
4. Configure these fields:
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `client` (Select edit and choose the client subdirectory).
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

### Step 2: Add Environment Variables
Under the Environment Variables drawer, define:
- `NEXT_PUBLIC_API_URL`: *[Insert the URL of your deployed Render Web Service, e.g., `https://evre-charging-api.onrender.com`]*

### Step 3: Deploy
1. Click **Deploy**. Vercel will resolve dependencies, compile the Tailwind CSS variables, build sitemaps, and deploy static routes.

---

## 4. Custom Domains & SSL Setup

### A. SSL Configuration
Both **Vercel** and **Render** manage free Let's Encrypt SSL/TLS certificates automatically. No manual generation or renewals are required.

### B. Mapping Custom Domains on Vercel
1. In Vercel, go to **Project Settings** -> **Domains**.
2. Type your domain (e.g., `evrehub.com`) and click **Add**.
3. In your DNS provider (Namecheap, GoDaddy, Cloudflare), configure:
   - **A Record:** Name `@` pointing to Vercel's IP `76.76.21.21`
   - **CNAME Record:** Name `www` pointing to `cname.vercel-dns.com`

---

## 5. Security & Performance Operations

### A. CORS Configuration
Verify in [server/server.js](./server/server.js) that CORS points to your Vercel URL in production:
```javascript
app.use(cors({
  origin: 'https://evrehub.com', // Restrict to your live domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### B. Health Diagnostics
To ensure Render doesn't spin down on free tiers due to inactivity, integrate a monitoring cron job (using [UptimeRobot](https://uptimerobot.com) or [Cron-job.org](https://cron-job.org)) targeting your health route:
- Target: `https://evre-charging-api.onrender.com/api/v1/health`
- Interval: Every 14 minutes.
- Purpose: Keeps the free server instance warm and active.
