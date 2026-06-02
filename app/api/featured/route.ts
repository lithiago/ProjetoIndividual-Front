import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? 'dev_secret')

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    const url = `${process.env.API_URL}/featured`

    const res = await fetch(url)
    const data = await res.json()
    const raw_movie = data[0]

    const formattedMovie = {
      id: raw_movie.movieId,
      title: raw_movie.movie_name,
      poster: raw_movie.img_src, // ou backdrop_src se preferir a imagem de fundo
      genres: raw_movie.genres,
      year: raw_movie.year,
      rating: raw_movie.avg_rating,
      backdrop_src: raw_movie.backdrop_src
    }

    console.log("resultado:", data)

    return NextResponse.json(formattedMovie)
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}