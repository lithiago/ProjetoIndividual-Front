'use client'

import { useState, useEffect } from 'react'
import { MediaCard } from './MediaCard'

interface Movie {
  id: string
  title: string
  poster: string | null
  year: string
  genres?: string[]
  backdrop_src: string | null
}

interface MoviesGridProps {
  initialQuery?: string
  type?: string
  userId?: string | null
  category?: string

}

const titles: Record<string, string> = {
  'top-rated': 'Top Rated',
  'recommended': 'Recomendados para você',
  'non-watched': 'Ainda não assistidos',
  'rated': 'Filmes Avalaidos',
  'category': 'Categoria',

}

export function MoviesGrid({ initialQuery = '', type = 'top-rated', userId, category }: MoviesGridProps) {
  const [filterText, setFilterText] = useState(initialQuery)
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    async function load() {
      let url = '/api/movies/top-rated'

      if (type === 'recommended' && userId) {
        url = `/api/movies/recommendations?userId=${userId}`
      } else if (type === 'non-watched' && userId) {
        url = `/api/movies/non-watched?userId=${userId}`
      } else if (type === 'rated' && userId) {
        url = `/api/movies/rated?userId=${userId}`
      } else if (type === 'category' && category) {
        url = `/api/movies/genres?genre=${encodeURIComponent(category)}`

      }

      const res = await fetch(url)
      const data = await res.json()
      console.log("films:", data)
      setMovies(data.movies ?? [])
    }
    load()
  }, [type, userId])

  

  const filtered = movies.filter(movie =>
    String(movie.title ?? '').toLowerCase().includes(filterText.toLowerCase())
  )

  return (
    <div style={{ padding: '100px 48px 48px' }}>

      {/* searchbar */}
      <div style={{
        marginBottom: '32px',
        background: '#2a2a2a',
        borderRadius: '12px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <line x1="15.5" y1="15.5" x2="21" y2="21" />
        </svg>
        <input
          type="text"
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
          placeholder="Buscar filmes..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#fff',
            fontSize: '15px',
          }}
        />
        {filterText && (
          <button
            onClick={() => setFilterText('')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* header */}
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 600, margin: 0 }}>
          {filterText ? `Resultados para "${filterText}"` : titles[type] ?? 'Filmes'}
        </h1>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
          {filtered.length} {filtered.length === 1 ? 'filme' : 'filmes'}
        </span>
      </div>

      {/* grid */}
      {filtered.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', textAlign: 'center', marginTop: '80px' }}>
          Nenhum filme encontrado
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '16px',
        }}>
          {filtered.map((movie, index) => (
            <MediaCard key={`${movie.id}-${index}`} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}