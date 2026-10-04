import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

export async function getAttributeSnapshotsByCareer(careerIdId: string) {
  const { data, error } = await supabase
    .from('attribute_snapshots')
    .select('*')
    .eq('career_id', careerIdId)
    .order('date', { ascending: false })

  if (error) throw new Error(`Failed to fetch attribute snapshots: ${error.message}`)
  return data
}

export async function getLatestAttributeSnapshot(careerIdId: string) {
  const { data, error } = await supabase
    .from('attribute_snapshots')
    .select('*')
    .eq('career_id', careerIdId)
    .order('date', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to fetch latest attributes: ${error.message}`)
  }
  return data || null
}

export async function createAttributeSnapshot(
  snapshot: Database['public']['Tables']['attribute_snapshots']['Insert']
) {
  const { data, error } = await supabase
    .from('attribute_snapshots')
    .insert(snapshot)
    .select()
    .single()

  if (error) throw new Error(`Failed to create attribute snapshot: ${error.message}`)
  return data
}

export async function updateAttributeSnapshot(
  snapshotId: string,
  updates: Database['public']['Tables']['attribute_snapshots']['Update']
) {
  const { data, error } = await supabase
    .from('attribute_snapshots')
    .update(updates)
    .eq('id', snapshotId)
    .select()
    .single()

  if (error) throw new Error(`Failed to update attribute snapshot: ${error.message}`)
  return data
}

export async function deleteAttributeSnapshot(snapshotId: string) {
  const { error } = await supabase
    .from('attribute_snapshots')
    .delete()
    .eq('id', snapshotId)

  if (error) throw new Error(`Failed to delete attribute snapshot: ${error.message}`)
}
