'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { resetPassword } from '@/services/authService'

export default function ResetPasswordPage() {
  const params = useParams()
  const router = useRouter()
  const token = params?.token && !Array.isArray(params.token) ? params.token : Array.isArray(params?.token) ? params.token[0] : undefined
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setError(null)
    setMessage(null)

    if (!token) {
      setError('Token inválido.')
      return
    }

    if (!password) {
      setError('Informe a nova senha.')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    setLoading(true)

    try {
      const res = await resetPassword({ token, password })
      if (!res.ok) {
        setError(res.message ?? 'Não foi possível redefinir a senha.')
      } else {
        setMessage('Senha atualizada com sucesso. Você pode fazer login agora.')
        setPassword('')
        setConfirmPassword('')
      }
    } catch (err) {
      console.error(err)
      setError('Algo deu errado. Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: '#111',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: '#1c1c1c',
          borderRadius: '20px',
          padding: '36px',
          color: '#fff',
          boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700 }}>Redefinir senha</h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: '12px', lineHeight: 1.6 }}>
          Insira uma nova senha para o seu acesso. O token expira em 1 hora.
        </p>

        <label style={{ display: 'block', marginTop: '24px', fontSize: '14px', color: 'rgba(255,255,255,0.75)' }}>
          Nova senha
        </label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="••••••••"
          style={{
            width: '100%',
            marginTop: '10px',
            padding: '12px 14px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.12)',
            background: '#111',
            color: '#fff',
            outline: 'none',
            fontSize: '14px',
          }}
        />

        <label style={{ display: 'block', marginTop: '18px', fontSize: '14px', color: 'rgba(255,255,255,0.75)' }}>
          Confirme a nova senha
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          style={{
            width: '100%',
            marginTop: '10px',
            padding: '12px 14px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.12)',
            background: '#111',
            color: '#fff',
            outline: 'none',
            fontSize: '14px',
          }}
        />

        {error && (
          <p style={{ color: '#f87171', marginTop: '14px', fontSize: '14px' }}>{error}</p>
        )}

        {message && (
          <p style={{ color: '#86efac', marginTop: '14px', fontSize: '14px' }}>{message}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !password || !confirmPassword}
          style={{
            width: '100%',
            marginTop: '22px',
            padding: '14px',
            borderRadius: '10px',
            border: 'none',
            background: loading || !password || !confirmPassword ? 'rgba(255,255,255,0.18)' : '#fff',
            color: loading || !password || !confirmPassword ? 'rgba(255,255,255,0.5)' : '#111',
            fontSize: '15px',
            fontWeight: 700,
            cursor: loading || !password || !confirmPassword ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Redefinindo...' : 'Redefinir senha'}
        </button>

        <button
          onClick={() => router.push('/')}
          style={{
            marginTop: '16px',
            width: '100%',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.16)',
            borderRadius: '10px',
            padding: '12px',
            color: '#fff',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Voltar ao início
        </button>
      </div>
    </div>
  )
}
