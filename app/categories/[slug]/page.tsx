// app/categories/[slug]/page.tsx
import { Navbar } from '@/components/Navbar'
import { MoviesGrid } from '@/components/MoviesGrid'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = slug.charAt(0).toUpperCase() + slug.slice(1)

  return (
    <main style={{ minHeight: '100vh', background: '#1E1E1E' }}>
      <Navbar />
      <MoviesGrid category={category} />
    </main>
  )
}