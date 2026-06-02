import { NextResponse } from 'next/server'

export async function POST(req: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params

  if (!token) {
    return NextResponse.json({ message: 'Token inválido.' }, { status: 400 })
  }

  try {
    const { password } = await req.json()

    if (!password) {
      return NextResponse.json({ message: "O campo 'password' é obrigatório." }, { status: 400 })
    }

    const flaskRes = await fetch(`${process.env.API_URL}/reset-password/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    const data = await flaskRes.json()

    if (!flaskRes.ok) {
      return NextResponse.json(
        { message: data.error ?? 'Erro ao redefinir a senha' },
        { status: flaskRes.status }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
