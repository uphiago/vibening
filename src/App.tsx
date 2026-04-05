import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

import { useLang } from './LanguageContext'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'

import {
  ANTI_PATTERNS_DATA,
  COMM_PATTERNS_DATA,
  COMPARISONS_DATA,
  CONTEXT_SIGNALS_DATA,
  DEEP_DIVES_DATA,
  FLOW_DATA,
  LAYERS_DATA,
  LESSONS_DATA,
  METHODS_DATA,
  MULTI_AGENT_ARCHS_DATA,
  MULTI_AGENT_PATTERNS_DATA,
  PD_LAYERS_DATA,
  PRINCIPLES_DATA,
  QUALITY_ROWS_DATA,
  REVIEW_CHECKLIST_DATA,
  SDD_FIELDS_DATA,
  SDD_SPEC_ROWS_DATA,
  STACK_TOOLS_DATA,
  WORKFLOW_PHASES_DATA,
} from './i18n'

/* ─── Copy button hook ───────────────────────────────────── */

function useCopy(text: string) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopied(false), 1800)
    }).catch(() => { /* clipboard unavailable or permission denied */ })
  }, [text])
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])
  return { copied, copy }
}

function CopyButton({ text }: { text: string }) {
  const { copied, copy } = useCopy(text)
  const { t } = useLang()
  return (
    <button type="button" className={`copy-btn${copied ? ' copied' : ''}`} onClick={copy} aria-label={t.footer.copyCode}>
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  )
}

/* ─── App ────────────────────────────────────────────────── */

