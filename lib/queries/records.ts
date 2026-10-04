import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

export async function getRecordsByCareer(careerId: string) {
  const { data, error } = await supabase
    .from('records')
    .select('*')
    .eq('career_id', careerId)
    .order('date', { ascending: false })

  if (error) throw new Error(`Failed to fetch records: ${error.message}`)
  return data
}

export async function createRecord(
  record: Database['public']['Tables']['records']['Insert']
) {
  const { data, error } = await supabase
    .from('records')
    .insert(record)
    .select()
    .single()

  if (error) throw new Error(`Failed to create record: ${error.message}`)
  return data
}

export async function updateRecord(
  recordId: string,
  updates: Database['public']['Tables']['records']['Update']
) {
  const { data, error } = await supabase
    .from('records')
    .update(updates)
    .eq('id', recordId)
    .select()
    .single()

  if (error) throw new Error(`Failed to update record: ${error.message}`)
  return data
}

export async function deleteRecord(recordId: string) {
  const { error } = await supabase
    .from('records')
    .delete()
    .eq('id', recordId)

  if (error) throw new Error(`Failed to delete record: ${error.message}`)
}
