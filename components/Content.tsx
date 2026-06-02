'use client'

import { useState, useEffect } from 'react'
import { FeaturedBanner } from './FeaturedBanner'
import { ContentRow } from './ContentRow'
import { CategoryRow } from './categoryRow'
import { Movie, FeaturedMovie } from '@/types/movies'



interface ContentProps {
  isLoggedIn: boolean
  userId: string | null
}

const categories = [
  { id: 'c1', name: 'Drama',    poster: null, color: '#1a2a3a' },
  { id: 'c2', name: 'Thriller', poster: null, color: '#3a1a1a' },
  { id: 'c3', name: 'Action',   poster: null, color: '#2a1a0a' },
  { id: 'c4', name: 'Mystery',  poster: null, color: '#0a2a2a' },
  { id: 'c5', name: 'Romance',  poster: null, color: '#2a0a2a' },
  { id: 'c6', name: 'Comedy',   poster: null, color: '#1a2a1a' },
]

export function Content({ isLoggedIn, userId }: ContentProps) {
  const [topRated, setTopRated] = useState<Movie[]>([])
  const [recommended, setRecommended] = useState<Movie[]>([])
  const [nonWatched, setNonWatched] = useState<Movie[]>([])
  const [featuredMovie, setFeaturedMovie] = useState<FeaturedMovie | null>(null)
  const [loadingFeatured, setLoadingFeatured] = useState(false)

  useEffect(() => {
    async function load() {
      // top rated — sempre carrega
      const topRes = await fetch('/api/movies/top-rated')
      const topData = await topRes.json()
      setTopRated(topData.movies ?? [])

      // featured
      const featuredRes = await fetch('/api/featured')
      const featuredData = await featuredRes.json()
      
      setFeaturedMovie(featuredData)

      console.log(featuredData)
      // só carrega se logado
      if (isLoggedIn && userId) {
        const [recRes, nonWatchedRes] = await Promise.all([
          fetch(`/api/movies/recommendations?userId=${userId}`),
          fetch(`/api/movies/non-watched?userId=${userId}`),
        ])

        const recData = await recRes.json()
        const nonWatchedData = await nonWatchedRes.json()

        setRecommended(recData.movies ?? [])
        setNonWatched(nonWatchedData.movies ?? [])
      }
    }

    load()
  }, [isLoggedIn, userId])

  async function fetchNewFeatured(movieId?: string) {
    setLoadingFeatured(true)
    try {
      const query = movieId ? `?movieId=${encodeURIComponent(movieId)}` : ''
      const res = await fetch(`/api/new-featured${query}`)
      const data = await res.json()
      setFeaturedMovie(data)
    } catch {
      console.error('Failed to fetch new featured')
    } finally {
      setLoadingFeatured(false)
    }
  }

  return (
    <div style={{ padding: '32px 0' }}>
      <ContentRow title="Mais Avaliados" items={topRated} href='/movies?type=top-rated'/>

      {isLoggedIn && recommended.length > 0 && (
        <ContentRow title="Recomendados para você" items={recommended.slice(0, 20)} href='/movies?type=recommended' />
      )}

      {isLoggedIn && nonWatched.length > 0 && (
        <ContentRow title="Ainda não assistidos" items={nonWatched} href='/movies?type=recommended' />
      )}

      <CategoryRow title="Categorias" categories={categories} />

      {featuredMovie && (
        loadingFeatured ? (
          <div style={{
            margin: '0 48px 40px',
            height: '320px',
            borderRadius: '16px',
            background: '#2a2a2a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
              Carregando próximo título...
            </p>
          </div>
        ) : (
          <FeaturedBanner movie={featuredMovie} onRated={fetchNewFeatured} />
        )
      )}
    </div>
  )
}