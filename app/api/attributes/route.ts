import { createAttributeSnapshotSchema } from '@/lib/validations/career'
import { createAttributeSnapshot, getAttributeSnapshotsByCareer, updateAttributeSnapshot, deleteAttributeSnapshot, getLatestAttributeSnapshot } from '@/lib/queries/attributes'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const careerId = searchParams.get('careerId')
    const latest = searchParams.get('latest') === 'true'
    if (!careerId) return Response.json({ error: 'Career ID required' }, { status: 400 })

    let data
    if (latest) {
      data = await getLatestAttributeSnapshot(careerId)
    } else {
      data = await getAttributeSnapshotsByCareer(careerId)
    }
    return Response.json({ data })
  } catch (error) {
    return Response.json({ error: 'Failed to fetch attributes' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = createAttributeSnapshotSchema.parse(body)
    const snapshot = await createAttributeSnapshot(validated)
    return Response.json({ snapshot }, { status: 201 })
  } catch (error) {
    return Response.json({ error: 'Failed to create attribute snapshot' }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const snapshotId = searchParams.get('id')
    if (!snapshotId) return Response.json({ error: 'Snapshot ID required' }, { status: 400 })

    const body = await request.json()
    const snapshot = await updateAttributeSnapshot(snapshotId, body)
    return Response.json({ snapshot })
  } catch (error) {
    return Response.json({ error: 'Failed to update attributes' }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const snapshotId = searchParams.get('id')
    if (!snapshotId) return Response.json({ error: 'Snapshot ID required' }, { status: 400 })

    await deleteAttributeSnapshot(snapshotId)
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Failed to delete attributes' }, { status: 500 })
  }
}
