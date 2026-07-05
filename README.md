# 🌍 WanderWise — Smart Travel Planner

> **Roam smart. Go far.**

WanderWise is a full-stack travel planning platform that helps travellers discover destinations, plan trips day-by-day, track budgets and expenses, build packing checklists, and keep emergency information handy — all in one place, wrapped in a warm, modern UI.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ **Destination Explorer** | Browse 12+ curated destinations with real photography, climate info, best travel seasons and live search by place or country |
| 🧳 **Trip Planner** | Create trips with a live destination preview, date validation and instant dashboard integration |
| 📊 **Personal Dashboard** | Greeting header, travel stats (total / upcoming / completed trips) and trip cards with quick actions |
| 📋 **Day-wise Itinerary** | Timeline view with day badges, time chips and per-activity notes |
| 💰 **Budget Manager** | Set trip budgets, log categorised expenses, and watch a colour-coded progress bar (green → amber → red) as spending approaches the limit |
| ✅ **Smart Checklist** | Category-grouped packing lists with one-tap check-off, progress tracking and optimistic UI updates |
| ❤️ **Wishlist** | Save dream destinations from any details page and plan them later |
| 🆘 **Emergency Assistance** | Search real emergency numbers (police / ambulance / fire / tourist helpline) by **country or city** — city names resolve through the destinations database |
| 🔐 **Authentication** | JWT-based register/login with protected routes, split-screen auth pages and show/hide password |
| 📱 **Responsive Design** | Glass navbar with mobile drawer, adaptive grids and mobile-tuned layouts across every page |

---

## 🎨 Design — "Sunset Coral" Theme

A warm, travel-inspired palette used consistently across the app:

| Token | Hex |
|---|---|
| Primary | `#D85A30` |
| Dark | `#993C1D` |
| Heading | `#3D1A0E` |
| Accent Soft | `#F0997B` |
| Background | `#FFF8F5` |
| Surface | `#FAECE7` |

**Typography:** Georgia (headings) · Segoe UI (body)
**Style language:** glassmorphism navbar, soft-shadow cards, lift-on-hover animations, pill buttons — inspired by Airbnb, Booking.com and TripAdvisor.

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + Vite
- React Router
- Axios
- Plain modular CSS (one stylesheet per page — no frameworks)

**Backend**
- Node.js + Express.js
- MongoDB Atlas + Mongoose
- JWT authentication + bcrypt password hashing

---

## 📁 Project Structure

```
Wanderwise/
├── client/                  # React frontend (Vite)
│   └── src/
│       ├── assets/          # logo & images
│       ├── components/      # Navbar, Footer, ScrollToTop, ProtectedRoute
│       ├── context/         # Auth context
│       ├── hooks/           # useAuth
│       ├── pages/           # Home, Destinations, Dashboard, Budget, ...
│       ├── services/        # Axios API modules per feature
│       └── styles/          # one CSS file per page + global.css
│
└── server/                  # Express backend
    ├── config/              # DB connection
    ├── controllers/         # route logic
    ├── middleware/          # JWT auth guard
    ├── models/              # Mongoose schemas
    ├── routes/              # REST endpoints
    ├── seed.js              # base data seeder
    ├── seedEmergency.js     # emergency numbers for 10 countries
    └── updateDestinations.js# destination images + extra destinations
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) 18+
- A MongoDB connection string (MongoDB Atlas)

### 1. Clone

```bash
git clone https://github.com/devAnshikaAggarwal/WanderWise.git
cd WanderWise
```

### 2. Backend

```bash
cd server
npm install
```

Create `server/.env` from the provided example:

```bash
cp .env.example .env
```

Fill in your values:

```env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=any-long-random-string
PORT=5000
```

Seed the database (one time):

```bash
node seed.js
node updateDestinations.js
node seedEmergency.js
```

Start the API:

```bash
npm run dev
```

✅ Wait for `Server running` and `MongoDB connected`.

### 3. Frontend (new terminal)

```bash
cd client
npm install
npm run dev
```

Open **http://localhost:5173** 🎉

> ℹ️ Both terminals must stay running — one for the API, one for the app.

---

## 🔌 API Overview

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Create account | — |
| POST | `/api/auth/login` | Login, returns JWT | — |
| GET | `/api/destinations` | List destinations (`?search=`) | — |
| GET | `/api/destinations/:id` | Destination details | — |
| GET/POST/PUT/DELETE | `/api/trips` | Trip CRUD | 🔒 |
| GET/POST | `/api/budget/:tripId` | Budget + expenses | 🔒 |
| GET/POST/DELETE | `/api/itinerary/:tripId` | Day-wise activities | 🔒 |
| GET/POST/PUT/DELETE | `/api/checklist/:tripId` | Packing checklist | 🔒 |
| GET/POST/DELETE | `/api/wishlist` | Saved destinations | 🔒 |
| GET | `/api/emergency?country=` | Emergency numbers by country | — |

🔒 = requires `Authorization: Bearer <token>`

---

## 👥 Team

| Name | Role |
|---|---|
| **Anshika Aggarwal** | Team Lead · Backend Architecture · UI/UX Polish & Integration |
| Sneha Sharma | Frontend — Pages & Components |
| Arshdeep Kaur | Frontend — Styling & Responsive Design |
| Gayatri Sharma | Backend — REST APIs & Controllers |
| Yuvanshi Thakur | Database — Schema Design & Seeding |
| Aditya Bishnoi | Authentication & Route Protection |
| Rajni Banger | Testing, Documentation & Deployment |

## 📄 License

Built as an academic project. All destination photography via [Unsplash](https://unsplash.com).
