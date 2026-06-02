'use client'

import { useState } from 'react'
import Image from 'next/image'


interface Movie {
  id: string
  title: string
  poster: string | null
  year: string
  genres?: string[]
  description?: string
  backdrop_src: string | null
}

interface MovieModalProps {
  movie: Movie
  onClose: () => void
}

export function MovieModal({ movie, onClose }: MovieModalProps) {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)

  async function handleRate(star: number) {
    setRating(star)

    await fetch('/api/movies/rate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId: movie.id, rating: star }),
    })
  }

  return (
    // backdrop
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
    >
      {/* modal */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#2a2a2a',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '480px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* botão fechar */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(0,0,0,0.5)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* poster */}
        <div style={{
          width: '100%',
          height: '315px',    // 105 * 3
          margin: '0 auto',
          background: '#1a1a1a',
          overflow: 'hidden',
          borderRadius: '8px',
        }}>
          {movie.backdrop_src ? (
            <img
              src={movie.backdrop_src}
              alt={movie.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
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
                {movie.title}
              </span>
            </div>
          )}
        </div>

        {/* conteúdo */}
        <div style={{ padding: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{
              color: '#fff',
              fontSize: '22px',
              fontWeight: 700,
              marginBottom: '6px',
            }}>
              {movie.title}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
                {movie.year}
              </span>
              {movie.genres && (
                <>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
                    {movie.genres}
                  </span>
                </>
              )}
            </div>
          </div>

          {movie.description && (
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '13px',
              lineHeight: 1.7,
              marginBottom: '24px',
            }}>
              {movie.description}
            </p>
          )}

          {/* estrelas */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '12px',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              Sua avaliação
            </p>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => handleRate(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '2px',
                    transition: 'transform 0.1s',
                    transform: hovered >= star ? 'scale(1.2)' : 'scale(1)',
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24"
                    fill={hovered >= star || rating >= star ? '#facc15' : 'none'}
                    stroke={hovered >= star || rating >= star ? '#facc15' : 'rgba(255,255,255,0.3)'}
                    strokeWidth="1.5"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', marginTop: '8px' }}>
                Você avaliou com {rating} {rating === 1 ? 'estrela' : 'estrelas'}
              </p>
            )}
          </div>


        </div>
      </div>
    </div>
  )
}