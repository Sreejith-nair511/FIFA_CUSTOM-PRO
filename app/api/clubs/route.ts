import { getAllClubs, searchClubs } from '@/lib/queries/clubs'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    let clubs
    if (search) {
      clubs = await searchClubs(search)
    } else {
      clubs = await getAllClubs()
    }
    return Response.json({ clubs })
  } catch (error) {
    return Response.json({ error: 'Failed to fetch clubs' }, { status: 500 })
  }
}
