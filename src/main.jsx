import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// ── Sentry (error monitoring) ─────────────────────────────────────────────────
// Set VITE_SENTRY_DSN in Vercel env vars to enable. No-ops gracefully if absent.
const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
if (sentryDsn) {
  import('@sentry/react').then(Sentry => {
    Sentry.init({
      dsn:                       sentryDsn,
      environment:               import.meta.env.MODE,
      tracesSampleRate:          0.05,
      replaysOnErrorSampleRate:  1.0,
      replaysSessionSampleRate:  0.02,
      integrations:              [Sentry.browserTracingIntegration()],
    });
    window.__sentry = Sentry;
  }).catch(() => {});
}

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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
