import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

export async function getTrophiesByCareer(careerIdId: string) {
  const { data, error } = await supabase
    .from('trophies')
    .select(`
      *,
      competition:competitions(*),
      club:clubs(*)
    `)
    .eq('career_id', careerIdId)
    .eq('winner', true)
    .order('date', { ascending: false })

  if (error) throw new Error(`Failed to fetch trophies: ${error.message}`)
  return data
}

export async function createTrophy(
  trophy: Database['public']['Tables']['trophies']['Insert']
) {
  const { data, error } = await supabase
    .from('trophies')
    .insert(trophy)
    .select()
    .single()

  if (error) throw new Error(`Failed to create trophy: ${error.message}`)
  return data
}

export async function updateTrophy(
  trophyId: string,
  updates: Database['public']['Tables']['trophies']['Update']
) {
  const { data, error } = await supabase
    .from('trophies')
    .update(updates)
    .eq('id', trophyId)
    .select()
    .single()

  if (error) throw new Error(`Failed to update trophy: ${error.message}`)
  return data
}

export async function deleteTrophy(trophyId: string) {
  const { error } = await supabase
    .from('trophies')
    .delete()
    .eq('id', trophyId)

  if (error) throw new Error(`Failed to delete trophy: ${error.message}`)
}

export async function getTrophyById(trophyId: string) {
  const { data, error } = await supabase
    .from('trophies')
    .select('*')
    .eq('id', trophyId)
    .single()

  if (error) throw new Error(`Failed to fetch trophy: ${error.message}`)
  return data
}
