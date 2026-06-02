"use client";

import { useState, useEffect } from "react";
import { FilterIcon } from "./icons/FilterIcon";
import { SearchIcon } from "./icons/SearchIcon";
import { Navbar } from "./Navbar";
import Image from "next/image";
import TrailerModal from "./TrailerModal";



interface Movie {
    title: string
    genres: string[]
    description: string
    duration: string
    year: string
    quality: string
    poster: string | null
}

const movie: Movie = {
    title: 'Babylon',
    genres: ['Drama', 'Comedy'],
    description: 'A tale of outsized ambition...',
    duration: '1h 54m',
    year: '2022',
    quality: '4K UHD',
    poster: '/spiderman-brandnewday.jpg',
}

const guestMovie = {
    title: 'Spider-Man: Brand New Day',
    genres: ['Action', 'Adventure'],
    description: 'Peter Parker faces a brand new chapter in his life as Spider-Man, confronting new enemies and navigating the consequences of a changed world.',
    duration: '2h 15m',
    year: '2026',
    quality: '4K UHD',
    poster: '/spiderman-brandnewday.jpg',
    youtubeTrailerId: '8TZMtslA3UY'
}

interface HeroProps {
    isLoggedIn?: boolean
}

export default function Hero({ isLoggedIn = false }: HeroProps) {

    const [trailerOpen, setTrailerOpen] = useState(false)
    const data = guestMovie

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            background: '#0a0a0a',
        }}>
            {data.poster ? (
                <Image
                    src={data.poster}
                    alt={data.title}
                    fill
                    priority
                    quality={90}
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />
            ) : (
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #1a1a3a 0%, #3a1a1a 100%)',
                }} />
            )}

            <div style={{
                position: 'absolute',
                inset: 0,
                background: `
          linear-gradient(to right, rgba(0,0,0,0.85) 40%, transparent 70%),
          linear-gradient(to top,   rgba(0,0,0,0.7)  20%, transparent 60%)
        `,
            }} />

            <Navbar isLoggedIn={isLoggedIn} />

            <div style={{
                position: 'absolute',
                bottom: '80px',
                left: '48px',
                maxWidth: '440px',
                zIndex: 2,
            }}>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', marginBottom: '8px' }}>
                    {data.genres.join(' · ')}
                </p>

                <h1 style={{
                    color: '#fff',
                    fontSize: '48px',
                    fontWeight: 700,
                    lineHeight: 1.05,
                    marginBottom: '12px',
                }}>
                    {data.title}
                </h1>

                <p style={{
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    marginBottom: '16px',
                }}>
                    {data.description}
                </p>

                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginBottom: '24px' }}>
                    {data.duration} &nbsp;•&nbsp; {data.year} &nbsp;•&nbsp; {data.quality}
                </p>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>

                    <button
                        onClick={() => setTrailerOpen(true)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: '#fff',
                            color: '#1E1E1E',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '12px 24px',
                            fontSize: '14px',
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#1E1E1E">
                            <polygon points="5,3 19,12 5,21" />
                        </svg>
                        Watch Now
                    </button>


                    <button style={{
                        width: '42px', height: '42px',
                        borderRadius: '8px',
                        border: 'none',
                        background: 'rgba(255,255,255,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                    }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                    </button>
                </div>
            </div>

            <TrailerModal
                videoId={guestMovie.youtubeTrailerId}
                isOpen={trailerOpen}
                onClose={() => setTrailerOpen(false)}
            />
        </div>
    )
}
