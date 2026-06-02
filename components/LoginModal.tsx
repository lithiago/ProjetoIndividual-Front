'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/services/authService'

interface LoginModalProps {
  onClose: () => void
  onRegister: () => void
  onSuccess: (hasRatings: boolean, userId: string) => void

}

export function LoginModal({ onClose, onRegister, onSuccess }: LoginModalProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setError(null)
    setLoading(true)

    try {
      const res = await login({ email, password })

      if (!res.ok) {
        setError(res.message ?? 'Invalid credentials')
        return
      }
      
      onSuccess(res.has_ratings ?? false, res.userId ?? '') // passa has_ratings e userId
      // router.refresh()  
    } catch (e){
      console.log('error:', e)
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    // backdrop
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
      {/* modal — stop propagation para não fechar ao clicar dentro */}
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
            Bem-vindo de volta
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
            Faça o login para visualizar os títulos
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
              Email
            </label>
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
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
              Password
            </label>
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
          disabled={loading || !email || !password}
          style={{
            background: loading || !email || !password ? 'rgba(255,255,255,0.2)' : '#fff',
            color: loading || !email || !password ? 'rgba(255,255,255,0.4)' : '#1E1E1E',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {loading ? 'Logando' : 'Login'}
        </button>

        <button
          onClick={() => {
            onClose()
            router.push('/forgot-password')
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontWeight: 500,
            fontSize: '13px',
            cursor: 'pointer',
            padding: 0,
            alignSelf: 'flex-end',
          }}
        >
          Esqueceu a senha?
        </button>

        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textAlign: 'center', margin: 0 }}>
          Não tem uma conta?{' '}
          <button
            onClick={onRegister}
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
            Crie uma conta
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
