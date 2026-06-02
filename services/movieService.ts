import type { Movie } from '@/types/movies'

function normalize(m: any): Movie {
  return {
    id: m.movieId,
    title: m.movie_name,
    poster: m.img_src ?? null,
    year: m.year ? String(m.year) : '',
    genres: m.genres ?? [],
    backdrop_src: m.backdrop_url ?? null
  }
}

export async function getTopRated(limit = 60): Promise<Movie[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/movies/top-rated?limit=${limit}`)
    const data = await res.json()
    return (data['Lista de Filmes'] ?? []).map(normalize)
  } catch {
    return []
  }
}

export async function getMoviesByGenre(genres: string[]): Promise<Movie[]> {
  try {
    const params = genres.map(g => `genre=${encodeURIComponent(g)}`).join('&')
    const res = await fetch(`${process.env.API_URL}/movies/genres?${params}`)
    const data = await res.json()
    return (data ?? []).map(normalize)
  } catch {
    return []
  }
}

export async function getNonWatched(userId: string, limit = 20): Promise<Movie[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/movies/non-watched?user_id=${userId}&limit=${limit}`)
    const data = await res.json()
    return (data ?? []).map(normalize)
  } catch {
    return []
  }
}