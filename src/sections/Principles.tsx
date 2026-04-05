import { useLang } from '../LanguageContext'
import { PRINCIPLES_DATA } from '../i18n'

export function Principles() {
  const { lang, t } = useLang()
  const PRINCIPLES = PRINCIPLES_DATA[lang]
  return (
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
  )
}
