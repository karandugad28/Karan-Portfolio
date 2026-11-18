import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useBreakpoint } from '@/hooks/useBreakpoint'

export function CustomCursor() {
  const { isMobile } = useBreakpoint()
  const [hovered, setHovered] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  useEffect(() => {
    if (isMobile) return

    const onMouseMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const onMouseOver = (e) => {
      const target = e.target
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')

      setHovered(isClickable)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)

    document.body.classList.add('custom-cursor-active')

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [isMobile, cursorX, cursorY])

  if (isMobile) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: '#22D3EE',
        }}
        animate={{
          scale: hovered ? 0 : 1,
          opacity: hovered ? 0 : 1
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border pointer-events-none z-[9998]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: hovered ? '#7C3AED' : '#22D3EE',
          backgroundColor: hovered ? 'rgba(124,58,237,0.1)' : 'transparent',
          boxShadow: hovered ? '0 0 20px rgba(124,58,237,0.4)' : 'none',
        }}
        animate={{
          scale: hovered ? 1.5 : 1,
          borderWidth: hovered ? '2px' : '1px'
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}

export default CustomCursor
