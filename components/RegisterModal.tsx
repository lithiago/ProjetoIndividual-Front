'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface RegisterModalProps {
  onClose: () => void
  onLogin: () => void
  onSuccess: (userId: string) => void

}

export function RegisterModal({ onClose, onLogin, onSuccess }: RegisterModalProps) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.message ?? 'Something went wrong')
        return
      }

      router.refresh()
      onSuccess(name) // abre o onboarding — não chame onClose() aqui
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#2a2a2a',
          borderRadius: '16px',
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div>
          <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>
            Crie sua conta
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
            Veja as melhores opções de filmes
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Username</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Seu nome de usário"
              style={{
                background: '#1E1E1E',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                background: '#1E1E1E',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{
                background: '#1E1E1E',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {error && (
          <p style={{ color: '#f87171', fontSize: '13px', margin: 0 }}>
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !name || !email || !password}
          style={{
            background: loading || !name || !email || !password ? 'rgba(255,255,255,0.2)' : '#fff',
            color: loading || !name || !email || !password ? 'rgba(255,255,255,0.4)' : '#1E1E1E',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: loading || !name || !email || !password ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {loading ? 'Creiando conta...' : 'Criar conta'}
        </button>

        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textAlign: 'center', margin: 0 }}>
          Já tem uma conta?{' '}
          <button
            onClick={onLogin}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontWeight: 500,
              fontSize: '13px',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            Entrar
          </button>
        </p>

        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '13px',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}