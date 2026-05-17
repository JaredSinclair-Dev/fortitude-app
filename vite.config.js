import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sentryVitePlugin } from '@sentry/vite-plugin'

// Sentry source map upload only runs when auth token is present (CI/Vercel builds)
// Set SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT in Vercel environment variables
const sentryPlugin = process.env.SENTRY_AUTH_TOKEN
  ? sentryVitePlugin({
      org:       process.env.SENTRY_ORG,
      project:   process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
    })
  : null

export default defineConfig({
  plugins: [react(), sentryPlugin].filter(Boolean),
  root: '.',
  base: '/',
  build: {
    outDir:    'dist',
    emptyOutDir: true,
    sourcemap: 'hidden', // required for Sentry source map upload
  },
  server: {
    port: 3000,
    open: true,
  },
})
