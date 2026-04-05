import { useLang } from '../LanguageContext'
import { QUALITY_ROWS_DATA } from '../i18n'

export function QualityMatrix() {
  const { lang, t } = useLang()
  const QUALITY_ROWS = QUALITY_ROWS_DATA[lang]
  return (
    <section id="quality-matrix" className="reveal">
      <p className="section-label">{t.qualityMatrix.sectionLabel}</p>
      <h2 className="section-title">{t.qualityMatrix.title}</h2>
      <p className="section-description">{t.qualityMatrix.description}</p>
      <div className="matrix-card glass-card">
        <div className="matrix-head">
          <span>{t.qualityMatrix.headerGate}</span>
          <span>{t.qualityMatrix.headerRule}</span>
          <span>{t.qualityMatrix.headerVerify}</span>
        </div>
        {QUALITY_ROWS.map((row) => (
          <div key={row.gate} className="matrix-row">
            <span>{row.gate}</span>
            <span>{row.rule}</span>
            <span>{row.verify}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
