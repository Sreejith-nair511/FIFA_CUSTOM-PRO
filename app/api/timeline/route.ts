import { createTimelineEventSchema } from '@/lib/validations/career'
import { createTimelineEvent, getTimelineByCareer, updateTimelineEvent, deleteTimelineEvent } from '@/lib/queries/timeline'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const careerId = searchParams.get('careerId')
    const limit = parseInt(searchParams.get('limit') || '50')
    if (!careerId) return Response.json({ error: 'Career ID required' }, { status: 400 })

    const events = await getTimelineByCareer(careerId, limit)
    return Response.json({ events })
  } catch (error) {
    return Response.json({ error: 'Failed to fetch timeline' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = createTimelineEventSchema.parse(body)
    const event = await createTimelineEvent(validated)
    return Response.json({ event }, { status: 201 })
  } catch (error) {
    return Response.json({ error: 'Failed to create timeline event' }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const eventId = searchParams.get('id')
    if (!eventId) return Response.json({ error: 'Event ID required' }, { status: 400 })

    const body = await request.json()
    const event = await updateTimelineEvent(eventId, body)
    return Response.json({ event })
  } catch (error) {
    return Response.json({ error: 'Failed to update timeline event' }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const eventId = searchParams.get('id')
    if (!eventId) return Response.json({ error: 'Event ID required' }, { status: 400 })

    await deleteTimelineEvent(eventId)
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Failed to delete timeline event' }, { status: 500 })
  }
}
