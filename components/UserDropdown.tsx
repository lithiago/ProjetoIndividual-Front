'use client'

import { useRouter } from "next/navigation"

interface UserDropdownProps {
  onClose: () => void
}

export function UserDropdown({ onClose }: UserDropdownProps) {
  const router = useRouter()

  async function handleLogout() {
    console.log('entrou')
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
    onClose()
  }

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
        }}
      />

      {/* dropdown */}
      <div style={{
        position: 'absolute',
        top: '52px',
        right: '32px',
        width: '220px',
        background: '#2a2a2a',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.08)',
        zIndex: 51,
        overflow: 'hidden',
      }}>
        {/* cabeçalho com nome */}
        <div style={{
          padding: '16px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <p style={{ color: '#fff', fontSize: '14px', fontWeight: 600, margin: 0 }}>
            John Doe
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: '2px 0 0' }}>
            johndoe@email.com
          </p>
        </div>

        {/* filmes avaliados */}
        <button 
        onClick={() => {router.push('/movies?type=rated'); onClose()}}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 16px',
          background: 'transparent',
          border: 'none',
          color: 'rgba(255,255,255,0.7)',
          fontSize: '13px',
          cursor: 'pointer',
          textAlign: 'left',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Filmes Avaliados
        </button>

        {/* logout */}
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            background: 'transparent',
            border: 'none',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            color: '#f87171',
            fontSize: '13px',
            cursor: 'pointer',
            textAlign: 'left',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(248,113,113,0.08)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>
    </>
  )
}