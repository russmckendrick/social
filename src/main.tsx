import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      label="root"
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 text-center">
          <div className="tile max-w-md px-6 py-5 text-sm text-[var(--muted)]">
            <p className="font-semibold text-[var(--fg)]">Something went sideways.</p>
            <p className="mt-2">Try refreshing — if it persists the deploy may be mid-flight.</p>
          </div>
        </div>
      }
    >
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
