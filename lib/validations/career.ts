import { z } from 'zod'

export const createCareerSchema = z.object({
  name: z.string().min(1, 'Career name is required').max(100),
  game_version: z.string().default('FIFA 22'),
  description: z.string().optional().nullable(),
})

export const createPlayerSchema = z.object({
  career_id: z.string().uuid(),
  name: z.string().min(1, 'Player name is required').max(100),
  short_name: z.string().optional().nullable(),
  position: z.string().min(1, 'Position is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  date_of_birth: z.string().datetime().optional().nullable(),
  age: z.number().int().min(16).max(50),
  preferred_foot: z.enum(['left', 'right']).optional().nullable(),
  jersey_number: z.number().int().min(1).max(99).optional().nullable(),
  height: z.number().positive().optional().nullable(),
  weight: z.number().positive().optional().nullable(),
  current_ovr: z.number().int().min(0).max(99),
  current_level: z.number().int().optional().nullable(),
  current_club_id: z.string().uuid().optional().nullable(),
})

export const createSeasonSchema = z.object({
  career_id: z.string().uuid(),
  name: z.string().min(1),
  start_year: z.number().int().min(2000),
  end_year: z.number().int().min(2000),
  current_club_id: z.string().uuid().optional().nullable(),
})

export const createMatchSchema = z.object({
  career_id: z.string().uuid(),
  season_id: z.string().uuid(),
  club_id: z.string().uuid(),
  competition_id: z.string().uuid(),
  date: z.string().datetime(),
  opponent: z.string().min(1),
  opponent_logo_url: z.string().url().optional().nullable(),
  home_away: z.enum(['home', 'away']),
  player_team_score: z.number().int().min(0),
  opponent_score: z.number().int().min(0),
  result: z.enum(['win', 'draw', 'loss']),
  player_rating: z.number().min(0).max(10),
  goals: z.number().int().min(0),
  assists: z.number().int().min(0),
  minutes_played: z.number().int().min(0).max(120),
  is_motm: z.boolean().optional(),
  notes: z.string().optional().nullable(),
})

export const createTransferSchema = z.object({
  career_id: z.string().uuid(),
  player_id: z.string().uuid(),
  from_club_id: z.string().uuid().optional().nullable(),
  to_club_id: z.string().uuid(),
  transfer_date: z.string().datetime(),
  season_id: z.string().uuid().optional().nullable(),
  transfer_fee: z.number().positive().optional().nullable(),
  currency: z.string().optional().nullable(),
  transfer_type: z.enum(['permanent', 'loan', 'free', 'youth_promotion', 'other']),
  notes: z.string().optional().nullable(),
})

export const createTrophySchema = z.object({
  career_id: z.string().uuid(),
  competition_id: z.string().uuid(),
  season_id: z.string().uuid().optional().nullable(),
  club_id: z.string().uuid(),
  country: z.string().optional().nullable(),
  winner: z.boolean().default(true),
  date: z.string().datetime().optional().nullable(),
  notes: z.string().optional().nullable(),
})

export const createAwardSchema = z.object({
  career_id: z.string().uuid(),
  name: z.string().min(1),
  season_id: z.string().uuid().optional().nullable(),
  competition_id: z.string().uuid().optional().nullable(),
  date: z.string().datetime(),
  category: z.string().min(1),
  description: z.string().optional().nullable(),
})

export const createAttributeSnapshotSchema = z.object({
  career_id: z.string().uuid(),
  player_id: z.string().uuid(),
  date: z.string().datetime(),
  season_id: z.string().uuid().optional().nullable(),
  overall: z.number().int().min(0).max(99),
  pace: z.number().int().min(0).max(99),
  shooting: z.number().int().min(0).max(99),
  passing: z.number().int().min(0).max(99),
  dribbling: z.number().int().min(0).max(99),
  defending: z.number().int().min(0).max(99),
  physical: z.number().int().min(0).max(99),
  level: z.number().int().optional().nullable(),
  skill_points: z.number().int().optional().nullable(),
})

export const createTimelineEventSchema = z.object({
  career_id: z.string().uuid(),
  date: z.string().datetime(),
  season_id: z.string().uuid().optional().nullable(),
  type: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  club_id: z.string().uuid().optional().nullable(),
  competition_id: z.string().uuid().optional().nullable(),
  importance: z.enum(['low', 'normal', 'high', 'legendary']).optional(),
  media_id: z.string().uuid().optional().nullable(),
})

export const createNewsSchema = z.object({
  career_id: z.string().uuid(),
  date: z.string().datetime(),
  headline: z.string().min(1),
  subheadline: z.string().optional().nullable(),
  body: z.string().optional().nullable(),
  category: z.string().min(1),
  image_url: z.string().url().optional().nullable(),
  club_id: z.string().uuid().optional().nullable(),
  competition_id: z.string().uuid().optional().nullable(),
  timeline_event_id: z.string().uuid().optional().nullable(),
})

export type CreateCareer = z.infer<typeof createCareerSchema>
export type CreatePlayer = z.infer<typeof createPlayerSchema>
export type CreateSeason = z.infer<typeof createSeasonSchema>
export type CreateMatch = z.infer<typeof createMatchSchema>
export type CreateTransfer = z.infer<typeof createTransferSchema>
export type CreateTrophy = z.infer<typeof createTrophySchema>
export type CreateAward = z.infer<typeof createAwardSchema>
export type CreateAttributeSnapshot = z.infer<typeof createAttributeSnapshotSchema>
export type CreateTimelineEvent = z.infer<typeof createTimelineEventSchema>
export type CreateNews = z.infer<typeof createNewsSchema>
