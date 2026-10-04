# PITCHVAULT — Personal Football Career Archive

A premium Next.js application for documenting and archiving FIFA 22 Player Career Mode achievements.

## Features

Career Management — Create and manage multiple career saves
Player Tracking — Track OVR progression and attributes over time
Match Logging — Record every match with stats, ratings, and goals
Transfer History — Document all club changes and transfer fees
Trophy Cabinet — Archive all trophies and achievements
International Career — Track World Cups and international achievements
Career Timeline — Chronological record of career milestones
Media Archive — Upload and organize FIFA screenshots
Analytics — Career statistics, progression charts, performance insights
Premium UI — Dark theme, cinematic design, smooth animations

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4.3, Lucide Icons
- **Forms**: React Hook Form + Zod
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage
- **Auth**: Supabase Auth
- **Charts**: Recharts
- **Dates**: date-fns

## Quick Start

### 1. Prerequisites

- Node.js 18+
- Supabase account (https://supabase.com)

### 2. Environment Setup

```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Database Schema

Run the SQL in `SETUP_INSTRUCTIONS.md` in your Supabase SQL editor to create all tables and indexes.

### 4. Install & Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Project Structure

```
build-pitch-vault-career-app/
├── app/
│   ├── api/                    # API routes for CRUD
│   │   ├── careers/
│   │   ├── players/
│   │   ├── matches/
│   │   ├── transfers/
│   │   ├── trophies/
│   │   ├── awards/
│   │   ├── seasons/
│   │   ├── timeline/
│   │   ├── news/
│   │   ├── attributes/
│   │   ├── media/
│   │   ├── clubs/
│   │   ├── competitions/
│   │   ├── search/
│   │   ├── analytics/
│   │   ├── dashboard/
│   │   └── upload/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── pitchvault.css          # Premium design system
├── components/
│   ├── pitchvault-dashboard.tsx    # Main dashboard
│   ├── pitchvault-pages.tsx        # Other pages
│   └── ui/                         # shadcn components
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── types.ts
│   ├── queries/                # Database functions
│   │   ├── careers.ts
│   │   ├── players.ts
│   │   ├── matches.ts
│   │   ├── transfers.ts
│   │   ├── trophies.ts
│   │   ├── awards.ts
│   │   ├── seasons.ts
│   │   ├── attributes.ts
│   │   ├── timeline.ts
│   │   ├── news.ts
│   │   ├── media.ts
│   │   ├── clubs.ts
│   │   └── competitions.ts
│   ├── analytics/
│   │   └── career-stats.ts     # Career calculations
│   ├── validations/
│   │   └── career.ts           # Zod schemas
│   ├── constants/
│   │   └── seed-data.ts        # Demo data
│   └── utils.ts
├── public/                     # Icons, images
├── SETUP_INSTRUCTIONS.md       # Database setup
├── ARCHITECTURE.md             # System design
└── README.md                   # This file
```

## Core API Endpoints

### Careers
- `GET /api/careers` — List user's careers
- `POST /api/careers` — Create career
- `DELETE /api/careers?id=X` — Delete career

### Players
- `GET /api/players?careerId=X` — Get player
- `POST /api/players` — Create player
- `PUT /api/players?id=X` — Update player

### Matches
- `GET /api/matches?careerId=X&limit=50` — List matches
- `POST /api/matches` — Create match
- `DELETE /api/matches?id=X` — Delete match

### Transfers
- `GET /api/transfers?careerId=X` — List transfers
- `POST /api/transfers` — Create transfer
- `PUT /api/transfers?id=X` — Update transfer
- `DELETE /api/transfers?id=X` — Delete transfer

### Trophies
- `GET /api/trophies?careerId=X` — List trophies
- `POST /api/trophies` — Create trophy
- `DELETE /api/trophies?id=X` — Delete trophy

### Awards
- `GET /api/awards?careerId=X` — List awards
- `POST /api/awards` — Create award
- `DELETE /api/awards?id=X` — Delete award

### Seasons
- `GET /api/seasons?careerId=X` — List seasons
- `POST /api/seasons` — Create season
- `DELETE /api/seasons?id=X` — Delete season

### Timeline & News
- `GET /api/timeline?careerId=X` — Timeline events
- `POST /api/timeline` — Create event
- `GET /api/news?careerId=X` — News feed
- `POST /api/news` — Create news

### Attributes
- `GET /api/attributes?careerId=X&latest=true` — Latest OVR
- `POST /api/attributes` — Save attribute snapshot

### Media
- `GET /api/media?careerId=X&category=MATCH` — List media
- `POST /api/upload` — Upload screenshot (multipart/form-data)
- `DELETE /api/media?id=X` — Delete media

### Search & Analytics
- `GET /api/search?careerId=X&q=Barcelona` — Global search
- `GET /api/analytics?careerId=X&type=career` — Analytics
- `GET /api/dashboard?careerId=X` — Dashboard data

### Reference Data
- `GET /api/clubs?search=Barcelona` — Search clubs
- `GET /api/competitions?search=Champions` — Search competitions

## Data Validation

All forms use Zod schemas with React Hook Form:

```typescript
const createMatchSchema = z.object({
  player_rating: z.number().min(0).max(10),
  goals: z.number().int().min(0),
  assists: z.number().int().min(0),
  minutes_played: z.number().int().min(0).max(120),
  result: z.enum(['win', 'draw', 'loss']),
  // ... more fields
})
```

Validation happens:
1. **Client-side**: Real-time feedback with React Hook Form
2. **Server-side**: Always re-validated with Zod before insertion

## Security

- Row Level Security (RLS): Users only access their own career data
- Authentication: Supabase Auth with JWT tokens
- API Routes: Protected with auth checks
- Storage: Supabase Storage with RLS policies

## Design System

Premium dark theme with:
- Near-black backgrounds (`oklch(0.08 0 0)`)
- High contrast white text
- Purple accent color (`oklch(0.488 0.243 264.376)`)
- Subtle animations and transitions
- Football-inspired typography hierarchy

See `app/pitchvault.css` for complete design tokens.

## Analytics

The analytics layer provides:

```typescript
calculateCareerStats(careerId) → {
  totalAppearances,
  totalGoals,
  totalAssists,
  averageRating,
  totalWins,
  totalDraws,
  totalLosses,
  winRate,
  goalsPerMatch,
  assistsPerMatch,
  motmCount
}
```

Additional functions:
- `getGoalsBySeason(careerId)` — Goals per season
- `getGoalsByCompetition(careerId)` — Goals per competition
- `getOvrProgression(careerId)` — OVR over time
- `getMatchRatingDistribution(careerId)` — Rating buckets

## Deployment

### Supabase
Already cloud-hosted. No additional setup needed.

### Next.js / Vercel
1. Push to GitHub
2. Connect Vercel to repo
3. Add environment variables in Vercel dashboard
4. Deploy automatically on git push

## Troubleshooting

"Missing Supabase environment variables"
- Check `.env.local` has correct URL and keys

"Failed to fetch matches"
- Ensure database tables are created (run SQL setup)
- Check RLS policies allow your user

"CORS errors"
- Supabase CORS is configured automatically
- Check browser console for actual error

"Upload fails"
- Ensure storage bucket exists and is public
- Check file size < 5MB
- Verify auth token is valid

## Documentation

- `SETUP_INSTRUCTIONS.md` — Database schema & setup
- `ARCHITECTURE.md` — System design & data flow
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Zod Validation](https://zod.dev)

## Demo Data

Includes a complete seed career for Sakai Sree:
- 4 seasons (AS Saint-Étienne → Barcelona → Manchester United)
- 160+ matches
- 373 career goals
- World Cup 2022 Champion
- OVR progression: 78 → 91
- Multiple trophies and awards

Enable in development by running seed script (to be created).

## License

MIT

## Author

PITCHVAULT Development Team

---

Every Match. Every Move. Every Legacy.
