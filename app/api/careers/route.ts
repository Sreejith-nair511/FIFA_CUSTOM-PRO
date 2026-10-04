import { createCareerSchema } from '@/lib/validations/career'
import { createCareer, getCareersForUser, deleteCareer } from '@/lib/queries/careers'
import { supabase } from '@/lib/supabase/client'

export async function GET(request: Request) {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const careers = await getCareersForUser(user.id)
    return Response.json({ careers })
  } catch (error) {
    return Response.json({ error: 'Failed to fetch careers' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const validated = createCareerSchema.parse(body)
    const career = await createCareer(user.id, validated)
    return Response.json({ career }, { status: 201 })
  } catch (error) {
    return Response.json({ error: 'Failed to create career' }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const careerId = searchParams.get('id')
    if (!careerId) return Response.json({ error: 'Career ID required' }, { status: 400 })

    await deleteCareer(careerId)
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Failed to delete career' }, { status: 500 })
  }
}
