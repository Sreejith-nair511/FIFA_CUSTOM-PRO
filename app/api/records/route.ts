import { supabase } from '@/lib/supabase/client'
import { getRecordsByCareer, createRecord, updateRecord, deleteRecord } from '@/lib/queries/records'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const careerId = searchParams.get('careerId')
    if (!careerId) return Response.json({ error: 'Career ID required' }, { status: 400 })

    const records = await getRecordsByCareer(careerId)
    return Response.json({ records })
  } catch (error) {
    return Response.json({ error: 'Failed to fetch records' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const record = await createRecord(body)
    return Response.json({ record }, { status: 201 })
  } catch (error) {
    return Response.json({ error: 'Failed to create record' }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const recordId = searchParams.get('id')
    if (!recordId) return Response.json({ error: 'Record ID required' }, { status: 400 })

    const body = await request.json()
    const record = await updateRecord(recordId, body)
    return Response.json({ record })
  } catch (error) {
    return Response.json({ error: 'Failed to update record' }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const recordId = searchParams.get('id')
    if (!recordId) return Response.json({ error: 'Record ID required' }, { status: 400 })

    await deleteRecord(recordId)
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Failed to delete record' }, { status: 500 })
  }
}
