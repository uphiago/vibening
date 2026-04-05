import { useLang } from '../LanguageContext'
import { METHODS_DATA } from '../i18n'

export function Methods() {
  const { lang, t } = useLang()
  const METHODS = METHODS_DATA[lang]
  return (
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
  )
}
