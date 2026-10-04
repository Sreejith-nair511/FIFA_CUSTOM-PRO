import { createNewsSchema } from '@/lib/validations/career'
import { createNews, getNewsByCareer, updateNews, deleteNews } from '@/lib/queries/news'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const careerId = searchParams.get('careerId')
    const limit = parseInt(searchParams.get('limit') || '50')
    if (!careerId) return Response.json({ error: 'Career ID required' }, { status: 400 })

    const news = await getNewsByCareer(careerId, limit)
    return Response.json({ news })
  } catch (error) {
    return Response.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = createNewsSchema.parse(body)
    const article = await createNews(validated)
    return Response.json({ article }, { status: 201 })
  } catch (error) {
    return Response.json({ error: 'Failed to create news' }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const newsId = searchParams.get('id')
    if (!newsId) return Response.json({ error: 'News ID required' }, { status: 400 })

    const body = await request.json()
    const article = await updateNews(newsId, body)
    return Response.json({ article })
  } catch (error) {
    return Response.json({ error: 'Failed to update news' }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const newsId = searchParams.get('id')
    if (!newsId) return Response.json({ error: 'News ID required' }, { status: 400 })

    await deleteNews(newsId)
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Failed to delete news' }, { status: 500 })
  }
}
