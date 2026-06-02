export async function getFeaturedMovie() {
  try {
    const res = await fetch(`${process.env.API_URL}/featured`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) throw new Error('Failed to fetch featured')

    return res.json()
  } catch {
    return {
      id: 'f1',
      title: 'Superman',
      genres: ['Drama', 'Action'],
      description: 'Fallback enquanto a API não responde.',
      duration: '1h 54m',
      year: '2025',
      quality: '4K UHD',
      poster: null,
    }
  }
}