import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const movieId = searchParams.get('movieId')

    const url = new URL(`${process.env.API_URL}/new-featured`)
    if (movieId) {
      url.searchParams.set('movieId', movieId)
    }

    const res = await fetch(url.toString())
    const data = await res.json()
    
    // 👇 Correção: acessar a propriedade 'recommended_movie_ids'
    const movies = data.recommended_movie_ids
    
    if (!movies || movies.length === 0) {
      return NextResponse.json({ message: 'No movies found' }, { status: 404 })
    }

    const raw_movie = movies[0]

    const formattedMovie = {
      id: raw_movie.movieId,
      title: raw_movie.movie_name,
      poster: raw_movie.img_src,
      genres: raw_movie.genres,
      year: raw_movie.release_year,  // 👈 Corrija para release_year
      rating: raw_movie.avg_rating,
      backdrop_src: raw_movie.backdrop_url
    }

    console.log("resultado:", formattedMovie)

    return NextResponse.json(formattedMovie)
  } catch (error) {
    console.error('Erro ao buscar filme:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}