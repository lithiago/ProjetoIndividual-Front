export interface Movie {
  id: string
  title: string
  poster: string | null
  year: string
  genres: string[],
  backdrop_src: string
  
}

export interface FeaturedMovie extends Movie {
  description?: string
  duration?: string
  quality?: string
}