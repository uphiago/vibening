import { useLang } from '../LanguageContext'

export function Footer() {
  const { t } = useLang()

  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="footer-brand">vibening</span>
        <span className="footer-tagline">{t.footer.tagline}</span>
      </div>
      <div className="footer-right">
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
