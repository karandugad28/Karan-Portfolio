/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cosmos:   '#06060F',
        nebula:   '#0E0B2E',
        grid:     '#1C1645',
        'grid-bright': '#2E2870',
        white:    '#F4F4FF',
        mist:     '#8892B0',
        violet:   '#7C3AED',
        'violet-bright': '#9F6FFF',
        cyan:     '#22D3EE',
        'cyan-dim':'#0891B2',
        amber:    '#F59E0B',
      },
      fontFamily: {
        display: ['"Clash Display"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
        body:    ['"Satoshi"', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem,8vw,7rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-l':  ['clamp(2rem,5vw,3.5rem)', { lineHeight: '1.0',  letterSpacing: '-0.02em' }],
        'display-m':  ['clamp(1.4rem,3vw,2rem)', { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        'body-l':     ['1.25rem', { lineHeight: '1.65' }],
        'body-m':     ['1rem',    { lineHeight: '1.65' }],
        'mono-s':     ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.1em' }],
      },
      boxShadow: {
        'glow-violet':        '0 0 40px -8px rgba(124,58,237,0.5)',
        'glow-violet-strong': '0 0 80px -8px rgba(124,58,237,0.7)',
        'glow-cyan':          '0 0 40px -8px rgba(34,211,238,0.4)',
        'glow-cyan-strong':   '0 0 60px -4px rgba(34,211,238,0.6)',
        'glow-amber':         '0 0 30px -6px rgba(245,158,11,0.5)',
        'glass':              '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      backdropBlur: {
        'glass': '16px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cosmic-gradient': 'linear-gradient(135deg, #06060F 0%, #0E0B2E 50%, #1C1645 100%)',
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'pulse-glow':  'pulseGlow 2s ease-in-out infinite',
        'scan':        'scan 2s linear infinite',
        'spin-slow':   'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '0.6', filter: 'blur(4px)' },
          '50%':     { opacity: '1',   filter: 'blur(2px)' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
}
