import { NextResponse } from 'next/server'
import { getMoviesByGenre } from '@/services/movieService'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const genres = searchParams.getAll('genre')

  if (!genres.length) {
    return NextResponse.json({ message: 'Informe ao menos um gênero' }, { status: 400 })
  }

  try {
    const movies = await getMoviesByGenre(genres)
    return NextResponse.json({ movies })
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}