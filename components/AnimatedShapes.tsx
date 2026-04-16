'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function AnimatedShapes() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for parallax tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-80, 80], [6, -6]), { stiffness: 80, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-160, 160], [-8, 8]), { stiffness: 80, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className="flex items-center gap-3 w-fit select-none"
      style={{ cursor: 'none' }}
    >
      {/* Large gold pill */}
      <motion.div
        animate={{ y: [0, -7, 3, 0], rotate: [0, 2, -1.5, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 148,
          height: 48,
          borderRadius: 9999,
          background: 'var(--gold)',
          translateZ: 20,
        }}
      />

      {/* Medium amber pill */}
      <motion.div
        animate={{ y: [0, 6, -4, 0], rotate: [0, -2.5, 1, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
        style={{
          width: 96,
          height: 48,
          borderRadius: 9999,
          background: 'var(--amber)',
          translateZ: 12,
        }}
      />

      {/* Small gold circle */}
      <motion.div
        animate={{ scale: [1, 1.08, 0.93, 1], y: [0, -5, 3, 0] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        style={{
          width: 48,
          height: 48,
          borderRadius: 9999,
          background: 'var(--gold)',
          opacity: 0.45,
          translateZ: 6,
        }}
      />
    </motion.div>
  )
}
