import { supabase } from '@/lib/supabase/client'

export async function getAllClubs() {
  const { data, error } = await supabase
    .from('clubs')
    .select('*')
    .order('name', { ascending: true })

  if (error) throw new Error(`Failed to fetch clubs: ${error.message}`)
  return data
}

export async function getClubById(clubId: string) {
  const { data, error } = await supabase
    .from('clubs')
    .select('*')
    .eq('id', clubId)
    .single()

  if (error) throw new Error(`Failed to fetch club: ${error.message}`)
  return data
}

export async function searchClubs(query: string) {
  const { data, error } = await supabase
    .from('clubs')
    .select('*')
    .ilike('name', `%${query}%`)
    .limit(10)

  if (error) throw new Error(`Failed to search clubs: ${error.message}`)
  return data
}

export async function getClubsByCountry(country: string) {
  const { data, error } = await supabase
    .from('clubs')
    .select('*')
    .eq('country', country)
    .order('name', { ascending: true })

  if (error) throw new Error(`Failed to fetch clubs by country: ${error.message}`)
  return data
}
