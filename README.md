# TripStory 🌍

> A production-ready travel platform for documenting journeys, visualizing routes, tracking budgets, and sharing stories.

## Quick Start

```bash
# 1. Clone & install backend
cd backend
cp .env.example .env      # fill in your DATABASE_URL and JWT_SECRET
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev               # starts on :3001

# 2. Install & run frontend
cd ../frontend
cp .env.example .env.local  # fill in NEXT_PUBLIC_API_URL and MAPBOX_TOKEN
npm install
npm run dev               # starts on :3000

# 3. Open browser
open http://localhost:3000
```

## Project Structure

```
tripstory/
├── index.html          ← Interactive prototype (open directly in browser)
├── frontend/           ← Next.js 14 App Router
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx            (Landing)
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── stories/page.tsx
│   │   ├── planner/page.tsx
│   │   ├── map/page.tsx
│   │   ├── budget/page.tsx
│   │   └── profile/page.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Providers.tsx
│   │   └── StoryCard.tsx
│   ├── hooks/useQueries.ts
│   ├── lib/api.ts
│   ├── store/useStore.ts
│   ├── tailwind.config.ts
│   ├── next.config.mjs
│   └── package.json
│
└── backend/            ← Node.js + Express + Prisma
    ├── src/
    │   ├── index.ts
    │   ├── controllers/
    │   │   ├── auth.controller.ts
    │   │   ├── trips.controller.ts
    │   │   ├── stories.controller.ts
    │   │   ├── expenses.controller.ts
    │   │   └── users.controller.ts
    │   ├── routes/
    │   │   ├── auth.routes.ts
    │   │   ├── trips.routes.ts
    │   │   ├── stories.routes.ts
    │   │   ├── expenses.routes.ts
    │   │   └── users.routes.ts
    │   └── middleware/
    │       ├── auth.middleware.ts
    │       └── error.middleware.ts
    ├── prisma/schema.prisma
    ├── tsconfig.json
    └── package.json
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| State Management | Zustand |
| Data Fetching | TanStack Query v5 |
| Maps | Mapbox GL + react-map-gl |
| Charts | Recharts |
| UI Components | Radix UI + shadcn/ui |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT + bcrypt |
| Deployment | Vercel (FE) + Render (BE) |

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/signup | ✗ | Register user |
| POST | /api/auth/login | ✗ | Login → JWT |
| GET | /api/auth/profile | ✓ | Get my profile |
| PUT | /api/auth/profile | ✓ | Update profile |
| POST | /api/trips | ✓ | Create trip |
| GET | /api/trips | ✓ | My trips |
| GET | /api/trips/:id | ✓ | Trip detail |
| PUT | /api/trips/:id | ✓ | Update trip |
| DELETE | /api/trips/:id | ✓ | Delete trip |
| GET | /api/trips/:id/budget | ✓ | Budget summary |
| GET | /api/stories | ✗ | Public stories feed |
| GET | /api/stories/:id | ✗ | Single story |
| POST | /api/stories | ✓ | Create story |
| POST | /api/stories/:id/like | ✓ | Like/unlike |
| POST | /api/stories/:id/comments | ✓ | Add comment |
| POST | /api/expenses | ✓ | Add expense |
| GET | /api/expenses/:tripId | ✓ | Trip expenses |
| PUT | /api/expenses/:id | ✓ | Update expense |
| DELETE | /api/expenses/:id | ✓ | Delete expense |
| GET | /api/users/:username | ✗ | User profile |
| POST | /api/users/:id/follow | ✓ | Follow/unfollow |
| GET | /api/users/stats | ✓ | My travel stats |

## Deployment

### Backend → Render

1. Push to GitHub
2. Render → New Web Service → connect repo
3. Set environment variables:
   ```
   DATABASE_URL=postgresql://...
   JWT_SECRET=your-production-secret-min-32-chars
   FRONTEND_URL=https://your-app.vercel.app
   NODE_ENV=production
   ```
4. Build: `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
5. Start: `npm start`

### Frontend → Vercel

1. Push to GitHub
2. Vercel → New Project → import repo
3. Set environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-api.onrender.com/api
   NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...
   ```
4. Deploy automatically on push

### Database → Supabase (recommended free tier)

1. Create project at supabase.com
2. Copy connection string to `DATABASE_URL`
3. Run `npx prisma migrate deploy`

## Features

- ✅ JWT Authentication (signup, login, profile)
- ✅ Trip management (CRUD with destinations & activities)
- ✅ Expense tracking with categories & charts
- ✅ Travel stories feed with likes & comments
- ✅ Route map visualization (Mapbox)
- ✅ Follow system
- ✅ Search & filter stories
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Framer Motion animations
- ✅ Full TypeScript coverage
- ✅ Production-ready error handling

## Environment Variables

### Backend `.env`
```
DATABASE_URL="postgresql://user:pass@host:5432/tripstory"
JWT_SECRET="min-32-char-random-secret"
JWT_EXPIRES_IN="30d"
PORT=3001
FRONTEND_URL="http://localhost:3000"
NODE_ENV="development"
```

### Frontend `.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...your-mapbox-token
```

---

Made with ❤️ · TripStory © 2026
