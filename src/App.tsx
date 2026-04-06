import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

import { useLang } from './LanguageContext'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { References } from './sections/References'
import { QualityMatrix } from './sections/QualityMatrix'
import { Methods } from './sections/Methods'
import { StackCuration } from './sections/StackCuration'
import { Principles } from './sections/Principles'
import { ContextSignals } from './sections/ContextSignals'
import { ProgressiveDisclosure } from './sections/ProgressiveDisclosure'
import { Hero } from './sections/Hero'
import { LessonRoadmap } from './sections/LessonRoadmap'
import { VibecodeVsAI } from './sections/VibecodeVsAI'
import { EcosystemMap } from './sections/EcosystemMap'
import { LayerModel } from './sections/LayerModel'
import { ExecutionFlow } from './sections/ExecutionFlow'
import { WorkflowGate } from './sections/WorkflowGate'
import { SDD } from './sections/SDD'
import { MermaidDiagrams } from './sections/MermaidDiagrams'
import { Examples } from './sections/Examples'
import { ReviewChecklist } from './sections/ReviewChecklist'
import { MultiAgent } from './sections/MultiAgent'
import { AntiPatterns } from './sections/AntiPatterns'
import { DeepDive } from './sections/DeepDive'


/* ─── App ────────────────────────────────────────────────── */

function App() {
  const { lang, t } = useLang()
  const initialHashRef = useRef<string | null>(null)

  /* ── State ─────────────────────────────────────────────── */
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window === 'undefined') return 'hero'
    return window.location.hash.slice(1) || 'hero'
  })
  const [scrollProgress, setScrollProgress]     = useState(0)
  const [mobileNavOpen, setMobileNavOpen]       = useState(false)

  /* ── Document title + html lang ───────────────────────── */
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    const item = t.navItems.find((i) => i.id === activeSection)
    document.title = item && activeSection !== 'hero'
      ? `${item.label} | vibening`
      : (lang === 'pt-BR' ? 'vibening · guia de engenharia agêntica' : 'vibening · Agentic Engineering Guide')
  }, [activeSection, lang, t])

  /* ── Intersection observers ────────────────────────────── */
  const navIds = useMemo(() => t.navItems.map((i) => i.id), [t])

  useEffect(() => {
    const sections = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 },
    )
    sections.forEach((section) => revealObserver.observe(section))
    return () => revealObserver.disconnect()
  }, [])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const el = document.getElementById(hash)
    if (!el) return

    initialHashRef.current = hash
    setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 80)
  }, [])

  useEffect(() => {
    const releaseHashLock = () => {
      initialHashRef.current = null
    }

    window.addEventListener('wheel', releaseHashLock, { passive: true })
    window.addEventListener('touchstart', releaseHashLock, { passive: true })
    window.addEventListener('keydown', releaseHashLock)

    return () => {
      window.removeEventListener('wheel', releaseHashLock)
      window.removeEventListener('touchstart', releaseHashLock)
      window.removeEventListener('keydown', releaseHashLock)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      setScrollProgress(Math.min(100, el.scrollTop / (el.scrollHeight - el.clientHeight || 1) * 100))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const watched = navIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    const spyObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          const nextId = visible[0].target.id
          setActiveSection(nextId)

          // Preserve explicit deep-link target on initial load until it is reached.
          if (initialHashRef.current && nextId !== initialHashRef.current) return
          if (initialHashRef.current === nextId) initialHashRef.current = null

          if (window.location.hash !== `#${nextId}`) {
            history.replaceState(null, '', `#${nextId}`)
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.3, 0.6, 1] },
    )
    watched.forEach((section) => spyObserver.observe(section))
    return () => spyObserver.disconnect()
  }, [navIds])

  return (
    <div className="app">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <a className="skip-link" href="#main-content">{t.nav.skipLink}</a>

      <Nav
        activeSection={activeSection}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
      />

      {/* ── Hero ─────────────────────────────────────────── */}
      <Hero />

      <main id="main-content" className="content">

        {/* ── Lesson Roadmap ───────────────────────────── */}
        <LessonRoadmap />

        {/* ── Vibecoding vs AI-Assisted ─────────────────── */}
        <VibecodeVsAI />

        {/* ── Principles ───────────────────────────────── */}
        <Principles />

        {/* ── SDD ──────────────────────────────────────── */}
        <SDD />

        {/* ── Context Signals ───────────────────────────── */}
        <ContextSignals />

        {/* ── Progressive Disclosure ───────────────────── */}
        <ProgressiveDisclosure />

        {/* ── Layer Model ──────────────────────────────── */}
        <LayerModel />

        {/* ── RPEV Flow ────────────────────────────────── */}
        <ExecutionFlow />

        {/* ── Workflow Gate ────────────────────────────── */}
        <WorkflowGate />

        {/* ── Multi-Agent ──────────────────────────────── */}
        <MultiAgent />

        {/* ── Anti-patterns ────────────────────────────── */}
        <AntiPatterns />

        {/* ── Deep Dive ────────────────────────────────── */}
        <DeepDive />

        {/* ── Mermaid Diagrams ─────────────────────────── */}
        <MermaidDiagrams />

        {/* ── Ecosystem Map ────────────────────────────── */}
        <EcosystemMap />

        {/* ── Stack Curation ───────────────────────────── */}
        <StackCuration />

        {/* ── Methods ──────────────────────────────────── */}
        <Methods />

        {/* ── Examples ─────────────────────────────────── */}
        <Examples />

        {/* ── Review Checklist ─────────────────────────── */}
        <ReviewChecklist key={lang} />

        {/* ── Quality Matrix ───────────────────────────── */}
        <QualityMatrix />

        {/* ── References ───────────────────────────────── */}
        <References />

      </main>

      <Footer />
    </div>
  )
}

export default App
