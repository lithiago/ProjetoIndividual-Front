import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('API_URL:', process.env.API_URL)
    const res = await fetch(`${process.env.API_URL}/movies/most-rated`)
    const data = await res.json()

    console.log('filmes:', data)

    const movies = (data['Lista de Filmes'] ?? []).map((m: any) => ({
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