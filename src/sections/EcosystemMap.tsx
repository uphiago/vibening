import { useLang } from '../LanguageContext'
import { ECOSYSTEM_MAP_NODES_DATA } from '../i18n'

export function EcosystemMap() {
  const { lang, t } = useLang()
  const nodes = ECOSYSTEM_MAP_NODES_DATA[lang]
  return (
    <section id="ecosystem-map" className="reveal">
      <p className="section-label">{t.ecosystemMap.sectionLabel}</p>
      <h2 className="section-title">{t.ecosystemMap.title}</h2>
      <p className="section-description">{t.ecosystemMap.description}</p>
      <div className="map-card glass-card">
        <div className="map-legend">
          <span className="legend-item legend-top">{t.ecosystemMap.legendBuild}</span>
          <span className="legend-item legend-mid">{t.ecosystemMap.legendExec}</span>
          <span className="legend-item legend-bot">{t.ecosystemMap.legendOps}</span>
        </div>
        <div className="map-grid">
          {nodes.map((node) => (
            <div key={node.id} className={`node ${node.level}`}>
              <span>{node.label}</span>
              <small>{node.detail}</small>
            </div>
          ))}
        </div>
        <p className="map-caption">{t.ecosystemMap.captionAll}</p>
      </div>
    </section>
  )
}
