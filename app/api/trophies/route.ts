import { createTrophySchema } from '@/lib/validations/career'
import { createTrophy, getTrophiesByCareer, updateTrophy, deleteTrophy } from '@/lib/queries/trophies'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const careerId = searchParams.get('careerId')
    if (!careerId) return Response.json({ error: 'Career ID required' }, { status: 400 })

    const trophies = await getTrophiesByCareer(careerId)
    return Response.json({ trophies })
  } catch (error) {
    return Response.json({ error: 'Failed to fetch trophies' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = createTrophySchema.parse(body)
    const trophy = await createTrophy(validated)
    return Response.json({ trophy }, { status: 201 })
  } catch (error) {
    return Response.json({ error: 'Failed to create trophy' }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const trophyId = searchParams.get('id')
    if (!trophyId) return Response.json({ error: 'Trophy ID required' }, { status: 400 })

    const body = await request.json()
    const trophy = await updateTrophy(trophyId, body)
    return Response.json({ trophy })
  } catch (error) {
    return Response.json({ error: 'Failed to update trophy' }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const trophyId = searchParams.get('id')
    if (!trophyId) return Response.json({ error: 'Trophy ID required' }, { status: 400 })

    await deleteTrophy(trophyId)
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Failed to delete trophy' }, { status: 500 })
  }
}
