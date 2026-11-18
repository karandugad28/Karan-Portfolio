import { useState, useEffect } from 'react'

const BREAKPOINTS = {
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1440,
  '2xl': 1920,
}

/**
 * Returns { isMobile, isTablet, isDesktop, width }
 * isMobile: width < 768px — used to gate the R3F hero scene
 */
export function useBreakpoint() {
  const [width, setWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1280
  )

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return {
    width,
    isMobile:  width < BREAKPOINTS.md,
    isTablet:  width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
    isDesktop: width >= BREAKPOINTS.lg,
  }
}
