# Solar PPA Proposal Report Generator

A browser-based tool for generating professional solar PPA proposal reports. Built for Great Circle Solar, it takes HelioScope simulation data and PPA terms as inputs and produces a printable, multi-page PDF proposal covering generation estimates, savings scenarios, emissions impact, and optional WAIRE compliance points.

## Features

- **Two-tab UI** — Project Inputs form and live Report Preview
- **Calculation engine** — Derives PPA rate, year-1 savings, cumulative savings across multiple utility escalation scenarios, CO₂ offset, and equivalent homes served
- **Monthly distribution profiles** — Five built-in regional presets (CA, AZ, NV, FL, TX) with editable 12-month percentage grids; multiple distributions can be saved and switched
- **Optional modules** — WAIRE compliance point tracking and REC (Renewable Energy Certificate) value modeling, each toggled via feature flags
- **Print-to-PDF** — Full print stylesheet with page breaks, headers, and footers formatted for A4/Letter output
- **Project persistence** — Save, load, and delete multiple projects via `localStorage`; JSON export/import for backup and sharing
- **Layout image upload** — Attach a HelioScope roof layout image (stored as base64) that renders in the printed report

## Tech Stack

| Layer | Library |
|-------|---------|
| UI framework | React 19 |
| Build tool | Vite 8 |
| Charts | Chart.js 4 |
| Linting | ESLint 10 (flat config) |
| Formatting | Prettier 3 |

## Prerequisites

- Node.js 18 or later
- npm 9 or later

## Getting Started

```bash
# Clone
git clone https://github.com/cimino11/solar-report-app.git
cd solar-report-app

# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all source files |
| `npm run format` | Auto-format `src/` with Prettier |

## Project Structure

```
src/
├── constants/          # DEFAULT_PROJECT values, validation rules, chart theme
├── context/            # ProjectContext — React Context + reducer for global state
├── form/               # ~20 form section components and shared input primitives
│   ├── SectionIdentity.jsx
│   ├── SectionSystem.jsx
│   ├── SectionGeneration.jsx
│   ├── SectionPPATerms.jsx
│   ├── SectionRECs.jsx
│   ├── SectionWAIRE.jsx
│   ├── MonthlyPctGrid.jsx
│   └── ...
├── hooks/              # useCalc — memoized wrapper around computeCalc()
├── report/             # Report section components and Chart.js chart wrappers
│   ├── ReportCover.jsx
│   ├── ReportSectionOverview.jsx
│   ├── ReportSectionSavings.jsx
│   ├── CashflowChart.jsx
│   └── ...
├── tabs/               # InputsTab and ReportTab top-level tab views
├── utils/
│   ├── calculations.js # computeCalc() — core solar/PPA math
│   ├── formatters.js   # Currency and number formatting helpers
│   └── storage.js      # localStorage CRUD for project persistence
├── App.jsx             # Tab router
└── main.jsx            # React entry point
```

## How Calculations Work

All core math lives in [`src/utils/calculations.js`](src/utils/calculations.js) inside `computeCalc(project)`. The key steps:

1. **Monthly generation** — Annual MWh (from HelioScope) × monthly percentage distribution
2. **PPA rate** — Year-1 utility rate × (1 − discount rate)
3. **Year-1 savings** — Avoided charges × discount rate
4. **Cumulative savings scenarios** — Annual savings projected over the PPA term for each of three utility escalation rates, factoring in system degradation and PPA escalation
5. **WAIRE points** (optional) — Installation points (MW × pts/MW) + generation points (MWh ÷ MWh/pt), valued at the PPA-discounted point price
6. **REC value** (optional) — Annual MWh × (market price − PPA price)
7. **Emissions** — Annual kWh × grid emissions intensity (lbs CO₂e/MWh), converted to metric tonnes; lifetime total over PPA term

## Deployment

The app is fully client-side with no backend. Deploy the contents of `dist/` to any static host.

```bash
npm run build
# → dist/ is ready to serve
```

**Vite base path** is set to `"./"` in [`vite.config.js`](vite.config.js), which makes all asset references relative. This works out of the box on:

- **GitHub Pages** — push `dist/` to the `gh-pages` branch or configure Pages to serve from `dist/`
- **Netlify / Vercel** — point the build command to `npm run build` and publish directory to `dist`
- **Any CDN / object storage** — upload `dist/` contents and serve `index.html` as the root

## License

Private — Great Circle Solar Management Corp.
