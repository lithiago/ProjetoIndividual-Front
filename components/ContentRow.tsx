import { Movie } from '@/types/movies'
import { MediaCard } from './MediaCard'
import { useRouter } from 'next/navigation'


// interface Movie {
//   id: string
//   title: string
//   poster: string | null
//   year: string
//   backdro
// }

interface ContentRowProps {
  title: string
  items: Movie[]
  showRanking?: boolean
  href?: string
}

export function ContentRow({ title, items, showRanking = false, href }: ContentRowProps) {
  const router = useRouter()

  return (
    <section style={{ marginBottom: '40px' }}>
      <h2 style={{
        color: '#fff',
        fontSize: '18px',
        fontWeight: 500,
        padding: '0 48px',
        marginBottom: '16px',
      }}>
        {title}
      </h2>

      <div style={{
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        padding: '0 48px',
        scrollbarWidth: 'none',
      }}>
        {items.map((movie, index) => (
          <MediaCard
            key={`${movie.id}-${index}`}
            movie={movie}
            rank={showRanking ? index + 1 : undefined}
          />
        ))}

        {href && (
          <button
            onClick={() => router.push(href)}
            style={{
              flexShrink: 0,
              alignSelf: 'center',
              padding: '8px 16px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '13px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
          >
            Ver todos →
          </button>
        )}
      </div>
    </section>
  )
}