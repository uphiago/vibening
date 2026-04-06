import { useMemo, useRef, useState } from 'react'
import { useLang } from '../LanguageContext'
import { FLOW_DATA } from '../i18n'
import { useActivateDetail } from '../hooks/useActivateDetail'

export function ExecutionFlow() {
  const { lang, t } = useLang()
  const FLOW = FLOW_DATA[lang]
  const [activeStepId, setActiveStepId] = useState(FLOW[0].id)
  const activeStep = useMemo(() => {
    const data = FLOW_DATA[lang]
    return data.find((s) => s.id === activeStepId) ?? data[0]
  }, [lang, activeStepId])
  const execFlowDetailRef = useRef<HTMLDivElement>(null)
  const activateDetail = useActivateDetail()

  return (
    <section id="execution-flow" className="reveal">
      <p className="section-label">{t.executionFlow.sectionLabel}</p>
      <h2 className="section-title">{t.executionFlow.title}</h2>
      <p className="section-description">{t.executionFlow.description}</p>
      <div className="flow-layout">
        <div className="flow-left">
          {FLOW.map((step) => (
            <button
              key={step.id}
              type="button"
              className={`flow-step glass-card ${activeStep.id === step.id ? 'active' : ''}`}
              onClick={() => { setActiveStepId(step.id); activateDetail(execFlowDetailRef) }}
            >
              <span className="flow-step-label">{step.label}</span>
              <span className="flow-step-summary">{step.summary}</span>
            </button>
          ))}
        </div>
        <div ref={execFlowDetailRef} tabIndex={-1}>
          <article key={activeStep.id} className="flow-right glass-card">
            <span className="detail-kicker">{t.executionFlow.kicker}</span>
            <h3>{activeStep.label}</h3>
            <p>{activeStep.detail}</p>
            <div className="flow-payload">{activeStep.payload}</div>
          </article>
        </div>
      </div>
    </section>
  )
}
