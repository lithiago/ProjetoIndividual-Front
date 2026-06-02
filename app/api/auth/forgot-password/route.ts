import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    const flaskRes = await fetch(`${process.env.API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await flaskRes.json()

    if (!flaskRes.ok) {
      return NextResponse.json(
        { message: data.error ?? 'Erro ao enviar instruções de recuperação' },
        { status: flaskRes.status }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
