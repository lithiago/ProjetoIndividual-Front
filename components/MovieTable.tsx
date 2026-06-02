import { useRouter } from "next/navigation"

interface Movie {
  id: string
  title: string
  poster: string | null
  year: string
  genres?: string[]
}

interface MovieTableProps {
  movies: Movie[]
  filterText: string
}

export function MovieTable({ movies, filterText }: MovieTableProps) {
  const filtered = movies.filter(movie =>
    String(movie.title ?? '').toLowerCase().includes(filterText.toLowerCase())
  )

  const visible = filtered.slice(0, 5)
  const router = useRouter()


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {filtered.length === 0 && (
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textAlign: 'center', padding: '24px' }}>
          Nenhum filme encontrado para "{filterText}"
        </p>
      )}

      {visible.map((movie, index) => (
        <div key={`${movie.id}-${index}`} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '12px',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <div style={{
            width: '44px', height: '64px',
            borderRadius: '6px',
            overflow: 'hidden',
            flexShrink: 0,
            background: '#1a1a1a',
          }}>
            {movie.poster ? (
              <img src={movie.poster} alt={movie.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(160deg, #2a2a3a 0%, #1a1a1a 100%)' }} />
            )}
          </div>

          <div>
            <p style={{ color: '#fff', fontSize: '14px', fontWeight: 500, margin: 0 }}>
              {movie.title}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: '4px 0 0' }}>
              {movie.year}{movie.genres && ` · ${movie.genres.join(', ')}`}
            </p>
          </div>
        </div>
      ))}

      {filtered.length > 0 && (
        <button onClick={() => {
          router.push(`/movies?q=${encodeURIComponent(filterText)}`)
        }}
        style={{
          width: '100%',
          padding: '12px',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          color: 'rgba(255,255,255,0.5)',
          fontSize: '13px',
          cursor: 'pointer',
          marginTop: '8px',
        }}>
          Ver todos →
        </button>
      )}
    </div>
  )
}