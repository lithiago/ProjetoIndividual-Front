import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

  export async function POST(req: Request) {
    try {
      const SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? 'dev_secret')
      const { email, password } = await req.json()

      const flaskRes = await fetch(`${process.env.API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await flaskRes.json()

      console.log(data)

      if (!flaskRes.ok) {
        return NextResponse.json(
          { message: data.error ?? 'Credenciais inválidas' },
          { status: flaskRes.status }
        )
      }

      const cookieStore = await cookies()
      cookieStore.set('token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })

      const { payload } = await jwtVerify(data.token, SECRET)
      const userId = payload.sub as string

      return NextResponse.json({ ok: true, has_ratings: data.has_ratings, userId })
    } catch {
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
  }