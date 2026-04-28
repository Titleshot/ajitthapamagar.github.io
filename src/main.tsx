import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { ProgressProvider } from './context/ProgressContext'
import { I18nProvider } from './context/I18nContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <AuthProvider>
          <ProgressProvider>
            <App />
          </ProgressProvider>
        </AuthProvider>
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>,
)
