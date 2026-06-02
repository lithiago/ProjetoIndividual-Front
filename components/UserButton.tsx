'use client'

import { useState } from 'react'
import { UserDropdown } from './UserDropdown'

export function UserButton() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(prev => !prev)}
        style={{
          marginLeft: '8px',
          padding: '8px 20px',
          borderRadius: '6px',
          border: '1px solid rgba(255,255,255,0.3)',
          background: open ? 'rgba(255,255,255,0.1)' : 'transparent',
          color: '#fff',
          fontSize: '13px',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        USER
      </button>

      {open && <UserDropdown onClose={() => setOpen(false)} />}
    </div>
  )
}