import { useEffect } from 'react'
import Lenis from 'lenis'
import { Nav } from './components/layout/Nav'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Stack } from './components/sections/Stack'
import { Projects } from './components/sections/Projects'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/layout/Footer'
import { WhatsAppFloating } from './components/ui/WhatsAppFloating'

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.07 })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    const id = requestAnimationFrame(raf)
    return () => { lenis.destroy(); cancelAnimationFrame(id) }
  }, [])

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--ink)', minHeight: '100vh' }}>
      <Nav />
      <main>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloating />
    </div>
  )
}

export default App
