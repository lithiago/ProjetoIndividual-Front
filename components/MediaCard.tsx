"use client";

import { useState } from "react";
import { MovieModal } from "./MovieModal";

interface Movie {
  id: string
  title: string
  poster: string | null
  year: string
  backdrop_src: string | null
}

interface MediaCardProps {
  movie: Movie
  rank?: number
}

export function MediaCard({ movie, rank }: MediaCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        style={{
          position: 'relative',
          flexShrink: 0,
          width: '140px',
          height: '210px',
          borderRadius: '8px',
          overflow: 'hidden',
          cursor: 'pointer',
          background: '#2a2a2a',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
            background: 'linear-gradient(160deg, #2a2a3a 0%, #1a1a1a 100%)',
          }}>
            <span style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '12px',
              textAlign: 'center',
              lineHeight: 1.4,
            }}>
              {movie.title}
            </span>
          </div>
        )}

        {rank !== undefined && (
          <div style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            fontSize: '42px',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1,
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            WebkitTextStroke: '1px rgba(255,255,255,0.3)',
          }}>
            {rank}
          </div>
        )}

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
        }} />
      </div>

      {open && <MovieModal movie={movie} onClose={() => setOpen(false)} />}
    </>
  )
}