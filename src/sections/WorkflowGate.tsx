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
        <div ref={workflowDetailRef} tabIndex={-1}>
          <article key={activePhase.id} className="flow-right glass-card">
            <span className="detail-kicker">{t.workflowGate.kicker}</span>
            <h3>{activePhase.step} · {activePhase.title}</h3>
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
