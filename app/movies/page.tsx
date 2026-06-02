import { Navbar } from '@/components/Navbar'
import { MoviesGrid } from '@/components/MoviesGrid'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? 'dev_secret')

interface MoviesPageProps {
  searchParams: Promise<{ q?: string, type?: string, category?: string }>
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const { q = '', type = 'top-rated', category = '' } = await searchParams

  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  let userId: string | null = null
  let isLoggedIn: boolean = false
  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET)
      userId = payload.sub as string
      isLoggedIn=true
    } catch {}
  }

  return (
    <main style={{ minHeight: '100vh', background: '#1E1E1E' }}>
      <Navbar isLoggedIn={isLoggedIn}/>
      <MoviesGrid initialQuery={q} type={type} userId={userId} category={category} />
    </main>
  )
}