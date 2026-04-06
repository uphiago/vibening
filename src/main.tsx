import { StrictMode } from 'react'

import { Analytics } from '@vercel/analytics/react'

import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { LanguageProvider } from './LanguageContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
      <Analytics />
    </LanguageProvider>
  </StrictMode>,
)
