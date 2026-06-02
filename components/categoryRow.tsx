"use client";

import { CategoryCard } from './CategoryCard'

interface Category {
  id: string
  name: string
  poster: string | null
  color: string
}

interface CategoryRowProps {
  title: string
  categories: Category[]
}

export function CategoryRow({ title, categories }: CategoryRowProps) {
  return (
    <section style={{ marginBottom: '40px' }}>
      <h2 style={{
        color: '#fff',
        fontSize: '18px',
        fontWeight: 500,
        padding: '0 48px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        {title}
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>›</span>
      </h2>

      <div style={{
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        padding: '0 48px',
        scrollbarWidth: 'none',
      }}>
        {categories.map(cat => (
          <CategoryCard key={cat.id} name={cat.name} poster={cat.poster} color={cat.color} />
        ))}
      </div>
    </section>
  )
}