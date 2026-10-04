import { createTransferSchema } from '@/lib/validations/career'
import { createTransfer, getTransfersByCareer, updateTransfer, deleteTransfer } from '@/lib/queries/transfers'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const careerId = searchParams.get('careerId')
    if (!careerId) return Response.json({ error: 'Career ID required' }, { status: 400 })

    const transfers = await getTransfersByCareer(careerId)
    return Response.json({ transfers })
  } catch (error) {
    return Response.json({ error: 'Failed to fetch transfers' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = createTransferSchema.parse(body)
    const transfer = await createTransfer(validated)
    return Response.json({ transfer }, { status: 201 })
  } catch (error) {
    return Response.json({ error: 'Failed to create transfer' }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const transferId = searchParams.get('id')
    if (!transferId) return Response.json({ error: 'Transfer ID required' }, { status: 400 })

    const body = await request.json()
    const transfer = await updateTransfer(transferId, body)
    return Response.json({ transfer })
  } catch (error) {
    return Response.json({ error: 'Failed to update transfer' }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const transferId = searchParams.get('id')
    if (!transferId) return Response.json({ error: 'Transfer ID required' }, { status: 400 })

    await deleteTransfer(transferId)
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Failed to delete transfer' }, { status: 500 })
  }
}
