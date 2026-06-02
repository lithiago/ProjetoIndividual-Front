'use client'

import { useState } from 'react'
import Link from 'next/link'
import { forgotPassword } from '@/services/authService'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setError(null)
    setMessage(null)
    setLoading(true)

    try {
      const res = await forgotPassword({ email })
      if (!res.ok) {
        setError(res.message ?? 'Não foi possível enviar as instruções. Tente novamente.')
      } else {
        setMessage('Se o e-mail existir, você receberá instruções para redefinir sua senha.')
        setEmail('')
      }
    } catch (e) {
      console.error(e)
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
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700 }}>Esqueceu a senha?</h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: '12px', lineHeight: 1.6 }}>
          Informe seu e-mail abaixo e enviaremos instruções para redefinir a sua senha.
        </p>

        <label style={{ display: 'block', marginTop: '24px', fontSize: '14px', color: 'rgba(255,255,255,0.75)' }}>
          E-mail
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="seu@email.com"
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
          disabled={loading || !email}
          style={{
            width: '100%',
            marginTop: '22px',
            padding: '14px',
            borderRadius: '10px',
            border: 'none',
            background: loading || !email ? 'rgba(255,255,255,0.18)' : '#fff',
            color: loading || !email ? 'rgba(255,255,255,0.5)' : '#111',
            fontSize: '15px',
            fontWeight: 700,
            cursor: loading || !email ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Enviando...' : 'Enviar instruções'}
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
            Voltar ao início
          </Link>
          <Link href="/" style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
