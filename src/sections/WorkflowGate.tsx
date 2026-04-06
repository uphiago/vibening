import { useMemo, useRef, useState } from 'react'
import { useLang } from '../LanguageContext'
import { WORKFLOW_PHASES_DATA } from '../i18n'
import { useActivateDetail } from '../hooks/useActivateDetail'

export function WorkflowGate() {
  const { lang, t } = useLang()
  const WORKFLOW_PHASES = WORKFLOW_PHASES_DATA[lang]
  const [activePhaseId, setActivePhaseId] = useState(WORKFLOW_PHASES[0].id)
  const activePhase = useMemo(() => {
    const data = WORKFLOW_PHASES_DATA[lang]
    return data.find((p) => p.id === activePhaseId) ?? data[0]
  }, [lang, activePhaseId])
  const workflowDetailRef = useRef<HTMLDivElement>(null)
  const activateDetail = useActivateDetail()
  const gateSummary = lang === 'pt-BR' ? 'gate obrigatório' : 'required gate'
  const checksSummary = lang === 'pt-BR'
    ? `${activePhase.checks.length} checks obrigatórios`
    : `${activePhase.checks.length} required checks`

  return (
    <section id="workflow-gate" className="reveal">
      <p className="section-label">{t.workflowGate.sectionLabel}</p>
      <h2 className="section-title">{t.workflowGate.title}</h2>
      <p className="section-description">{t.workflowGate.description}</p>
      <div className="flow-layout">
        <div className="flow-left">
          {WORKFLOW_PHASES.map((phase) => (
            <button
              key={phase.id}
              type="button"
              className={`flow-step glass-card ${activePhase.id === phase.id ? 'active' : ''}`}
              onClick={() => { setActivePhaseId(phase.id); activateDetail(workflowDetailRef) }}
            >
              <span className="flow-step-label">{phase.step} · {phase.title}</span>
              <span className="flow-step-summary">{phase.objective}</span>
            </button>
          ))}
        </div>
        <div ref={workflowDetailRef} tabIndex={-1} className="flow-detail-shell">
          <article key={activePhase.id} className="flow-right glass-card">
            <span className="detail-kicker">{t.workflowGate.kicker}</span>
            <h3>{activePhase.step} · {activePhase.title}</h3>
            <div className="flow-phase-meta">
              <span className="flow-meta-chip">{lang === 'pt-BR' ? `fase ${activePhase.step}` : `phase ${activePhase.step}`}</span>
              <span className="flow-meta-chip">{checksSummary}</span>
              <span className="flow-meta-chip flow-meta-chip-gate">{gateSummary}</span>
            </div>
            <p>{activePhase.objective}</p>
            <div className="deck-block">
              <strong>{t.workflowGate.checksLabel}</strong>
              <ul>{activePhase.checks.map((check) => <li key={check}>{check}</li>)}</ul>
            </div>
            <div className="flow-warning">
              <strong>{t.workflowGate.antiPatternLabel}</strong>
              <p>{activePhase.antiPattern}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
