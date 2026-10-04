-- PITCHVAULT DATABASE SCHEMA
-- Run this entire script in Supabase SQL Editor

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Careers table
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

-- Clubs table
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

-- Competitions table
CREATE TABLE competitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  country TEXT,
  competition_type TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Archetypes table
CREATE TABLE archetypes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Players table
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
  player_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seasons table
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

-- Matches table
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  season_id UUID NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
  club_id UUID NOT NULL REFERENCES clubs(id),
  competition_id UUID NOT NULL REFERENCES competitions(id),
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  opponent TEXT NOT NULL,
  opponent_logo_url TEXT,
  match_image_url TEXT,
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

-- Transfers table
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
  transfer_image_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trophies table
CREATE TABLE trophies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  competition_id UUID NOT NULL REFERENCES competitions(id),
  season_id UUID REFERENCES seasons(id),
  club_id UUID NOT NULL REFERENCES clubs(id),
  country TEXT,
  winner BOOLEAN DEFAULT TRUE,
  date TIMESTAMP WITH TIME ZONE,
  trophy_image_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Awards table
CREATE TABLE awards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  season_id UUID REFERENCES seasons(id),
  competition_id UUID REFERENCES competitions(id),
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  category TEXT NOT NULL,
  award_image_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Attribute snapshots table
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
  attribute_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Player archetypes table
CREATE TABLE player_archetypes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  archetype_id UUID NOT NULL REFERENCES archetypes(id),
  status TEXT DEFAULT 'locked' CHECK (status IN ('locked', 'unlocked')),
  unlocked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Timeline events table
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
  event_image_url TEXT,
  media_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- News table
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

-- Media table
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

-- Records table
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
CREATE INDEX idx_matches_date ON matches(date DESC);
CREATE INDEX idx_seasons_career_id ON seasons(career_id);
CREATE INDEX idx_transfers_career_id ON transfers(career_id);
CREATE INDEX idx_trophies_career_id ON trophies(career_id);
CREATE INDEX idx_awards_career_id ON awards(career_id);
CREATE INDEX idx_timeline_career_id ON timeline_events(career_id);
CREATE INDEX idx_news_career_id ON news(career_id);
CREATE INDEX idx_media_career_id ON media(career_id);
CREATE INDEX idx_attributes_career_id ON attribute_snapshots(career_id);
CREATE INDEX idx_media_category ON media(category);
CREATE INDEX idx_media_date ON media(date DESC);

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

CREATE POLICY "Users can read their own players" ON players
  FOR SELECT USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage their players" ON players
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage their matches" ON matches
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage their transfers" ON transfers
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage their trophies" ON trophies
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage their awards" ON awards
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage their seasons" ON seasons
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage their attributes" ON attribute_snapshots
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage their timeline" ON timeline_events
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage their news" ON news
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage their media" ON media
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage their records" ON records
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage player archetypes" ON player_archetypes
  FOR ALL USING (
    player_id IN (
      SELECT id FROM players WHERE career_id IN (
        SELECT id FROM careers WHERE user_id = auth.uid()
      )
    )
  );

-- Career snapshots table (FIFA reported point-in-time data)
CREATE TABLE career_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  snapshot_date TIMESTAMP WITH TIME ZONE NOT NULL,
  season_id UUID REFERENCES seasons(id),
  club_id UUID REFERENCES clubs(id),
  overall_rating INTEGER NOT NULL,
  player_name TEXT NOT NULL,
  position TEXT NOT NULL,
  energy INTEGER,
  form DECIMAL,
  rank INTEGER,
  injury_status TEXT,
  suspension_status TEXT,
  role TEXT,
  league_position TEXT,
  average_rating DECIMAL,
  league_result TEXT,
  champions_league_result TEXT,
  domestic_cup_result TEXT,
  other_competition_result TEXT,
  man_of_the_match INTEGER DEFAULT 0,
  team_of_the_week INTEGER DEFAULT 0,
  player_of_the_month INTEGER DEFAULT 0,
  player_of_the_year BOOLEAN DEFAULT FALSE,
  appearances INTEGER,
  wins INTEGER,
  draws INTEGER,
  losses INTEGER,
  goals INTEGER,
  assists INTEGER,
  yellow_cards INTEGER,
  red_cards INTEGER,
  current_wage TEXT,
  current_value TEXT,
  clubs_count INTEGER,
  league_titles INTEGER,
  domestic_cups_won INTEGER,
  continental_cups_won INTEGER,
  source TEXT,
  source_media_id UUID,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Season statistics table (FIFA season summary data)
