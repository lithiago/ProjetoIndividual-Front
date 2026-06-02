'use client'

import { useRouter } from 'next/navigation'

interface CategoryCardProps {
  name: string
  poster: string | null
  color: string
}

export function CategoryCard({ name, poster, color }: CategoryCardProps) {
  
  const router = useRouter()
  return (
    <div onClick={() => router.push(`/categories/${name.toLowerCase()}`)}
      style={{
        position: 'relative',
        flexShrink: 0,
        width: '200px',
        height: '200px',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        background: color,
        transition: 'transform 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {poster ? (
        <img
          src={poster}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
        />
      ) : (
        <div style={{ width: '100%', height: '100%', background: color, opacity: 0.8 }} />
      )}

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
      }} />

      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{ color: '#fff', fontSize: '18px', fontWeight: 600 }}>
          {name}
        </span>
        <span style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: '11px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          border: '1px solid rgba(255,255,255,0.4)',
          borderRadius: '4px',
          padding: '2px 8px',
        }}>
          Explore →
        </span>
      </div>
    </div>
  )
}