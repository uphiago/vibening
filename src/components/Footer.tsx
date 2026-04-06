import { useLang } from '../LanguageContext'

export function Footer() {
  const { t } = useLang()

  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="footer-brand">vibening</span>
        <span className="footer-tagline">{t.footer.tagline}</span>
      </div>
    </footer>
  )
}