CREATE TABLE career_seasons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  season_name TEXT NOT NULL,
  start_year INTEGER NOT NULL,
  end_year INTEGER NOT NULL,
  club_id UUID REFERENCES clubs(id),
  overall_rating INTEGER,
  energy INTEGER,
  form DECIMAL,
  rank INTEGER,
  role TEXT,
  league_position TEXT,
  average_rating DECIMAL,
  appearances INTEGER,
  wins INTEGER,
  draws INTEGER,
  losses INTEGER,
  goals INTEGER,
  assists INTEGER,
  yellow_cards INTEGER,
  red_cards INTEGER,
  man_of_the_match INTEGER,
  team_of_the_week INTEGER,
  player_of_the_month INTEGER,
  player_of_the_year BOOLEAN,
  league_result TEXT,
  champions_league_result TEXT,
  domestic_cup_result TEXT,
  other_competition_result TEXT,
  current_wage TEXT,
  current_value TEXT,
  notes TEXT,
  source TEXT,
  source_media_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Club career history
CREATE TABLE player_club_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  club_id UUID NOT NULL REFERENCES clubs(id),
  joined_date TIMESTAMP WITH TIME ZONE,
  left_date TIMESTAMP WITH TIME ZONE,
  season_start INTEGER,
  season_end INTEGER,
  transfer_id UUID REFERENCES transfers(id),
  shirt_number INTEGER,
  role TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Club career statistics
CREATE TABLE club_career_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  club_id UUID NOT NULL REFERENCES clubs(id),
  appearances INTEGER,
  wins INTEGER,
  draws INTEGER,
  losses INTEGER,
  goals INTEGER,
  assists INTEGER,
  average_rating DECIMAL,
  motm INTEGER,
  totw INTEGER,
  potm INTEGER,
  poty BOOLEAN,
  league_titles INTEGER,
  domestic_cups INTEGER,
  continental_cups INTEGER,
  yellow_cards INTEGER,
  red_cards INTEGER,
  value_at_club TEXT,
  wage_at_club TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Season competition statistics
CREATE TABLE season_competition_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  season_id UUID NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
  club_id UUID REFERENCES clubs(id),
  competition_id UUID NOT NULL REFERENCES competitions(id),
  appearances INTEGER,
  goals INTEGER,
  assists INTEGER,
  wins INTEGER,
  draws INTEGER,
  losses INTEGER,
  average_rating DECIMAL,
  competition_result TEXT,
  motm INTEGER,
  source TEXT,
  source_media_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- International career
