import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

export async function getMediaByCareer(careerIdId: string, limit: number = 50) {
  const { data, error } = await supabase
    .from('media')
    .select('*')
    .eq('career_id', careerIdId)
    .order('date', { ascending: false })
    .limit(limit)

  if (error) throw new Error(`Failed to fetch media: ${error.message}`)
  return data
}

export async function getMediaByCategory(careerIdId: string, category: string) {
  const { data, error } = await supabase
    .from('media')
    .select('*')
    .eq('career_id', careerIdId)
    .eq('category', category)
    .order('date', { ascending: false })

  if (error) throw new Error(`Failed to fetch media by category: ${error.message}`)
  return data
}

export async function createMedia(
  media: Database['public']['Tables']['media']['Insert']
) {
  const { data, error } = await supabase
    .from('media')
    .insert(media)
    .select()
    .single()

  if (error) throw new Error(`Failed to create media record: ${error.message}`)
  return data
}

export async function updateMedia(
  mediaId: string,
  updates: Database['public']['Tables']['media']['Update']
) {
  const { data, error } = await supabase
    .from('media')
    .update(updates)
    .eq('id', mediaId)
    .select()
    .single()

  if (error) throw new Error(`Failed to update media: ${error.message}`)
  return data
}

export async function deleteMedia(mediaId: string) {
  const { error } = await supabase
    .from('media')
    .delete()
    .eq('id', mediaId)

  if (error) throw new Error(`Failed to delete media: ${error.message}`)
}

export async function getMediaById(mediaId: string) {
  const { data, error } = await supabase
    .from('media')
    .select('*')
    .eq('id', mediaId)
    .single()

  if (error) throw new Error(`Failed to fetch media: ${error.message}`)
  return data
}
