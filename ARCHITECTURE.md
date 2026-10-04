# PITCHVAULT — Technical Architecture

## Overview

PITCHVAULT is a premium personal football career archive for FIFA 22 Player Career Mode. The architecture separates concerns across three layers:

1. **Presentation Layer** — React/Next.js UI with premium design
2. **API Layer** — Route handlers for CRUD operations
3. **Data Layer** — Supabase PostgreSQL with RLS security

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript 5.7
- **Styling**: Tailwind CSS 4.3, Lucide icons
- **Forms**: React Hook Form + Zod validation
- **Analytics**: Recharts
- **Backend**: Next.js API routes
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Date Handling**: date-fns

## Database Schema

### Core Entities

**Profiles**
- Links Supabase auth.users to profile data
- Stores display name, avatar

**Careers**
- User owns multiple career saves
- Each career represents a separate FIFA 22 playthrough
- Status: active | archived | deleted

**Players**
- One player per career
- Tracks OVR, attributes, position, nationality
- Links to current club

**Clubs & Competitions**
- Shared/seedable reference data
- No user ownership

### Season Timeline

**Seasons** → **Matches** → Statistics

- Seasons group matches
- Matches record individual game data
- Statistics auto-calculated from matches

**Transfers** → Player Progression

- Records club changes
- Tracks transfer fees
- Links seasons

**Trophies & Awards**

- Trophies: competitions won
- Awards: individual honors (MOTM, Player of Year, etc.)

### Player Progression

**Attribute Snapshots**

- Point-in-time capture of OVR + individual attributes
- Enables progression graphs
- One per significant date (season start, key events)

**Archetypes**

- Shared reference data
- Player can unlock multiple archetypes
- Track via player_archetypes junction table

### Content & Memory

**Timeline Events**

- Chronological career milestones
- Types: TRANSFER, MATCH, TROPHY, AWARD, INTERNATIONAL, RECORD, etc.
- Importance: low | normal | high | legendary

**News**

- Football-news-style feed
- User-created or auto-generated
- Links to timeline events

**Media**

- Screenshots stored in Supabase Storage
- Metadata indexed in database
- Categorized (MATCH, TRANSFER, TROPHY, etc.)

**Records**

- Career record tracking (Most Goals, Best Rating, etc.)
- Can be automatic (calculated) or manual

## API Layer Design

### Route Organization

```
app/api/
├── careers/              GET, POST, PUT, DELETE
├── players/              GET, POST, PUT
├── matches/              GET, POST, DELETE
├── transfers/            GET, POST, PUT, DELETE
├── trophies/             GET, POST, DELETE
├── awards/               GET, POST, DELETE
├── seasons/              GET, POST, PUT, DELETE
├── attributes/           GET, POST
├── timeline/             GET, POST, DELETE
├── news/                 GET, POST, PUT, DELETE
├── media/                GET, POST, DELETE
├── upload/               POST (multipart)
├── search/               GET (global search)
├── analytics/            GET (career stats)
└── dashboard/            GET (dashboard data)
```

### API Patterns

**GET** — Fetch data with optional filters

```
GET /api/matches?careerId=X&limit=50&offset=0
GET /api/timeline?careerId=X&limit=10
```

**POST** — Create new record (validates with Zod)

```
POST /api/matches {
  career_id, season_id, club_id, competition_id,
  date, opponent, player_team_score, opponent_score,
  result, player_rating, goals, assists, minutes_played
}
```

**PUT** — Update record

```
PUT /api/matches/:id { ...updates }
```

**DELETE** — Soft or hard delete

```
DELETE /api/matches?id=X
```

## Data Flow

### Dashboard Load

