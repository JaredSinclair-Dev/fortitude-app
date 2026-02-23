# Fortitude — Market Intelligence Platform

Professional trading performance environment. Risk discipline and probabilistic thinking.

---

## Quick Start

### Prerequisites
- Node.js 18+ ([download](https://nodejs.org/))
- npm 9+ (comes with Node.js)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

The app will open automatically at **http://localhost:3000**

---

## Project Structure

```
fortitude/
├── public/
│   └── favicon.svg          # Brand favicon
├── src/
│   ├── App.jsx              # Full application (all components)
│   └── main.jsx             # React entry point
├── index.html               # HTML shell
├── package.json             # Dependencies & scripts
├── vite.config.js           # Vite configuration
└── .gitignore
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Build for production (outputs to `/dist`) |
| `npm run preview` | Preview production build locally |

---

## Demo Credentials

The app uses a simulated auth flow — any email/password combination will log you in.

### Tier Simulator

Once logged in, navigate to **Account → Subscription tab** to switch between membership tiers and preview the access control matrix in real time:

| Tier | Features |
|------|----------|
| Free | Education only |
| Fortitude ($45/mo) | + Market Intelligence, Community |
| Fortitude Pro ($65/mo) | + Journal, Coach, Behavioral & Cognitive engines |
| Full Access ($95/mo) | All features, unlimited AI |
| Lifetime ($3,995) | All features, permanent |

You can also toggle **Active / Lapsed / Cancelled** subscription states to preview the data-preservation and gate-wall behaviour.

---

## Key Features

- **Market Intelligence** — AI chart analysis with structured FMF framework output
- **Performance Journal** — Trade logging, equity curve, behavioral pattern detection  
- **Behavioral Engine** — PDI scoring, revenge trading detection, risk consistency
- **Cognitive Intelligence** — Bias detection, decision fatigue index, pre-commitment system
- **Performance Coach** — Adaptive AI coaching with session modes (Claude API ready)
- **Trading Sessions Map** — Live world map showing Asia/London/NY sessions in real time
- **TradingView News Feed** — Live market news widget on dashboard
- **Subscription Gating** — Full access control matrix enforced client-side (server enforcement architecture documented in Admin panel)

---

## Production Notes

This build is a **client-side prototype** suitable for:
- UI/UX testing and stakeholder demos
- Feature validation
- Frontend architecture review

For production deployment you will need to add:
- **Backend API** (Auth Service, Journal Engine, AI Engine, Billing Service)
- **Stripe integration** for subscription processing
- **Anthropic API key** for Performance Coach (replace the mock in the Coach component)
- **Database** (schema documented in the Admin → Database Schema Reference panel)
- Environment variables via `.env` file

---

## Tech Stack

- **Framework:** React 18 + Vite 5
- **Styling:** Inline styles with design token system (no CSS framework dependency)
- **Fonts:** Inter (UI), JetBrains Mono (data), Counter-Strike (brand headings)
- **Charts:** Custom SVG components
- **External widgets:** TradingView Timeline widget
- **AI:** Anthropic Claude API (mock in prototype, live-ready prompt architecture)
