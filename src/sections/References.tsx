import { useLang } from '../LanguageContext'

export function References() {
  const { t } = useLang()
  return (
    <section id="refs" className="reveal">
      <p className="section-label">{t.refs.sectionLabel}</p>
      <h2 className="section-title">{t.refs.title}</h2>
      <p className="section-description">{t.refs.description}</p>
      <div className="refs-categories">
        <div>
          <h3 className="refs-group-label">{t.refs.groupSkills}</h3>
          <div className="references-grid">
            <a className="glass-card ref-link" href="https://agentskills.io" target="_blank" rel="noreferrer">Agent Skills Standard</a>
            <a className="glass-card ref-link" href="https://github.com/anthropics/skills" target="_blank" rel="noreferrer">anthropics/skills</a>
            <a className="glass-card ref-link" href="https://github.com/vercel-labs/skills" target="_blank" rel="noreferrer">vercel-labs/skills</a>
            <a className="glass-card ref-link" href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank" rel="noreferrer">Building Effective Agents</a>
          </div>
        </div>
        <div>
          <h3 className="refs-group-label">{t.refs.groupMcp}</h3>
          <div className="references-grid">
            <a className="glass-card ref-link" href="https://modelcontextprotocol.io/docs/getting-started/intro" target="_blank" rel="noreferrer">MCP Docs</a>
            <a className="glass-card ref-link" href="https://cursor.com/docs/mcp" target="_blank" rel="noreferrer">Cursor MCP Docs</a>
            <a className="glass-card ref-link" href="https://context7.com" target="_blank" rel="noreferrer">Context7</a>
          </div>
        </div>
        <div>
          <h3 className="refs-group-label">{t.refs.groupPrompt}</h3>
          <div className="references-grid">
            <a className="glass-card ref-link" href="https://platform.openai.com/docs/guides/prompt-engineering" target="_blank" rel="noreferrer">Prompt Engineering</a>
            <a className="glass-card ref-link" href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/long-context-tips" target="_blank" rel="noreferrer">Long Context Tips</a>
            <a className="glass-card ref-link" href="https://arxiv.org/abs/2307.03172" target="_blank" rel="noreferrer">Lost in the Middle (arXiv)</a>
            <a className="glass-card ref-link" href="https://arxiv.org/abs/2210.03629" target="_blank" rel="noreferrer">ReAct (arXiv)</a>
          </div>
        </div>
      </div>
    </section>
  )
}
