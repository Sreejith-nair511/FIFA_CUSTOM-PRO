import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

export async function getTimelineByCareer(careerIdId: string, limit: number = 50) {
  const { data, error } = await supabase
    .from('timeline_events')
    .select('*')
    .eq('career_id', careerIdId)
    .order('date', { ascending: false })
    .limit(limit)

  if (error) throw new Error(`Failed to fetch timeline: ${error.message}`)
  return data
}

export async function getRecentTimelineEvents(careerIdId: string, limit: number = 5) {
  const { data, error } = await supabase
    .from('timeline_events')
    .select('*')
    .eq('career_id', careerIdId)
    .order('date', { ascending: false })
    .limit(limit)

  if (error) throw new Error(`Failed to fetch recent events: ${error.message}`)
  return data
}

export async function createTimelineEvent(
  event: Database['public']['Tables']['timeline_events']['Insert']
) {
  const { data, error } = await supabase
    .from('timeline_events')
    .insert(event)
    .select()
    .single()

  if (error) throw new Error(`Failed to create timeline event: ${error.message}`)
  return data
}

export async function updateTimelineEvent(
  eventId: string,
  updates: Database['public']['Tables']['timeline_events']['Update']
) {
  const { data, error } = await supabase
    .from('timeline_events')
    .update(updates)
    .eq('id', eventId)
    .select()
    .single()

  if (error) throw new Error(`Failed to update timeline event: ${error.message}`)
  return data
}

export async function deleteTimelineEvent(eventId: string) {
  const { error } = await supabase
    .from('timeline_events')
    .delete()
    .eq('id', eventId)

  if (error) throw new Error(`Failed to delete timeline event: ${error.message}`)
}
