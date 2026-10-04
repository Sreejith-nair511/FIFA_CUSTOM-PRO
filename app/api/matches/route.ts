import { createMatchSchema } from '@/lib/validations/career'
import { createMatch, getMatchesByCareer, deleteMatch } from '@/lib/queries/matches'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const careerId = searchParams.get('careerId')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    if (!careerId) {
      return Response.json({ error: 'Career ID required' }, { status: 400 })
    }

    const matches = await getMatchesByCareer(careerId, limit, offset)
    return Response.json({ matches })
  } catch (error) {
    console.error('Get matches error:', error)
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch matches' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = createMatchSchema.parse(body)

    const match = await createMatch(validated)
    return Response.json({ match }, { status: 201 })
  } catch (error) {
    console.error('Create match error:', error)
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to create match' },
      { status: 400 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const matchId = searchParams.get('id')

    if (!matchId) {
      return Response.json({ error: 'Match ID required' }, { status: 400 })
    }

    await deleteMatch(matchId)
    return Response.json({ success: true })
  } catch (error) {
    console.error('Delete match error:', error)
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to delete match' },
      { status: 500 }
    )
  }
}
