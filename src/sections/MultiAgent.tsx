import { useMemo, useRef, useState } from 'react'

import { useLang } from '../LanguageContext'
import { useActivateDetail } from '../hooks/useActivateDetail'
import { COMM_PATTERNS_DATA, MULTI_AGENT_ARCHS_DATA, MULTI_AGENT_PATTERNS_DATA } from '../i18n'

function reliabilityLabel(r: 'high' | 'medium' | 'low', t: ReturnType<typeof useLang>['t']) {
  if (r === 'high') return t.multiAgent.reliabilityHigh
  if (r === 'medium') return t.multiAgent.reliabilityMedium
  return t.multiAgent.reliabilityLow
}

export function MultiAgent() {
  const { lang, t } = useLang()
  const MULTI_AGENT_ARCHS = MULTI_AGENT_ARCHS_DATA[lang]
  const MULTI_AGENT_PATTERNS = MULTI_AGENT_PATTERNS_DATA[lang]
  const COMM_PATTERNS = COMM_PATTERNS_DATA[lang]
  const [activeArchId, setActiveArchId] = useState(MULTI_AGENT_ARCHS[0].id)
  const [activeAgentPatternId, setActiveAgentPatternId] = useState(MULTI_AGENT_PATTERNS[0].id)
  const activeArch = useMemo(() => {
    const data = MULTI_AGENT_ARCHS_DATA[lang]
    return data.find((a) => a.id === activeArchId) ?? data[0]
  }, [lang, activeArchId])
  const activeAgentPattern = useMemo(() => {
    const data = MULTI_AGENT_PATTERNS_DATA[lang]
    return data.find((p) => p.id === activeAgentPatternId) ?? data[0]
  }, [lang, activeAgentPatternId])
  const maArchDetailRef = useRef<HTMLDivElement>(null)
  const maPatternDetailRef = useRef<HTMLDivElement>(null)
  const activateDetail = useActivateDetail()

  return (
    <section id="multi-agent" className="reveal">
      <p className="section-label">{t.multiAgent.sectionLabel}</p>
      <h2 className="section-title">{t.multiAgent.title}</h2>
      <p className="section-description">{t.multiAgent.description}</p>

      <div className="ma-limits glass-card">
        <div className="ma-limits-header">
          <span className="section-label ma-limits-label">{t.multiAgent.limitsLabel}</span>
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
        <p className="section-label ma-subsection-label">{t.multiAgent.archsLabel}</p>
      </div>
      <div className="deck-layout">
        <div className="deck-list">
          {MULTI_AGENT_ARCHS.map((arch) => (
            <button
              key={arch.id}
              type="button"
              className={`deck-item glass-card ma-arch-item ${activeArch.id === arch.id ? 'active' : ''}`}
              onClick={() => {
                setActiveArchId(arch.id)
                activateDetail(maArchDetailRef)
              }}
            >
              <div className="ma-arch-item-header">
                <span className="ma-arch-letter">{arch.letter}</span>
                <span className={`ma-reliability ma-reliability-${arch.reliability}`}>
                  {reliabilityLabel(arch.reliability, t)}
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
                {reliabilityLabel(activeArch.reliability, t)}
              </span>
            </div>
            <h3>{activeArch.name}</h3>
            <p className="deck-objective">{activeArch.description}</p>
            <div className="deck-block">
              <strong>{t.multiAgent.whenLabel}</strong>
              <p>{activeArch.when}</p>
            </div>
            <div className="deck-tags">
              {activeArch.components.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            <div className={`flow-warning ${activeArch.reliability === 'high' ? 'ma-tradeoff-ok' : ''}`}>
              <strong>{t.multiAgent.tradeoffLabel}</strong>
              <p>{activeArch.tradeoff}</p>
            </div>
          </article>
        </div>
      </div>

      <div className="ma-section-title">
        <p className="section-label ma-subsection-label">{t.multiAgent.patternsLabel}</p>
        <p className="section-description ma-subsection-description">{t.multiAgent.patternsDesc}</p>
      </div>
      <div className="deck-layout">
        <div className="deck-list">
          {MULTI_AGENT_PATTERNS.map((pattern) => (
            <button
              key={pattern.id}
              type="button"
              className={`deck-item glass-card ${activeAgentPattern.id === pattern.id ? 'active' : ''}`}
              onClick={() => {
                setActiveAgentPatternId(pattern.id)
                activateDetail(maPatternDetailRef)
              }}
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
              {activeAgentPattern.components.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            <div className="flow-warning">
              <strong>{t.multiAgent.tradeoffLabel}</strong>
              <p>{activeAgentPattern.tradeoff}</p>
            </div>
          </article>
        </div>
      </div>

      <div className="ma-section-title">
        <p className="section-label ma-subsection-label">{t.multiAgent.commLabel}</p>
      </div>
      <div className="comm-grid">
        {COMM_PATTERNS.map((cp) => (
          <article key={cp.id} className="glass-card comm-card">
            <h3>{cp.name}</h3>
            <p>{cp.description}</p>
            <div className="comm-columns">
              <div>
                <span className="comm-col-label pros">{t.multiAgent.prosLabel}</span>
                <ul>
                  {cp.pros.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="comm-col-label cons">{t.multiAgent.consLabel}</span>
                <ul>
                  {cp.cons.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
