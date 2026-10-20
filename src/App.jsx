import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Mail, Menu, X } from 'lucide-react'
import { Hero } from './Hero.jsx'
import PortfolioSections from './PortfolioSections.jsx'
gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    n: '01',
    name: 'Helpful Perfume',
    type: 'E-COMMERCE / DASHBOARD',
    desc: 'A polished commerce experience with product discovery, investor dashboards, and a clear account flow.',
    tags: ['React', 'Tailwind', 'Node.js'],
    visual: 'perfume',
  },
  {
    n: '02',
    name: 'Science School Portal',
    type: 'EDUCATION / WEB APP',
    desc: 'A responsive learning portal with category browsing, interactive cards, and persistent cart state.',
    tags: ['React', 'Tailwind CSS', 'LocalStorage'],
    visual: 'school',
  },
  {
    n: '03',
    name: 'UI/UX Hero',
    type: 'BUSINESS / WEBSITE',
    desc: 'A clean, responsive web experience focused on strong hierarchy, thoughtful spacing, and usability.',
    tags: ['React', 'CSS', 'Responsive UI'],
    visual: 'studio',
  },
]

const skills = [
  'React',
  'JavaScript',
  'TypeScript',
  'Tailwind CSS',
  'HTML & CSS',
  'Git & GitHub',
  'Node.js',
  'Express',
  'MongoDB',
  'Responsive Design',
]