CREATE TABLE international_career (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  country TEXT NOT NULL,
  caps INTEGER DEFAULT 0,
  goals INTEGER DEFAULT 0,
  assists INTEGER DEFAULT 0,
  tournaments_won INTEGER DEFAULT 0,
  world_cups_won INTEGER DEFAULT 0,
  current_status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- International tournaments
CREATE TABLE international_tournaments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  country TEXT NOT NULL,
  tournament_name TEXT NOT NULL,
  year INTEGER NOT NULL,
  appearances INTEGER,
  goals INTEGER,
  assists INTEGER,
  winner BOOLEAN DEFAULT FALSE,
  runner_up BOOLEAN DEFAULT FALSE,
  final_opponent TEXT,
  final_score TEXT,
  player_of_tournament BOOLEAN DEFAULT FALSE,
  golden_boot BOOLEAN DEFAULT FALSE,
  source_media_id UUID,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Player financial snapshots
CREATE TABLE player_financial_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  season_id UUID REFERENCES seasons(id),
  club_id UUID REFERENCES clubs(id),
  wage TEXT NOT NULL,
  wage_period TEXT DEFAULT 'week',
  market_value TEXT,
  currency TEXT DEFAULT 'EUR',
  snapshot_date TIMESTAMP WITH TIME ZONE NOT NULL,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Player status snapshots (form, energy, rank history)
CREATE TABLE player_status_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  season_id UUID REFERENCES seasons(id),
  status_date TIMESTAMP WITH TIME ZONE NOT NULL,
  overall INTEGER,
  energy INTEGER,
  form DECIMAL,
  rank INTEGER,
  injury_status TEXT,
  suspension_status TEXT,
  club_id UUID REFERENCES clubs(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Injury records
CREATE TABLE injuries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  injury_type TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  expected_return_date TIMESTAMP WITH TIME ZONE,
  actual_return_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Suspension records
CREATE TABLE suspensions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  suspension_type TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  reason TEXT,
  competition_id UUID REFERENCES competitions(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Player attributes (individual attributes)
CREATE TABLE player_attributes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  attribute_snapshot_id UUID REFERENCES attribute_snapshots(id),
  acceleration INTEGER,
  sprint_speed INTEGER,
  finishing INTEGER,
  shot_power INTEGER,
  long_shots INTEGER,
  volleys INTEGER,
  penalties INTEGER,
  heading_accuracy INTEGER,
  vision INTEGER,
  short_passing INTEGER,
  long_passing INTEGER,
  crossing INTEGER,
  curve INTEGER,
  dribbling INTEGER,
  ball_control INTEGER,
  agility INTEGER,
  balance INTEGER,
  reactions INTEGER,
  strength INTEGER,
  stamina INTEGER,
  jumping INTEGER,
  aggression INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Player perks
CREATE TABLE player_perks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  perk_name TEXT NOT NULL,
  category TEXT,
  equipped BOOLEAN DEFAULT FALSE,
  unlocked BOOLEAN DEFAULT FALSE,
  unlock_date TIMESTAMP WITH TIME ZONE,
  source TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Match detailed statistics
CREATE TABLE match_statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  shots INTEGER,
  shots_on_target INTEGER,
  passes INTEGER,
  pass_accuracy DECIMAL,
  dribbles INTEGER,
  tackles INTEGER,
  fouls_committed INTEGER,
  fouls_suffered INTEGER,
  offsides INTEGER,
  clearances INTEGER,
  interceptions INTEGER,
  saves INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Award records (individual awards, not just counts)
CREATE TABLE award_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  award_id UUID REFERENCES awards(id),
  award_type TEXT NOT NULL,
  award_name TEXT NOT NULL,
  match_id UUID REFERENCES matches(id),
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  club_id UUID REFERENCES clubs(id),
  competition_id UUID REFERENCES competitions(id),
  country TEXT,
  source TEXT,
  source_media_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Career milestones
CREATE TABLE career_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  milestone_type TEXT NOT NULL,
  milestone_name TEXT NOT NULL,
  achieved_date TIMESTAMP WITH TIME ZONE NOT NULL,
  season_id UUID REFERENCES seasons(id),
  club_id UUID REFERENCES clubs(id),
  competition_id UUID REFERENCES competitions(id),
  value INTEGER,
  description TEXT,
  source_media_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Career records (dynamic records)
CREATE TABLE career_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  record_name TEXT NOT NULL,
  record_value TEXT NOT NULL,
  record_unit TEXT,
  record_category TEXT NOT NULL,
  season_id UUID REFERENCES seasons(id),
  match_id UUID REFERENCES matches(id),
  achieved_date TIMESTAMP WITH TIME ZONE,
  is_calculated BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  verification_status TEXT,
  source_media_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for new tables
CREATE INDEX idx_career_snapshots_career_id ON career_snapshots(career_id);
CREATE INDEX idx_career_snapshots_date ON career_snapshots(snapshot_date DESC);
CREATE INDEX idx_career_seasons_career_id ON career_seasons(career_id);
CREATE INDEX idx_player_club_history_career_id ON player_club_history(career_id);
CREATE INDEX idx_club_career_stats_career_id ON club_career_stats(career_id);
CREATE INDEX idx_season_competition_stats_career_id ON season_competition_stats(career_id);
CREATE INDEX idx_international_career_career_id ON international_career(career_id);
CREATE INDEX idx_international_tournaments_career_id ON international_tournaments(career_id);
CREATE INDEX idx_player_financial_snapshots_career_id ON player_financial_snapshots(career_id);
CREATE INDEX idx_player_status_snapshots_career_id ON player_status_snapshots(career_id);
CREATE INDEX idx_injuries_career_id ON injuries(career_id);
CREATE INDEX idx_suspensions_career_id ON suspensions(career_id);
CREATE INDEX idx_player_attributes_career_id ON player_attributes(career_id);
CREATE INDEX idx_player_perks_career_id ON player_perks(career_id);
CREATE INDEX idx_award_records_career_id ON award_records(career_id);
CREATE INDEX idx_career_milestones_career_id ON career_milestones(career_id);
CREATE INDEX idx_career_records_career_id ON career_records(career_id);

-- Enable RLS on new tables
ALTER TABLE career_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_club_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_career_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE season_competition_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE international_career ENABLE ROW LEVEL SECURITY;
ALTER TABLE international_tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_financial_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_status_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE injuries ENABLE ROW LEVEL SECURITY;
ALTER TABLE suspensions ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_attributes ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_perks ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE award_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies for new tables
CREATE POLICY "Users can manage career snapshots" ON career_snapshots
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage career seasons" ON career_seasons
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage club history" ON player_club_history
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage club stats" ON club_career_stats
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage competition stats" ON season_competition_stats
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage international career" ON international_career
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage international tournaments" ON international_tournaments
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage financial snapshots" ON player_financial_snapshots
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage status snapshots" ON player_status_snapshots
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage injuries" ON injuries
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage suspensions" ON suspensions
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage attributes" ON player_attributes
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage perks" ON player_perks
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage match stats" ON match_statistics
  FOR ALL USING (
    match_id IN (
      SELECT id FROM matches WHERE career_id IN (
        SELECT id FROM careers WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can manage award records" ON award_records
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage milestones" ON career_milestones
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage career records" ON career_records
  FOR ALL USING (
    career_id IN (SELECT id FROM careers WHERE user_id = auth.uid())
  );

-- Allow everyone to read clubs and competitions
ALTER TABLE clubs DISABLE ROW LEVEL SECURITY;
ALTER TABLE competitions DISABLE ROW LEVEL SECURITY;
ALTER TABLE archetypes DISABLE ROW LEVEL SECURITY;
