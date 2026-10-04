import { createAwardSchema } from '@/lib/validations/career'
import { createAward, getAwardsByCareer, updateAward, deleteAward } from '@/lib/queries/awards'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const careerId = searchParams.get('careerId')
    if (!careerId) return Response.json({ error: 'Career ID required' }, { status: 400 })

    const awards = await getAwardsByCareer(careerId)
    return Response.json({ awards })
  } catch (error) {
    return Response.json({ error: 'Failed to fetch awards' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = createAwardSchema.parse(body)
    const award = await createAward(validated)
    return Response.json({ award }, { status: 201 })
  } catch (error) {
    return Response.json({ error: 'Failed to create award' }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const awardId = searchParams.get('id')
    if (!awardId) return Response.json({ error: 'Award ID required' }, { status: 400 })

    const body = await request.json()
    const award = await updateAward(awardId, body)
    return Response.json({ award })
  } catch (error) {
    return Response.json({ error: 'Failed to update award' }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const awardId = searchParams.get('id')
    if (!awardId) return Response.json({ error: 'Award ID required' }, { status: 400 })

    await deleteAward(awardId)
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Failed to delete award' }, { status: 500 })
  }
}
