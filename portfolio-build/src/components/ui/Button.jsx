import { forwardRef } from 'react'

export const Button = forwardRef(function Button(
  { children, variant = 'primary', href, id, onClick, type = 'button', className = '', ...props },
  ref
) {
  const baseClasses = 'relative inline-flex items-center justify-center font-display font-semibold transition-all duration-300 outline-none select-none overflow-hidden group rounded-xl px-7 py-3.5'
  
  const variants = {
    primary: {
      default: 'bg-violet text-white',
      hover: 'shadow-glow-violet-strong scale-[1.02]',
      inner: 'linear-gradient(135deg, #7C3AED, #22D3EE)',
    },
    secondary: {
      default: 'bg-transparent text-cyan border border-cyan/30',
      hover: 'border-cyan/80 text-white shadow-glow-cyan bg-cyan/10',
      inner: 'transparent',
    }
  }

  const v = variants[variant]
  const classes = `${baseClasses} ${v.default} hover:${v.hover} ${className}`

  const innerContent = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <div 
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: v.inner }}
        />
      )}
    </>
  )

  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <a
        ref={ref}
        id={id}
        href={href}
        onClick={onClick}
        className={classes}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {innerContent}
      </a>
    )
  }

  return (
    <button
      ref={ref}
      id={id}
      type={type}
      onClick={onClick}
      className={classes}
      {...props}
    >
      {innerContent}
    </button>
  )
})
