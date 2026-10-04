import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

export async function getSeasonsByCareer(careerIdId: string) {
  const { data, error } = await supabase
    .from('seasons')
    .select('*')
    .eq('career_id', careerIdId)
    .order('start_year', { ascending: false })

  if (error) throw new Error(`Failed to fetch seasons: ${error.message}`)
  return data
}

export async function getSeasonById(seasonId: string) {
  const { data, error } = await supabase
    .from('seasons')
    .select('*')
    .eq('id', seasonId)
    .single()

  if (error) throw new Error(`Failed to fetch season: ${error.message}`)
  return data
}

export async function createSeason(
  season: Database['public']['Tables']['seasons']['Insert']
) {
  const { data, error } = await supabase
    .from('seasons')
    .insert(season)
    .select()
    .single()

  if (error) throw new Error(`Failed to create season: ${error.message}`)
  return data
}

export async function updateSeason(
  seasonId: string,
  updates: Database['public']['Tables']['seasons']['Update']
) {
  const { data, error } = await supabase
    .from('seasons')
    .update(updates)
    .eq('id', seasonId)
    .select()
    .single()

  if (error) throw new Error(`Failed to update season: ${error.message}`)
  return data
}

export async function deleteSeason(seasonId: string) {
  const { error } = await supabase
    .from('seasons')
    .delete()
    .eq('id', seasonId)

  if (error) throw new Error(`Failed to delete season: ${error.message}`)
}
