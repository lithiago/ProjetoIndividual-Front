"use client";

import { useState } from "react";
import type { Movie } from "@/types/movies";

interface FeaturedBannerProps {
  movie: Movie
  onRated: (movieId: string) => void
}

export function FeaturedBanner({ movie, onRated }: FeaturedBannerProps) {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)

  async function handleRate(star: number) {
    setRating(star)

    await fetch('/api/movies/rate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId: movie.id, rating: star }),
    })

    setTimeout(() => onRated(movie.id), 1000)
  }

  return (
    <div style={{
      position: 'relative',
      margin: '0 48px 40px',
      height: '600px',
      borderRadius: '16px',
      overflow: 'hidden',
      background: '#2a2a2a',
    }}>
      {movie.backdrop_src ? (
        <img
          src={movie.backdrop_src}
          alt={movie.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #1a1a3a 0%, #3a1a1a 100%)',
        }} />
      )}

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.9) 40%, transparent 75%)',
      }} />

      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 48px',
        maxWidth: '480px',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '8px' }}>
          {movie.genres}
        </p>

        <h2 style={{
          color: '#fff',
          fontSize: '32px',
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: '12px',
        }}>
          {movie.title}
        </h2>

        

        

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
  )
}