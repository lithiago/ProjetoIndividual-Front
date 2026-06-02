import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ message: 'userId obrigatório' }, { status: 400 })
  }

  try {
    const res = await fetch(`${process.env.API_URL}/movies/rated?userId=${userId}`)
    const data = await res.json()
    const movies = (data.movies ?? []).map((m: any) => ({
      id: m.movieId,
      title: m.movie_name,
      poster: m.img_src ?? null,
      year: m.year ? String(m.year) : '',
      genres: m.genres ?? [],
      backdrop_src: m.backdrop_src ?? null,
    }))
    

    return NextResponse.json({ movies })
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}