import { supabase } from '@/lib/supabase/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const careerId = searchParams.get('careerId')
    const query = searchParams.get('q')
    if (!careerId || !query) return Response.json({ error: 'Missing parameters' }, { status: 400 })

    const q = `%${query}%`
    const [matches, transfers, trophies, awards, timeline, news] = await Promise.all([
      supabase.from('matches').select('id, opponent, date, result').eq('career_id', careerId).ilike('opponent', q).limit(5),
      supabase.from('transfers').select('id, transfer_date, transfer_fee').eq('career_id', careerId).limit(5),
      supabase.from('trophies').select('id, competition_id').eq('career_id', careerId).limit(5),
      supabase.from('awards').select('id, name, category').eq('career_id', careerId).ilike('name', q).limit(5),
      supabase.from('timeline_events').select('id, title, type').eq('career_id', careerId).ilike('title', q).limit(5),
      supabase.from('news').select('id, headline').eq('career_id', careerId).ilike('headline', q).limit(5),
    ])

    return Response.json({
      matches: matches.data || [],
      transfers: transfers.data || [],
      trophies: trophies.data || [],
      awards: awards.data || [],
      timeline: timeline.data || [],
      news: news.data || [],
    })
  } catch (error) {
    return Response.json({ error: 'Search failed' }, { status: 500 })
  }
}
