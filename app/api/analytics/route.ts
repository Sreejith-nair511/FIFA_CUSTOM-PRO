import { calculateCareerStats, getGoalsBySeason, getOvrProgression, getMatchRatingDistribution } from '@/lib/analytics/career-stats'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const careerId = searchParams.get('careerId')
    const type = searchParams.get('type') || 'all'
    if (!careerId) return Response.json({ error: 'Career ID required' }, { status: 400 })

    let analytics: any = {}

    if (type === 'all' || type === 'career') {
      analytics.careerStats = await calculateCareerStats(careerId)
    }
    if (type === 'all' || type === 'goals') {
      analytics.goalsBySeason = await getGoalsBySeason(careerId)
    }
    if (type === 'all' || type === 'ovr') {
      analytics.ovrProgression = await getOvrProgression(careerId)
    }
    if (type === 'all' || type === 'rating') {
      analytics.ratingDistribution = await getMatchRatingDistribution(careerId)
    }

    return Response.json(analytics)
  } catch (error) {
    return Response.json({ error: 'Failed to calculate analytics' }, { status: 500 })
  }
}
