import { describe, it, expect } from 'vitest'
import { translations } from '../i18n'

const pt = translations['pt-BR']
const en = translations['en']

describe('i18n key parity', () => {
  function collectKeys(obj: unknown, prefix = ''): string[] {
    if (typeof obj !== 'object' || obj === null || typeof obj === 'function') return [prefix]
    return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
      collectKeys(v, prefix ? `${prefix}.${k}` : k)
    )
  }

  it('pt-BR and en have the same top-level keys', () => {
    expect(Object.keys(pt).sort()).toEqual(Object.keys(en).sort())
  })

  it('pt-BR and en have the same nested keys', () => {
    const ptKeys = collectKeys(pt).sort()
    const enKeys = collectKeys(en).sort()
    expect(ptKeys).toEqual(enKeys)
  })
})
