import { useLang } from '../LanguageContext'
import { COMPARISONS_DATA } from '../i18n'

function riskLabel(r: 'high' | 'medium' | 'ok', t: ReturnType<typeof useLang>['t']) {
  if (r === 'high') return t.vibecodeVsAI.riskHigh
  if (r === 'medium') return t.vibecodeVsAI.riskMedium
  return ''
}

export function VibecodeVsAI() {
  const { lang, t } = useLang()
  const COMPARISONS = COMPARISONS_DATA[lang]
  return (
    <section id="vibecoding-vs-ai" className="reveal">
      <p className="section-label">{t.vibecodeVsAI.sectionLabel}</p>
      <h2 className="section-title">{t.vibecodeVsAI.title}</h2>
      <p className="section-description">{t.vibecodeVsAI.description}</p>
      <div className="comparison-table glass-card">
        <div className="comparison-head">
          <span>{t.vibecodeVsAI.headerAspect}</span>
          <span>{t.vibecodeVsAI.headerVibe}</span>
          <span>{t.vibecodeVsAI.headerAI}</span>
        </div>
        {COMPARISONS.map((row) => (
          <div key={row.aspect} className={`comparison-row risk-${row.risk}`}>
            <span className="comparison-aspect">{row.aspect}</span>
            <span className="comparison-vibe">{row.vibecoding}</span>
            <span className="comparison-ai">
              {row.aiAssisted}
              {row.risk !== 'ok' && (
                <span className={`risk-badge risk-${row.risk}`}>{riskLabel(row.risk, t)}</span>
              )}
            </span>
          </div>
        ))}
      </div>
      <div className="comparison-note glass-card">
        <strong>{t.vibecodeVsAI.ruleTitle}</strong>
        <p>{t.vibecodeVsAI.ruleText}</p>
      </div>
    </section>
  )
}
