import { getAllCompetitions, searchCompetitions } from '@/lib/queries/competitions'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    let competitions
    if (search) {
      competitions = await searchCompetitions(search)
    } else {
      competitions = await getAllCompetitions()
    }
    return Response.json({ competitions })
  } catch (error) {
    return Response.json({ error: 'Failed to fetch competitions' }, { status: 500 })
  }
}
