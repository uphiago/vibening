import { useLang } from '../LanguageContext'
import { STACK_TOOLS_DATA } from '../i18n'

export function StackCuration() {
  const { lang, t } = useLang()
  const STACK_TOOLS = STACK_TOOLS_DATA[lang]
  return (
    <section id="stack-curation" className="reveal">
      <p className="section-label">{t.stackCuration.sectionLabel}</p>
      <h2 className="section-title">{t.stackCuration.title}</h2>
      <p className="section-description">{t.stackCuration.description}</p>
      <div className="stack-grid">
        {(['A', 'B', 'C'] as const).map((priority) => {
          const tools = STACK_TOOLS.filter((tool) => tool.priority === priority)
          const labels: Record<string, string> = {
            A: t.stackCuration.priorityA,
            B: t.stackCuration.priorityB,
            C: t.stackCuration.priorityC,
          }
          return (
            <div key={priority} className={`stack-group glass-card priority-${priority}`}>
              <div className="stack-group-header">
                <span className={`priority-badge priority-${priority}`}>
                  {t.stackCuration.priorityLabel} {priority}
                </span>
                <span className="priority-label">{labels[priority]}</span>
              </div>
              <div className="stack-list">
                {tools.map((tool) => (
                  <div key={tool.name} className="stack-item">
                    <div className="stack-item-main">
                      <span className="stack-name">{tool.name}</span>
                      <span className="stack-type">{tool.type}</span>
                    </div>
                    <span className="stack-why">{tool.why}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
