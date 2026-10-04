import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

export async function getAwardsByCareer(careerIdId: string) {
  const { data, error } = await supabase
    .from('awards')
    .select('*')
    .eq('career_id', careerIdId)
    .order('date', { ascending: false })

  if (error) throw new Error(`Failed to fetch awards: ${error.message}`)
  return data
}

export async function createAward(
  award: Database['public']['Tables']['awards']['Insert']
) {
  const { data, error } = await supabase
    .from('awards')
    .insert(award)
    .select()
    .single()

  if (error) throw new Error(`Failed to create award: ${error.message}`)
  return data
}

export async function updateAward(
  awardId: string,
  updates: Database['public']['Tables']['awards']['Update']
) {
  const { data, error } = await supabase
    .from('awards')
    .update(updates)
    .eq('id', awardId)
    .select()
    .single()

  if (error) throw new Error(`Failed to update award: ${error.message}`)
  return data
}

export async function deleteAward(awardId: string) {
  const { error } = await supabase
    .from('awards')
    .delete()
    .eq('id', awardId)

  if (error) throw new Error(`Failed to delete award: ${error.message}`)
}

export async function getAwardById(awardId: string) {
  const { data, error } = await supabase
    .from('awards')
    .select('*')
    .eq('id', awardId)
    .single()

  if (error) throw new Error(`Failed to fetch award: ${error.message}`)
  return data
}

export async function getRecentAwards(careerIdId: string, limit: number = 3) {
  const { data, error } = await supabase
    .from('awards')
    .select('*')
    .eq('career_id', careerIdId)
    .order('date', { ascending: false })
    .limit(limit)

  if (error) throw new Error(`Failed to fetch recent awards: ${error.message}`)
  return data
}
