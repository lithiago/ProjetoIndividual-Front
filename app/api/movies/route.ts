import { NextResponse } from 'next/server'
import { getTopRated } from '@/services/movieService'

export async function GET() {
  try {
    const movies = await getTopRated(100)
    console.log("filmes:", movies)

    return NextResponse.json({ movies })
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}