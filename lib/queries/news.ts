import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

export async function getNewsByCareer(careerIdId: string, limit: number = 50) {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('career_id', careerIdId)
    .order('date', { ascending: false })
    .limit(limit)

  if (error) throw new Error(`Failed to fetch news: ${error.message}`)
  return data
}

export async function getRecentNews(careerIdId: string, limit: number = 5) {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('career_id', careerIdId)
    .order('date', { ascending: false })
    .limit(limit)

  if (error) throw new Error(`Failed to fetch recent news: ${error.message}`)
  return data
}

export async function createNews(
  news: Database['public']['Tables']['news']['Insert']
) {
  const { data, error } = await supabase
    .from('news')
    .insert(news)
    .select()
    .single()

  if (error) throw new Error(`Failed to create news: ${error.message}`)
  return data
}

export async function updateNews(
  newsId: string,
  updates: Database['public']['Tables']['news']['Update']
) {
  const { data, error } = await supabase
    .from('news')
    .update(updates)
    .eq('id', newsId)
    .select()
    .single()

  if (error) throw new Error(`Failed to update news: ${error.message}`)
  return data
}

export async function deleteNews(newsId: string) {
  const { error } = await supabase
    .from('news')
    .delete()
    .eq('id', newsId)

  if (error) throw new Error(`Failed to delete news: ${error.message}`)
}

export async function getNewsByCategory(careerIdId: string, category: string) {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('career_id', careerIdId)
    .eq('category', category)
    .order('date', { ascending: false })

  if (error) throw new Error(`Failed to fetch news by category: ${error.message}`)
  return data
}
