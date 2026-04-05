import { useEffect, useRef, useState } from 'react'
import './App.css'

import { useLang } from './LanguageContext'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { CopyButton } from './components/CopyButton'
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
import { MultiAgent } from './sections/MultiAgent'
import { AntiPatterns } from './sections/AntiPatterns'
import { DeepDive } from './sections/DeepDive'

import {
  REVIEW_CHECKLIST_DATA,
} from './i18n'

/* ─── App ────────────────────────────────────────────────── */

function App() {
  const { lang, t } = useLang()

  /* ── Data (lang-switched) ──────────────────────────────── */
  const REVIEW_CHECKLIST = REVIEW_CHECKLIST_DATA[lang]

  /* ── State ─────────────────────────────────────────────── */
  const [activeSection, setActiveSection] = useState('hero')
  const [checkedItems, setCheckedItems]         = useState<Set<number>>(new Set())
  const [checklistAnimated, setChecklistAnimated] = useState(false)
  const [scrollProgress, setScrollProgress]     = useState(0)
  const checklistSectionRef  = useRef<HTMLElement | null>(null)
  const checklistTimersRef   = useRef<ReturnType<typeof setTimeout>[]>([])
  const mermaidSectionRef    = useRef<HTMLElement | null>(null)
  const [mobileNavOpen, setMobileNavOpen]       = useState(false)
  const [mermaidReady, setMermaidReady]         = useState(false)

  // Reset active items when language changes
  useEffect(() => {
    setCheckedItems(new Set())
    setChecklistAnimated(false)
  }, [lang])

  /* ── Refs for detail panels ───────────────────────────── */

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
  const navItems = t.navItems

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

  /* ── Mermaid (lazy: only loads bundle when section enters viewport) ── */
  useEffect(() => {
    const el = mermaidSectionRef.current
    if (!el) return
    let active = true

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()

        const renderDiagrams = async () => {
          try {
            const mermaid = (await import('mermaid')).default
            if (!active) return
            mermaid.initialize({
              startOnLoad: false,
              securityLevel: 'strict',
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
      },
      { rootMargin: '300px' }, // preload 300px before entering viewport
    )
    obs.observe(el)
    return () => { active = false; obs.disconnect() }
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
        <section ref={mermaidSectionRef} id="mermaid-diagrams" className="reveal">
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
              <span className="detail-kicker">{t.mermaidDiagrams.diagramWorkflow}</span>
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
              <span className="detail-kicker">{t.mermaidDiagrams.diagramRules}</span>
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
              <span className="detail-kicker">{t.mermaidDiagrams.diagramProgressive}</span>
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
              <span className="detail-kicker">{t.mermaidDiagrams.diagramEvaluator}</span>
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
        <EcosystemMap />

        {/* ── Stack Curation ───────────────────────────── */}
        <StackCuration />

        {/* ── Methods ──────────────────────────────────── */}
        <Methods />

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
        <QualityMatrix />

        {/* ── References ───────────────────────────────── */}
        <References />

      </main>

      <Footer />
    </div>
  )
}

export default App
