import { supabase } from '@/lib/supabase/client'

export interface CareerStats {
  totalAppearances: number
  totalGoals: number
  totalAssists: number
  averageRating: number | null
  totalWins: number
  totalDraws: number
  totalLosses: number
  winRate: number
  goalsPerMatch: number
  assistsPerMatch: number
  motmCount: number
}

export async function calculateCareerStats(careerIdId: string): Promise<CareerStats> {
  const { data: matches, error } = await supabase
    .from('matches')
    .select('*')
    .eq('career_id', careerIdId)

  if (error) throw new Error(`Failed to fetch matches for stats: ${error.message}`)

  if (!matches || matches.length === 0) {
    return {
      totalAppearances: 0,
      totalGoals: 0,
      totalAssists: 0,
      averageRating: null,
      totalWins: 0,
      totalDraws: 0,
      totalLosses: 0,
      winRate: 0,
      goalsPerMatch: 0,
      assistsPerMatch: 0,
      motmCount: 0,
    }
  }

  const totalAppearances = matches.length
  const totalGoals = matches.reduce((sum, m) => sum + (m.goals || 0), 0)
  const totalAssists = matches.reduce((sum, m) => sum + (m.assists || 0), 0)
  const totalWins = matches.filter((m) => m.result === 'win').length
  const totalDraws = matches.filter((m) => m.result === 'draw').length
  const totalLosses = matches.filter((m) => m.result === 'loss').length
  const motmCount = matches.filter((m) => m.is_motm).length

  const ratings = matches.filter((m) => m.player_rating).map((m) => m.player_rating)
  const averageRating = ratings.length > 0 ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length : null

  return {
    totalAppearances,
    totalGoals,
    totalAssists,
    averageRating: averageRating ? Math.round(averageRating * 10) / 10 : null,
    totalWins,
    totalDraws,
    totalLosses,
    winRate: totalAppearances > 0 ? Math.round((totalWins / totalAppearances) * 1000) / 10 : 0,
    goalsPerMatch: totalAppearances > 0 ? Math.round((totalGoals / totalAppearances) * 100) / 100 : 0,
    assistsPerMatch: totalAppearances > 0 ? Math.round((totalAssists / totalAppearances) * 100) / 100 : 0,
    motmCount,
  }
}

export async function getGoalsByCompetition(careerIdId: string) {
  const { data, error } = await supabase
    .from('matches')
    .select('competition_id, goals')
    .eq('career_id', careerIdId)

  if (error) throw new Error(`Failed to fetch goals by competition: ${error.message}`)

  const competitionStats: Record<string, number> = {}
  if (data) {
    data.forEach((match) => {
      competitionStats[match.competition_id] = (competitionStats[match.competition_id] || 0) + (match.goals || 0)
    })
  }

  return competitionStats
}

export async function getGoalsByClub(careerIdId: string) {
  const { data, error } = await supabase
    .from('matches')
    .select('club_id, goals')
    .eq('career_id', careerIdId)

  if (error) throw new Error(`Failed to fetch goals by club: ${error.message}`)

  const clubStats: Record<string, number> = {}
  if (data) {
    data.forEach((match) => {
      clubStats[match.club_id] = (clubStats[match.club_id] || 0) + (match.goals || 0)
    })
  }

  return clubStats
}

export async function getGoalsBySeason(careerIdId: string) {
  const { data, error } = await supabase
    .from('matches')
    .select('season_id, goals')
    .eq('career_id', careerIdId)
    .order('season_id', { ascending: true })

  if (error) throw new Error(`Failed to fetch goals by season: ${error.message}`)

  const seasonStats: Record<string, number> = {}
  if (data) {
    data.forEach((match) => {
      seasonStats[match.season_id] = (seasonStats[match.season_id] || 0) + (match.goals || 0)
    })
  }

  return seasonStats
}

export async function getOvrProgression(careerIdId: string) {
  const { data, error } = await supabase
    .from('attribute_snapshots')
    .select('date, overall')
    .eq('career_id', careerIdId)
    .order('date', { ascending: true })

  if (error) throw new Error(`Failed to fetch OVR progression: ${error.message}`)

  return data || []
}

export async function getMatchRatingDistribution(careerIdId: string) {
  const { data, error } = await supabase
    .from('matches')
    .select('player_rating')
    .eq('career_id', careerIdId)
    .not('player_rating', 'is', null)

  if (error) throw new Error(`Failed to fetch rating distribution: ${error.message}`)

  const ratingBuckets: Record<string, number> = {
    '6-7': 0,
    '7-8': 0,
    '8-9': 0,
    '9-10': 0,
  }

  if (data) {
    data.forEach((match) => {
      const rating = match.player_rating
      if (rating >= 9) ratingBuckets['9-10']++
      else if (rating >= 8) ratingBuckets['8-9']++
      else if (rating >= 7) ratingBuckets['7-8']++
      else ratingBuckets['6-7']++
    })
  }

  return ratingBuckets
}

export async function getTrophyCount(careerIdId: string) {
  const { count, error } = await supabase
    .from('trophies')
    .select('*', { count: 'exact', head: true })
    .eq('career_id', careerIdId)
    .eq('winner', true)

  if (error) throw new Error(`Failed to count trophies: ${error.message}`)
  return count || 0
}

export async function getAwardCount(careerIdId: string) {
  const { count, error } = await supabase
    .from('awards')
    .select('*', { count: 'exact', head: true })
    .eq('career_id', careerIdId)

  if (error) throw new Error(`Failed to count awards: ${error.message}`)
  return count || 0
}
