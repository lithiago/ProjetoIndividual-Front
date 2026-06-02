'use client'

import { useState } from 'react'
import { SearchIcon } from './icons/SearchIcon'
import { LoginButton } from './LoginButton'
import { UserButton } from './UserButton'
import { SearchBar } from './SearchBar'
import { MovieTable } from './MovieTable'
import { useRouter } from 'next/navigation'

interface Movie {
  id: string
  title: string
  poster: string | null
  year: string
  genres?: string[]
}

interface NavbarProps {
  isLoggedIn?: boolean
}



export function Navbar({ isLoggedIn = false }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [filterText, setFilterText] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])

  const router = useRouter()


  async function handleSearchOpen() {
    if (searchOpen) {
      setSearchOpen(false)
      setFilterText('')
      return
    }
    const res = await fetch('/api/movies')
    const data = await res.json()
    setMovies(data.movies ?? [])
    setSearchOpen(true)
  }

  return (
    <nav style={{
      position: 'absolute',
      top: 0, left: 0, right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 32px',
      background: 'transparent',
      zIndex: 10,
    }}>
      <span onClick={() => router.push('/')}
        style={{ color: '#fff', fontSize: '18px', fontWeight: 600, letterSpacing: '1px', cursor:'pointer' }}>
        EXA 618
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

        <div style={{ position: 'relative' }}>

          <div style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            width: searchOpen ? '440px' : '40px',
            transition: 'width 0.3s ease',
            overflow: 'hidden',
          }}>
            <button
              onClick={handleSearchOpen}
              style={{
                width: '40px', height: '40px',
                flexShrink: 0,
                borderRadius: '50%',
                border: 'none',
                background: searchOpen ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              <SearchIcon size={20} color="white" />
            </button>

            {searchOpen && (
              <div style={{ flex: 1, padding: '0 8px' }}>
                <SearchBar
                  filterText={filterText}
                  onFilterTextChange={setFilterText}
                  onClose={() => { setSearchOpen(false); setFilterText('') }}
                />
              </div>
            )}
          </div>

          {searchOpen && (
            <div
              className="dropdown-scroll"

              style={{
                position: 'absolute',
                top: 'calc(100% + 16px)',
                right: 0,
                width: '440px',
                background: '#2a2a2a',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.08)',
                zIndex: 100,
                padding: '8px',
                maxHeight: '400px',
                overflowY: 'auto',
              }}>
              <MovieTable movies={movies} filterText={filterText} />
            </div>
          )}
        </div>


        {isLoggedIn ? <UserButton /> : <LoginButton />}
      </div>
    </nav>
  )
}