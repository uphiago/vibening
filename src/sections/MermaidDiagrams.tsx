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
    return () => {
      active = false
      obs.disconnect()
    }
  }, [])

  return (
    <section ref={mermaidSectionRef} id="mermaid-diagrams" className="reveal">
      <p className="section-label">{t.mermaidDiagrams.sectionLabel}</p>
      <h2 className="section-title">{t.mermaidDiagrams.title}</h2>
      <p className="section-description">{t.mermaidDiagrams.description}</p>
      {!mermaidReady && (
        <div className="diagram-stack diagram-stack-skeleton">
          <div className="glass-card diagram-card">
            <div className="skeleton diagram-skeleton" />
          </div>
        </div>
      )}
      <div className={`diagram-stack${mermaidReady ? '' : ' diagram-grid-hidden'}`}>
        <article className="glass-card diagram-card">
          <span className="detail-kicker">{t.mermaidDiagrams.diagramWorkflow}</span>
          <div className="diagram-wrap">
            <pre className="mermaid">{`flowchart TD
  U[User intent + constraints] --> R[Research]
  R --> P[Plan]
  P --> C[Code with AI]
  C --> V[Verify: tests + lint + review]
  V --> G{Gate pass?}
  G -- no --> F[Fix + rerun]
  F --> V
  G -- yes --> M[Merge or release]
  RR[Project rules] --> C
  SS[Skills] --> C
  MM[MCP] --> C
  PD1[Discovery index] --> PD2[Activation instructions]
  PD2 --> PD3[Deep dive on demand]
  PD3 --> C
`}</pre>
          </div>
        </article>
      </div>
    </section>
  )
}
