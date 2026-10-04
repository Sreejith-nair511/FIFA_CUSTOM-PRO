import { supabase } from '@/lib/supabase/client'

export async function getAllCompetitions() {
  const { data, error } = await supabase
    .from('competitions')
    .select('*')
    .order('name', { ascending: true })

  if (error) throw new Error(`Failed to fetch competitions: ${error.message}`)
  return data
}

export async function getCompetitionById(competitionId: string) {
  const { data, error } = await supabase
    .from('competitions')
    .select('*')
    .eq('id', competitionId)
    .single()

  if (error) throw new Error(`Failed to fetch competition: ${error.message}`)
  return data
}

export async function searchCompetitions(query: string) {
  const { data, error } = await supabase
    .from('competitions')
    .select('*')
    .ilike('name', `%${query}%`)
    .limit(10)

  if (error) throw new Error(`Failed to search competitions: ${error.message}`)
  return data
}

export async function getCompetitionsByType(type: string) {
  const { data, error } = await supabase
    .from('competitions')
    .select('*')
    .eq('competition_type', type)
    .order('name', { ascending: true })

  if (error) throw new Error(`Failed to fetch competitions by type: ${error.message}`)
  return data
}
