// ── Sentry initialisation ──────────────────────────────────────────────────────
// Must be the first import in main.jsx so Sentry instruments everything before
// React starts. SDK auto-disables when VITE_SENTRY_DSN is absent (dev / staging
// without the env var set) — no conditional guard needed here.
//
// Per sentry-react-sdk skill:
//   • Error Monitoring  — always on
//   • Tracing           — browserTracingIntegration (page loads, navigation, API calls)
//   • Session Replay    — replayIntegration (records sessions around errors)
//   • React 18          — Sentry.ErrorBoundary used in main.jsx (not reactErrorHandler)

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,        // undefined → SDK disabled (graceful no-op)
  environment: import.meta.env.MODE,             // "production" | "development"
  release: import.meta.env.VITE_APP_VERSION,     // injected at build time if set

  sendDefaultPii: true,
  enableLogs:     true,

  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText:   false,   // trading app — don't mask chart/journal content
      blockAllMedia: true,    // block video/audio
    }),
  ],

  // Tracing: 100% in dev, 5% in production (matches backend)
  tracesSampleRate: import.meta.env.MODE === "production" ? 0.05 : 1.0,

  // Propagate trace headers to the Railway backend so errors link to backend traces
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/fortitude-backend-production.*\.up\.railway\.app/,
    /^https:\/\/api\.fortitude\.trade/,
  ],

  // Session Replay: 2% of all sessions, 100% when an error occurs
  replaysSessionSampleRate: 0.02,
  replaysOnErrorSampleRate: 1.0,
});

export { Sentry };
