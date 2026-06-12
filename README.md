# Solar PPA Proposal Report Generator

A browser-based tool for generating professional solar feasibility and PPA proposal reports. Built for Great Circle Solar, it takes HelioScope simulation data, system sizing, and PPA terms as inputs and produces a printable, multi-page PDF proposal covering generation estimates, savings scenarios, emissions impact, feasibility cost estimates, and optional WAIRE compliance points.

**Live deployment:** [dws-solar-report.vercel.app](https://dws-solar-report.vercel.app/) (auto-deploys from `main`).

## Features

- **Two-tab UI** — Project Inputs form and live Report Preview
- **Calculation engine** — Derives PPA rate, year-1 savings, cumulative savings across multiple utility escalation scenarios, degradation-adjusted lifetime CO₂e offset, specific yield (Wh/Wdc), and equivalent homes served
- **Rooftop / carport split** — DC and AC capacity and roof area tracked separately per mounting type, with computed totals
- **Monthly distribution profiles** — Five built-in regional presets (CA, AZ, NV, FL, TX) with editable 12-month percentage grids; rendered as a colour-graded production bar chart with % of annual labels
- **eGRID emissions presets** — One-click state presets (CAMX, FRCC, SRVC, RFCW, ERCT, AZNM) that auto-fill grid emissions intensity, region, source citation, and disclaimer from EPA eGRID data
- **Optional modules** — WAIRE compliance point tracking and REC value modeling, each toggled via feature flags; per-section report visibility chips throughout the form
- **Feasibility cost estimates** — Editable indicative quote ranges (electrical, structural, geotechnical, utility interconnection) with stage-gating guidance; geotechnical row auto-hides when no carport
- **Print-to-PDF** — Letter-format print stylesheet with controlled page breaks; the saved PDF filename defaults to the project name
- **Project persistence** — Save, load, and delete multiple projects via `localStorage` with versioned schema migrations; JSON export/import for backup and sharing
- **Layout image upload** — Attach a HelioScope roof layout image (stored as base64) that renders in the printed report with a simulation-source caption and site/solar-resource table

## Tech Stack

| Layer | Library |
|-------|---------|
| UI framework | React 19 |
| Build tool | Vite 8 |
| Charts | Chart.js 4 + chartjs-plugin-datalabels |
| Testing | Vitest 4 |
| Linting | ESLint 10 (flat config) |
| Formatting | Prettier 3 |

## Prerequisites

- Node.js 18 or later
- npm 9 or later

## Getting Started

```bash
# Clone
git clone https://github.com/KavenTW/dws-solar-report.git
cd dws-solar-report

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
| `npm test` | Run the Vitest unit test suite |
| `npm run lint` | Run ESLint across all source files |
| `npm run format` | Auto-format `src/` with Prettier |

## Project Structure

```
src/
├── constants/          # DEFAULT_PROJECT values, validation rules, chart theme
├── context/            # ProjectContext (global reducer) + SectionCollapseContext
├── form/               # Form section components and shared input primitives
│   ├── SectionIdentity.jsx
│   ├── SectionSystem.jsx       # Rooftop/carport DC + AC with computed totals
│   ├── SectionGeneration.jsx
│   ├── SectionPPATerms.jsx
│   ├── SectionEmissions.jsx    # Includes eGRID state presets
│   ├── SectionFeasibility.jsx  # Feasibility cost estimate ranges
│   ├── MonthlyPctGrid.jsx
│   └── ...
├── hooks/              # useCalc — memoized wrapper around computeCalc()
├── report/             # Report section components and Chart.js chart wrappers
│   ├── ReportCover.jsx
│   ├── ReportSectionOverview.jsx   # KPI cards (system size, yield, CO₂e, footprint)
│   ├── ReportSectionLayout.jsx     # Array image + site/solar-resource table
│   ├── ReportSectionGeneration.jsx # Production chart, emissions, disclaimer
│   ├── ReportSectionSavings.jsx
│   ├── ReportSectionChart.jsx      # Cumulative savings outlook
│   ├── ReportSectionMarketContext.jsx
│   ├── ReportSectionNextSteps.jsx  # Technical analysis + feasibility costs
│   ├── CashflowChart.jsx
│   ├── MonthlyProductionChart.jsx
│   └── report.css                  # Screen + @media print stylesheets
├── tabs/               # InputsTab and ReportTab top-level tab views
├── utils/
│   ├── calculations.js # computeCalc() — core solar/PPA math
│   ├── formatters.js   # Currency and number formatting helpers
│   └── storage.js      # localStorage CRUD + versioned schema migrations
├── __tests__/          # Vitest suites: calculations, validation, formatters
├── App.jsx             # Tab router
└── main.jsx            # React entry point
```

Note: `src/report/DonutChart.jsx`, `ReportFooter.jsx`, and `ReportSectionSiteInfo.jsx` are orphaned from earlier iterations (no longer rendered) — see `AUDIT.md`.

## How Calculations Work

All core math lives in [`src/utils/calculations.js`](src/utils/calculations.js) inside `computeCalc(project)`. The key steps:

1. **Monthly generation** — Annual MWh (from HelioScope) × monthly percentage distribution
2. **PPA rate** — Year-1 utility rate × (1 − discount rate)
3. **Year-1 savings** — Avoided charges × discount rate
4. **Cumulative savings scenarios** — Annual savings projected over the PPA term for each of three utility escalation rates, factoring in module degradation and PPA escalation
5. **WAIRE points** (optional) — Installation points (MW × pts/MW) + generation points (MWh ÷ MWh/pt), valued at the PPA-discounted point price
6. **REC value** (optional) — Annual MWh × (market price − PPA price)
7. **Emissions** — Annual generation × grid emissions intensity (lbs CO₂e/MWh), converted to metric tonnes; lifetime total is summed year-by-year over the PPA term **with module degradation applied** (not a simple annual × term multiple)

`annualSiteLoadMwh` is optional — generation-only reports omit the consumption/offset figures.

## Data Persistence

Projects are stored in `localStorage` under the key `gcsr_projects`. Each saved entry carries a schema `version`; `storage.js` applies forward migrations on load so older saved projects pick up newly added fields. Export/import via JSON is available from the save bar for backup or moving between machines. Note that layout images are stored inline as base64 and count toward the browser's localStorage quota (~5 MB).

## Deployment

The app is fully client-side with no backend. Production deploys run on **Vercel**, triggered by pushes to `main` on [KavenTW/dws-solar-report](https://github.com/KavenTW/dws-solar-report).

```bash
npm run build
# → dist/ is ready to serve from any static host
```

**Vite base path** is set to `"./"` in [`vite.config.js`](vite.config.js), so asset references are relative and the build also works on GitHub Pages, Netlify, or any CDN/object storage.

## License

Private — Great Circle Solar Management Corp.
