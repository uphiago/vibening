import { useEffect, useRef, useState } from 'react'
import { useLang } from '../LanguageContext'
import { ANTI_PATTERNS_DATA } from '../i18n'
import { useActivateDetail } from '../hooks/useActivateDetail'

function severityLabel(s: 'critical' | 'high' | 'medium', t: ReturnType<typeof useLang>['t']) {
  if (s === 'critical') return t.antiPatterns.severityCritical
  if (s === 'high') return t.antiPatterns.severityHigh
  return t.antiPatterns.severityMedium
}

export function AntiPatterns() {
  const { lang, t } = useLang()
  const ANTI_PATTERNS = ANTI_PATTERNS_DATA[lang]
  const [activeAntiPattern, setActiveAntiPattern] = useState(ANTI_PATTERNS[0])
  const antiPatternDetailRef = useRef<HTMLDivElement>(null)
  const activateDetail = useActivateDetail()

  useEffect(() => { setActiveAntiPattern(ANTI_PATTERNS_DATA[lang][0]) }, [lang])

  return (
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
                <span className={`ap-severity ap-severity-${ap.severity}`}>{severityLabel(ap.severity, t)}</span>
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
                {severityLabel(activeAntiPattern.severity, t)}
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
  )
}
