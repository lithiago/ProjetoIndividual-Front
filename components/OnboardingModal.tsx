'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Movie } from '@/types/movies'

interface OnboardingModalProps {
  userId: string
}

export function OnboardingModal({ userId }: OnboardingModalProps) {
  const router = useRouter()
  const [movies, setMovies] = useState<Movie[]>([])
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [hovered, setHovered] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/movies/most-rated')
      const data = await res.json()
      setMovies(data.movies ?? [])
    }
    load()
  }, [])

  const currentMovie = movies[currentIndex]
  const allRated = movies.length > 0 && movies.every(m => ratings[m.id])
  const isLast = currentIndex === movies.length - 1

  function handleRate(movieId: string, star: number) {
    setRatings(prev => ({ ...prev, [movieId]: star }))
  }

  function handleNext() {
    if (currentIndex < movies.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  async function handleSubmit() {
    setLoading(true)
    try {
      await Promise.all(
        Object.entries(ratings).map(([movieId, rating]) =>
          fetch('/api/movies/rate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ movieId, rating, userId }),
          })
        )
      )

      await fetch('/api/model/retrain', { method: 'POST' }) 
      
      router.push('/')
      router.refresh()
    } catch {
      console.error('Erro ao salvar avaliações')
    } finally {
      setLoading(false)
    }
  }

  if (!currentMovie) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
    }}>
      <div style={{
        background: '#2a2a2a',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '480px',
        overflow: 'hidden',
      }}>
        {/* header */}
        <div style={{
          padding: '24px 24px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, margin: 0 }}>
              Avalie alguns filmes
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginTop: '4px' }}>
              Para personalizarmos suas recomendações
            </p>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
            {currentIndex + 1} / {movies.length}
          </span>
        </div>

        {/* progress bar */}
        <div style={{
          margin: '16px 24px 0',
          height: '3px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '999px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${((currentIndex + 1) / movies.length) * 100}%`,
            background: '#fff',
            borderRadius: '999px',
            transition: 'width 0.3s ease',
          }} />
        </div>

        {/* poster */}
        <div style={{
          margin: '20px 24px 0',
          height: '200px',
          borderRadius: '12px',
          overflow: 'hidden',
          background: '#1a1a1a',
        }}>
          {currentMovie.backdrop_src ? (
            <img
              src={currentMovie.backdrop_src}
              alt={currentMovie.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(160deg, #2a2a3a 0%, #1a1a1a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>
                {currentMovie.title}
              </span>
            </div>
          )}
        </div>

        {/* info + estrelas */}
        <div style={{ padding: '16px 24px 24px' }}>
          <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 600, margin: '0 0 4px' }}>
            {currentMovie.title}
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: '0 0 16px' }}>
            {currentMovie.year}
            {currentMovie.genres.length > 0 && ` · ${currentMovie.genres}`}
          </p>

          {/* estrelas */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => handleRate(currentMovie.id, star)}
                onMouseEnter={() => setHovered(prev => ({ ...prev, [currentMovie.id]: star }))}
                onMouseLeave={() => setHovered(prev => ({ ...prev, [currentMovie.id]: 0 }))}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '2px',
                  transition: 'transform 0.1s',
                  transform: (hovered[currentMovie.id] ?? 0) >= star ? 'scale(1.2)' : 'scale(1)',
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24"
                  fill={(hovered[currentMovie.id] ?? 0) >= star || (ratings[currentMovie.id] ?? 0) >= star ? '#facc15' : 'none'}
                  stroke={(hovered[currentMovie.id] ?? 0) >= star || (ratings[currentMovie.id] ?? 0) >= star ? '#facc15' : 'rgba(255,255,255,0.3)'}
                  strokeWidth="1.5"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>
            ))}
          </div>

          {/* navegação */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              style={{
                flex: 1,
                padding: '10px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                color: currentIndex === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.6)',
                fontSize: '13px',
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              ← Anterior
            </button>

            {!isLast ? (
              <button
                onClick={handleNext}
                disabled={!ratings[currentMovie.id]}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: ratings[currentMovie.id] ? '#fff' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '8px',
                  color: ratings[currentMovie.id] ? '#1E1E1E' : 'rgba(255,255,255,0.3)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: ratings[currentMovie.id] ? 'pointer' : 'not-allowed',
                }}
              >
                Próximo →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allRated || loading}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: allRated ? '#fff' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '8px',
                  color: allRated ? '#1E1E1E' : 'rgba(255,255,255,0.3)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: allRated ? 'pointer' : 'not-allowed',
                }}
              >
                {loading ? 'Salvando...' : 'Concluir'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}