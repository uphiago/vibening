import { describe, expect, it } from 'vitest'

import {
  ANTI_PATTERNS_DATA,
  COMM_PATTERNS_DATA,
  COMPARISONS_DATA,
  CONTEXT_SIGNALS_DATA,
  DEEP_DIVES_DATA,
  FLOW_DATA,
  LAYERS_DATA,
  LESSONS_DATA,
  METHODS_DATA,
  MULTI_AGENT_ARCHS_DATA,
  MULTI_AGENT_PATTERNS_DATA,
  PD_LAYERS_DATA,
  PRINCIPLES_DATA,
  QUALITY_ROWS_DATA,
  REVIEW_CHECKLIST_DATA,
  SDD_FIELDS_DATA,
  SDD_SPEC_ROWS_DATA,
  STACK_TOOLS_DATA,
  WORKFLOW_PHASES_DATA,
  translations,
} from '../i18n'

const LANGS = ['pt-BR', 'en'] as const

describe('i18n key parity', () => {
  function collectKeys(obj: unknown, prefix = ''): string[] {
    if (typeof obj !== 'object' || obj === null || typeof obj === 'function') return [prefix]
    return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
      collectKeys(v, prefix ? `${prefix}.${k}` : k),
    )
  }

  it('pt-BR and en have the same top-level keys', () => {
    const pt = translations['pt-BR']
    const en = translations['en']
    expect(Object.keys(pt).sort()).toEqual(Object.keys(en).sort())
  })

  it('pt-BR and en have the same nested keys', () => {
    const pt = translations['pt-BR']
    const en = translations['en']
    const ptKeys = collectKeys(pt).sort()
    const enKeys = collectKeys(en).sort()
    expect(ptKeys).toEqual(enKeys)
  })
})

describe('i18n data arrays — both langs present and non-empty', () => {
  const datasets = [
    ['LESSONS_DATA', LESSONS_DATA],
    ['COMPARISONS_DATA', COMPARISONS_DATA],
    ['ANTI_PATTERNS_DATA', ANTI_PATTERNS_DATA],
    ['PRINCIPLES_DATA', PRINCIPLES_DATA],
    ['PD_LAYERS_DATA', PD_LAYERS_DATA],
    ['LAYERS_DATA', LAYERS_DATA],
    ['FLOW_DATA', FLOW_DATA],
    ['METHODS_DATA', METHODS_DATA],
    ['QUALITY_ROWS_DATA', QUALITY_ROWS_DATA],
    ['REVIEW_CHECKLIST_DATA', REVIEW_CHECKLIST_DATA],
    ['DEEP_DIVES_DATA', DEEP_DIVES_DATA],
    ['WORKFLOW_PHASES_DATA', WORKFLOW_PHASES_DATA],
    ['STACK_TOOLS_DATA', STACK_TOOLS_DATA],
    ['SDD_FIELDS_DATA', SDD_FIELDS_DATA],
    ['SDD_SPEC_ROWS_DATA', SDD_SPEC_ROWS_DATA],
    ['MULTI_AGENT_ARCHS_DATA', MULTI_AGENT_ARCHS_DATA],
    ['MULTI_AGENT_PATTERNS_DATA', MULTI_AGENT_PATTERNS_DATA],
    ['COMM_PATTERNS_DATA', COMM_PATTERNS_DATA],
    ['CONTEXT_SIGNALS_DATA', CONTEXT_SIGNALS_DATA],
  ] as const

  for (const [name, dataset] of datasets) {
    it(`${name} — both langs present`, () => {
      for (const lang of LANGS) {
        expect(dataset, `${name}['${lang}'] missing`).toHaveProperty(lang)
      }
    })

    it(`${name} — both langs non-empty`, () => {
      for (const lang of LANGS) {
        expect((dataset as Record<string, unknown[]>)[lang].length, `${name}['${lang}'] empty`).toBeGreaterThan(0)
      }
    })

    it(`${name} — same length for both langs`, () => {
      const ptLen = (dataset as Record<string, unknown[]>)['pt-BR'].length
      const enLen = (dataset as Record<string, unknown[]>)['en'].length
      expect(ptLen, `${name} length mismatch pt-BR=${ptLen} en=${enLen}`).toBe(enLen)
    })
  }
})

describe('navItems — IDs are unique and non-empty strings', () => {
  for (const lang of LANGS) {
    it(`navItems[${lang}] — all IDs unique and non-empty`, () => {
      const items = translations[lang].navItems
      const ids = items.map((i: { id: string }) => i.id)
      expect(new Set(ids).size).toBe(ids.length)
      expect(ids.every((id: string) => id.length > 0)).toBe(true)
    })
  }
})
