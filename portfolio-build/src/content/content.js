// content.js — structured copy from content.txt
// [BRACKETED] items are placeholders — fill in your real details before launch.

export const meta = {
  title: 'Karan Dugad — Web Developer',
  description:
    'Karan Dugad is a web developer building fast, considered, detail-obsessed interfaces. Explore his work.',
}

export const nav = {
  wordmark: 'KD_',
  links: [
    { label: '00 ROOT',     href: '#root'     },
    { label: '01 PROCESS',  href: '#process'  },
    { label: '02 MODULES',  href: '#modules'  },
    { label: '03 DEPLOYED', href: '#deployed' },
    { label: '04 UPLINK',   href: '#uplink'   },
  ],
  cta: "Let's talk",
}

export const bootSequence = {
  lines: [
    '> booting karan_dugad.sys',
    '> loading typography ......... OK',
    '> mounting components ........ OK',
    '> compiling interface ........ OK',
    '> establishing uplink ........ 100%',
    '> welcome.',
  ],
  skipHint: 'Tap or scroll to skip',
}

export const hero = {
  eyebrow: 'SYSTEM ONLINE — 01 / ROOT',
  headline: 'Karan Dugad',
  subhead: 'Web Developer.',
  body: 'I build interfaces that feel as considered as they look — fast, precise, and built to hold up under real use.',
  cta: {
    primary:   { label: 'View my work',  href: '#deployed' },
    secondary: { label: 'Get in touch',  href: '#uplink'   },
  },
  scrollCue: 'scroll to boot ↓',
}

export const about = {
  eyebrow: '02 / PROCESS.LOG',
  heading: 'How I work',
  body: [
    `I'm a web developer who cares as much about how a site feels to use as how it's built underneath. My work sits at the intersection of clean, maintainable code and interfaces that don't feel like everyone else's.`,
    `I like projects where the details matter — the easing on a hover state, the weight of a headline, the difference between a page that loads and a page that arrives. I try to bring that same attention to the parts nobody sees: readable code, sensible structure, and sites that stay fast as they grow.`,
    `Right now I'm [open to freelance work / looking for a full-time role / building side projects] — [add current focus].`,
  ],
  stats: [
    { value: '[X+]',        label: 'Years building for the web' },
    { value: '[XX]',        label: 'Projects shipped'           },
    { value: '[Location]',  label: 'Based in [City, Country]'  },
    { value: '[Focus]',     label: 'Currently focused on [stack]' },
  ],
}

export const stack = {
  eyebrow: '03 / MODULES.SYS',
  heading: "What's mounted on the board",
  intro: 'The tools I reach for most, grouped by what they\'re for.',
  groups: [
    {
      label: 'Frontend',
      items: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
    },
    {
      label: 'Backend',
      items: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs'],
    },
    {
      label: '3D / Motion',
      items: ['Three.js', 'React Three Fiber', 'GSAP'],
    },
    {
      label: 'Tools',
      items: ['Git', 'Figma', 'Docker', 'Vercel'],
    },
  ],
}

export const projects = {
  eyebrow: '04 / DEPLOYED.APPS',
  heading: 'Selected work',
  intro: "A few things I've built, start to finish.",
  items: [
    {
      id: 'project-1',
      name: 'Oorja Hospital',
      description: 'Comprehensive web platform for healthcare services, department information, and patient care with an intuitive, accessible layout.',
      role: 'Frontend / Full-stack',
      stack: 'React · Responsive UI · Healthcare',
      links: {
        live: 'https://oorjahospital.com',
        github: 'https://github.com/Vyce-Digital-Media/Oorja-Hospital.git',
      },
    },
    {
      id: 'project-2',
      name: 'Otg',
      description: 'Modern, performant web experience engineered for seamless digital interaction, responsive across all screen sizes.',
      role: 'Solo build / Web Developer',
      stack: 'React · Tailwind CSS · Vercel',
      links: {
        live: 'https://otg-web-black.vercel.app/',
        github: 'https://github.com/karandugad28/otg-web.git',
      },
    },
    {
      id: 'project-3',
      name: 'Tailor Tales',
      description: 'A bespoke modern presentation site showcasing bespoke fashion, craftsmanship, and tailored client offerings.',
      role: 'Frontend Developer',
      stack: 'React · Modern UI · Vercel',
      links: {
        live: 'https://tailor-tales-spcf.vercel.app/',
        github: 'https://github.com/karandugad28/tailor-tales.git',
      },
    },
  ],
}

export const experience = {
  eyebrow: '05 / RUNTIME.LOG',
  heading: "Where I've worked",
  entries: [
    {
      role:    '[Role title]',
      company: '[Company name]',
      period:  '[Start — End]',
      summary: '[One or two lines on what you did/owned there]',
    },
    {
      role:    '[Role title]',
      company: '[Company name]',
      period:  '[Start — End]',
      summary: '[One or two lines]',
    },
  ],
}

export const contact = {
  eyebrow: '06 / UPLINK',
  heading: "Let's build something",
  body: 'Have a project in mind, or just want to talk shop? My inbox is open.',
  email:  'karandugad28@gmail.com',
  resume: '/Karan_Dugad_CV.pdf',
  socials: [
    { label: 'GitHub',    href: 'https://github.com/karandugad28'           },
    { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/karan-dugad-a55775437' },
    { label: 'Instagram', href: 'https://www.instagram.com/karan_dugad/'    },
  ],
  status: '[STATUS: OPEN TO WORK]',
}

export const footer = {
  copyright: 'Karan Dugad.',
  message: 'Built with React, Tailwind & a bit too much GSAP.',
  backToTop: 'back to root',
}

export const microcopy = {
  formSuccess: "Message sent. I'll get back to you soon.",
  formError:   'Something went wrong on my end — try email directly: [your@email.com]',
  formLoading: 'Sending...',
  empty:       'nothing deployed here yet.',
}
