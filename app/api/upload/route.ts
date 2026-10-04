import { supabase } from '@/lib/supabase/client'
import { createMedia } from '@/lib/queries/media'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const careerId = formData.get('careerId') as string
    const category = formData.get('category') as string

    if (!file || !careerId || !category) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      return Response.json({ error: 'File too large (max 5MB)' }, { status: 400 })
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const ext = file.name.split('.').pop()
    const filename = `${careerId}/${category}/${Date.now()}.${ext}`

    const { data, error: uploadError } = await supabase.storage
      .from('career-media')
      .upload(filename, file, { upsert: false })

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('career-media')
      .getPublicUrl(filename)

    const media = await createMedia({
      career_id: careerId,
      user_id: user.id,
      file_path: filename,
      public_url: publicUrl,
      file_name: file.name,
      mime_type: file.type,
      file_size: file.size,
      category,
      date: new Date().toISOString(),
    })

    return Response.json({ media }, { status: 201 })
  } catch (error) {
    return Response.json({ error: 'Upload failed' }, { status: 500 })
  }
}
