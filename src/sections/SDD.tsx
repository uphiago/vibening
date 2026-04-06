import { useMemo, useRef, useState } from 'react'

import { useLang } from '../LanguageContext'
import { CopyButton } from '../components/CopyButton'
import { useActivateDetail } from '../hooks/useActivateDetail'
import { SDD_FIELDS_DATA, SDD_SPEC_ROWS_DATA } from '../i18n'

const SDD_EXAMPLE_FULL_PT = `## 1. Contexto
- problema: API /users/search retorna timeout para queries acima de 3 chars
- público afetado: clientes Enterprise (plano Pro+)
- restrições: sem schema changes em produção

## 2. Objetivo
Reduzir p95 de /users/search de 2400ms para menos de 300ms sem alteração de schema.

## 3. Escopo
- entra: UserSearchRepository, query builder, índice existente
- não entra: camada de autenticação, paginação, outros endpoints

## 4. Critérios de validação
- p95 < 300ms em load test com 50 req/s por 60s
- zero timeouts em queries de até 50 caracteres
- testes unitários existentes continuam passando sem modificação

## 5. Plano (RPEV)
- research: profiling da query atual + explain plan do índice composto
- plan: reescrever query com índice composto + limit antecipado
- execute: implementar em UserSearchRepository.ts
- verify: rodar k6 load test + suite de testes + revisar diff

## 6. Evidências
- p95 = 187ms (meta: < 300ms) : critério 1 atendido
- zero timeouts registrados nos 60s de carga : critério 2 atendido
- 42/42 testes passando : critério 3 atendido
- PR #42 aprovado por revisor humano`

const SDD_EXAMPLE_FULL_EN = `## 1. Context
- problem: API /users/search returns timeout for queries above 3 chars
- affected users: Enterprise clients (Pro+ plan)
- constraints: no schema changes in production

## 2. Objective
Reduce p95 of /users/search from 2400ms to under 300ms without schema changes.

## 3. Scope
- in: UserSearchRepository, query builder, existing index
- out: auth layer, pagination, other endpoints

## 4. Validation criteria
- p95 < 300ms in load test with 50 req/s for 60s
- zero timeouts for queries up to 50 characters
- existing unit tests continue passing without modification

## 5. Plan (RPEV)
- research: profiling of current query + explain plan of composite index
- plan: rewrite query with composite index + early limit
- execute: implement in UserSearchRepository.ts
- verify: run k6 load test + test suite + review diff

## 6. Evidence
- p95 = 187ms (target: < 300ms) : criterion 1 met
- zero timeouts recorded during 60s load : criterion 2 met
- 42/42 tests passing : criterion 3 met
- PR #42 approved by human reviewer`

const SDD_TEMPLATE_PT = `## 1. Contexto
- problema: ...
- público afetado: ...
- restrições técnicas: ...

## 2. Objetivo
- resultado esperado em uma frase: ...

## 3. Escopo
- entra: ...
- não entra: ...

## 4. Critérios de validação
- critério 1: ...
- critério 2: ...
- critério 3: ...

## 5. Plano (RPEV)
- research: ...
- plan: ...
- execute: ...
- verify: ...

## 6. Evidências
- critérios atendidos: ...
- exemplo demonstrado: ...
- links de apoio: ...`

const SDD_TEMPLATE_EN = `## 1. Context
- problem: ...
- affected users: ...
- technical constraints: ...

## 2. Objective
- expected result in one sentence: ...

## 3. Scope
- in: ...
- out: ...

## 4. Validation criteria
- criterion 1: ...
- criterion 2: ...
- criterion 3: ...

## 5. Plan (RPEV)
- research: ...
- plan: ...
- execute: ...
- verify: ...

## 6. Evidence
- criteria met: ...
- example demonstrated: ...
- supporting links: ...`

