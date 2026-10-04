import { supabase } from '@/lib/supabase/client'
import { calculateCareerStats, getTrophyCount, getAwardCount } from '@/lib/analytics/career-stats'
import { getLatestAttributeSnapshot } from '@/lib/queries/attributes'
import { getPlayerByCareer } from '@/lib/queries/players'
import { getRecentMatches } from '@/lib/queries/matches'
import { getRecentTransfers } from '@/lib/queries/transfers'
import { getTrophiesByCareer } from '@/lib/queries/trophies'
import { getRecentNews } from '@/lib/queries/news'
import { getRecentTimelineEvents } from '@/lib/queries/timeline'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const careerId = searchParams.get('careerId')

    if (!careerId) {
      return Response.json({ error: 'Career ID required' }, { status: 400 })
    }

    // Fetch career data in parallel
    const [player, stats, latestAttrs, recentMatches, recentTransfers, trophies, recentNews, timeline, trophyCount, awardCount] =
      await Promise.all([
        getPlayerByCareer(careerId),
        calculateCareerStats(careerId),
        getLatestAttributeSnapshot(careerId),
        getRecentMatches(careerId, 3),
        getRecentTransfers(careerId, 3),
        getTrophiesByCareer(careerId),
        getRecentNews(careerId, 3),
        getRecentTimelineEvents(careerId, 5),
        getTrophyCount(careerId),
        getAwardCount(careerId),
      ])

    return Response.json(
      {
        player,
        stats,
        latestAttributes: latestAttrs,
        recentMatches,
        recentTransfers,
        trophies,
        trophyCount,
        awardCount,
        recentNews,
        timeline,
      },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  } catch (error) {
    console.error('Dashboard API error:', error)
    return Response.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
