import { useMemo, useRef, useState } from 'react'

import { useLang } from '../LanguageContext'
import { useActivateDetail } from '../hooks/useActivateDetail'
import { DEEP_DIVES_DATA } from '../i18n'

export function DeepDive() {
  const { lang, t } = useLang()
  const DEEP_DIVES = DEEP_DIVES_DATA[lang]
  const [activeDeepDiveId, setActiveDeepDiveId] = useState(DEEP_DIVES[0].id)
  const activeDeepDive = useMemo(() => {
    const data = DEEP_DIVES_DATA[lang]
    return data.find((d) => d.id === activeDeepDiveId) ?? data[0]
  }, [lang, activeDeepDiveId])
  const deepDiveDetailRef = useRef<HTMLDivElement>(null)
  const activateDetail = useActivateDetail()

  return (
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
              onClick={() => {
                setActiveDeepDiveId(item.id)
                activateDetail(deepDiveDetailRef)
              }}
            >
              <span className="deck-title">{item.title}</span>
            </button>
          ))}
        </div>
        <div ref={deepDiveDetailRef} tabIndex={-1} className="deck-detail-shell">
          <article key={activeDeepDive.id} className="deck-detail glass-card">
            <h3>{activeDeepDive.title}</h3>
            <div className="deck-meta">
              <span>
                {t.deepDive.artifactsLabel}: {activeDeepDive.artifacts.length}
              </span>
              <span>
                {t.deepDive.referencesLabel}: {activeDeepDive.links.length}
              </span>
            </div>
            <p className="deck-objective">{activeDeepDive.description}</p>
            <div className="deck-tags">
              {activeDeepDive.artifacts.map((artifact) => (
                <span key={artifact}>{artifact}</span>
              ))}
            </div>
            {activeDeepDive.tree && activeDeepDive.tree.length > 0 && (
              <div className="deep-tree glass-card" aria-label="directory tree">
                <pre>
                  <code>{activeDeepDive.tree.join('\n')}</code>
                </pre>
              </div>
            )}
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
  )
}
