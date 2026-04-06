import { useMemo, useRef, useState } from 'react'
import { useLang } from '../LanguageContext'
import { LAYERS_DATA } from '../i18n'
import { useActivateDetail } from '../hooks/useActivateDetail'

export function LayerModel() {
  const { lang, t } = useLang()
  const LAYERS = LAYERS_DATA[lang]
  const [activeLayerId, setActiveLayerId] = useState(LAYERS[0].id)
  const activeLayer = useMemo(() => {
    const data = LAYERS_DATA[lang]
    return data.find((l) => l.id === activeLayerId) ?? data[0]
  }, [lang, activeLayerId])
  const layerDetailRef = useRef<HTMLDivElement>(null)
  const activateDetail = useActivateDetail()

  return (
    <section id="layer-model" className="reveal">
      <p className="section-label">{t.layerModel.sectionLabel}</p>
      <h2 className="section-title">{t.layerModel.title}</h2>
      <p className="section-description">{t.layerModel.description}</p>
      <div className="layer-layout">
        <div className="layer-stack">
          {LAYERS.map((layer) => (
            <button
              key={layer.id}
              type="button"
              className={`layer-row glass-card ${activeLayer.id === layer.id ? 'active' : ''}`}
              onClick={() => { setActiveLayerId(layer.id); activateDetail(layerDetailRef) }}
            >
              <div className="layer-row-main">
                <span className="layer-title">{layer.label}</span>
                <span className="layer-summary">{layer.summary}</span>
              </div>
              <div className="layer-chips">
                {layer.chips.map((chip) => <span key={chip}>{chip}</span>)}
              </div>
            </button>
          ))}
        </div>
        <div ref={layerDetailRef} tabIndex={-1}>
          <article key={activeLayer.id} className="layer-detail glass-card">
            <span className="detail-kicker">{t.layerModel.kicker}</span>
            <h3>{activeLayer.label}</h3>
            <ul>{activeLayer.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
          </article>
        </div>
      </div>
    </section>
  )
}
