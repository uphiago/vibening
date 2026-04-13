import { useEffect, useRef } from 'react'

import { useLang } from '../LanguageContext'
import sysmapLogo from '../../logo-sysmap.png'

const MAIN_SECTION_IDS = new Set([
  'hero',
  'lesson-roadmap',
  'sdd',
  'layer-model',
  'workflow-gate',
  'multi-agent',
  'deep-dive',
  'stack-curation',
  'examples',
  'refs',
])

interface NavProps {
  activeSection: string
  mobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void
  onNavigate: (id: string, options?: { smooth?: boolean; pushHistory?: boolean }) => void
}

export function Nav({ activeSection, mobileNavOpen, setMobileNavOpen, onNavigate }: NavProps) {
  const { lang, setLang, t } = useLang()
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const openBtnRef = useRef<HTMLButtonElement>(null)
  const prevOpenRef = useRef(false)

  // Return focus to the trigger button when the dialog closes
  useEffect(() => {
    if (prevOpenRef.current && !mobileNavOpen) {
      openBtnRef.current?.focus()
    }
    prevOpenRef.current = mobileNavOpen
  }, [mobileNavOpen])

  // Move focus into dialog on open; Escape closes; Tab is trapped inside
  useEffect(() => {
    if (!mobileNavOpen) return
    firstLinkRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileNavOpen(false)
        return
      }

      if (e.key !== 'Tab') return

      const dialog = document.querySelector<HTMLElement>('.mobile-nav-sheet')
      if (!dialog) return
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"])',
        ),
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileNavOpen, setMobileNavOpen])

  return (
    <>
      <nav className="top-nav" aria-label={t.nav.navLabel}>
        <a
          href="#hero"
          className="brand"
          onClick={(event) => {
            if (event.button !== 0) return
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
            event.preventDefault()
            onNavigate('hero', { smooth: true, pushHistory: true })
          }}
        >
          <img src={sysmapLogo} alt="SysMap" className="brand-logo" />
        </a>
        <div className="top-nav-actions">
          <button
            type="button"
            className="lang-toggle"
            onClick={() => setLang(lang === 'pt-BR' ? 'en' : 'pt-BR')}
            title={t.nav.langToggle}
          >
            <span className="lang-toggle-label" aria-hidden="true">
              {t.nav.languageLabel}:
            </span>
            <span className={`lang-code${lang === 'pt-BR' ? ' active' : ''}`}>PT</span>
            <span className="lang-separator">/</span>
            <span className={`lang-code${lang === 'en' ? ' active' : ''}`}>EN</span>
            <span className="sr-only">. {t.nav.langToggle}</span>
          </button>
          <button
            ref={openBtnRef}
            type="button"
            className="mobile-nav-btn"
            aria-label={t.nav.openNav}
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {mobileNavOpen && (
        <div className="mobile-nav-overlay" role="dialog" aria-modal="true" aria-label={t.nav.sectionNavLabel}>
          <div className="mobile-nav-backdrop" onClick={() => setMobileNavOpen(false)} />
          <nav className="mobile-nav-sheet">
            <div className="mobile-nav-header">
              <span className="brand">
                <img src={sysmapLogo} alt="SysMap" className="brand-logo" />
              </span>
              <button
                type="button"
                className="mobile-nav-close"
                aria-label={t.nav.closeNav}
                onClick={() => setMobileNavOpen(false)}
              >
                ✕
              </button>
            </div>
            <ul className="mobile-nav-list">
              {t.navItems.map((item, i) => (
                <li key={item.id}>
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={`#${item.id}`}
                    className={`mobile-nav-link${activeSection === item.id ? ' active' : ''}`}
                    onClick={(event) => {
                      if (event.button !== 0) return
                      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
                      event.preventDefault()
                      onNavigate(item.id, { smooth: true, pushHistory: true })
                      setMobileNavOpen(false)
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      <aside className="side-nav" aria-label={t.nav.sectionNavLabel}>
        {t.navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`side-link ${MAIN_SECTION_IDS.has(item.id) ? 'side-link-main' : 'side-link-sub'}${activeSection === item.id ? ' active' : ''}`}
            aria-label={item.label}
            aria-current={activeSection === item.id ? 'page' : undefined}
            onClick={(event) => {
              if (event.button !== 0) return
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
              event.preventDefault()
              onNavigate(item.id, { smooth: true, pushHistory: true })
            }}
          >
            <span className="side-link-bar" aria-hidden="true" />
            <span className="side-link-label">{item.label}</span>
          </a>
        ))}
      </aside>
    </>
  )
}
