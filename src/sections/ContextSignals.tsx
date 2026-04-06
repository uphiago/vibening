import { useLang } from '../LanguageContext'
import { CONTEXT_SIGNALS_DATA } from '../i18n'

export function ContextSignals() {
  const { lang, t } = useLang()
  const CONTEXT_SIGNALS = CONTEXT_SIGNALS_DATA[lang]
  return (
    <section id="context-signals" className="reveal">
      <p className="section-label">{t.contextSignals.sectionLabel}</p>
      <h2 className="section-title">{t.contextSignals.title}</h2>
      <p className="section-description">{t.contextSignals.description}</p>
      <div className="signals-grid">
        {CONTEXT_SIGNALS.map((signal) => (
          <article key={signal.signal} className={`glass-card signal-card signal-${signal.type}`}>
            <div className="signal-header">
              <svg
                className="signal-type-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {signal.type === 'error' ? (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </>
                ) : (
                  <>
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </>
                )}
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
  )
}