export function SDD() {
  const { lang, t } = useLang()
  const SDD_FIELDS = SDD_FIELDS_DATA[lang]
  const SDD_SPEC_ROWS = SDD_SPEC_ROWS_DATA[lang]
  const [activeSddFieldId, setActiveSddFieldId] = useState(SDD_FIELDS[0].id)
  const activeSddField = useMemo(() => {
    const data = SDD_FIELDS_DATA[lang]
    return data.find((f) => f.id === activeSddFieldId) ?? data[0]
  }, [lang, activeSddFieldId])
  const sddDetailRef = useRef<HTMLDivElement>(null)
  const activateDetail = useActivateDetail()

  const SDD_EXAMPLE_FULL = lang === 'pt-BR' ? SDD_EXAMPLE_FULL_PT : SDD_EXAMPLE_FULL_EN
  const SDD_TEMPLATE = lang === 'pt-BR' ? SDD_TEMPLATE_PT : SDD_TEMPLATE_EN

  return (
    <section id="sdd" className="reveal">
      <p className="section-label">{t.sdd.sectionLabel}</p>
      <h2 className="section-title">{t.sdd.title}</h2>
      <p className="section-description">{t.sdd.description}</p>

      <div className="sdd-why-grid">
        <div className="glass-card sdd-why-card">
          <span className="sdd-why-icon">01</span>
          <h3>{t.sdd.why1Title}</h3>
          <p>{t.sdd.why1Text}</p>
        </div>
        <div className="glass-card sdd-why-card">
          <span className="sdd-why-icon">02</span>
          <h3>{t.sdd.why2Title}</h3>
          <p>{t.sdd.why2Text}</p>
        </div>
        <div className="glass-card sdd-why-card">
          <span className="sdd-why-icon">03</span>
          <h3>{t.sdd.why3Title}</h3>
          <p>{t.sdd.why3Text}</p>
        </div>
      </div>

      <div className="sdd-layout">
        <div className="sdd-fields-list">
          {SDD_FIELDS.map((field) => (
            <button
              key={field.id}
              type="button"
              className={`sdd-field-btn glass-card ${activeSddField.id === field.id ? 'active' : ''}`}
              onClick={() => {
                setActiveSddFieldId(field.id)
                activateDetail(sddDetailRef)
              }}
            >
              <span className="sdd-field-number">{field.number}</span>
              <span className="sdd-field-name">{field.name}</span>
            </button>
          ))}
        </div>
        <div ref={sddDetailRef} tabIndex={-1}>
          <article key={activeSddField.id} className="sdd-detail glass-card">
            <div className="sdd-detail-header">
              <span className="detail-kicker">{t.sdd.fieldKicker(activeSddField.number, SDD_FIELDS.length)}</span>
              <span className="sdd-progress-dots">
                {SDD_FIELDS.map((f) => (
                  <span key={f.id} className={`sdd-dot ${f.id === activeSddField.id ? 'active' : ''}`} />
                ))}
              </span>
            </div>
            <h3>{activeSddField.name}</h3>
            <p className="sdd-description">{activeSddField.description}</p>
            <p className="sdd-detail-text">{activeSddField.detail}</p>
            <div className="deck-block sdd-example-block">
              <strong>{t.sdd.exampleLabel}</strong>
              <p>{activeSddField.example}</p>
            </div>
            <div className="flow-warning sdd-antipattern-block">
              <strong>{t.sdd.antiPatternLabel}</strong>
              <p>{activeSddField.antiPattern}</p>
            </div>
          </article>
        </div>
      </div>

      <div className="sdd-quality glass-card">
        <div className="sdd-quality-header">
          <span className="section-label" style={{ margin: 0 }}>
            {t.sdd.specWeakVsStrong}
          </span>
        </div>
        <div className="sdd-quality-head">
          <span>{t.sdd.headerField}</span>
          <span className="sdd-weak-label">{t.sdd.headerWeak}</span>
          <span className="sdd-strong-label">{t.sdd.headerStrong}</span>
        </div>
        {SDD_SPEC_ROWS.map((row) => (
          <div key={row.field} className="sdd-quality-row">
            <span className="sdd-quality-field" data-col={t.sdd.headerField}>
              {row.field}
            </span>
            <span className="sdd-quality-weak" data-col={t.sdd.headerWeak}>
              {row.weak}
            </span>
            <span className="sdd-quality-strong" data-col={t.sdd.headerStrong}>
              {row.strong}
            </span>
          </div>
        ))}
      </div>

      <div className="sdd-example-full glass-card">
        <div className="sdd-template-header">
          <strong>{t.sdd.exampleFullTitle}</strong>
          <span className="detail-kicker">{t.sdd.exampleFullKicker}</span>
        </div>
        <div className="code-block-wrap">
          <CopyButton text={SDD_EXAMPLE_FULL} />
          <pre>
            <code>{SDD_EXAMPLE_FULL}</code>
          </pre>
        </div>
      </div>

      <div className="sdd-template glass-card">
        <div className="sdd-template-header">
          <strong>{t.sdd.templateTitle}</strong>
          <span className="detail-kicker">{t.sdd.templateKicker}</span>
        </div>
        <div className="code-block-wrap">
          <CopyButton text={SDD_TEMPLATE} />
          <pre>
            <code>{SDD_TEMPLATE}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}
