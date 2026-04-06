import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import './App.css'
import { useLang } from './LanguageContext'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { AntiPatterns } from './sections/AntiPatterns'
import { ContextSignals } from './sections/ContextSignals'
import { DeepDive } from './sections/DeepDive'
import { EcosystemMap } from './sections/EcosystemMap'
import { Examples } from './sections/Examples'
import { ExecutionFlow } from './sections/ExecutionFlow'
import { Hero } from './sections/Hero'
import { LayerModel } from './sections/LayerModel'
import { LessonRoadmap } from './sections/LessonRoadmap'
import { MermaidDiagrams } from './sections/MermaidDiagrams'
import { Methods } from './sections/Methods'
import { MultiAgent } from './sections/MultiAgent'
import { Principles } from './sections/Principles'
import { ProgressiveDisclosure } from './sections/ProgressiveDisclosure'
import { References } from './sections/References'
import { ReviewChecklist } from './sections/ReviewChecklist'
import { SDD } from './sections/SDD'
import { StackCuration } from './sections/StackCuration'
import { VibecodeVsAI } from './sections/VibecodeVsAI'
import { WorkflowGate } from './sections/WorkflowGate'

/* ─── App ────────────────────────────────────────────────── */

function App() {
  const { lang, t } = useLang()
  const initialHashRef = useRef<string | null>(null)
  const ratioMapRef = useRef<Map<string, number>>(new Map())
  const replaceStateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* ── State ─────────────────────────────────────────────── */
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window === 'undefined') return 'hero'
    return window.location.hash.slice(1) || 'hero'
  })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const navigateToSection = useCallback((id: string, options?: { smooth?: boolean; pushHistory?: boolean }) => {
    const target = document.getElementById(id)
    if (!target) return

    const smooth = options?.smooth ?? true
    const pushHistory = options?.pushHistory ?? true

    initialHashRef.current = id
    setActiveSection(id)

    const nextHash = `#${id}`
    if (window.location.hash !== nextHash) {
      if (pushHistory) {
        history.pushState(null, '', nextHash)
      } else {
        history.replaceState(null, '', nextHash)
      }
    }

    target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
  }, [])

  /* ── Document title + html lang ───────────────────────── */
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    const item = t.navItems.find((i) => i.id === activeSection)
    document.title =
      item && activeSection !== 'hero'
        ? `${item.label} | vibening`
        : lang === 'pt-BR'
          ? 'vibening · guia de engenharia agêntica'
          : 'vibening · Agentic Engineering Guide'
  }, [activeSection, lang, t])

  /* ── Intersection observers ────────────────────────────── */
  const navIds = useMemo(() => t.navItems.map((i) => i.id), [t])

  useEffect(() => {
    const sections = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', 'true')
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
    setTimeout(() => el.scrollIntoView({ behavior: 'auto' }), 80)
  }, [])

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (!hash) return
      navigateToSection(hash, { smooth: false, pushHistory: false })
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [navigateToSection])

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
      setScrollProgress(Math.min(100, (el.scrollTop / (el.scrollHeight - el.clientHeight || 1)) * 100))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const watched = navIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    ratioMapRef.current.clear()

    const spyObserver = new IntersectionObserver(
      (entries) => {
        // Update global ratio map from the delta entries
        entries.forEach((entry) => {
          ratioMapRef.current.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        // Pick the section with the highest intersection ratio across all tracked sections
        let bestId = ''
        let bestRatio = 0
        ratioMapRef.current.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        })

        if (!bestId || bestRatio === 0) return

        // Preserve explicit deep-link target on initial load until it is reached
        if (initialHashRef.current && bestId !== initialHashRef.current) return
        if (initialHashRef.current === bestId) initialHashRef.current = null

        setActiveSection(bestId)

        // Debounce replaceState to avoid churn during fast scrolling
        const targetHash = `#${bestId}`
        if (window.location.hash !== targetHash) {
          if (replaceStateTimerRef.current) clearTimeout(replaceStateTimerRef.current)
          replaceStateTimerRef.current = setTimeout(() => {
            history.replaceState(null, '', targetHash)
          }, 120)
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.3, 0.6, 1] },
    )
    watched.forEach((section) => spyObserver.observe(section))
    return () => {
      spyObserver.disconnect()
      if (replaceStateTimerRef.current) clearTimeout(replaceStateTimerRef.current)
    }
  }, [navIds])

  return (
    <div className="app">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <a className="skip-link" href="#main-content">
        {t.nav.skipLink}
      </a>

      <Nav
        activeSection={activeSection}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
        onNavigate={navigateToSection}
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

        {/* ── References ───────────────────────────────── */}
        <References />
      </main>

      <Footer />
    </div>
  )
}

export default App
