import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

export async function getCareersForUser(userId: string) {
  const { data, error } = await supabase
    .from('careers')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('updated_at', { ascending: false })

  if (error) throw new Error(`Failed to fetch careers: ${error.message}`)
  return data
}

export async function getCareerById(careerIdId: string) {
  const { data, error } = await supabase
    .from('careers')
    .select('*')
    .eq('id', careerIdId)
    .single()

  if (error) throw new Error(`Failed to fetch career: ${error.message}`)
  return data
}

export async function createCareer(
  userId: string,
  career: Database['public']['Tables']['careers']['Insert']
) {
  const { data, error } = await supabase
    .from('careers')
    .insert({
      ...career,
      user_id: userId,
    })
    .select()
    .single()

  if (error) throw new Error(`Failed to create career: ${error.message}`)
  return data
}

export async function updateCareer(
  careerId: string,
  updates: Database['public']['Tables']['careers']['Update']
) {
  const { data, error } = await supabase
    .from('careers')
    .update(updates)
    .eq('id', careerId)
    .select()
    .single()

  if (error) throw new Error(`Failed to update career: ${error.message}`)
  return data
}

export async function deleteCareer(careerId: string) {
  const { error } = await supabase
    .from('careers')
    .update({ status: 'deleted' })
    .eq('id', careerId)

  if (error) throw new Error(`Failed to delete career: ${error.message}`)
}
