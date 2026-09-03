# CLAUDE.md — working guide for this repo

Read this first. It is the durable "how to work here" guide. For point-in-time
state (what's done, what's pending, what to do next) read **HANDOFF.md**.

## What this is

A browser-based report generator for **Great Circle Solar Management Corp.
(GCS)**. It turns solar simulation data into client-ready PDF reports. Its
current job is a **14-asset portfolio deliverable for DWS Asset Management**
(the "DWS EU Fund" review) covering six U.S. states.

Single-user internal tool. No backend, no auth, no multi-tenancy. All state
lives in the browser's `localStorage`. Do not add enterprise concerns
(scale, adversarial hardening, SEO) — see `AUDIT.md` for the quality bar that
does apply.

## Repo & deploy facts

- **Local folder:** `…/Desktop/ClaudeDesktop/solar-report-app`
- **GitHub remote:** `KavenTW/dws-solar-report` ← note the folder name and the
  repo name differ. This is the correct pairing. (A stale memory note claims
  "never edit solar-report-app" — that refers to an *old* `cimino11/solar-report-app`
  repo that is no longer used. Editing this folder and pushing to
  `KavenTW/dws-solar-report` is right.)
- **Live site:** https://dws-solar-report.vercel.app — auto-deploys from `main`
- Push to `main` → Vercel redeploys (~1 min) → **user must hard-refresh
  (Ctrl+Shift+R)**; a normal reload can serve stale CSS.
- CI (`.github/workflows/ci.yml`) runs test + lint + build on every push.
  Pushing workflow files needs a PAT with `workflow` scope.

## Commands

```bash
npm run dev     # Vite dev server (use the preview/browser tools, never bash for servers)
npm test        # Vitest — 22 tests, must stay green
npm run lint    # ESLint — must be 0 problems
npm run build   # production build
```

Ship rule: **lint 0, tests green, build passes** before every commit.

## Architecture

Three tabs (`src/App.jsx` → `src/tabs/`):

| Tab | File | Purpose |
|---|---|---|
| Project Inputs | `tabs/InputsTab.jsx` | Per-asset form, collapsible sections |
| Report Preview | `tabs/ReportTab.jsx` | The active project as a standalone report |
| Portfolio | `tabs/PortfolioTab.jsx` | The compiled multi-asset client deliverable |

**`src/report/ReportDocument.jsx` is the shared renderer** — used by both
ReportTab (standalone) and PortfolioTab (once per asset). It takes an
`embedded` prop; embedded mode swaps the full cover for a slim asset band,
suppresses the generic analysis table / stage-gate / disclaimer (they render
once at document level), and appends the asset name to section titles. Any
change to report structure belongs here, not duplicated.

Compiled document order (PortfolioTab): Title → Exec Summary →
Prioritisation → Asset Summary → TOC → Methodology & Glossary → then per
state in scorecard order (**CA, NV, IL, FL, NC, TX**) a state one-pager
followed by each asset's report → Next Steps → closing Disclaimer.

Key directories:

- `src/constants/` — `defaults.js` (DEFAULT_PROJECT: every project field),
  `portfolioDefaults.js` (all portfolio document copy + scorecard),
  `dwsDataset.js` (**generated** — the 14-asset dataset + layout image map),
  `technicalItems.js`, `validation.js`
- `src/context/ProjectContext.jsx` — single reducer; `dirty` flag, debounced
  draft autosave, `beforeunload` guard
- `src/hooks/` — `useCalc.js` (memoised compute), `usePortfolio.js`
- `src/utils/` — `calculations.js` (**the math core**), `storage.js`
  (localStorage + migrations + dataset updater), `imageCompress.js`,
  `formatters.js`
- `src/report/` — section components + `report.css` (screen **and** the
  `@media print` block); `src/report/portfolio/` — the front/back matter
- `public/layouts/` — the 14 HelioScope PNGs bundled with the deploy
- `PORTFOLIO_SOURCES.md` — **audit register**: every source, data vintage, and
  the colour-band↔score mapping. Sources are deliberately kept OUT of the
  client document and live here instead.
- `AUDIT.md` — engineering audit + re-audit findings

## Data model & storage

`localStorage` keys: `gcsr_projects` (saved projects), `gcsr_draft` (working
autosave), `gcsr_portfolio` (portfolio document text), `gcsr_section_*`
(collapse states).

