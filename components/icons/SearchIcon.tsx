"use client";

import { useState } from "react";

export function SearchIcon({ size = 20, color = "currentColor" }) {

  const [open, setOpen] = useState()
  return (
    
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <line x1="15.5" y1="15.5" x2="21" y2="21" />
    </svg>
  );
}