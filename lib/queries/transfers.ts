import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

export async function getTransfersByCareer(careerIdId: string) {
  const { data, error } = await supabase
    .from('transfers')
    .select(`
      *,
      from_club:clubs!from_club_id(*),
      to_club:clubs!to_club_id(*)
    `)
    .eq('career_id', careerIdId)
    .order('transfer_date', { ascending: false })

  if (error) throw new Error(`Failed to fetch transfers: ${error.message}`)
  return data
}

export async function getRecentTransfers(careerIdId: string, limit: number = 3) {
  const { data, error } = await supabase
    .from('transfers')
    .select(`
      *,
      from_club:clubs!from_club_id(*),
      to_club:clubs!to_club_id(*)
    `)
    .eq('career_id', careerIdId)
    .order('transfer_date', { ascending: false })
    .limit(limit)

  if (error) throw new Error(`Failed to fetch recent transfers: ${error.message}`)
  return data
}

export async function createTransfer(
  transfer: Database['public']['Tables']['transfers']['Insert']
) {
  const { data, error } = await supabase
    .from('transfers')
    .insert(transfer)
    .select()
    .single()

  if (error) throw new Error(`Failed to create transfer: ${error.message}`)
  return data
}

export async function updateTransfer(
  transferId: string,
  updates: Database['public']['Tables']['transfers']['Update']
) {
  const { data, error } = await supabase
    .from('transfers')
    .update(updates)
    .eq('id', transferId)
    .select()
    .single()

  if (error) throw new Error(`Failed to update transfer: ${error.message}`)
  return data
}

export async function deleteTransfer(transferId: string) {
  const { error } = await supabase
    .from('transfers')
    .delete()
    .eq('id', transferId)

  if (error) throw new Error(`Failed to delete transfer: ${error.message}`)
}

export async function getTransferById(transferId: string) {
  const { data, error } = await supabase
    .from('transfers')
    .select('*')
    .eq('id', transferId)
    .single()

  if (error) throw new Error(`Failed to fetch transfer: ${error.message}`)
  return data
}