function Intro({ onFinish }) {
  const [visible, setVisible] = useState(true)
  const overlay = useRef(null)
  const finish = useCallback(() => {
    setVisible(false)
    onFinish()
  }, [onFinish])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      finish()
      return
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: finish,
      })
      tl.fromTo(
        '.intro-mark',
        { scale: 0.65, opacity: 0, rotateY: -35, rotateX: 18 },
        { scale: 1, opacity: 1, rotateY: 0, rotateX: 0, duration: 0.85, ease: 'power3.out' }
      )
        .fromTo(
          '.intro-orbit',
          { scale: 0.65, opacity: 0, rotate: -35 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out' },
          '-=.55'
        )
        .fromTo(
          '.intro-word',
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
          '-=.45'
        )
        .fromTo(
          '.intro-progress-fill',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: 'power2.inOut' },
          '-=.3'
        )
        .to('.intro-content', { opacity: 0, y: -16, duration: 0.32, delay: 0.25 })
        .to(overlay.current, { yPercent: -100, duration: 0.75, ease: 'power4.inOut' })
    }, overlay)
    return () => ctx.revert()
  }, [finish])

  if (!visible) return null

  return (
    <div className="intro" ref={overlay} role="status" aria-label="Portfolio introduction">
      <div className="intro-glow" />
      <div className="intro-content">
        <div className="intro-topline">
          <span>INDEPENDENT DEVELOPER</span>
          <span>PORTFOLIO — 2026</span>
        </div>
        <div className="intro-emblem">
          <div className="intro-orbit orbit-one" />
          <div className="intro-orbit orbit-two" />
          <div className="intro-mark">MR<span>.</span></div>
        </div>
        <div className="intro-title">
          <span className="intro-word">THOUGHTFUL DESIGN.</span>
          <span className="intro-word">BUILT FOR THE WEB.</span>
        </div>
        <div className="intro-progress">
          <div className="intro-progress-fill" />
        </div>
        <p className="intro-caption">MUSFIQUR RAHIM <span>·</span> DHAKA, BANGLADESH</p>
      </div>
      <button className="skip-intro" onClick={finish}>
        SKIP <ArrowUpRight size={14} />
      </button>
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = [
    ['WORK', '#work'],
    ['ABOUT', '#about'],
    ['CONTACT', '#contact'],
  ]
  return (
    <header className="header">
      <a href="#home" className="brand">
        MR<span>®</span>
      </a>
      <nav className={open ? 'nav nav-open' : 'nav'}>
        {links.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>
          LET'S TALK <ArrowUpRight size={14} />
        </a>
      </nav>
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  )
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className={`project-art ${project.visual}`}>
        <div className="art-top">
          <span>{project.n} / SELECTED WORK</span>
          <ArrowUpRight size={18} />
        </div>
        {project.visual === 'perfume' && (
          <div className="perfume-scene">
            <div className="bottle-cap" />
            <div className="bottle">
              <span>H</span>
              <small>
                HELPFUL
                <br />
                PERFUME
              </small>
            </div>
            <div className="bottle-shadow" />
          </div>
        )}
        {project.visual === 'school' && (
          <div className="school-scene">
            <div className="school-sidebar">
              <b>SS.</b>
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="school-window">
              <small>WELCOME BACK</small>
              <b>
                Learn something
                <br />
                wonderful.
              </b>
              <div className="mini-cards">
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        )}
        {project.visual === 'studio' && (
          <div className="studio-scene">
            <span>
              DESIGN
              <br />
              WITH
              <br />
              <em>INTENT.</em>
            </span>
            <div className="studio-orb" />
          </div>
        )}
        <div className="art-bottom">
          <span>INTERACTIVE DESIGN</span>
          <span>↗</span>
        </div>
      </div>
      <div className="project-meta">
        <div>
          <p className="eyebrow">{project.type}</p>
          <h3>{project.name}</h3>
        </div>
        <span className="project-number">{project.n}</span>
      </div>
      <p className="project-desc">{project.desc}</p>
      <div className="tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  )
}

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const cursor = useRef(null)
  const handleIntroFinish = useCallback(() => setIntroDone(true), [])

  useEffect(() => {
    if (!introDone) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el) =>
        gsap.fromTo(
          el,
          { y: 32, opacity: 0, rotateX: -5, scale: 0.985, transformPerspective: 1100, transformOrigin: '50% 0%' },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        )
      )
    })
    return () => ctx.revert()
  }, [introDone])

  useEffect(() => {
    const move = (e) => {
      if (!cursor.current || window.matchMedia('(pointer: coarse)').matches) return
      cursor.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <>
      <Intro onFinish={handleIntroFinish} />
      <div className="cursor" ref={cursor} />
      <Header />
      <main>
        <Hero startAnimation={introDone} />

        <section className="work section-wrap section-pad" id="work">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">01 / SELECTED WORK</p>
              <h2>
                Things I've
                <br />
                <em>put into motion.</em>
              </h2>
            </div>
            <p className="heading-note">
              A selection of digital experiences shaped by curiosity, clean code, and attention to detail.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((p) => (
              <div className="reveal project-reveal" key={p.n}>
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </section>

        <section className="about section-wrap section-pad" id="about">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">02 / A LITTLE ABOUT ME</p>
              <h2>
                Code with a<br />
                <em>human touch.</em>
              </h2>
            </div>
            <p className="heading-note">
              I care about the details you feel, even when you don't notice them.
            </p>
          </div>
          <div className="about-grid reveal">
            <div className="about-symbol">
              MR<span>®</span>
              <div className="symbol-ring">CURIOUS BY NATURE · BUILT FOR THE WEB · </div>
            </div>
            <div className="about-copy">
              <p className="about-lead">
                I'm Musfiqur Rahim, a frontend developer who enjoys turning thoughtful designs into fast, accessible, and memorable web experiences.
              </p>
              <p>
                I work with modern JavaScript tools to build responsive interfaces, bring motion into the right moments, and keep the experience useful—not just beautiful.
              </p>
              <div className="about-links">
                <a href="#contact">
                  LET'S BUILD SOMETHING <ArrowUpRight size={15} />
                </a>
                <span>BASED IN BANGLADESH</span>
              </div>
            </div>
          </div>
          <div className="skills-block reveal">
            <p className="eyebrow">MY TOOLKIT</p>
            <div className="skills-list">
              {skills.map((s, i) => (
                <div key={s}>
                  <span className="skill-n">0{i + 1}</span>
                  <span>{s}</span>
                  <ArrowUpRight size={15} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section-wrap section-pad" id="contact">
          <p className="eyebrow reveal">03 / HAVE A GOOD ONE IN MIND?</p>
          <div className="contact-title reveal">
            <h2>
              Let's make
              <br />
              <em>it matter.</em>
            </h2>
            <a href="mailto:hello@example.com" className="contact-orb" aria-label="Email Musfiqur">
              <Mail size={28} />
              <span>GET IN TOUCH ↗</span>
            </a>
          </div>
          <div className="contact-bottom reveal">
            <p>
              HAVE A PROJECT, A QUESTION, OR JUST WANT TO SAY HI?
              <br />
              MY INBOX IS OPEN.
            </p>
            <div className="socials">
              <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
                <span aria-hidden="true">GH</span>
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <span aria-hidden="true">in</span>
              </a>
              <a href="mailto:hello@example.com" aria-label="Email">
                <Mail />
              </a>
            </div>
          </div>
        </section>
        <PortfolioSections/>
      </main>
      <footer className="footer section-wrap reveal">
        <a className="brand" href="#home">
          MR<span>®</span>
        </a>
        <span>DESIGNED & DEVELOPED WITH INTENTION.</span>
        <a href="#home">BACK TO TOP ↑</a>
        <span>© 2026 MUSFIQUR RAHIM</span>
      </footer>
    </>
  )
}
