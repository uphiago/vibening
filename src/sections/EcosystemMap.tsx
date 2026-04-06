import { useState } from 'react'
import { useLang } from '../LanguageContext'

export function EcosystemMap() {
  const { t } = useLang()
  const [activeMapView, setActiveMapView] = useState<'all' | 'build' | 'ops'>('all')
  return (
    <section id="ecosystem-map" className="reveal">
      <p className="section-label">{t.ecosystemMap.sectionLabel}</p>
      <h2 className="section-title">{t.ecosystemMap.title}</h2>
      <p className="section-description">{t.ecosystemMap.description}</p>
      <div className="map-controls" role="group" aria-label={t.ecosystemMap.filterGroupLabel}>
        <button type="button" className={activeMapView === 'all' ? 'active' : ''} aria-pressed={activeMapView === 'all'} onClick={() => setActiveMapView('all')}>{t.ecosystemMap.filterAll}</button>
        <button type="button" className={activeMapView === 'build' ? 'active' : ''} aria-pressed={activeMapView === 'build'} onClick={() => setActiveMapView('build')}>{t.ecosystemMap.filterBuild}</button>
        <button type="button" className={activeMapView === 'ops' ? 'active' : ''} aria-pressed={activeMapView === 'ops'} onClick={() => setActiveMapView('ops')}>{t.ecosystemMap.filterOps}</button>
      </div>
      <div className="map-card glass-card">
        <div className="map-legend">
          <span className="legend-item legend-top">{t.ecosystemMap.legendBuild}</span>
          <span className="legend-item legend-mid">{t.ecosystemMap.legendExec}</span>
          <span className="legend-item legend-bot">{t.ecosystemMap.legendOps}</span>
        </div>
        <div className={`map-grid view-${activeMapView}`}>
          <div className="node top"><span>rules</span><small>CLAUDE.md</small></div>
          <div className="node top"><span>skills</span><small>SKILL.md</small></div>
          <div className="node top"><span>mcp</span><small>tool access</small></div>
          <div className="node top"><span>hooks</span><small>loop control</small></div>
          <div className="node mid"><span>research</span><small>map state</small></div>
          <div className="node mid"><span>plan</span><small>define steps</small></div>
          <div className="node mid"><span>execute</span><small>apply changes</small></div>
          <div className="node mid"><span>verify</span><small>validate</small></div>
          <div className="node bot"><span>review</span><small>human eye</small></div>
          <div className="node bot"><span>approval</span><small>gate</small></div>
          <div className="node bot"><span>release</span><small>controlled</small></div>
        </div>
        <p className="map-caption">
          {activeMapView === 'all' && t.ecosystemMap.captionAll}
          {activeMapView === 'build' && t.ecosystemMap.captionBuild}
          {activeMapView === 'ops' && t.ecosystemMap.captionOps}
        </p>
      </div>
    </section>
  )
}
