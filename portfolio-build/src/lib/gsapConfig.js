import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Default easing from design.md
gsap.defaults({
  ease: 'power3.out',
})

// ScrollTrigger defaults
ScrollTrigger.defaults({
  toggleActions: 'play none none none',
})

export { gsap, ScrollTrigger }

/**
 * Creates a standard section-reveal timeline.
 * elements: CSS selector or DOM nodes
 * trigger:  scroll trigger element (usually the section itself)
 */
export function createRevealTimeline(elements, trigger, options = {}) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: options.start || 'top 75%',
      toggleActions: 'play none none none',
      ...options.scrollTrigger,
    },
  })

  tl.fromTo(
    elements,
    { y: 24, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: options.duration || 0.7,
      ease: 'expo.out',
      stagger: options.stagger || 0.08,
    }
  )

  return tl
}
