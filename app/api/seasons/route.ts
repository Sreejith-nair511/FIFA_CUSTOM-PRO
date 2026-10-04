import { createSeasonSchema } from '@/lib/validations/career'
import { createSeason, getSeasonsByCareer, updateSeason, deleteSeason } from '@/lib/queries/seasons'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const careerId = searchParams.get('careerId')
    if (!careerId) return Response.json({ error: 'Career ID required' }, { status: 400 })

    const seasons = await getSeasonsByCareer(careerId)
    return Response.json({ seasons })
  } catch (error) {
    return Response.json({ error: 'Failed to fetch seasons' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = createSeasonSchema.parse(body)
    const season = await createSeason(validated)
    return Response.json({ season }, { status: 201 })
  } catch (error) {
    return Response.json({ error: 'Failed to create season' }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const seasonId = searchParams.get('id')
    if (!seasonId) return Response.json({ error: 'Season ID required' }, { status: 400 })

    const body = await request.json()
    const season = await updateSeason(seasonId, body)
    return Response.json({ season })
  } catch (error) {
    return Response.json({ error: 'Failed to update season' }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const seasonId = searchParams.get('id')
    if (!seasonId) return Response.json({ error: 'Season ID required' }, { status: 400 })

    await deleteSeason(seasonId)
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Failed to delete season' }, { status: 500 })
  }
}
