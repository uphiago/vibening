import { useLang } from '../LanguageContext'
import sysmapLogo from '../../logo-sysmap.png'

export function Footer() {
  const { t } = useLang()

  return (
    <footer className="footer">
      <div className="footer-left">
        <a
          className="footer-brand-link"
          href="https://sysmap.com.br"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="SysMap"
        >
          <img src={sysmapLogo} alt="SysMap" className="footer-logo" />
        </a>
        <span className="footer-tagline">{t.footer.tagline}</span>
        <span className="footer-legal">An initiative by SysMap · © 2026 SysMap</span>
      </div>
      <div className="footer-right">
        <a
          className="footer-sysmap-link"
          href="https://sysmap.com.br"
          target="_blank"
          rel="noreferrer noopener"
        >
          Built by sysmap.com.br
        </a>
        <a
          className="footer-stats"
          href="https://cloud.umami.is/share/PLq6jMtAVMv9Kyp6"
          target="_blank"
          rel="noreferrer noopener"
        >
          {t.footer.statsLabel}
        </a>
      </div>
    </footer>
  )
}
