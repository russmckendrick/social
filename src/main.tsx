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
        <div className="flex min-h-screen items-center justify-center bg-[var(--dashboard-bg)] px-6 text-center">
          <div className="glass-card max-w-md rounded-xl border border-[var(--dashboard-border)] px-6 py-5 text-sm text-[var(--dashboard-subtle)]">
            <p className="font-semibold text-[var(--dashboard-fg)]">Something went sideways.</p>
            <p className="mt-2">Try refreshing — if it persists the deploy may be mid-flight.</p>
          </div>
        </div>
      }
    >
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
