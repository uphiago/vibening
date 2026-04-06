import { useState } from 'react'

import { useLang } from '../LanguageContext'
import { REVIEW_CHECKLIST_DATA } from '../i18n'

export function ReviewChecklist() {
  const { lang, t } = useLang()
  const REVIEW_CHECKLIST = REVIEW_CHECKLIST_DATA[lang]
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())

  function toggleItem(index: number) {
    setCheckedItems((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <section id="review-checklist" className="reveal">
      <p className="section-label">{t.reviewChecklist.sectionLabel}</p>
      <h2 className="section-title">{t.reviewChecklist.title}</h2>
      <p className="section-description">{t.reviewChecklist.description}</p>
      <div className="checklist-container glass-card">
        <div className="checklist-progress">
          <span>{t.reviewChecklist.progress(checkedItems.size, REVIEW_CHECKLIST.length)}</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(checkedItems.size / REVIEW_CHECKLIST.length) * 100}%` }}
            />
          </div>
        </div>
        {REVIEW_CHECKLIST.map((item, i) => (
          <button
            key={item.item}
            type="button"
            className={`checklist-item ${checkedItems.has(i) ? 'checked' : ''}`}
            onClick={() => toggleItem(i)}
            aria-pressed={checkedItems.has(i)}
          >
            <span className="checklist-check" aria-hidden="true">
              {checkedItems.has(i) ? '✓' : '○'}
            </span>
            <span className="checklist-text">{item.item}</span>
            <span className="checklist-cat">{item.category}</span>
          </button>
        ))}
        {checkedItems.size === REVIEW_CHECKLIST.length && (
          <div className="checklist-done">
            <span>{t.reviewChecklist.allDone}</span>
          </div>
        )}
      </div>
    </section>
  )
}
