interface LoginParams {
  email: string
  password: string
}

interface RegisterParams {
  name: string
  email: string
  password: string
}

interface AuthResponse {
  ok: boolean
  message?: string
  has_ratings?: boolean
  userId?: string  // opcional — erro não tem userId
}

export async function login({ email, password }: LoginParams): Promise<AuthResponse> {
  console.log('aaaaaaaaaaaaaaaaa')
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  console.log('res:', res)

  const data = await res.json()

  if (!res.ok) return { ok: false, message: data.message }
  return { ok: true, has_ratings: data.has_ratings, userId: data.userId } // <- data.userId
}


export async function register({ name, email, password }: RegisterParams): Promise<AuthResponse> {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })

  const data = await res.json()

  if (!res.ok) return { ok: false, message: data.message }
  return { ok: true, userId: data.userId }  // <- pega do Route Handler
}

interface ResetPasswordParams {
  token: string
  password: string
}

export async function resetPassword({ token, password }: ResetPasswordParams): Promise<AuthResponse> {
  const res = await fetch(`/api/auth/reset-password/${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })

  const data = await res.json()

  if (!res.ok) return { ok: false, message: data.message }
  return { ok: true }
}

interface ForgotPasswordParams {
  email: string
}

export async function forgotPassword({ email }: ForgotPasswordParams): Promise<AuthResponse> {
  const res = await fetch('/api/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  const data = await res.json()

  if (!res.ok) return { ok: false, message: data.message }
  return { ok: true }
}