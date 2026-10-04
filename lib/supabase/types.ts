// Database types for PITCHVAULT - FIFA 22 Career Archive
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          display_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      careers: {
        Row: {
          id: string
          user_id: string
          name: string
          game_version: string
          description: string | null
          status: 'active' | 'archived' | 'deleted'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          game_version: string
          description?: string | null
          status?: 'active' | 'archived' | 'deleted'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          game_version?: string
          description?: string | null
          status?: 'active' | 'archived' | 'deleted'
          created_at?: string
          updated_at?: string
        }
      }
      players: {
        Row: {
          id: string
          career_id: string
          name: string
          short_name: string | null
          position: string
          nationality: string
          date_of_birth: string | null
          age: number
          preferred_foot: 'left' | 'right' | null
          jersey_number: number | null
          height: number | null
          weight: number | null
          current_ovr: number
          current_level: number | null
          current_club_id: string | null
          player_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          career_id: string
          name: string
          short_name?: string | null
          position: string
          nationality: string
          date_of_birth?: string | null
          age: number
          preferred_foot?: 'left' | 'right' | null
          jersey_number?: number | null
          height?: number | null
          weight?: number | null
          current_ovr?: number
          current_level?: number | null
          current_club_id?: string | null
          player_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          name?: string
          short_name?: string | null
          position?: string
          nationality?: string
          date_of_birth?: string | null
          age?: number
          preferred_foot?: 'left' | 'right' | null
          jersey_number?: number | null
          height?: number | null
          weight?: number | null
          current_ovr?: number
          current_level?: number | null
          current_club_id?: string | null
          player_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      clubs: {
        Row: {
          id: string
          name: string
          short_name: string | null
          country: string
          league: string | null
          logo_url: string | null
          primary_color: string | null
          secondary_color: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          short_name?: string | null
          country: string
          league?: string | null
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          short_name?: string | null
          country?: string
          league?: string | null
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          created_at?: string
        }
      }
      competitions: {
        Row: {
          id: string
          name: string
          country: string | null
          competition_type: string
          logo_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          country?: string | null
          competition_type: string
          logo_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          country?: string | null
          competition_type?: string
          logo_url?: string | null
          created_at?: string
        }
      }
      seasons: {
        Row: {
          id: string
          career_id: string
          name: string
          start_year: number
          end_year: number
          current_club_id: string | null
          appearances: number
          goals: number
          assists: number
          average_rating: number | null
          wins: number
          draws: number
          losses: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          career_id: string
          name: string
          start_year: number
          end_year: number
          current_club_id?: string | null
          appearances?: number
          goals?: number
          assists?: number
          average_rating?: number | null
          wins?: number
          draws?: number
          losses?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          name?: string
          start_year?: number
          end_year?: number
          current_club_id?: string | null
          appearances?: number
          goals?: number
          assists?: number
          average_rating?: number | null
          wins?: number
          draws?: number
          losses?: number
          created_at?: string
          updated_at?: string
        }
      }
      matches: {
        Row: {
          id: string
          career_id: string
          season_id: string
          club_id: string
          competition_id: string
          date: string
          opponent: string
          opponent_logo_url: string | null
          match_image_url: string | null
          home_away: 'home' | 'away'
          player_team_score: number
          opponent_score: number
          result: 'win' | 'draw' | 'loss'
          player_rating: number
          goals: number
          assists: number
          minutes_played: number
          is_motm: boolean
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          career_id: string
          season_id: string
          club_id: string
          competition_id: string
          date: string
          opponent: string
          opponent_logo_url?: string | null
          match_image_url?: string | null
          home_away: 'home' | 'away'
          player_team_score: number
          opponent_score: number
          result: 'win' | 'draw' | 'loss'
          player_rating: number
          goals: number
          assists: number
          minutes_played: number
          is_motm?: boolean
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          season_id?: string
          club_id?: string
          competition_id?: string
          date?: string
          opponent?: string
          opponent_logo_url?: string | null
          match_image_url?: string | null
          home_away?: 'home' | 'away'
          player_team_score?: number
          opponent_score?: number
          result?: 'win' | 'draw' | 'loss'
          player_rating?: number
          goals?: number
          assists?: number
          minutes_played?: number
          is_motm?: boolean
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      transfers: {
        Row: {
          id: string
          career_id: string
          player_id: string
          from_club_id: string | null
          to_club_id: string
          transfer_date: string
          season_id: string | null
          transfer_fee: number | null
          currency: string | null
          transfer_type: 'permanent' | 'loan' | 'free' | 'youth_promotion' | 'other'
          transfer_image_url: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          career_id: string
          player_id: string
          from_club_id?: string | null
          to_club_id: string
          transfer_date: string
          season_id?: string | null
          transfer_fee?: number | null
          currency?: string | null
          transfer_type?: 'permanent' | 'loan' | 'free' | 'youth_promotion' | 'other'
          transfer_image_url?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          player_id?: string
          from_club_id?: string | null
          to_club_id?: string
          transfer_date?: string
          season_id?: string | null
          transfer_fee?: number | null
          currency?: string | null
          transfer_type?: 'permanent' | 'loan' | 'free' | 'youth_promotion' | 'other'
          transfer_image_url?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      trophies: {
        Row: {
          id: string
          career_id: string
          competition_id: string
          season_id: string | null
          club_id: string
          country: string | null
          winner: boolean
          date: string | null
          trophy_image_url: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          career_id: string
          competition_id: string
          season_id?: string | null
          club_id: string
          country?: string | null
          winner?: boolean
          date?: string | null
          trophy_image_url?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          competition_id?: string
          season_id?: string | null
          club_id?: string
          country?: string | null
          winner?: boolean
          date?: string | null
          trophy_image_url?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      awards: {
        Row: {
          id: string
          career_id: string
          name: string
          season_id: string | null
          competition_id: string | null
          date: string
          category: string
          award_image_url: string | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          career_id: string
          name: string
          season_id?: string | null
          competition_id?: string | null
          date: string
          category: string
          award_image_url?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          name?: string
          season_id?: string | null
          competition_id?: string | null
          date?: string
          category?: string
          award_image_url?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      attribute_snapshots: {
        Row: {
          id: string
          career_id: string
          player_id: string
          date: string
          season_id: string | null
          overall: number
          pace: number
          shooting: number
          passing: number
          dribbling: number
          defending: number
          physical: number
          level: number | null
          skill_points: number | null
          attribute_image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          career_id: string
          player_id: string
          date: string
          season_id?: string | null
          overall: number
          pace: number
          shooting: number
          passing: number
          dribbling: number
          defending: number
          physical: number
          level?: number | null
          skill_points?: number | null
          attribute_image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          player_id?: string
          date?: string
          season_id?: string | null
          overall?: number
          pace?: number
          shooting?: number
          passing?: number
          dribbling?: number
          defending?: number
          physical?: number
          level?: number | null
          skill_points?: number | null
          attribute_image_url?: string | null
          created_at?: string
        }
      }
      archetypes: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string | null
          created_at?: string
        }
      }
      player_archetypes: {
        Row: {
          id: string
          player_id: string
          archetype_id: string
          status: 'locked' | 'unlocked'
          unlocked_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          player_id: string
          archetype_id: string
          status?: 'locked' | 'unlocked'
          unlocked_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          player_id?: string
          archetype_id?: string
          status?: 'locked' | 'unlocked'
          unlocked_at?: string | null
          created_at?: string
        }
      }
      timeline_events: {
        Row: {
          id: string
          career_id: string
          date: string
          season_id: string | null
          type: string
          title: string
          description: string | null
          club_id: string | null
          competition_id: string | null
          importance: 'low' | 'normal' | 'high' | 'legendary'
          event_image_url: string | null
          media_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          career_id: string
          date: string
          season_id?: string | null
          type: string
          title: string
          description?: string | null
          club_id?: string | null
          competition_id?: string | null
          importance?: 'low' | 'normal' | 'high' | 'legendary'
          event_image_url?: string | null
          media_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          date?: string
          season_id?: string | null
          type?: string
          title?: string
          description?: string | null
          club_id?: string | null
          competition_id?: string | null
          importance?: 'low' | 'normal' | 'high' | 'legendary'
          event_image_url?: string | null
          media_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      news: {
        Row: {
          id: string
          career_id: string
          date: string
          headline: string
          subheadline: string | null
          body: string | null
          category: string
          image_url: string | null
          club_id: string | null
          competition_id: string | null
          timeline_event_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          career_id: string
          date: string
          headline: string
          subheadline?: string | null
          body?: string | null
          category: string
          image_url?: string | null
          club_id?: string | null
          competition_id?: string | null
          timeline_event_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          date?: string
          headline?: string
          subheadline?: string | null
          body?: string | null
          category?: string
          image_url?: string | null
          club_id?: string | null
          competition_id?: string | null
          timeline_event_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      media: {
        Row: {
          id: string
          career_id: string
          user_id: string
          file_path: string
          public_url: string
          file_name: string
          mime_type: string
          file_size: number
          title: string | null
          description: string | null
          category: string
          date: string
          season_id: string | null
          match_id: string | null
          transfer_id: string | null
          trophy_id: string | null
          award_id: string | null
          timeline_event_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          career_id: string
          user_id: string
          file_path: string
          public_url: string
          file_name: string
          mime_type: string
          file_size: number
          title?: string | null
          description?: string | null
          category: string
          date: string
          season_id?: string | null
          match_id?: string | null
          transfer_id?: string | null
          trophy_id?: string | null
          award_id?: string | null
          timeline_event_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          user_id?: string
          file_path?: string
          public_url?: string
          file_name?: string
          mime_type?: string
          file_size?: number
          title?: string | null
          description?: string | null
          category?: string
          date?: string
          season_id?: string | null
          match_id?: string | null
          transfer_id?: string | null
          trophy_id?: string | null
          award_id?: string | null
          timeline_event_id?: string | null
          created_at?: string
        }
      }
      records: {
        Row: {
          id: string
          career_id: string
          name: string
          value: string
          unit: string | null
          category: string
          season_id: string | null
          match_id: string | null
          date: string | null
          description: string | null
          is_automatic: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          career_id: string
          name: string
          value: string
          unit?: string | null
          category: string
          season_id?: string | null
          match_id?: string | null
          date?: string | null
          description?: string | null
          is_automatic?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          name?: string
          value?: string
          unit?: string | null
          category?: string
          season_id?: string | null
          match_id?: string | null
          date?: string | null
          description?: string | null
          is_automatic?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      career_snapshots: {
        Row: {
          id: string
          career_id: string
          snapshot_date: string
          season_id: string | null
          club_id: string | null
          overall_rating: number
          player_name: string
          position: string
          energy: number | null
          form: number | null
          rank: number | null
          injury_status: string | null
          suspension_status: string | null
          role: string | null
          league_position: string | null
          average_rating: number | null
          league_result: string | null
          champions_league_result: string | null
          domestic_cup_result: string | null
          other_competition_result: string | null
          man_of_the_match: number
          team_of_the_week: number
          player_of_the_month: number
          player_of_the_year: boolean
          appearances: number | null
          wins: number | null
          draws: number | null
          losses: number | null
          goals: number | null
          assists: number | null
          yellow_cards: number | null
          red_cards: number | null
          current_wage: string | null
          current_value: string | null
          clubs_count: number | null
          league_titles: number | null
          domestic_cups_won: number | null
          continental_cups_won: number | null
          source: string | null
          source_media_id: string | null
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          career_id: string
          snapshot_date: string
          season_id?: string | null
          club_id?: string | null
          overall_rating: number
          player_name: string
          position: string
          energy?: number | null
          form?: number | null
          rank?: number | null
          injury_status?: string | null
          suspension_status?: string | null
          role?: string | null
          league_position?: string | null
          average_rating?: number | null
          league_result?: string | null
          champions_league_result?: string | null
          domestic_cup_result?: string | null
          other_competition_result?: string | null
          man_of_the_match?: number
          team_of_the_week?: number
          player_of_the_month?: number
          player_of_the_year?: boolean
          appearances?: number | null
          wins?: number | null
          draws?: number | null
          losses?: number | null
          goals?: number | null
          assists?: number | null
          yellow_cards?: number | null
          red_cards?: number | null
          current_wage?: string | null
          current_value?: string | null
          clubs_count?: number | null
          league_titles?: number | null
          domestic_cups_won?: number | null
          continental_cups_won?: number | null
          source?: string | null
          source_media_id?: string | null
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          snapshot_date?: string
          season_id?: string | null
          club_id?: string | null
          overall_rating?: number
          player_name?: string
          position?: string
          energy?: number | null
          form?: number | null
          rank?: number | null
          injury_status?: string | null
          suspension_status?: string | null
          role?: string | null
          league_position?: string | null
          average_rating?: number | null
          league_result?: string | null
          champions_league_result?: string | null
          domestic_cup_result?: string | null
          other_competition_result?: string | null
          man_of_the_match?: number
          team_of_the_week?: number
          player_of_the_month?: number
          player_of_the_year?: boolean
          appearances?: number | null
          wins?: number | null
          draws?: number | null
          losses?: number | null
          goals?: number | null
          assists?: number | null
          yellow_cards?: number | null
          red_cards?: number | null
          current_wage?: string | null
          current_value?: string | null
          clubs_count?: number | null
          league_titles?: number | null
          domestic_cups_won?: number | null
          continental_cups_won?: number | null
          source?: string | null
          source_media_id?: string | null
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      career_seasons: {
        Row: {
          id: string
          career_id: string
          season_name: string
          start_year: number
          end_year: number
          club_id: string | null
          overall_rating: number | null
          energy: number | null
          form: number | null
          rank: number | null
          role: string | null
          league_position: string | null
          average_rating: number | null
          appearances: number | null
          wins: number | null
          draws: number | null
          losses: number | null
          goals: number | null
          assists: number | null
          yellow_cards: number | null
          red_cards: number | null
          man_of_the_match: number | null
          team_of_the_week: number | null
          player_of_the_month: number | null
          player_of_the_year: boolean | null
          league_result: string | null
          champions_league_result: string | null
          domestic_cup_result: string | null
          other_competition_result: string | null
          current_wage: string | null
          current_value: string | null
          notes: string | null
          source: string | null
          source_media_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          career_id: string
          season_name: string
          start_year: number
          end_year: number
          club_id?: string | null
          overall_rating?: number | null
          energy?: number | null
          form?: number | null
          rank?: number | null
          role?: string | null
          league_position?: string | null
          average_rating?: number | null
          appearances?: number | null
          wins?: number | null
          draws?: number | null
          losses?: number | null
          goals?: number | null
          assists?: number | null
          yellow_cards?: number | null
          red_cards?: number | null
          man_of_the_match?: number | null
          team_of_the_week?: number | null
          player_of_the_month?: number | null
          player_of_the_year?: boolean | null
          league_result?: string | null
          champions_league_result?: string | null
          domestic_cup_result?: string | null
          other_competition_result?: string | null
          current_wage?: string | null
          current_value?: string | null
          notes?: string | null
          source?: string | null
          source_media_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          season_name?: string
          start_year?: number
          end_year?: number
          club_id?: string | null
          overall_rating?: number | null
          energy?: number | null
          form?: number | null
          rank?: number | null
          role?: string | null
          league_position?: string | null
          average_rating?: number | null
          appearances?: number | null
          wins?: number | null
          draws?: number | null
          losses?: number | null
          goals?: number | null
          assists?: number | null
          yellow_cards?: number | null
          red_cards?: number | null
          man_of_the_match?: number | null
          team_of_the_week?: number | null
          player_of_the_month?: number | null
          player_of_the_year?: boolean | null
          league_result?: string | null
          champions_league_result?: string | null
          domestic_cup_result?: string | null
          other_competition_result?: string | null
          current_wage?: string | null
          current_value?: string | null
          notes?: string | null
          source?: string | null
          source_media_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      player_club_history: {
        Row: {
          id: string
          career_id: string
          club_id: string
          joined_date: string | null
          left_date: string | null
          season_start: number | null
          season_end: number | null
          transfer_id: string | null
          shirt_number: number | null
          role: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          career_id: string
          club_id: string
          joined_date?: string | null
          left_date?: string | null
          season_start?: number | null
          season_end?: number | null
          transfer_id?: string | null
          shirt_number?: number | null
          role?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          club_id?: string
          joined_date?: string | null
          left_date?: string | null
          season_start?: number | null
          season_end?: number | null
          transfer_id?: string | null
          shirt_number?: number | null
          role?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      club_career_stats: {
        Row: {
          id: string
          career_id: string
          club_id: string
          appearances: number | null
          wins: number | null
          draws: number | null
          losses: number | null
          goals: number | null
          assists: number | null
          average_rating: number | null
          motm: number | null
          totw: number | null
          potm: number | null
          poty: boolean | null
          league_titles: number | null
          domestic_cups: number | null
          continental_cups: number | null
          yellow_cards: number | null
          red_cards: number | null
          value_at_club: string | null
          wage_at_club: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          career_id: string
          club_id: string
          appearances?: number | null
          wins?: number | null
          draws?: number | null
          losses?: number | null
          goals?: number | null
          assists?: number | null
          average_rating?: number | null
          motm?: number | null
          totw?: number | null
          potm?: number | null
          poty?: boolean | null
          league_titles?: number | null
          domestic_cups?: number | null
          continental_cups?: number | null
          yellow_cards?: number | null
          red_cards?: number | null
          value_at_club?: string | null
          wage_at_club?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          club_id?: string
          appearances?: number | null
          wins?: number | null
          draws?: number | null
          losses?: number | null
          goals?: number | null
          assists?: number | null
          average_rating?: number | null
          motm?: number | null
          totw?: number | null
          potm?: number | null
          poty?: boolean | null
          league_titles?: number | null
          domestic_cups?: number | null
          continental_cups?: number | null
          yellow_cards?: number | null
          red_cards?: number | null
          value_at_club?: string | null
          wage_at_club?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      season_competition_stats: {
        Row: {
          id: string
          career_id: string
          season_id: string
          club_id: string | null
          competition_id: string
          appearances: number | null
          goals: number | null
          assists: number | null
          wins: number | null
          draws: number | null
          losses: number | null
          average_rating: number | null
          competition_result: string | null
          motm: number | null
          source: string | null
          source_media_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          career_id: string
          season_id: string
          club_id?: string | null
          competition_id: string
          appearances?: number | null
          goals?: number | null
          assists?: number | null
          wins?: number | null
          draws?: number | null
          losses?: number | null
          average_rating?: number | null
          competition_result?: string | null
          motm?: number | null
          source?: string | null
          source_media_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          season_id?: string
          club_id?: string | null
          competition_id?: string
          appearances?: number | null
          goals?: number | null
          assists?: number | null
          wins?: number | null
          draws?: number | null
          losses?: number | null
          average_rating?: number | null
          competition_result?: string | null
          motm?: number | null
          source?: string | null
          source_media_id?: string | null
          created_at?: string
        }
      }
      international_career: {
        Row: {
          id: string
          career_id: string
          country: string
          caps: number
          goals: number
          assists: number
          tournaments_won: number
          world_cups_won: number
          current_status: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          career_id: string
          country: string
          caps?: number
          goals?: number
          assists?: number
          tournaments_won?: number
          world_cups_won?: number
          current_status?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          country?: string
          caps?: number
          goals?: number
          assists?: number
          tournaments_won?: number
          world_cups_won?: number
          current_status?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      international_tournaments: {
        Row: {
          id: string
          career_id: string
          country: string
          tournament_name: string
          year: number
          appearances: number | null
          goals: number | null
          assists: number | null
          winner: boolean
          runner_up: boolean
          final_opponent: string | null
          final_score: string | null
          player_of_tournament: boolean
          golden_boot: boolean
          source_media_id: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          career_id: string
          country: string
          tournament_name: string
          year: number
          appearances?: number | null
          goals?: number | null
          assists?: number | null
          winner?: boolean
          runner_up?: boolean
          final_opponent?: string | null
          final_score?: string | null
          player_of_tournament?: boolean
          golden_boot?: boolean
          source_media_id?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          country?: string
          tournament_name?: string
          year?: number
          appearances?: number | null
          goals?: number | null
          assists?: number | null
          winner?: boolean
          runner_up?: boolean
          final_opponent?: string | null
          final_score?: string | null
          player_of_tournament?: boolean
          golden_boot?: boolean
          source_media_id?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      player_financial_snapshots: {
        Row: {
          id: string
          career_id: string
          season_id: string | null
          club_id: string | null
          wage: string
          wage_period: string
          market_value: string | null
          currency: string
          snapshot_date: string
          source: string | null
          created_at: string
        }
        Insert: {
          id?: string
          career_id: string
          season_id?: string | null
          club_id?: string | null
          wage: string
          wage_period?: string
          market_value?: string | null
          currency?: string
          snapshot_date: string
          source?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          season_id?: string | null
          club_id?: string | null
          wage?: string
          wage_period?: string
          market_value?: string | null
          currency?: string
          snapshot_date?: string
          source?: string | null
          created_at?: string
        }
      }
      player_status_snapshots: {
        Row: {
          id: string
          career_id: string
          season_id: string | null
          status_date: string
          overall: number | null
          energy: number | null
          form: number | null
          rank: number | null
          injury_status: string | null
          suspension_status: string | null
          club_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          career_id: string
          season_id?: string | null
          status_date: string
          overall?: number | null
          energy?: number | null
          form?: number | null
          rank?: number | null
          injury_status?: string | null
          suspension_status?: string | null
          club_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          season_id?: string | null
          status_date?: string
          overall?: number | null
          energy?: number | null
          form?: number | null
          rank?: number | null
          injury_status?: string | null
          suspension_status?: string | null
          club_id?: string | null
          created_at?: string
        }
      }
      injuries: {
        Row: {
          id: string
          career_id: string
          injury_type: string
          start_date: string
          expected_return_date: string | null
          actual_return_date: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          career_id: string
          injury_type: string
          start_date: string
          expected_return_date?: string | null
          actual_return_date?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          injury_type?: string
          start_date?: string
          expected_return_date?: string | null
          actual_return_date?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      suspensions: {
        Row: {
          id: string
          career_id: string
          suspension_type: string
          start_date: string
          end_date: string | null
          reason: string | null
          competition_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          career_id: string
          suspension_type: string
          start_date: string
          end_date?: string | null
          reason?: string | null
          competition_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          suspension_type?: string
          start_date?: string
          end_date?: string | null
          reason?: string | null
          competition_id?: string | null
          created_at?: string
        }
      }
      player_attributes: {
        Row: {
          id: string
          career_id: string
          attribute_snapshot_id: string | null
          acceleration: number | null
          sprint_speed: number | null
          finishing: number | null
          shot_power: number | null
          long_shots: number | null
          volleys: number | null
          penalties: number | null
          heading_accuracy: number | null
          vision: number | null
          short_passing: number | null
          long_passing: number | null
          crossing: number | null
          curve: number | null
          dribbling: number | null
          ball_control: number | null
          agility: number | null
          balance: number | null
          reactions: number | null
          strength: number | null
          stamina: number | null
          jumping: number | null
          aggression: number | null
          created_at: string
        }
        Insert: {
          id?: string
          career_id: string
          attribute_snapshot_id?: string | null
          acceleration?: number | null
          sprint_speed?: number | null
          finishing?: number | null
          shot_power?: number | null
          long_shots?: number | null
          volleys?: number | null
          penalties?: number | null
          heading_accuracy?: number | null
          vision?: number | null
          short_passing?: number | null
          long_passing?: number | null
          crossing?: number | null
          curve?: number | null
          dribbling?: number | null
          ball_control?: number | null
          agility?: number | null
          balance?: number | null
          reactions?: number | null
          strength?: number | null
          stamina?: number | null
          jumping?: number | null
          aggression?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          attribute_snapshot_id?: string | null
          acceleration?: number | null
          sprint_speed?: number | null
          finishing?: number | null
          shot_power?: number | null
          long_shots?: number | null
          volleys?: number | null
          penalties?: number | null
          heading_accuracy?: number | null
          vision?: number | null
          short_passing?: number | null
          long_passing?: number | null
          crossing?: number | null
          curve?: number | null
          dribbling?: number | null
          ball_control?: number | null
          agility?: number | null
          balance?: number | null
          reactions?: number | null
          strength?: number | null
          stamina?: number | null
          jumping?: number | null
          aggression?: number | null
          created_at?: string
        }
      }
      player_perks: {
        Row: {
          id: string
          career_id: string
          perk_name: string
          category: string | null
          equipped: boolean
          unlocked: boolean
          unlock_date: string | null
          source: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          career_id: string
          perk_name: string
          category?: string | null
          equipped?: boolean
          unlocked?: boolean
          unlock_date?: string | null
          source?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          perk_name?: string
          category?: string | null
          equipped?: boolean
          unlocked?: boolean
          unlock_date?: string | null
          source?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      match_statistics: {
        Row: {
          id: string
          match_id: string
          shots: number | null
          shots_on_target: number | null
          passes: number | null
          pass_accuracy: number | null
          dribbles: number | null
          tackles: number | null
          fouls_committed: number | null
          fouls_suffered: number | null
          offsides: number | null
          clearances: number | null
          interceptions: number | null
          saves: number | null
          created_at: string
        }
        Insert: {
          id?: string
          match_id: string
          shots?: number | null
          shots_on_target?: number | null
          passes?: number | null
          pass_accuracy?: number | null
          dribbles?: number | null
          tackles?: number | null
          fouls_committed?: number | null
          fouls_suffered?: number | null
          offsides?: number | null
          clearances?: number | null
          interceptions?: number | null
          saves?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          match_id?: string
          shots?: number | null
          shots_on_target?: number | null
          passes?: number | null
          pass_accuracy?: number | null
          dribbles?: number | null
          tackles?: number | null
          fouls_committed?: number | null
          fouls_suffered?: number | null
          offsides?: number | null
          clearances?: number | null
          interceptions?: number | null
          saves?: number | null
          created_at?: string
        }
      }
      award_records: {
        Row: {
          id: string
          career_id: string
          award_id: string | null
          award_type: string
          award_name: string
          match_id: string | null
          date: string
          club_id: string | null
          competition_id: string | null
          country: string | null
          source: string | null
          source_media_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          career_id: string
          award_id?: string | null
          award_type: string
          award_name: string
          match_id?: string | null
          date: string
          club_id?: string | null
          competition_id?: string | null
          country?: string | null
          source?: string | null
          source_media_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          award_id?: string | null
          award_type?: string
          award_name?: string
          match_id?: string | null
          date?: string
          club_id?: string | null
          competition_id?: string | null
          country?: string | null
          source?: string | null
          source_media_id?: string | null
          created_at?: string
        }
      }
      career_milestones: {
        Row: {
          id: string
          career_id: string
          milestone_type: string
          milestone_name: string
          achieved_date: string
          season_id: string | null
          club_id: string | null
          competition_id: string | null
          value: number | null
          description: string | null
          source_media_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          career_id: string
          milestone_type: string
          milestone_name: string
          achieved_date: string
          season_id?: string | null
          club_id?: string | null
          competition_id?: string | null
          value?: number | null
          description?: string | null
          source_media_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          milestone_type?: string
          milestone_name?: string
          achieved_date?: string
          season_id?: string | null
          club_id?: string | null
          competition_id?: string | null
          value?: number | null
          description?: string | null
          source_media_id?: string | null
          created_at?: string
        }
      }
      career_records: {
        Row: {
          id: string
          career_id: string
          record_name: string
          record_value: string
          record_unit: string | null
          record_category: string
          season_id: string | null
          match_id: string | null
          achieved_date: string | null
          is_calculated: boolean
          is_verified: boolean
          verification_status: string | null
          source_media_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          career_id: string
          record_name: string
          record_value: string
          record_unit?: string | null
          record_category: string
          season_id?: string | null
          match_id?: string | null
          achieved_date?: string | null
          is_calculated?: boolean
          is_verified?: boolean
          verification_status?: string | null
          source_media_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          career_id?: string
          record_name?: string
          record_value?: string
          record_unit?: string | null
          record_category?: string
          season_id?: string | null
          match_id?: string | null
          achieved_date?: string | null
          is_calculated?: boolean
          is_verified?: boolean
          verification_status?: string | null
          source_media_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