**Migration discipline (non-negotiable):** every new `DEFAULT_PROJECT` field
ships with a migration block in `storage.js` **and** a `CURRENT_VERSION` bump
in the same commit. Currently **version 8**. This was a critical audit finding
— version drift silently substituted defaults for saved client data.

`computeCalc` (`utils/calculations.js`) must be **total**: optional inputs
produce `null`, never `NaN`/`Infinity`. `annualSiteLoadMwh` and zero DC size
are legal; `hasSiteLoad` gates the consumption outputs. Guard every division.

## The print pipeline — read before touching CSS

The PDF is produced by browser print. Letter, 0.6in/0.65in margins →
**printable area ≈ 690 × 941 px**. Hard-won rules, all in the `@media print`
block of `report.css`:

1. **`.app-shell { display: block !important }`** — Chrome's print engine sizes
   flex items to content intrinsic width; the flex shell plus screen-sized
   canvases made the whole document wider than the paper, clipping **every**
   page at the right edge.
2. **`canvas { width: 100% !important }`** — Chart.js canvases otherwise carry
   their screen pixel width into print (same failure as above).
3. **Never `width: 100%` on a table cell.** A TOC dotted-leader cell doing this
   forced its table — and every page sharing the container — over the page width.
4. **Wide tables need `table-layout: fixed`** (`.portfolio-page .market-table`,
   `.feas-table`) so long notes wrap instead of widening the page.
5. `.layout-empty { display: none }` — screen-only placeholders (e.g. the
   "upload an image" prompt) must never print.
6. `.portfolio-page` / `.portfolio-report` force page breaks; `.section-title`
   has `break-after: avoid` so headings never orphan.

## Verification techniques that work in this environment

- **`innerText` returns UPPERCASE** where CSS applies `text-transform`.
  Case-sensitive assertions give false negatives — always use
  case-insensitive regex when checking rendered text.
- **The screenshot tool times out here.** Verify via DOM measurement and text
  extraction instead.
- **To check print page-fit:** inject the real `@media print` rules as screen
  rules (fetch `/src/report/report.css`, slice the print block), clamp
  `.container` to 690px, then measure element heights against 941px. This
  found every pagination problem. Note it cannot reproduce the flex/canvas
  print behaviour in rule 1–2 above.
- **Seed test data** by writing `gcsr_projects` directly, or click the
  in-app data-update button. **Always clear `gcsr_projects`, `gcsr_draft`,
  `gcsr_portfolio` when finished** so the user's real data isn't polluted, and
  delete any temp file staged into `public/`.

## Client-copy conventions (auditability)

This document goes to an institutional client. Language rules, set by the
reviewer (Karen Wharton, GCS):

- **"Feasibility" only for the named engineering studies.** Everything else is
  "opportunity" / "assessment" (title: *Portfolio Solar Deployment Potential*;
  type line: *Preliminary Solar Development Opportunity Assessment*).
- **Don't prescribe commercial structures.** Frame as opportunities and
  constraints ("Alternative structures can be considered but add complexity…").
- **UK spelling** in portfolio copy (recognised, standardised, minimises).
- **No sources printed in the document** — they live in `PORTFOLIO_SOURCES.md`.
  Exception: the methodology page names EPA eGRID and EIA explicitly, at the
  reviewer's request.
- Only verifiable statements tied to data in the document; "indicative",
  "preliminary", "subject to" framing; no forward-looking promises.
- **No financial figures** (no PPA pricing/savings) — omitted deliberately;
  without tariff and interval-load analysis they'd be indefensible.

## Editing the portfolio document

All portfolio text is seeded from `constants/portfolioDefaults.js` but the
**working copy in `localStorage` wins**. After changing seeds you must tell the
user to click **Portfolio → Edit Portfolio Content → "Reset text to latest
defaults"** (bottom of the left column, under MAINTENANCE) or they will not see
the change. Report selections and TOC page numbers survive that reset.

## Delivering data changes

Never ask the user to paste into the browser console — they've asked
explicitly not to. Data ships **in the deploy**: regenerate
`constants/dwsDataset.js`, push, and the user clicks **"Load / update DWS
data"** once. `applyDatasetUpdate` patches only `DWS_PATCH_FIELDS` on existing
projects (user edits and uploaded images survive) and creates missing ones;
`attachBundledLayouts` fills only empty image slots.

**localStorage quota is the binding constraint** on images: 14 layouts at
1400px/q0.72 = 5.53 MB (over quota, save fails); at **1100px/q0.60 = 2.87 MB**
(safe, and ≈157 DPI at printed width — no visible loss on paper).
