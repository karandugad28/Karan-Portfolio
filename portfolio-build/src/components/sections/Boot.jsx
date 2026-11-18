import { useEffect, useRef, useState } from 'react'
import { bootSequence } from '@/content/content'
import { Button } from '@/components/ui/Button'

export function Boot({ onComplete }) {
  const [lines, setLines] = useState([])
  const [isDone, setIsDone] = useState(false)
  const [typedChars, setTypedChars] = useState('')
  const containerRef = useRef(null)
  
  // Safe refs for timeouts to prevent memory leaks/race conditions
  const timeoutsRef = useRef([])

  useEffect(() => {
    let currentLine = 0
    let currentChar = 0
    let isCancelled = false

    const schedule = (cb, delay) => {
      const id = setTimeout(() => {
        if (!isCancelled) cb()
      }, delay)
      timeoutsRef.current.push(id)
    }

    const typeLine = () => {
      if (currentLine >= bootSequence.lines.length) {
        schedule(() => setIsDone(true), 600)
        return
      }

      const lineText = bootSequence.lines[currentLine]

      if (currentChar < lineText.length) {
        setTypedChars(lineText.substring(0, currentChar + 1))
        currentChar++
        schedule(typeLine, Math.random() * 20 + 10) // Fast typing
      } else {
        // Line complete
        setLines(prev => [...prev, lineText])
        setTypedChars('')
        currentLine++
        currentChar = 0
        schedule(typeLine, 150) // Small pause between lines
      }
    }

    schedule(typeLine, 400) // Initial delay

    return () => {
      isCancelled = true
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [lines, typedChars])

  const handleSkip = () => {
    timeoutsRef.current.forEach(clearTimeout)
    onComplete()
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col justify-center items-center p-6"
      style={{ background: '#06060F' }}
    >
      {/* Background Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle at center, #7C3AED 0%, transparent 60%)' }}
      />

      <div 
        className="w-full max-w-2xl border rounded-lg p-6 flex flex-col relative z-10"
        style={{
          background: 'rgba(14, 11, 46, 0.7)',
          backdropFilter: 'blur(10px)',
          borderColor: 'rgba(34,211,238,0.3)',
          boxShadow: '0 0 30px rgba(34,211,238,0.1)',
          height: '60vh',
          minHeight: '400px'
        }}
      >
        <div className="flex justify-between items-center border-b pb-4 mb-4" style={{ borderColor: 'rgba(34,211,238,0.2)' }}>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-mist/30" />
            <div className="w-3 h-3 rounded-full bg-mist/30" />
            <div className="w-3 h-3 rounded-full bg-mist/30" />
          </div>
          <div className="font-mono text-xs text-cyan opacity-70">
            SYSTEM_INITIALIZATION
          </div>
        </div>

        <div 
          ref={containerRef}
          className="flex-1 overflow-y-auto font-mono text-sm leading-relaxed"
          style={{ color: 'var(--white)' }}
        >
          {lines.map((line, i) => (
            <div key={i} className="mb-1 opacity-80">
              <span className="text-violet-bright mr-2">{'>'}</span> {line}
            </div>
          ))}
          {!isDone && (
            <div className="mb-1">
              <span className="text-violet-bright mr-2">{'>'}</span> {typedChars}
              <span className="inline-block w-2 h-4 bg-cyan align-middle ml-1 animate-pulse" />
            </div>
          )}
        </div>

        {isDone && (
          <div className="pt-6 flex justify-center animate-fade-in">
            <Button id="boot-enter-btn" variant="primary" onClick={onComplete} className="px-10">
              {bootSequence.actionLabel}
            </Button>
          </div>
        )}
      </div>

      {!isDone && (
        <button 
          onClick={handleSkip}
          className="absolute bottom-8 font-mono text-xs text-mist hover:text-white transition-colors uppercase tracking-widest z-10"
        >
          Skip sequence [Esc]
        </button>
      )}

      {/* Global escape key listener */}
      <EscapeListener onEscape={handleSkip} />
    </div>
  )
}

function EscapeListener({ onEscape }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onEscape()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onEscape])
  return null
}

export default Boot
