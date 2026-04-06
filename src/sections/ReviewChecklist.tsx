import { useEffect, useRef, useState } from 'react'
import { useLang } from '../LanguageContext'
import { REVIEW_CHECKLIST_DATA } from '../i18n'

export function ReviewChecklist() {
  const { lang, t } = useLang()
  const REVIEW_CHECKLIST = REVIEW_CHECKLIST_DATA[lang]
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())
  const [checklistAnimated, setChecklistAnimated] = useState(false)
  const checklistSectionRef = useRef<HTMLElement | null>(null)
  const checklistTimersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    if (checklistAnimated) return
    const el = checklistSectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()
        setChecklistAnimated(true)
        checklistTimersRef.current.forEach(clearTimeout)
        checklistTimersRef.current = REVIEW_CHECKLIST_DATA[lang].map((_, i) =>
          setTimeout(() => setCheckedItems((prev) => new Set([...prev, i])), i * 140 + 300)
        )
      },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      checklistTimersRef.current.forEach(clearTimeout)
      checklistTimersRef.current = []
    }
  }, [checklistAnimated, lang])

  return (
    <section id="review-checklist" className="reveal" ref={checklistSectionRef}>
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
          <div
            key={item.item}
            className={`checklist-item ${checkedItems.has(i) ? 'checked' : ''}`}
          >
            <span className="checklist-check" aria-hidden="true">
              {checkedItems.has(i) ? '✓' : '○'}
            </span>
            <span className="checklist-text">{item.item}</span>
            <span className="checklist-cat">{item.category}</span>
          </div>
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
