import { createPlayerSchema } from '@/lib/validations/career'
import { createPlayer, getPlayerByCareer, updatePlayer } from '@/lib/queries/players'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const careerId = searchParams.get('careerId')
    if (!careerId) return Response.json({ error: 'Career ID required' }, { status: 400 })

    const player = await getPlayerByCareer(careerId)
    return Response.json({ player })
  } catch (error) {
    return Response.json({ error: 'Failed to fetch player' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = createPlayerSchema.parse(body)
    const player = await createPlayer(validated)
    return Response.json({ player }, { status: 201 })
  } catch (error) {
    return Response.json({ error: 'Failed to create player' }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const playerId = searchParams.get('id')
    if (!playerId) return Response.json({ error: 'Player ID required' }, { status: 400 })

    const body = await request.json()
    const player = await updatePlayer(playerId, body)
    return Response.json({ player })
  } catch (error) {
    return Response.json({ error: 'Failed to update player' }, { status: 400 })
  }
}
