import { getMediaByCareer, getMediaByCategory, deleteMedia } from '@/lib/queries/media'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const careerId = searchParams.get('careerId')
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '50')
    if (!careerId) return Response.json({ error: 'Career ID required' }, { status: 400 })

    let media
    if (category) {
      media = await getMediaByCategory(careerId, category)
    } else {
      media = await getMediaByCareer(careerId, limit)
    }
    return Response.json({ media })
  } catch (error) {
    return Response.json({ error: 'Failed to fetch media' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mediaId = searchParams.get('id')
    if (!mediaId) return Response.json({ error: 'Media ID required' }, { status: 400 })

    await deleteMedia(mediaId)
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Failed to delete media' }, { status: 500 })
  }
}
