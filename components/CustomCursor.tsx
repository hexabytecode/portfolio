'use client'
import { useEffect, useRef } from 'react'

// Pixelated arrow — tip at (0,0), points up-left like a classic cursor
function PixelArrow() {
  return (
    <svg
      width="30"
      height="40"
      viewBox="0 0 30 40"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      {/* Left edge — the spine of the arrow */}
      <rect x="0" y="0" width="5" height="30" fill="#DC2626" />
      {/* Staircase diagonal — each step is one pixel right + one down */}
      <rect x="5"  y="5"  width="5" height="5" fill="#DC2626" />
      <rect x="10" y="10" width="5" height="5" fill="#DC2626" />
      <rect x="15" y="15" width="5" height="5" fill="#DC2626" />
      <rect x="20" y="20" width="5" height="5" fill="#DC2626" />
      <rect x="25" y="25" width="5" height="5" fill="#DC2626" />
      {/* Bottom bar connecting spine to staircase end */}
      <rect x="5" y="25" width="25" height="5" fill="#DC2626" />
      {/* Tail */}
      <rect x="10" y="30" width="5" height="10" fill="#DC2626" />
      {/* White inner fill so it reads clearly on any background */}
      <rect x="5"  y="5"  width="4" height="20" fill="#ffffff" />
      <rect x="9"  y="9"  width="4" height="16" fill="#ffffff" />
      <rect x="13" y="13" width="4" height="12" fill="#ffffff" />
      <rect x="17" y="17" width="4" height="8"  fill="#ffffff" />
      <rect x="10" y="30" width="4" height="9"  fill="#ffffff" />
    </svg>
  )
}

export function CustomCursor() {
  const arrowRef = useRef<HTMLDivElement>(null)
  const ringRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = -200, my = -200
    let rx = -200, ry = -200
    let raf: number
    // isPointer = hovering over something clickable (a, button, [role=button])
    let isPointer = false

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }

    const onEnter = (e: Event) => {
      const el = e.currentTarget as Element
      if (el.matches('a, button, [role="button"]')) {
        isPointer = true
      }
    }
    const onLeave = (e: Event) => {
      const el = e.currentTarget as Element
      if (el.matches('a, button, [role="button"]')) {
        isPointer = false
      }
    }

    // Bind to current + future elements via event delegation on document
    const docEnter = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (!target) return
      const match = target.closest('a, button, [role="button"]')
      isPointer = !!match
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', docEnter)

    const tick = () => {
      // Arrow snaps exactly — tip at (0,0) → translate puts tip on cursor
      if (arrowRef.current) {
        arrowRef.current.style.transform = `translate(${mx}px, ${my}px)`
      }

      // Ring lerps behind
      rx += (mx - rx) * 0.09
      ry += (my - ry) * 0.09

      if (ringRef.current) {
        // Pointer mode: smaller + more opaque = "locked on"
        // Default: larger + subtle
        const size   = isPointer ? 36 : 52
        const offset = size / 2
        const bg     = isPointer ? 'rgba(220,38,38,0.35)' : 'rgba(220,38,38,0.08)'

        ringRef.current.style.transform  = `translate(${rx - offset}px, ${ry - offset}px)`
        ringRef.current.style.width      = `${size}px`
        ringRef.current.style.height     = `${size}px`
        ringRef.current.style.background = bg
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', docEnter)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Pixelated arrow — tip anchored to mouse */}
      <div
        ref={arrowRef}
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          pointerEvents: 'none',
          zIndex:        9999,
          willChange:    'transform',
        }}
      >
        <PixelArrow />
      </div>

      {/* Ring — lags behind, tightens on clickable elements */}
      <div
        ref={ringRef}
        style={{
          position:     'fixed',
          top:          0,
          left:         0,
          width:        52,
          height:       52,
          borderRadius: '50%',
          border:       '2px solid #DC2626',
          background:   'rgba(220, 38, 38, 0.08)',
          pointerEvents:'none',
          zIndex:       9998,
          willChange:   'transform, width, height',
          transition:   'width 0.2s ease, height 0.2s ease, background 0.2s ease',
        }}
      />
    </>
  )
}
