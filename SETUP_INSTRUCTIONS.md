# PITCHVAULT — Setup Instructions

## Prerequisites

1. **Supabase Account** — Create one at https://supabase.com
2. **Node.js 18+** — Already installed
3. **npm/pnpm** — Already installed

## Setup Steps

### 1. Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Create a new project
3. Note your:
   - `Project URL` (NEXT_PUBLIC_SUPABASE_URL)
   - `Anon Key` (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - `Service Role Key` (SUPABASE_SERVICE_ROLE_KEY)

### 2. Create Database Schema

Run this SQL in your Supabase SQL editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Careers
CREATE TABLE careers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  game_version TEXT DEFAULT 'FIFA 22',
  description TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'deleted')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Clubs
CREATE TABLE clubs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  short_name TEXT,
  country TEXT,
  league TEXT,
  logo_url TEXT,
  primary_color TEXT,
  secondary_color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Competitions
CREATE TABLE competitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  country TEXT,
  competition_type TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Archetypes
CREATE TABLE archetypes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Players
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  short_name TEXT,
  position TEXT NOT NULL,
  nationality TEXT NOT NULL,
  date_of_birth DATE,
  age INTEGER,
  preferred_foot TEXT CHECK (preferred_foot IN ('left', 'right')),
  jersey_number INTEGER,
  height INTEGER,
  weight INTEGER,
  current_ovr INTEGER DEFAULT 60,
  current_level INTEGER,
  current_club_id UUID REFERENCES clubs(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seasons
CREATE TABLE seasons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  start_year INTEGER NOT NULL,
  end_year INTEGER NOT NULL,
  current_club_id UUID REFERENCES clubs(id),
  appearances INTEGER DEFAULT 0,
  goals INTEGER DEFAULT 0,
  assists INTEGER DEFAULT 0,
  average_rating DECIMAL,
  wins INTEGER DEFAULT 0,
  draws INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Matches
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  season_id UUID NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
  club_id UUID NOT NULL REFERENCES clubs(id),
  competition_id UUID NOT NULL REFERENCES competitions(id),
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  opponent TEXT NOT NULL,
  opponent_logo_url TEXT,
  home_away TEXT NOT NULL CHECK (home_away IN ('home', 'away')),
  player_team_score INTEGER NOT NULL,
  opponent_score INTEGER NOT NULL,
  result TEXT NOT NULL CHECK (result IN ('win', 'draw', 'loss')),
  player_rating DECIMAL NOT NULL,
  goals INTEGER NOT NULL DEFAULT 0,
  assists INTEGER NOT NULL DEFAULT 0,
  minutes_played INTEGER NOT NULL,
  is_motm BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Transfers
CREATE TABLE transfers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES players(id),
  from_club_id UUID REFERENCES clubs(id),
  to_club_id UUID NOT NULL REFERENCES clubs(id),
  transfer_date TIMESTAMP WITH TIME ZONE NOT NULL,
  season_id UUID REFERENCES seasons(id),
  transfer_fee INTEGER,
  currency TEXT,
  transfer_type TEXT DEFAULT 'permanent' CHECK (transfer_type IN ('permanent', 'loan', 'free', 'youth_promotion', 'other')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trophies
CREATE TABLE trophies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  competition_id UUID NOT NULL REFERENCES competitions(id),
  season_id UUID REFERENCES seasons(id),
  club_id UUID NOT NULL REFERENCES clubs(id),
  country TEXT,
  winner BOOLEAN DEFAULT TRUE,
  date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Awards
CREATE TABLE awards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  season_id UUID REFERENCES seasons(id),
  competition_id UUID REFERENCES competitions(id),
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Attribute Snapshots
CREATE TABLE attribute_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES players(id),
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  season_id UUID REFERENCES seasons(id),
  overall INTEGER NOT NULL,
  pace INTEGER NOT NULL,
  shooting INTEGER NOT NULL,
  passing INTEGER NOT NULL,
  dribbling INTEGER NOT NULL,
  defending INTEGER NOT NULL,
  physical INTEGER NOT NULL,
  level INTEGER,
  skill_points INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Player Archetypes
CREATE TABLE player_archetypes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  archetype_id UUID NOT NULL REFERENCES archetypes(id),
  status TEXT DEFAULT 'locked' CHECK (status IN ('locked', 'unlocked')),
  unlocked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Timeline Events
CREATE TABLE timeline_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  season_id UUID REFERENCES seasons(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  club_id UUID REFERENCES clubs(id),
  competition_id UUID REFERENCES competitions(id),
  importance TEXT DEFAULT 'normal' CHECK (importance IN ('low', 'normal', 'high', 'legendary')),
  media_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- News
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  headline TEXT NOT NULL,
  subheadline TEXT,
  body TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  club_id UUID REFERENCES clubs(id),
  competition_id UUID REFERENCES competitions(id),
  timeline_event_id UUID REFERENCES timeline_events(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Media
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  file_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  title TEXT,
  description TEXT,
  category TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  season_id UUID REFERENCES seasons(id),
  match_id UUID REFERENCES matches(id),
  transfer_id UUID REFERENCES transfers(id),
  trophy_id UUID REFERENCES trophies(id),
  award_id UUID REFERENCES awards(id),
  timeline_event_id UUID REFERENCES timeline_events(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Records
CREATE TABLE records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  value TEXT NOT NULL,
  unit TEXT,
  category TEXT NOT NULL,
  season_id UUID REFERENCES seasons(id),
  match_id UUID REFERENCES matches(id),
  date TIMESTAMP WITH TIME ZONE,
  description TEXT,
  is_automatic BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_careers_user_id ON careers(user_id);
CREATE INDEX idx_players_career_id ON players(career_id);
CREATE INDEX idx_matches_career_id ON matches(career_id);
CREATE INDEX idx_matches_season_id ON matches(season_id);
CREATE INDEX idx_seasons_career_id ON seasons(career_id);
CREATE INDEX idx_transfers_career_id ON transfers(career_id);
CREATE INDEX idx_trophies_career_id ON trophies(career_id);
CREATE INDEX idx_awards_career_id ON awards(career_id);
CREATE INDEX idx_timeline_career_id ON timeline_events(career_id);
CREATE INDEX idx_news_career_id ON news(career_id);
CREATE INDEX idx_media_career_id ON media(career_id);
CREATE INDEX idx_attributes_career_id ON attribute_snapshots(career_id);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE trophies ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE attribute_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE records ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read their own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can read their own careers" ON careers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own careers" ON careers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own careers" ON careers
  FOR UPDATE USING (auth.uid() = user_id);

-- Shared tables (no RLS needed for public data)
ALTER TABLE clubs DISABLE ROW LEVEL SECURITY;
ALTER TABLE competitions DISABLE ROW LEVEL SECURITY;
ALTER TABLE archetypes DISABLE ROW LEVEL SECURITY;
```

### 3. Create Storage Bucket

1. Go to Storage in Supabase
2. Create bucket: `career-media`
3. Make it public (allow unauthenticated reads)
4. Add policy for uploads

### 4. Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open http://localhost:3000 in your browser.

## Project Structure

```
lib/
├── supabase/
│   ├── types.ts          # Database types
│   ├── client.ts         # Client initialization
│   └── server.ts         # Server initialization
├── queries/              # Database query functions
│   ├── careers.ts
│   ├── players.ts
│   ├── matches.ts
│   ├── clubs.ts
│   ├── competitions.ts
│   ├── seasons.ts
│   ├── transfers.ts
│   ├── trophies.ts
│   ├── awards.ts
│   ├── attributes.ts
│   ├── timeline.ts
│   ├── news.ts
│   └── media.ts
├── analytics/
│   └── career-stats.ts   # Career statistics calculations
├── validations/
│   └── career.ts         # Zod validation schemas
└── constants/
    └── seed-data.ts      # Demo data (Sakai Sree)

app/
├── api/
│   ├── careers/          # Career CRUD endpoints
│   ├── players/          # Player CRUD endpoints
│   ├── matches/          # Match CRUD endpoints
│   ├── dashboard/        # Dashboard data endpoint
│   └── upload/           # Media upload endpoint
├── (routes)/             # Page routes
└── layout.tsx
```

## Next Steps

1. Create API routes in `app/api/`
2. Connect dashboard to database
3. Build match/transfer/trophy modals
4. Implement media upload
5. Add search and filtering
6. Deploy to Vercel

## Documentation

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Zod Validation](https://zod.dev)