```
User opens /
  ↓
getInitialProps / useEffect calls GET /api/dashboard?careerId=X
  ↓
API handler calls:
  - getPlayerByCareer(careerId)
  - calculateCareerStats(careerId)
  - getLatestAttributeSnapshot(careerId)
  - getRecentMatches(careerId, 3)
  - getRecentTransfers(careerId, 3)
  - getTrophiesByCareer(careerId)
  - getRecentNews(careerId, 3)
  - getRecentTimelineEvents(careerId, 5)
  - getTrophyCount(careerId)
  - getAwardCount(careerId)
  ↓
Response with aggregated data
  ↓
Dashboard renders (Hero, Stats, Recent Events, etc.)
```

### Add Match Flow

```
User clicks + Add Match
  ↓
Modal opens with React Hook Form
  ↓
User fills fields → Zod validates in real-time
  ↓
User clicks "Save"
  ↓
POST /api/matches {validated data}
  ↓
API validates again, inserts match
  ↓
Success response → Toast notification
  ↓
(Optional) Refetch dashboard or optimistically update
  ↓
Modal closes, page reflects new match
```

## Security

### Row Level Security (RLS)

```sql
-- Users can only read/write their own careers
CREATE POLICY "Users can read their own careers" ON careers
  FOR SELECT USING (auth.uid() = user_id);

-- Shared data (clubs, competitions) has no RLS
-- All users can read; creation restricted to admins
```

### Authentication

- Supabase Auth manages user signup/login
- JWT tokens stored in cookies
- API routes check `Authorization: Bearer {token}`
- Never expose service_role_key to browser

### Storage Security

- Supabase Storage bucket RLS
- Users can only upload to their own career folder
- Public read for shared galleries (optional)
- File size limits enforced

## Validation

### Zod Schemas

All inputs validated with Zod before insertion:

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

### Client-Side Validation

- React Hook Form enables real-time validation
- Show friendly error messages
- Prevent invalid submissions

### Server-Side Validation

- Always re-validate (never trust client)
- Zod guarantees type safety
- Meaningful error responses

## Performance Optimizations

### Database

- Indexes on foreign keys and frequently filtered columns
- Pagination for large datasets
- Efficient joins using Supabase relations

### API

- Parallel fetches where possible
- Response caching headers
- Compression enabled by default

### Frontend

- Server components where appropriate
- Image optimization (next/image)
- Lazy loading for media galleries
- Code splitting for large pages

## Error Handling

### API Errors

```typescript
try {
  const data = await queryDatabase()
  return Response.json({ data })
} catch (error) {
  console.error(error)
  return Response.json(
    { error: 'User-friendly message' },
    { status: 500 }
  )
}
```

### User Feedback

- Toast notifications for success/error
- Loading states during async operations
- Error boundaries on pages
- Fallback UI for failed components

## Deployment

### Supabase

- Cloud-hosted PostgreSQL (no setup needed)
- Automatic backups and scaling
- Custom domains supported
- Environment-based secrets

### Next.js / Vercel

- Deploy to Vercel: `git push`
- Environment variables via dashboard
- Automatic preview deployments
- Edge functions supported

## Monitoring

### Logging

- API route errors logged to console
- Supabase query performance tracked
- Client-side errors captured

### Observability

- Supabase Studio dashboard
- Vercel deployment logs
- Database query insights

## Testing

### Unit Tests

- Validation schemas tested with Zod
- Calculation functions tested with Jest

### Integration Tests

- API routes tested with Next.js test utilities
- Database operations tested with test database

### E2E Tests

- Playwright for full workflows
- Career creation to match logging

## Scalability

### Horizontal

- Supabase scales PostgreSQL automatically
- Vercel scales Edge Functions
- Media stored in cloud (S3-like)

### Vertical

- Efficient indexing prevents query slowdown
- Connection pooling in Supabase
- Pagination prevents loading massive datasets

## Future Enhancements

- Real-time collaboration (Supabase Realtime)
- Advanced analytics dashboard
- Career sharing / public profiles
- AI-generated career analysis
- Mobile app (React Native)
- Career import/export
- Multi-language support
- Dark/light theme toggle
