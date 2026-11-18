import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

/**
 * ProjectCard — 3D tilt on hover, max 6°, mouse-position driven.
 * Uses CSS transform + Framer Motion. NOT a separate R3F scene.
 */
export function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    rotateY.set(dx * 6)  // max 6°
    rotateX.set(-dy * 6)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setIsHovered(false)
  }

  const stackItems = project.stack.split('·').map(s => s.trim())

  return (
    <motion.article
      ref={cardRef}
      id={`project-card-${project.id}`}
      className="panel relative overflow-hidden cursor-default"
      style={{
        perspective: 800,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      {/* Card number tag */}
      <div className="absolute top-4 right-4 eyebrow text-panel-line">
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="p-8 flex flex-col gap-4 min-h-[280px]">
        {/* Project name */}
        <h3 className="font-display font-bold text-display-m text-bone leading-tight">
          {project.name}
        </h3>

        {/* Description */}
        <p className="font-body text-body-m text-signal-slate flex-1">
          {project.description}
        </p>

        {/* Role */}
        <p className="eyebrow text-signal-slate">{project.role}</p>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-2">
          {stackItems.map((item) => (
            <span
              key={item}
              className="eyebrow px-3 py-1 rounded-sm border border-panel-line text-signal-slate"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-2">
          {project.links.live && (
            <a
              id={`project-${project.id}-live`}
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow text-ember-copper hover:underline transition-colors"
            >
              Live site ↗
            </a>
          )}
          {project.links.github && (
            <a
              id={`project-${project.id}-github`}
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow text-signal-slate hover:text-ember-copper transition-colors"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>

      {/* Hover glow edge */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? 'inset 0 0 0 1px rgba(226, 134, 75, 0.6)'
            : 'inset 0 0 0 1px rgba(35, 42, 53, 1)',
        }}
        transition={{ duration: 0.25 }}
      />
    </motion.article>
  )
}

export default ProjectCard
