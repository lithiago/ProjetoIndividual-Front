'use client'

import { useState } from 'react'
import { LoginModal } from './LoginModal'
import { RegisterModal } from './RegisterModal'
import { OnboardingModal } from './OnboardingModal'
import { useRouter } from 'next/navigation'
type Modal = 'login' | 'register' | 'onboarding' | null

export function LoginButton() {
  const [open, setOpen] = useState<Modal>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()

  return (
    <>
      <button
        onClick={() => setOpen('login')}
        style={{
          marginLeft: '8px',
          padding: '8px 20px',
          borderRadius: '6px',
          border: '1px solid rgba(255,255,255,0.3)',
          background: 'transparent',
          color: '#fff',
          fontSize: '13px',
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        Login
      </button>

      {open === 'login' && (
        <LoginModal
          onClose={() => setOpen(null)}
          onRegister={() => setOpen('register')}
          onSuccess={(hasRatings, uid) => {
            console.log('Entrou aqui')
            setUserId(uid)
            if (hasRatings) {
              setOpen(null)
              router.push('/') // push em vez de refresh — força re-render completo


            } else {
              console.log('estaaq')
              setOpen('onboarding') // sem avaliações → onboarding primeiro
            }
          }}
        />
      )}

      {open === 'register' && (
        <RegisterModal
          onClose={() => setOpen(null)}
          onLogin={() => setOpen('login')}
          onSuccess={(uid) => {
            setUserId(uid)
            setOpen('onboarding') // novo usuário sempre vai pro onboarding
          }}
        />
      )}

      {open === 'onboarding' && userId && (
        <OnboardingModal userId={userId} />
      )}
    </>
  )
}