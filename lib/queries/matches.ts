import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

export async function getMatchesByCareer(
  careerIdId: string,
  limit: number = 100,
  offset: number = 0
) {
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .eq('career_id', careerIdId)
    .order('date', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw new Error(`Failed to fetch matches: ${error.message}`)
  return data
}

export async function getMatchesBySeason(seasonId: string) {
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .eq('season_id', seasonId)
    .order('date', { ascending: false })

  if (error) throw new Error(`Failed to fetch season matches: ${error.message}`)
  return data
}

export async function getRecentMatches(careerIdId: string, limit: number = 3) {
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .eq('career_id', careerIdId)
    .order('date', { ascending: false })
    .limit(limit)

  if (error) throw new Error(`Failed to fetch recent matches: ${error.message}`)
  return data
}

export async function createMatch(
  match: Database['public']['Tables']['matches']['Insert']
) {
  const { data, error } = await supabase
    .from('matches')
    .insert(match)
    .select()
    .single()

  if (error) throw new Error(`Failed to create match: ${error.message}`)
  return data
}

export async function updateMatch(
  matchId: string,
  updates: Database['public']['Tables']['matches']['Update']
) {
  const { data, error } = await supabase
    .from('matches')
    .update(updates)
    .eq('id', matchId)
    .select()
    .single()

  if (error) throw new Error(`Failed to update match: ${error.message}`)
  return data
}

export async function deleteMatch(matchId: string) {
  const { error } = await supabase
    .from('matches')
    .delete()
    .eq('id', matchId)

  if (error) throw new Error(`Failed to delete match: ${error.message}`)
}

export async function getMatchById(matchId: string) {
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .eq('id', matchId)
    .single()

  if (error) throw new Error(`Failed to fetch match: ${error.message}`)
  return data
}

export async function countMatchesByCareer(careerIdId: string) {
  const { count, error } = await supabase
    .from('matches')
    .select('*', { count: 'exact', head: true })
    .eq('career_id', careerIdId)

  if (error) throw new Error(`Failed to count matches: ${error.message}`)
  return count || 0
}
