import { useLang } from '../LanguageContext'
import { LESSONS_DATA } from '../i18n'

export function LessonRoadmap() {
  const { lang, t } = useLang()
  const LESSONS = LESSONS_DATA[lang]
  return (
    <section id="lesson-roadmap" className="reveal">
      <p className="section-label">{t.lessonRoadmap.sectionLabel}</p>
      <h2 className="section-title">{t.lessonRoadmap.title}</h2>
      <p className="section-description">{t.lessonRoadmap.description}</p>
      <div className="lessons-grid">
        {LESSONS.map((lesson) => (
          <article key={lesson.id} className="glass-card lesson-card">
            <div className="lesson-header">
              <span className="lesson-number">{lesson.number}</span>
              <span className="lesson-tag">{lesson.tag}</span>
              {lesson.date ? <span className="lesson-date">{lesson.date}</span> : null}
            </div>
            <h3>{lesson.title}</h3>
            <p className="lesson-objective">{lesson.objective}</p>
            <div className="lesson-columns">
              <div>
                <span className="lesson-col-label">{t.lessonRoadmap.topicsLabel}</span>
                <ul>{lesson.topics.map((tp) => <li key={tp}>{tp}</li>)}</ul>
              </div>
              <div>
                <span className="lesson-col-label">{t.lessonRoadmap.outcomesLabel}</span>
                <ul className="outcome-list">{lesson.outcomes.map((o) => <li key={o}>{o}</li>)}</ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
