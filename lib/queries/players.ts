import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

export async function getPlayerByCareer(careerIdId: string) {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('career_id', careerIdId)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to fetch player: ${error.message}`)
  }
  return data || null
}

export async function createPlayer(
  player: Database['public']['Tables']['players']['Insert']
) {
  const { data, error } = await supabase
    .from('players')
    .insert(player)
    .select()
    .single()

  if (error) throw new Error(`Failed to create player: ${error.message}`)
  return data
}

export async function updatePlayer(
  playerId: string,
  updates: Database['public']['Tables']['players']['Update']
) {
  const { data, error } = await supabase
    .from('players')
    .update(updates)
    .eq('id', playerId)
    .select()
    .single()

  if (error) throw new Error(`Failed to update player: ${error.message}`)
  return data
}

export async function getPlayerById(playerId: string) {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('id', playerId)
    .single()

  if (error) throw new Error(`Failed to fetch player: ${error.message}`)
  return data
}
