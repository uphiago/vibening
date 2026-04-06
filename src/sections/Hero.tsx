import { useLang } from '../LanguageContext'

export function Hero() {
  const { t } = useLang()
  return (
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
            <svg
              className="metric-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 12h6m-6 4h6M7 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V8l-5-5z" />
              <path d="M14 3v5h5" />
            </svg>
            <span>SDD</span>
            <small>{t.hero.metric1Label}</small>
          </div>
          <div className="metric">
            <svg
              className="metric-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 4v5h5M20 20v-5h-5" />
              <path d="M4 9a8 8 0 0114.9-2.7M20 15a8 8 0 01-14.9 2.7" />
            </svg>
            <span>RPEV</span>
            <small>{t.hero.metric2Label}</small>
          </div>
          <div className="metric">
            <svg
              className="metric-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="5" r="2" />
              <circle cx="5" cy="19" r="2" />
              <circle cx="19" cy="19" r="2" />
              <path d="M12 7v3M6.5 17.5l4.5-3M17.5 17.5l-4.5-3" />
            </svg>
            <span>Multi-Agent</span>
            <small>{t.hero.metric3Label}</small>
          </div>
        </div>
      </div>
    </header>
  )
}