function App() {
  const { lang, t } = useLang()

  /* ── Data (lang-switched) ──────────────────────────────── */
  const LESSONS        = LESSONS_DATA[lang]
  const COMPARISONS    = COMPARISONS_DATA[lang]
  const CONTEXT_SIGNALS = CONTEXT_SIGNALS_DATA[lang]
  const ANTI_PATTERNS  = ANTI_PATTERNS_DATA[lang]
  const PRINCIPLES     = PRINCIPLES_DATA[lang]
  const PD_LAYERS      = PD_LAYERS_DATA[lang]
  const LAYERS         = LAYERS_DATA[lang]
  const FLOW           = FLOW_DATA[lang]
  const METHODS        = METHODS_DATA[lang]
  const QUALITY_ROWS   = QUALITY_ROWS_DATA[lang]
  const REVIEW_CHECKLIST = useMemo(() => REVIEW_CHECKLIST_DATA[lang], [lang])
  const DEEP_DIVES     = DEEP_DIVES_DATA[lang]
  const WORKFLOW_PHASES = WORKFLOW_PHASES_DATA[lang]
  const STACK_TOOLS    = STACK_TOOLS_DATA[lang]
  const SDD_FIELDS     = SDD_FIELDS_DATA[lang]
  const SDD_SPEC_ROWS  = SDD_SPEC_ROWS_DATA[lang]
  const MULTI_AGENT_ARCHS    = MULTI_AGENT_ARCHS_DATA[lang]
  const MULTI_AGENT_PATTERNS = MULTI_AGENT_PATTERNS_DATA[lang]
  const COMM_PATTERNS  = COMM_PATTERNS_DATA[lang]

  /* ── State ─────────────────────────────────────────────── */
  const [activeLayer, setActiveLayer]     = useState(LAYERS[0])
  const [activeStep, setActiveStep]       = useState(FLOW[0])
  const [activeSection, setActiveSection] = useState('hero')
  const [activeMapView, setActiveMapView] = useState<'all' | 'build' | 'ops'>('all')
  const [activeDeepDive, setActiveDeepDive]     = useState(DEEP_DIVES[0])
  const [activePhase, setActivePhase]           = useState(WORKFLOW_PHASES[0])
  const [activeAntiPattern, setActiveAntiPattern] = useState(ANTI_PATTERNS[0])
  const [activeSddField, setActiveSddField]     = useState(SDD_FIELDS[0])
  const [activeArch, setActiveArch]             = useState(MULTI_AGENT_ARCHS[0])
  const [activeAgentPattern, setActiveAgentPattern] = useState(MULTI_AGENT_PATTERNS[0])
  const [checkedItems, setCheckedItems]         = useState<Set<number>>(new Set())
  const [checklistAnimated, setChecklistAnimated] = useState(false)
  const [scrollProgress, setScrollProgress]     = useState(0)
  const checklistSectionRef = useRef<HTMLElement | null>(null)
  const checklistTimersRef  = useRef<ReturnType<typeof setTimeout>[]>([])
  const [mobileNavOpen, setMobileNavOpen]       = useState(false)
  const [mermaidReady, setMermaidReady]         = useState(false)

  // Reset active items when language changes
  useEffect(() => {
    setActiveLayer(LAYERS_DATA[lang][0])
    setActiveStep(FLOW_DATA[lang][0])
    setActiveDeepDive(DEEP_DIVES_DATA[lang][0])
    setActivePhase(WORKFLOW_PHASES_DATA[lang][0])
    setActiveAntiPattern(ANTI_PATTERNS_DATA[lang][0])
    setActiveSddField(SDD_FIELDS_DATA[lang][0])
    setActiveArch(MULTI_AGENT_ARCHS_DATA[lang][0])
    setActiveAgentPattern(MULTI_AGENT_PATTERNS_DATA[lang][0])
    setCheckedItems(new Set())
    setChecklistAnimated(false)
  }, [lang])

  /* ── Refs for detail panels ───────────────────────────── */
  const sddDetailRef        = useRef<HTMLDivElement>(null)
  const deepDiveDetailRef   = useRef<HTMLDivElement>(null)
  const layerDetailRef      = useRef<HTMLDivElement>(null)
  const execFlowDetailRef   = useRef<HTMLDivElement>(null)
  const workflowDetailRef   = useRef<HTMLDivElement>(null)
  const maArchDetailRef     = useRef<HTMLDivElement>(null)
  const maPatternDetailRef  = useRef<HTMLDivElement>(null)
  const antiPatternDetailRef = useRef<HTMLDivElement>(null)

  // Scrolls into view on mobile AND moves keyboard focus to the detail panel
  const activateDetail = useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    if (window.innerWidth <= 980) {
      setTimeout(() => { ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }, 60)
    }
    setTimeout(() => { ref.current?.focus({ preventScroll: true }) }, 80)
  }, [])

  /* ── Document title + html lang ───────────────────────── */
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    const item = t.navItems.find((i) => i.id === activeSection)
    document.title = item && activeSection !== 'hero'
      ? `${item.label} — vibening`
      : 'vibening · Agentic Engineering Guide'
  }, [activeSection, t.navItems])

  /* ── Intersection observers ────────────────────────────── */
  const navItems = useMemo(() => t.navItems, [t])

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
    if (hash) {
      const el = document.getElementById(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 80)
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
    const watched = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]
    const spyObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id)
          history.replaceState(null, '', `#${visible[0].target.id}`)
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.3, 0.6, 1] },
    )
    watched.forEach((section) => spyObserver.observe(section))
    return () => spyObserver.disconnect()
  }, [navItems])

  /* ── Mermaid ───────────────────────────────────────────── */
  useEffect(() => {
    let active = true
    const renderDiagrams = async () => {
      try {
        const mermaid = (await import('mermaid')).default
        if (!active) return
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: 'base',
          themeVariables: {
            background: '#070b10',
            primaryColor: '#0f1a29',
            primaryTextColor: '#e4f2fb',
            primaryBorderColor: '#3e6c93',
            secondaryColor: '#0a121d',
            tertiaryColor: '#081018',
            lineColor: '#6fc2ee',
            clusterBkg: '#0c1522',
            clusterBorder: '#325a7c',
            mainBkg: '#0f1a29',
            nodeBorder: '#3e6c93',
            fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace',
            edgeLabelBackground: '#0c1726',
          },
        })
        const nodes = Array.from(document.querySelectorAll<HTMLElement>('.mermaid'))
        nodes.forEach((node) => node.removeAttribute('data-processed'))
        await mermaid.run({ nodes })
        if (active) setMermaidReady(true)
      } catch {
        if (active) setMermaidReady(true)
      }
    }
    void renderDiagrams()
    return () => { active = false }
  }, [])

  /* ── Auto-checklist ───────────────────────────────────── */
  useEffect(() => {
    if (checklistAnimated) return
    const el = checklistSectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()
        setChecklistAnimated(true)
        checklistTimersRef.current = REVIEW_CHECKLIST.map((_, i) =>
          setTimeout(() => setCheckedItems((prev) => new Set([...prev, i])), i * 140 + 300)
        )
      },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      checklistTimersRef.current.forEach(clearTimeout)
    }
  }, [checklistAnimated, REVIEW_CHECKLIST])

  /* ── Helpers ───────────────────────────────────────────── */

  const severityLabel = (s: 'critical' | 'high' | 'medium') => {
    if (s === 'critical') return t.antiPatterns.severityCritical
    if (s === 'high') return t.antiPatterns.severityHigh
    return t.antiPatterns.severityMedium
  }

  const riskLabel = (r: 'high' | 'medium' | 'ok') => {
    if (r === 'high') return t.vibecodeVsAI.riskHigh
    if (r === 'medium') return t.vibecodeVsAI.riskMedium
    return ''
  }

  const reliabilityLabel = (r: 'high' | 'medium' | 'low') => {
    if (r === 'high') return t.multiAgent.reliabilityHigh
    if (r === 'medium') return t.multiAgent.reliabilityMedium
    return t.multiAgent.reliabilityLow
  }

  /* ── SDD full example and template (lang-switched) ──────── */
  const SDD_EXAMPLE_FULL = lang === 'pt-BR'
    ? `## 1. Contexto
- problema: API /users/search retorna timeout para queries acima de 3 chars
- publico afetado: clientes Enterprise (plano Pro+)
- restricoes: sem schema changes em producao

## 2. Objetivo
Reduzir p95 de /users/search de 2400ms para menos de 300ms sem alteracao de schema.

## 3. Escopo
- entra: UserSearchRepository, query builder, indice existente
- nao entra: camada de autenticacao, paginacao, outros endpoints

## 4. Criterios de validacao
- p95 < 300ms em load test com 50 req/s por 60s
- zero timeouts em queries de ate 50 caracteres
- testes unitarios existentes continuam passando sem modificacao

## 5. Plano (RPEV)
- research: profiling da query atual + explain plan do indice composto
- plan: reescrever query com indice composto + limit antecipado
- execute: implementar em UserSearchRepository.ts
- verify: rodar k6 load test + suite de testes + revisar diff

## 6. Evidencias
- p95 = 187ms (meta: < 300ms) — criterio 1 atendido
- zero timeouts registrados nos 60s de carga — criterio 2 atendido
- 42/42 testes passando — criterio 3 atendido
- PR #42 aprovado por revisor humano`
    : `## 1. Context
- problem: API /users/search returns timeout for queries above 3 chars
- affected users: Enterprise clients (Pro+ plan)
- constraints: no schema changes in production

## 2. Objective
Reduce p95 of /users/search from 2400ms to under 300ms without schema changes.

## 3. Scope
- in: UserSearchRepository, query builder, existing index
- out: auth layer, pagination, other endpoints

## 4. Validation criteria
- p95 < 300ms in load test with 50 req/s for 60s
- zero timeouts for queries up to 50 characters
- existing unit tests continue passing without modification

## 5. Plan (RPEV)
- research: profiling of current query + explain plan of composite index
- plan: rewrite query with composite index + early limit
- execute: implement in UserSearchRepository.ts
- verify: run k6 load test + test suite + review diff

## 6. Evidence
- p95 = 187ms (target: < 300ms) — criterion 1 met
- zero timeouts recorded during 60s load — criterion 2 met
- 42/42 tests passing — criterion 3 met
- PR #42 approved by human reviewer`

  const SDD_TEMPLATE = lang === 'pt-BR'
    ? `## 1. Contexto
- problema: ...
- publico afetado: ...
- restricoes tecnicas: ...

## 2. Objetivo
- resultado esperado em uma frase: ...

## 3. Escopo
- entra: ...
- nao entra: ...

## 4. Criterios de validacao
- criterio 1: ...
- criterio 2: ...
- criterio 3: ...

## 5. Plano (RPEV)
- research: ...
- plan: ...
- execute: ...
- verify: ...

## 6. Evidencias
- criterios atendidos: ...
- exemplo demonstrado: ...
- links de apoio: ...`
    : `## 1. Context
- problem: ...
- affected users: ...
- technical constraints: ...

## 2. Objective
- expected result in one sentence: ...

## 3. Scope
- in: ...
- out: ...

## 4. Validation criteria
- criterion 1: ...
- criterion 2: ...
- criterion 3: ...

## 5. Plan (RPEV)
- research: ...
- plan: ...
- execute: ...
- verify: ...

## 6. Evidence
- criteria met: ...
- example demonstrated: ...
- supporting links: ...`

  const SKILL_EXAMPLE = `---
name: git-safe
description: Utility for safe git operations
allowed-tools: Bash(git *)
argument-hint: [action]
---

## Behavior
Run git operations safely with human confirmation
for destructive commands (push --force, reset --hard).

## Steps
1. Validate action is allowed
2. Show diff or summary before executing
3. Require explicit confirmation for irreversible ops`

  const CONTEXT_EXAMPLE = lang === 'pt-BR'
    ? `## Objetivo
Refatorar a função parseDate() em utils/date.ts
para tratar entradas vazias sem lançar exceção.

## Escopo
- Apenas parseDate(), sem mexer em outras funções
- Manter assinatura atual: parseDate(input: string): Date | null

## Critério de aceite
- parseDate('') retorna null
- parseDate('invalid') retorna null
- parseDate('2024-01-15') continua funcionando
- Testes existentes passam`
    : `## Objective
Refactor parseDate() in utils/date.ts
to handle empty inputs without throwing an exception.

## Scope
- Only parseDate(), do not touch other functions
- Keep current signature: parseDate(input: string): Date | null

## Acceptance criteria
- parseDate('') returns null
- parseDate('invalid') returns null
- parseDate('2024-01-15') keeps working
- Existing tests pass`

  const DYNAMIC_CTX_EXAMPLE = lang === 'pt-BR'
    ? `# Passando estado real para o agente em tempo de execução

# Git status atual como contexto
!git status --short

# Branch e último commit
!git log --oneline -5

# Arquivos com conflito
!git diff --name-only --diff-filter=U

# Usar na sessão com:
# "dado o estado atual !{comando}, faça X"`
    : `# Passing live state to the agent at runtime

# Current git status as context
!git status --short

# Branch and last commit
!git log --oneline -5

# Files with conflicts
!git diff --name-only --diff-filter=U

# Use in session with:
# "given the current state !{command}, do X"`

  const AGENTS_MD_EXAMPLE = lang === 'pt-BR'
    ? `# CLAUDE.md — Contrato do projeto

## Identidade e escopo
Você é um assistente de engenharia para este repositório.
Foco: TypeScript/React. Nao toque em outros arquivos sem pedido explícito.

## Regras obrigatórias
- Nao commite sem confirmacao explícita
- Nao use --no-verify
- Leia o arquivo antes de editar
- Diff incremental: 1 mudanca lógica por commit

## Stack
- Node 20+, TypeScript strict, React 19, Vite
- Testes: Vitest + Testing Library
- Lint: ESLint + Prettier (run npm run check)

## Gates de qualidade
1. npm run check deve passar sem erros
2. Testes existentes devem continuar passando
3. Toda PR precisa de diff legível e aprovacao humana`
    : `# CLAUDE.md — Project contract

## Identity and scope
You are an engineering assistant for this repository.
Focus: TypeScript/React. Do not touch other files without explicit request.

## Mandatory rules
- Do not commit without explicit confirmation
- Do not use --no-verify
- Read the file before editing
- Incremental diff: 1 logical change per commit

## Stack
- Node 20+, TypeScript strict, React 19, Vite
- Tests: Vitest + Testing Library
- Lint: ESLint + Prettier (run npm run check)

## Quality gates
1. npm run check must pass without errors
2. Existing tests must continue passing
3. Every PR needs a readable diff and human approval`

  const PRECOMMIT_EXAMPLE = lang === 'pt-BR'
    ? `#!/bin/sh
# .claude/hooks/pre-commit — gate antes de todo commit

# 1. Lint e typecheck
npm run check
if [ $? -ne 0 ]; then
  echo "❌ Lint/typecheck falhou. Corrija antes de commitar."
  exit 1
fi

# 2. Testes unitários
npm run test -- --run
if [ $? -ne 0 ]; then
  echo "❌ Testes falharam. Corrija antes de commitar."
  exit 1
fi

echo "✓ Todos os gates passaram."`
    : `#!/bin/sh
# .claude/hooks/pre-commit — gate before every commit

# 1. Lint and typecheck
npm run check
if [ $? -ne 0 ]; then
  echo "❌ Lint/typecheck failed. Fix before committing."
  exit 1
fi

# 2. Unit tests
npm run test -- --run
if [ $? -ne 0 ]; then
  echo "❌ Tests failed. Fix before committing."
  exit 1
fi

echo "✓ All gates passed."`

  const SUBAGENT_EXAMPLE = lang === 'pt-BR'
    ? `# Padrão: handoff entre subagentes via arquivo
# Cada agente lê entrada e escreve saída em /tmp/

## Orquestrador
prompt: |
  Leia /tmp/task.md.
  Execute os agentes em sequência: researcher → implementer → reviewer.
  Se reviewer retornar exit 1, reenvie para implementer com /tmp/review.md.

## Agente: researcher
prompt: |
  Leia /tmp/task.md. Mapeie arquivos relevantes, APIs e restrições.
  Escreva descobertas em /tmp/research.md.
  Documente apenas o que for confirmado, não assuma.

## Agente: implementer
depends_on: researcher
prompt: |
  Leia /tmp/research.md e /tmp/task.md.
  Implemente as mudanças. Não exceda o escopo em task.md.
  Após cada arquivo alterado, adicione uma linha em /tmp/changes.md.

## Agente: reviewer
depends_on: implementer
prompt: |
  Leia /tmp/changes.md.
  Execute: npm run lint && npm run test
  Se falhar: escreva detalhes em /tmp/review.md e exit 1.
  Se passar: escreva "approved" em /tmp/review.md e exit 0.`
    : `# Pattern: subagent handoff via file
# Each agent reads input and writes output to /tmp/

## Orchestrator
prompt: |
  Read /tmp/task.md.
  Run agents in sequence: researcher → implementer → reviewer.
  If reviewer returns exit 1, re-send to implementer with /tmp/review.md.

## Agent: researcher
prompt: |
  Read /tmp/task.md. Map relevant files, APIs, and constraints.
  Write findings to /tmp/research.md.
  Document only what is confirmed, do not assume.

## Agent: implementer
depends_on: researcher
prompt: |
  Read /tmp/research.md and /tmp/task.md.
  Implement the changes. Do not exceed the scope in task.md.
  After each file change, append a one-line summary to /tmp/changes.md.

## Agent: reviewer
depends_on: implementer
prompt: |
  Read /tmp/changes.md.
  Run: npm run lint && npm run test
  If any check fails: write details to /tmp/review.md and exit 1.
  If all pass: write "approved" to /tmp/review.md and exit 0.`

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
      <header id="hero" className="hero">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-primary" />
        <div className="hero-glow hero-glow-secondary" />
        <div className="hero-content reveal visible">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>
            {t.hero.title}
            <span>{t.hero.titleSpan}</span>
          </h1>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <div className="hero-metrics" aria-label={t.hero.metricsLabel}>
            <div className="metric">
              <svg className="metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 12h6m-6 4h6M7 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V8l-5-5z"/><path d="M14 3v5h5"/></svg>
              <span>SDD</span><small>{t.hero.metric1Label}</small>
            </div>
            <div className="metric">
              <svg className="metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4v5h5M20 20v-5h-5"/><path d="M4 9a8 8 0 0114.9-2.7M20 15a8 8 0 01-14.9 2.7"/></svg>
              <span>RPEV</span><small>{t.hero.metric2Label}</small>
            </div>
            <div className="metric">
              <svg className="metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v3M6.5 17.5l4.5-3M17.5 17.5l-4.5-3"/></svg>
              <span>Multi-Agent</span><small>{t.hero.metric3Label}</small>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" className="content">

        {/* ── Lesson Roadmap ───────────────────────────── */}
        <section id="lesson-roadmap" className="reveal">
          <p className="section-label">{t.lessonRoadmap.sectionLabel}</p>
          <h2 className="section-title">{t.lessonRoadmap.title}</h2>
          <p className="section-description">{t.lessonRoadmap.description}</p>
          <div className="lessons-grid">
            {LESSONS.map((lesson) => (
              <article key={lesson.id} className="glass-card lesson-card">
                <div className="lesson-header">
                  <span className="lesson-number">{lesson.number}</span>
                  <span className="lesson-tag">{lesson.tag}</span>
                  {lesson.date ? <span className="lesson-date">{lesson.date}</span> : null}
                </div>
                <h3>{lesson.title}</h3>
                <p className="lesson-objective">{lesson.objective}</p>
                <div className="lesson-columns">
                  <div>
                    <span className="lesson-col-label">{t.lessonRoadmap.topicsLabel}</span>
                    <ul>{lesson.topics.map((tp) => <li key={tp}>{tp}</li>)}</ul>
                  </div>
                  <div>
                    <span className="lesson-col-label">{t.lessonRoadmap.outcomesLabel}</span>
                    <ul className="outcome-list">{lesson.outcomes.map((o) => <li key={o}>{o}</li>)}</ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Vibecoding vs AI-Assisted ─────────────────── */}
        <section id="vibecoding-vs-ai" className="reveal">
          <p className="section-label">{t.vibecodeVsAI.sectionLabel}</p>
          <h2 className="section-title">{t.vibecodeVsAI.title}</h2>
          <p className="section-description">{t.vibecodeVsAI.description}</p>
          <div className="comparison-table glass-card">
            <div className="comparison-head">
              <span>{t.vibecodeVsAI.headerAspect}</span>
              <span>{t.vibecodeVsAI.headerVibe}</span>
              <span>{t.vibecodeVsAI.headerAI}</span>
            </div>
            {COMPARISONS.map((row) => (
              <div key={row.aspect} className={`comparison-row risk-${row.risk}`}>
                <span className="comparison-aspect">{row.aspect}</span>
                <span className="comparison-vibe">{row.vibecoding}</span>
                <span className="comparison-ai">
                  {row.aiAssisted}
                  {row.risk !== 'ok' && (
                    <span className={`risk-badge risk-${row.risk}`}>{riskLabel(row.risk)}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className="comparison-note glass-card">
            <strong>{t.vibecodeVsAI.ruleTitle}</strong>
            <p>{t.vibecodeVsAI.ruleText}</p>
          </div>
        </section>

        {/* ── Principles ───────────────────────────────── */}
        <section id="principles" className="reveal">
          <p className="section-label">{t.principles.sectionLabel}</p>
          <h2 className="section-title">{t.principles.title}</h2>
          <p className="section-description">{t.principles.description}</p>
          <div className="principles-grid">
            {PRINCIPLES.map((item) => (
              <article key={item.id} className="glass-card principle-card">
                <span className="principle-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
                <small>{item.signal}</small>
              </article>
            ))}
          </div>
        </section>

        {/* ── SDD ──────────────────────────────────────── */}
        <section id="sdd" className="reveal">
          <p className="section-label">{t.sdd.sectionLabel}</p>
          <h2 className="section-title">{t.sdd.title}</h2>
          <p className="section-description">{t.sdd.description}</p>

          <div className="sdd-why-grid">
            <div className="glass-card sdd-why-card">
              <span className="sdd-why-icon">01</span>
              <h3>{t.sdd.why1Title}</h3>
              <p>{t.sdd.why1Text}</p>
            </div>
            <div className="glass-card sdd-why-card">
              <span className="sdd-why-icon">02</span>
              <h3>{t.sdd.why2Title}</h3>
              <p>{t.sdd.why2Text}</p>
            </div>
            <div className="glass-card sdd-why-card">
              <span className="sdd-why-icon">03</span>
              <h3>{t.sdd.why3Title}</h3>
              <p>{t.sdd.why3Text}</p>
            </div>
          </div>

          <div className="sdd-layout">
            <div className="sdd-fields-list">
              {SDD_FIELDS.map((field) => (
                <button
                  key={field.id}
                  type="button"
                  className={`sdd-field-btn glass-card ${activeSddField.id === field.id ? 'active' : ''}`}
                  onClick={() => { setActiveSddField(field); activateDetail(sddDetailRef) }}
                >
                  <span className="sdd-field-number">{field.number}</span>
                  <span className="sdd-field-name">{field.name}</span>
                </button>
              ))}
            </div>
            <div ref={sddDetailRef} tabIndex={-1}>
              <article key={activeSddField.id} className="sdd-detail glass-card">
                <div className="sdd-detail-header">
                  <span className="detail-kicker">{t.sdd.fieldKicker(activeSddField.number, SDD_FIELDS.length)}</span>
                  <span className="sdd-progress-dots">
                    {SDD_FIELDS.map((f) => (
                      <span key={f.id} className={`sdd-dot ${f.id === activeSddField.id ? 'active' : ''}`} />
                    ))}
                  </span>
                </div>
                <h3>{activeSddField.name}</h3>
                <p className="sdd-description">{activeSddField.description}</p>
                <p className="sdd-detail-text">{activeSddField.detail}</p>
                <div className="deck-block sdd-example-block">
                  <strong>{t.sdd.exampleLabel}</strong>
                  <p>{activeSddField.example}</p>
                </div>
                <div className="flow-warning sdd-antipattern-block">
                  <strong>{t.sdd.antiPatternLabel}</strong>
                  <p>{activeSddField.antiPattern}</p>
                </div>
              </article>
            </div>
          </div>

          <div className="sdd-quality glass-card">
            <div className="sdd-quality-header">
              <span className="section-label" style={{ margin: 0 }}>{t.sdd.specWeakVsStrong}</span>
            </div>
            <div className="sdd-quality-head">
              <span>{t.sdd.headerField}</span>
              <span className="sdd-weak-label">{t.sdd.headerWeak}</span>
              <span className="sdd-strong-label">{t.sdd.headerStrong}</span>
            </div>
            {SDD_SPEC_ROWS.map((row) => (
              <div key={row.field} className="sdd-quality-row">
                <span className="sdd-quality-field">{row.field}</span>
                <span className="sdd-quality-weak">{row.weak}</span>
                <span className="sdd-quality-strong">{row.strong}</span>
              </div>
            ))}
          </div>

          <div className="sdd-example-full glass-card">
            <div className="sdd-template-header">
              <strong>{t.sdd.exampleFullTitle}</strong>
              <span className="detail-kicker">{t.sdd.exampleFullKicker}</span>
            </div>
            <div className="code-block-wrap">
              <CopyButton text={SDD_EXAMPLE_FULL} />
              <pre><code>{SDD_EXAMPLE_FULL}</code></pre>
            </div>
          </div>

          <div className="sdd-template glass-card">
            <div className="sdd-template-header">
              <strong>{t.sdd.templateTitle}</strong>
              <span className="detail-kicker">{t.sdd.templateKicker}</span>
            </div>
            <div className="code-block-wrap">
              <CopyButton text={SDD_TEMPLATE} />
              <pre><code>{SDD_TEMPLATE}</code></pre>
            </div>
          </div>
        </section>

        {/* ── Context Signals ───────────────────────────── */}
        <section id="context-signals" className="reveal">
          <p className="section-label">{t.contextSignals.sectionLabel}</p>
          <h2 className="section-title">{t.contextSignals.title}</h2>
          <p className="section-description">{t.contextSignals.description}</p>
          <div className="signals-grid">
            {CONTEXT_SIGNALS.map((signal) => (
              <article key={signal.signal} className={`glass-card signal-card signal-${signal.type}`}>
                <div className="signal-header">
                  <svg className="signal-type-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {signal.type === 'error'
                      ? <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>
                      : <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>
                    }
                  </svg>
                  <span className={`signal-badge signal-${signal.type}`}>
                    {signal.type === 'error' ? t.contextSignals.badgeReset : t.contextSignals.badgeWarning}
                  </span>
                </div>
                <h3>{signal.signal}</h3>
                <p className="signal-meaning">{signal.meaning}</p>
                <div className="signal-action">
                  <span>{t.contextSignals.actionLabel}</span> {signal.action}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Progressive Disclosure ───────────────────── */}
        <section id="progressive-disclosure" className="reveal">
          <p className="section-label">{t.progressiveDisclosure.sectionLabel}</p>
          <h2 className="section-title">{t.progressiveDisclosure.title}</h2>
          <p className="section-description">{t.progressiveDisclosure.description}</p>
          <div className="pd-grid">
            {PD_LAYERS.map((layer, i) => (
              <article key={layer.id} className="glass-card pd-card">
                <div className="pd-header">
                  <span className="pd-number">L{i + 1}</span>
                  <span className="pd-tokens">{layer.tokens}</span>
                </div>
                <h3>{layer.name}</h3>
                <p>{layer.objective}</p>
                <div className="deck-block">
                  <strong>{t.progressiveDisclosure.loadWhenLabel}</strong>
                  <p>{layer.loadWhen}</p>
                </div>
                <ul>{layer.includes.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
          <article className="glass-card checklist-card">
            <h3>{t.progressiveDisclosure.workflowTitle}</h3>
            <pre><code>{t.progressiveDisclosure.workflowCode}</code></pre>
            <p>{t.progressiveDisclosure.workflowNote}</p>
          </article>
        </section>

        {/* ── Layer Model ──────────────────────────────── */}
        <section id="layer-model" className="reveal">
          <p className="section-label">{t.layerModel.sectionLabel}</p>
          <h2 className="section-title">{t.layerModel.title}</h2>
          <p className="section-description">{t.layerModel.description}</p>
          <div className="layer-layout">
            <div className="layer-stack">
              {LAYERS.map((layer) => (
                <button
                  key={layer.id}
                  type="button"
                  className={`layer-row glass-card ${activeLayer.id === layer.id ? 'active' : ''}`}
                  onClick={() => { setActiveLayer(layer); activateDetail(layerDetailRef) }}
                >
                  <div className="layer-row-main">
                    <span className="layer-title">{layer.label}</span>
                    <span className="layer-summary">{layer.summary}</span>
                  </div>
                  <div className="layer-chips">
                    {layer.chips.map((chip) => <span key={chip}>{chip}</span>)}
                  </div>
                </button>
              ))}
            </div>
            <div ref={layerDetailRef} tabIndex={-1}>
              <article key={activeLayer.id} className="layer-detail glass-card">
                <span className="detail-kicker">{t.layerModel.kicker}</span>
                <h3>{activeLayer.label}</h3>
                <ul>{activeLayer.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
              </article>
            </div>
          </div>
        </section>

        {/* ── RPEV Flow ────────────────────────────────── */}
        <section id="execution-flow" className="reveal">
          <p className="section-label">{t.executionFlow.sectionLabel}</p>
          <h2 className="section-title">{t.executionFlow.title}</h2>
          <p className="section-description">{t.executionFlow.description}</p>
          <div className="flow-layout">
            <div className="flow-left">
              {FLOW.map((step) => (
                <button
                  key={step.id}
                  type="button"
                  className={`flow-step glass-card ${activeStep.id === step.id ? 'active' : ''}`}
                  onClick={() => { setActiveStep(step); activateDetail(execFlowDetailRef) }}
                >
                  <span className="flow-step-label">{step.label}</span>
                  <span className="flow-step-summary">{step.summary}</span>
                </button>
              ))}
            </div>
            <div ref={execFlowDetailRef} tabIndex={-1}>
              <article key={activeStep.id} className="flow-right glass-card">
                <span className="detail-kicker">{t.executionFlow.kicker}</span>
                <h3>{activeStep.label}</h3>
                <p>{activeStep.detail}</p>
                <div className="flow-payload">{activeStep.payload}</div>
              </article>
            </div>
          </div>
        </section>

        {/* ── Workflow Gate ────────────────────────────── */}
        <section id="workflow-gate" className="reveal">
          <p className="section-label">{t.workflowGate.sectionLabel}</p>
          <h2 className="section-title">{t.workflowGate.title}</h2>
          <p className="section-description">{t.workflowGate.description}</p>
          <div className="flow-layout">
            <div className="flow-left">
              {WORKFLOW_PHASES.map((phase) => (
                <button
                  key={phase.id}
                  type="button"
                  className={`flow-step glass-card ${activePhase.id === phase.id ? 'active' : ''}`}
                  onClick={() => { setActivePhase(phase); activateDetail(workflowDetailRef) }}
                >
                  <span className="flow-step-label">{phase.step} · {phase.title}</span>
                  <span className="flow-step-summary">{phase.objective}</span>
                </button>
              ))}
            </div>
            <div ref={workflowDetailRef} tabIndex={-1}>
              <article key={activePhase.id} className="flow-right glass-card">
                <span className="detail-kicker">{t.workflowGate.kicker}</span>
                <h3>{activePhase.step} · {activePhase.title}</h3>
                <p>{activePhase.objective}</p>
                <div className="deck-block">
                  <strong>{t.workflowGate.checksLabel}</strong>
                  <ul>{activePhase.checks.map((check) => <li key={check}>{check}</li>)}</ul>
                </div>
                <div className="flow-warning">
                  <strong>{t.workflowGate.antiPatternLabel}</strong>
                  <p>{activePhase.antiPattern}</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── Multi-Agent ──────────────────────────────── */}
        <section id="multi-agent" className="reveal">
          <p className="section-label">{t.multiAgent.sectionLabel}</p>
          <h2 className="section-title">{t.multiAgent.title}</h2>
          <p className="section-description">{t.multiAgent.description}</p>

          <div className="ma-limits glass-card">
            <div className="ma-limits-header">
              <span className="section-label" style={{ margin: 0 }}>{t.multiAgent.limitsLabel}</span>
            </div>
            <div className="ma-limits-grid">
              <div className="ma-limit-item">
                <span className="ma-limit-number">{t.multiAgent.limit1Number}</span>
                <span className="ma-limit-label">{t.multiAgent.limit1Label}</span>
                <span className="ma-limit-desc">{t.multiAgent.limit1Desc}</span>
              </div>
              <div className="ma-limit-item">
                <span className="ma-limit-number">{t.multiAgent.limit2Number}</span>
                <span className="ma-limit-label">{t.multiAgent.limit2Label}</span>
                <span className="ma-limit-desc">{t.multiAgent.limit2Desc}</span>
              </div>
              <div className="ma-limit-item">
                <span className="ma-limit-number">{t.multiAgent.limit3Number}</span>
                <span className="ma-limit-label">{t.multiAgent.limit3Label}</span>
                <span className="ma-limit-desc">{t.multiAgent.limit3Desc}</span>
              </div>
            </div>
          </div>

          <div className="ma-section-title">
            <p className="section-label" style={{ marginTop: '32px' }}>{t.multiAgent.archsLabel}</p>
          </div>
          <div className="deck-layout">
            <div className="deck-list">
              {MULTI_AGENT_ARCHS.map((arch) => (
                <button
                  key={arch.id}
                  type="button"
                  className={`deck-item glass-card ma-arch-item ${activeArch.id === arch.id ? 'active' : ''}`}
                  onClick={() => { setActiveArch(arch); activateDetail(maArchDetailRef) }}
                >
                  <div className="ma-arch-item-header">
                    <span className="ma-arch-letter">{arch.letter}</span>
                    <span className={`ma-reliability ma-reliability-${arch.reliability}`}>
                      {reliabilityLabel(arch.reliability)}
                    </span>
                  </div>
                  <span className="deck-title">{arch.name}</span>
                  <span className="layer-summary">{arch.tagline}</span>
                </button>
              ))}
            </div>
            <div ref={maArchDetailRef} tabIndex={-1}>
              <article key={activeArch.id} className="deck-detail glass-card">
                <div className="ma-detail-top">
                  <span className="ma-arch-letter large">{activeArch.letter}</span>
                  <span className={`ma-reliability ma-reliability-${activeArch.reliability}`}>
                    {reliabilityLabel(activeArch.reliability)}
                  </span>
                </div>
                <h3>{activeArch.name}</h3>
                <p className="deck-objective">{activeArch.description}</p>
                <div className="deck-block">
                  <strong>{t.multiAgent.whenLabel}</strong>
                  <p>{activeArch.when}</p>
                </div>
                <div className="deck-tags">
                  {activeArch.components.map((c) => <span key={c}>{c}</span>)}
                </div>
                <div className={`flow-warning ${activeArch.reliability === 'high' ? 'ma-tradeoff-ok' : ''}`}>
                  <strong>{t.multiAgent.tradeoffLabel}</strong>
                  <p>{activeArch.tradeoff}</p>
                </div>
              </article>
            </div>
          </div>

          <div className="ma-section-title">
            <p className="section-label" style={{ marginTop: '32px' }}>{t.multiAgent.patternsLabel}</p>
            <p className="section-description" style={{ marginTop: '8px' }}>{t.multiAgent.patternsDesc}</p>
          </div>
          <div className="deck-layout">
            <div className="deck-list">
              {MULTI_AGENT_PATTERNS.map((pattern) => (
                <button
                  key={pattern.id}
                  type="button"
                  className={`deck-item glass-card ${activeAgentPattern.id === pattern.id ? 'active' : ''}`}
                  onClick={() => { setActiveAgentPattern(pattern); activateDetail(maPatternDetailRef) }}
                >
                  <div className="ap-item-header">
                    <span className="ma-arch-letter">{pattern.letter}</span>
                  </div>
                  <span className="deck-title">{pattern.name}</span>
                  <span className="layer-summary">{pattern.tagline}</span>
                </button>
              ))}
            </div>
            <div ref={maPatternDetailRef} tabIndex={-1}>
              <article key={activeAgentPattern.id} className="deck-detail glass-card">
                <span className="detail-kicker">{t.multiAgent.patternKicker(activeAgentPattern.letter)}</span>
                <h3>{activeAgentPattern.name}</h3>
                <p className="deck-objective">{activeAgentPattern.description}</p>
                <div className="deck-block">
                  <strong>{t.multiAgent.whenLabel}</strong>
                  <p>{activeAgentPattern.when}</p>
                </div>
                <div className="deck-tags">
                  {activeAgentPattern.components.map((c) => <span key={c}>{c}</span>)}
                </div>
                <div className="flow-warning">
                  <strong>{t.multiAgent.tradeoffLabel}</strong>
                  <p>{activeAgentPattern.tradeoff}</p>
                </div>
              </article>
            </div>
          </div>

          <div className="ma-section-title">
            <p className="section-label" style={{ marginTop: '32px' }}>{t.multiAgent.commLabel}</p>
          </div>
          <div className="comm-grid">
            {COMM_PATTERNS.map((cp) => (
              <article key={cp.id} className="glass-card comm-card">
                <h3>{cp.name}</h3>
                <p>{cp.description}</p>
                <div className="comm-columns">
                  <div>
                    <span className="comm-col-label pros">{t.multiAgent.prosLabel}</span>
                    <ul>{cp.pros.map((p) => <li key={p}>{p}</li>)}</ul>
                  </div>
                  <div>
                    <span className="comm-col-label cons">{t.multiAgent.consLabel}</span>
                    <ul>{cp.cons.map((c) => <li key={c}>{c}</li>)}</ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Anti-patterns ────────────────────────────── */}
        <section id="anti-patterns" className="reveal">
          <p className="section-label">{t.antiPatterns.sectionLabel}</p>
          <h2 className="section-title">{t.antiPatterns.title}</h2>
          <p className="section-description">{t.antiPatterns.description}</p>
          <div className="deck-layout">
            <div className="deck-list">
              {ANTI_PATTERNS.map((ap) => (
                <button
                  key={ap.id}
                  type="button"
                  className={`deck-item glass-card ap-item-${ap.severity} ${activeAntiPattern.id === ap.id ? 'active' : ''}`}
                  onClick={() => { setActiveAntiPattern(ap); activateDetail(antiPatternDetailRef) }}
                >
                  <div className="ap-item-header">
                    <span className={`ap-severity ap-severity-${ap.severity}`}>{severityLabel(ap.severity)}</span>
                    <span className="ap-category">{ap.category}</span>
                  </div>
                  <span className="deck-title">{ap.problem}</span>
                </button>
              ))}
            </div>
            <div ref={antiPatternDetailRef} tabIndex={-1}>
              <article key={activeAntiPattern.id} className="deck-detail glass-card">
                <div className="ap-detail-header">
                  <span className={`ap-severity ap-severity-${activeAntiPattern.severity}`}>
                    {severityLabel(activeAntiPattern.severity)}
                  </span>
                  <span className="ap-category">{activeAntiPattern.category}</span>
                </div>
                <h3>{activeAntiPattern.problem}</h3>
                <div className="deck-block">
                  <strong>{t.antiPatterns.consequenceLabel}</strong>
                  <p>{activeAntiPattern.consequence}</p>
                </div>
                <div className="deck-block ap-fix-block">
                  <strong>{t.antiPatterns.fixLabel}</strong>
                  <p>{activeAntiPattern.fix}</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── Deep Dive ────────────────────────────────── */}
        <section id="deep-dive" className="reveal">
          <p className="section-label">{t.deepDive.sectionLabel}</p>
          <h2 className="section-title">{t.deepDive.title}</h2>
          <p className="section-description">{t.deepDive.description}</p>
          <div className="deck-layout">
            <div className="deck-list">
              {DEEP_DIVES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`deck-item glass-card ${activeDeepDive.id === item.id ? 'active' : ''}`}
                  onClick={() => { setActiveDeepDive(item); activateDetail(deepDiveDetailRef) }}
                >
                  <span className="deck-title">{item.title}</span>
                </button>
              ))}
            </div>
            <div ref={deepDiveDetailRef} tabIndex={-1}>
              <article key={activeDeepDive.id} className="deck-detail glass-card">
                <h3>{activeDeepDive.title}</h3>
                <p className="deck-objective">{activeDeepDive.description}</p>
                <div className="deck-tags">
                  {activeDeepDive.artifacts.map((artifact) => (
                    <span key={artifact}>{artifact}</span>
                  ))}
                </div>
                <div className="deep-links">
                  {activeDeepDive.links.map((link) => (
                    <a key={link.href} className="ref-link glass-card" href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── Mermaid Diagrams ─────────────────────────── */}
        <section id="mermaid-diagrams" className="reveal">
          <p className="section-label">{t.mermaidDiagrams.sectionLabel}</p>
          <h2 className="section-title">{t.mermaidDiagrams.title}</h2>
          <p className="section-description">{t.mermaidDiagrams.description}</p>
          {!mermaidReady && (
            <div className="diagram-stack diagram-stack-skeleton">
              <div className="glass-card diagram-card"><div className="skeleton diagram-skeleton" /></div>
              <div className="glass-card diagram-card"><div className="skeleton diagram-skeleton" /></div>
              <div className="glass-card diagram-card"><div className="skeleton diagram-skeleton" /></div>
              <div className="glass-card diagram-card"><div className="skeleton diagram-skeleton" /></div>
            </div>
          )}
          <div className={`diagram-stack${mermaidReady ? '' : ' diagram-grid-hidden'}`}>
            <article className="glass-card diagram-card">
              <span className="detail-kicker">AI-driven Dev Workflow</span>
              <div className="diagram-wrap">
                <pre className="mermaid">{`flowchart LR
  A[Plan] --> B[Branch/Worktree]
  B --> C[Implement with AI]
  C --> D[Test + Lint]
  D --> E[Pre-flight Review]
  E --> F[PR + CI]
  F --> G{Approved?}
  G -- no --> H[Apply Fix]
  H --> F
  G -- yes --> I[Verification Gate]
  I --> J[Release]
`}</pre>
              </div>
            </article>
            <article className="glass-card diagram-card">
              <span className="detail-kicker">Rules + Skills + MCP</span>
              <div className="diagram-wrap">
                <pre className="mermaid">{`graph TD
  A[Project Rules] --> D[Agent Runtime]
  B[Skills] --> D
  C[MCP] --> D
  D --> E[Execute]
  E --> F[Validate]
  F --> G[Review]
  G --> H[Approval Gate]
`}</pre>
              </div>
            </article>
            <article className="glass-card diagram-card">
              <span className="detail-kicker">Progressive Disclosure</span>
              <div className="diagram-wrap">
                <pre className="mermaid">{`flowchart TD
  T[Task] --> L1[Layer 1: Discovery ~100 tokens]
  L1 --> D{Relevant?}
  D -- no --> Skip[Skip]
  D -- yes --> L2[Layer 2: Activation ~2k-5k tokens]
  L2 --> E[Execute]
  E --> ND{Deep dive needed?}
  ND -- yes --> L3[Layer 3: Execution on demand]
  ND -- no --> Done[Done]
  L3 --> Done
`}</pre>
              </div>
            </article>
            <article className="glass-card diagram-card">
              <span className="detail-kicker">Evaluator-Optimizer Pattern</span>
              <div className="diagram-wrap">
                <pre className="mermaid">{`flowchart LR
  G[Generator] --> S[Solution]
  S --> C[Critic/Evaluator]
  C --> AP{Approved?}
  AP -- no --> R[Rework signal]
  R --> G
  AP -- yes --> F[Finalize]
`}</pre>
              </div>
            </article>
          </div>
        </section>

        {/* ── Ecosystem Map ────────────────────────────── */}
        <section id="ecosystem-map" className="reveal">
          <p className="section-label">{t.ecosystemMap.sectionLabel}</p>
          <h2 className="section-title">{t.ecosystemMap.title}</h2>
          <p className="section-description">{t.ecosystemMap.description}</p>
          <div className="map-controls" role="group" aria-label={t.ecosystemMap.filterGroupLabel}>
            <button type="button" className={activeMapView === 'all' ? 'active' : ''} onClick={() => setActiveMapView('all')}>{t.ecosystemMap.filterAll}</button>
            <button type="button" className={activeMapView === 'build' ? 'active' : ''} onClick={() => setActiveMapView('build')}>{t.ecosystemMap.filterBuild}</button>
            <button type="button" className={activeMapView === 'ops' ? 'active' : ''} onClick={() => setActiveMapView('ops')}>{t.ecosystemMap.filterOps}</button>
          </div>
          <div className="map-card glass-card">
            <div className="map-legend">
              <span className="legend-item legend-top">{t.ecosystemMap.legendBuild}</span>
              <span className="legend-item legend-mid">{t.ecosystemMap.legendExec}</span>
              <span className="legend-item legend-bot">{t.ecosystemMap.legendOps}</span>
            </div>
            <div className={`map-grid view-${activeMapView}`}>
              <div className="node top"><span>rules</span><small>CLAUDE.md</small></div>
              <div className="node top"><span>skills</span><small>SKILL.md</small></div>
              <div className="node top"><span>mcp</span><small>tool access</small></div>
              <div className="node top"><span>hooks</span><small>loop control</small></div>
              <div className="node mid"><span>research</span><small>map state</small></div>
              <div className="node mid"><span>plan</span><small>define steps</small></div>
              <div className="node mid"><span>execute</span><small>apply changes</small></div>
              <div className="node mid"><span>verify</span><small>validate</small></div>
              <div className="node bot"><span>review</span><small>human eye</small></div>
              <div className="node bot"><span>approval</span><small>gate</small></div>
              <div className="node bot"><span>release</span><small>controlled</small></div>
            </div>
            <p className="map-caption">
              {activeMapView === 'all' && t.ecosystemMap.captionAll}
              {activeMapView === 'build' && t.ecosystemMap.captionBuild}
              {activeMapView === 'ops' && t.ecosystemMap.captionOps}
            </p>
          </div>
        </section>

        {/* ── Stack Curation ───────────────────────────── */}
        <section id="stack-curation" className="reveal">
          <p className="section-label">{t.stackCuration.sectionLabel}</p>
          <h2 className="section-title">{t.stackCuration.title}</h2>
          <p className="section-description">{t.stackCuration.description}</p>
          <div className="stack-grid">
            {(['A', 'B', 'C'] as const).map((priority) => {
              const tools = STACK_TOOLS.filter((tool) => tool.priority === priority)
              const labels: Record<string, string> = {
                A: t.stackCuration.priorityA,
                B: t.stackCuration.priorityB,
                C: t.stackCuration.priorityC,
              }
              return (
                <div key={priority} className={`stack-group glass-card priority-${priority}`}>
                  <div className="stack-group-header">
                    <span className={`priority-badge priority-${priority}`}>{t.stackCuration.priorityLabel} {priority}</span>
                    <span className="priority-label">{labels[priority]}</span>
                  </div>
                  <div className="stack-list">
                    {tools.map((tool) => (
                      <div key={tool.name} className="stack-item">
                        <div className="stack-item-main">
                          <span className="stack-name">{tool.name}</span>
                          <span className="stack-type">{tool.type}</span>
                        </div>
                        <span className="stack-why">{tool.why}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Methods ──────────────────────────────────── */}
        <section id="methods-core" className="reveal">
          <p className="section-label">{t.methods.sectionLabel}</p>
          <h2 className="section-title">{t.methods.title}</h2>
          <p className="section-description">{t.methods.description}</p>
          <div className="methods-grid">
            {METHODS.map((method) => (
              <article key={method.id} className="glass-card method-card">
                <h3>{method.title}</h3>
                <p>{method.summary}</p>
                <ul>{method.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        {/* ── Examples ─────────────────────────────────── */}
        <section id="examples" className="reveal">
          <p className="section-label">{t.examples.sectionLabel}</p>
          <h2 className="section-title">{t.examples.title}</h2>
          <p className="section-description">{t.examples.description}</p>
          <div className="examples-grid">
            <article className="glass-card example-card">
              <h3>{t.examples.ex1Title}</h3>
              <div className="code-block-wrap">
                <CopyButton text={SKILL_EXAMPLE} />
                <pre><code>{SKILL_EXAMPLE}</code></pre>
              </div>
            </article>
            <article className="glass-card example-card">
              <h3>{t.examples.ex2Title}</h3>
              <div className="code-block-wrap">
                <CopyButton text={CONTEXT_EXAMPLE} />
                <pre><code>{CONTEXT_EXAMPLE}</code></pre>
              </div>
            </article>
            <article className="glass-card example-card">
              <h3>{t.examples.ex3Title}</h3>
              <div className="code-block-wrap">
                <CopyButton text={DYNAMIC_CTX_EXAMPLE} />
                <pre><code>{DYNAMIC_CTX_EXAMPLE}</code></pre>
              </div>
            </article>
            <article className="glass-card example-card">
              <h3>{t.examples.ex4Title}</h3>
              <ul>
                {t.examples.ex4Items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
            <article className="glass-card example-card">
              <h3>{t.examples.ex5Title}</h3>
              <div className="code-block-wrap">
                <CopyButton text={AGENTS_MD_EXAMPLE} />
                <pre><code>{AGENTS_MD_EXAMPLE}</code></pre>
              </div>
            </article>
            <article className="glass-card example-card">
              <h3>{t.examples.ex6Title}</h3>
              <div className="code-block-wrap">
                <CopyButton text={PRECOMMIT_EXAMPLE} />
                <pre><code>{PRECOMMIT_EXAMPLE}</code></pre>
              </div>
            </article>
            <article className="glass-card example-card">
              <h3>{t.examples.ex7Title}</h3>
              <div className="code-block-wrap">
                <CopyButton text={SUBAGENT_EXAMPLE} />
                <pre><code>{SUBAGENT_EXAMPLE}</code></pre>
              </div>
            </article>
          </div>
        </section>

        {/* ── Review Checklist ─────────────────────────── */}
        <section id="review-checklist" className="reveal" ref={checklistSectionRef}>
          <p className="section-label">{t.reviewChecklist.sectionLabel}</p>
          <h2 className="section-title">{t.reviewChecklist.title}</h2>
          <p className="section-description">{t.reviewChecklist.description}</p>
          <div className="checklist-container glass-card">
            <div className="checklist-progress">
              <span>{t.reviewChecklist.progress(checkedItems.size, REVIEW_CHECKLIST.length)}</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(checkedItems.size / REVIEW_CHECKLIST.length) * 100}%` }}
                />
              </div>
            </div>
            {REVIEW_CHECKLIST.map((item, i) => (
              <div
                key={`${lang}-${i}`}
                className={`checklist-item ${checkedItems.has(i) ? 'checked' : ''}`}
              >
                <span className="checklist-check" aria-hidden="true">
                  {checkedItems.has(i) ? '✓' : '○'}
                </span>
                <span className="checklist-text">{item.item}</span>
                <span className="checklist-cat">{item.category}</span>
              </div>
            ))}
            {checkedItems.size === REVIEW_CHECKLIST.length && (
              <div className="checklist-done">
                <span>{t.reviewChecklist.allDone}</span>
              </div>
            )}
          </div>
        </section>

        {/* ── Quality Matrix ───────────────────────────── */}
        <section id="quality-matrix" className="reveal">
          <p className="section-label">{t.qualityMatrix.sectionLabel}</p>
          <h2 className="section-title">{t.qualityMatrix.title}</h2>
          <p className="section-description">{t.qualityMatrix.description}</p>
          <div className="matrix-card glass-card">
            <div className="matrix-head">
              <span>{t.qualityMatrix.headerGate}</span>
              <span>{t.qualityMatrix.headerRule}</span>
              <span>{t.qualityMatrix.headerVerify}</span>
            </div>
            {QUALITY_ROWS.map((row) => (
              <div key={row.gate} className="matrix-row">
                <span>{row.gate}</span>
                <span>{row.rule}</span>
                <span>{row.verify}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── References ───────────────────────────────── */}
        <section id="refs" className="reveal">
          <p className="section-label">{t.refs.sectionLabel}</p>
          <h2 className="section-title">{t.refs.title}</h2>
          <p className="section-description">{t.refs.description}</p>
          <div className="refs-categories">
            <div>
              <h3 className="refs-group-label">{t.refs.groupSkills}</h3>
              <div className="references-grid">
                <a className="glass-card ref-link" href="https://agentskills.io" target="_blank" rel="noreferrer">Agent Skills Standard</a>
                <a className="glass-card ref-link" href="https://github.com/anthropics/skills" target="_blank" rel="noreferrer">anthropics/skills</a>
                <a className="glass-card ref-link" href="https://github.com/vercel-labs/skills" target="_blank" rel="noreferrer">vercel-labs/skills</a>
                <a className="glass-card ref-link" href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank" rel="noreferrer">Building Effective Agents</a>
              </div>
            </div>
            <div>
              <h3 className="refs-group-label">{t.refs.groupMcp}</h3>
              <div className="references-grid">
                <a className="glass-card ref-link" href="https://modelcontextprotocol.io/docs/getting-started/intro" target="_blank" rel="noreferrer">MCP Docs</a>
                <a className="glass-card ref-link" href="https://cursor.com/docs/mcp" target="_blank" rel="noreferrer">Cursor MCP Docs</a>
                <a className="glass-card ref-link" href="https://context7.com" target="_blank" rel="noreferrer">Context7</a>
              </div>
            </div>
            <div>
              <h3 className="refs-group-label">{t.refs.groupPrompt}</h3>
              <div className="references-grid">
                <a className="glass-card ref-link" href="https://platform.openai.com/docs/guides/prompt-engineering" target="_blank" rel="noreferrer">Prompt Engineering</a>
                <a className="glass-card ref-link" href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/long-context-tips" target="_blank" rel="noreferrer">Long Context Tips</a>
                <a className="glass-card ref-link" href="https://arxiv.org/abs/2307.03172" target="_blank" rel="noreferrer">Lost in the Middle (arXiv)</a>
                <a className="glass-card ref-link" href="https://arxiv.org/abs/2210.03629" target="_blank" rel="noreferrer">ReAct (arXiv)</a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default App
