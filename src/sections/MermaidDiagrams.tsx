import { useEffect, useRef, useState } from 'react'
import { useLang } from '../LanguageContext'

export function MermaidDiagrams() {
  const { t } = useLang()
  const [mermaidReady, setMermaidReady] = useState(false)
  const mermaidSectionRef = useRef<HTMLElement | null>(null)

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
      { rootMargin: '300px' },
    )
    obs.observe(el)
    return () => { active = false; obs.disconnect() }
  }, [])

  return (
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
  )
}
