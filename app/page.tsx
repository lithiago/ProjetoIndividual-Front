import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import Hero from '@/components/Hero'
import { Content } from '@/components/Content'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? 'dev_secret')

export default async function Home() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  let isLoggedIn = false
  let userId: string | null = null

  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET)
      isLoggedIn = true
      userId = payload.sub as string
    } catch (e) {
      isLoggedIn = false
    }
  }

  return (
    <main>
      <Hero isLoggedIn={isLoggedIn} />
      <Content isLoggedIn={isLoggedIn} userId={userId} />
    </main>
  )
}