import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const res = await fetch(`${process.env.API_URL}/model/retrain`, {
      method: 'POST',
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}   