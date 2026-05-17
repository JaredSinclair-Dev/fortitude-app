// instrument.js MUST be the first import — initialises Sentry before React
// SDK no-ops gracefully when VITE_SENTRY_DSN is not set
import { Sentry } from './instrument.js'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// ── PostHog (product analytics) ───────────────────────────────────────────────
// Set VITE_POSTHOG_KEY in Vercel env vars to enable. No-ops gracefully if absent.
const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
if (posthogKey) {
  import('posthog-js').then(({ default: posthog }) => {
    posthog.init(posthogKey, {
      api_host:         import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
      capture_pageview: false, // manual — tracked via page state in App
      persistence:      'localStorage',
      autocapture:      false,
      person_profiles:  'identified_only',
    });
    window.__posthog = posthog;
  }).catch(() => {});
}

// React 18 — wrap in Sentry.ErrorBoundary so unhandled render errors are captured
// Falls back to a plain render if Sentry is not configured (DSN absent)
const root = createRoot(document.getElementById('root'))

if (import.meta.env.VITE_SENTRY_DSN) {
  root.render(
    <StrictMode>
      <Sentry.ErrorBoundary
        fallback={
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: '100vh', background: '#080a0f', color: '#7a8fa8',
            fontFamily: 'Inter, sans-serif', fontSize: 14, flexDirection: 'column', gap: 12
          }}>
            <div style={{ color: '#eef2f8', fontSize: 16 }}>Something went wrong.</div>
            <div>Please refresh the page. Our team has been notified.</div>
          </div>
        }
      >
        <App />
      </Sentry.ErrorBoundary>
    </StrictMode>
  )
} else {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
