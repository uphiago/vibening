import { useEffect, useRef } from 'react'
import { useLang } from '../LanguageContext'

interface NavProps {
  activeSection: string
  mobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void
}

export function Nav({ activeSection, mobileNavOpen, setMobileNavOpen }: NavProps) {
  const { lang, setLang, t } = useLang()
  const firstLinkRef  = useRef<HTMLAnchorElement>(null)
  const openBtnRef    = useRef<HTMLButtonElement>(null)
  const prevOpenRef   = useRef(false)

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
          'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"])'
        )
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last  = focusable[focusable.length - 1]

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
        <a href="#hero" className="brand">vibening</a>
        <div className="top-nav-actions">
          <button
            type="button"
            className="lang-toggle"
            onClick={() => setLang(lang === 'pt-BR' ? 'en' : 'pt-BR')}
            aria-label={t.nav.langToggle}
          >
            {lang === 'pt-BR' ? 'EN' : 'PT'}
          </button>
          <button
            ref={openBtnRef}
            type="button"
            className="mobile-nav-btn"
            aria-label={t.nav.openNav}
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(true)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {mobileNavOpen && (
        <div
          className="mobile-nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.sectionNavLabel}
        >
          <div className="mobile-nav-backdrop" onClick={() => setMobileNavOpen(false)} />
          <nav className="mobile-nav-sheet">
            <div className="mobile-nav-header">
              <span className="brand">vibening</span>
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
                    onClick={() => setMobileNavOpen(false)}
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
            className={`side-link${activeSection === item.id ? ' active' : ''}`}
            aria-label={item.label}
            aria-current={activeSection === item.id ? 'page' : undefined}
          >
            <span className="side-link-bar" aria-hidden="true" />
            <span className="side-link-label">{item.label}</span>
          </a>
        ))}
      </aside>
    </>
  )
}
