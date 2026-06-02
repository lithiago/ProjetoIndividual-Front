'use client'

interface SearchBarProps {
  filterText: string
  onFilterTextChange: (text: string) => void
  onClose: () => void
}

export function SearchBar({ filterText, onFilterTextChange, onClose }: SearchBarProps) {
  return (
    <input
      autoFocus
      type="text"
      value={filterText}
      placeholder="Search..."
      onChange={e => onFilterTextChange(e.target.value)}
      onKeyDown={e => e.key === 'Escape' && onClose()}
      style={{
        background: 'transparent',
        border: 'none',
        outline: 'none',
        color: '#fff',
        fontSize: '14px',
        width: '100%',
        padding: '4px 0',
      }}
    />
  )
}