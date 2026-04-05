import { useLang } from '../LanguageContext'
import { PD_LAYERS_DATA } from '../i18n'

export function ProgressiveDisclosure() {
  const { lang, t } = useLang()
  const PD_LAYERS = PD_LAYERS_DATA[lang]
  return (
    <section id="progressive-disclosure" className="reveal">
      <p className="section-label">{t.progressiveDisclosure.sectionLabel}</p>
      <h2 className="section-title">{t.progressiveDisclosure.title}</h2>
      <p className="section-description">{t.progressiveDisclosure.description}</p>
      <div className="pd-grid">
        {PD_LAYERS.map((layer, i) => (
          <article key={layer.id} className="glass-card pd-card">
            <div className="pd-header">
              <span className="pd-number">L{i + 1}</span>
              <span className="pd-tokens">{layer.tokens}</span>
            </div>
            <h3>{layer.name}</h3>
            <p>{layer.objective}</p>
            <div className="deck-block">
              <strong>{t.progressiveDisclosure.loadWhenLabel}</strong>
              <p>{layer.loadWhen}</p>
            </div>
            <ul>{layer.includes.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
      <article className="glass-card checklist-card">
        <h3>{t.progressiveDisclosure.workflowTitle}</h3>
        <pre><code>{t.progressiveDisclosure.workflowCode}</code></pre>
        <p>{t.progressiveDisclosure.workflowNote}</p>
      </article>
    </section>
  )
}
