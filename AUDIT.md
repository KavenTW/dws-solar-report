# Re-audit — 2026-06-12 (post-fix, same branch)

The Top-5 moves from the original audit below were implemented in commits `0407fec`, `e2bccc2`, `02c2c9b`, `12c392e`. Empirical results after fixes:

- `npm test` — **PASS: 22/22** (was 19/20 with 1 failing)
- `npm run lint` — **PASS: 0 problems** (was 9 errors)
- `npm run build` — PASS (`✓ built in 207ms`, 157.64 kB gzipped)
- `npm audit` — PASS (0 vulnerabilities)
- Browser smoke (verified live): draft autosaves 1.5s after an edit under `gcsr_draft` stamped `version: 7`; draft restores into the form after reload; explicit Save stamps `version: 7` and clears the draft; with site load = 0 the report renders **no Infinity/NaN**, hides the bill-impact and solar-offset figures, and keeps the rate comparison.

## Post-fix grades

| Area | Was | Now | Why |
|---|---|---|---|
| Data integrity | prototype → solid | **solid** | Version chain re-aligned (v7) with migrations for all fields; computeCalc is total (null for absent inputs, never NaN/Infinity); WAIRE and scenario-index boundaries validated; quota failures surface in the UI. Verified by tests + live smoke. |
| Speed | solid | **solid** | Unchanged; SectionWrapper no longer double-renders on expand/collapse-all. |
| Design craft | solid | **solid** | Unchanged this pass — inline-style cleanup (O1) and print primitives (N5) remain open. |
| Ergonomics | prototype → solid | **solid** | Draft autosave + beforeunload prompt close both silent-loss paths. Ctrl+S (O2) and NumberInput empty-state (O3) remain open. |
| Engineering | solid | **solid → elite** | Lint zero, tests green and CI-enforced on every push, 16 chip copies collapsed into one component, 3 orphan files deleted (−253 lines net). |

## Status of original findings

| Finding | Status |
|---|---|
| C1 version drift + unmigrated fields | **Fixed** — `CURRENT_VERSION = 7`, v6→7 migration (AC split, `showMonthlyTable ?? true` preserving pre-toggle intent, feasibility fields) |
| C2 NaN/Infinity division paths | **Fixed** — `hasSiteLoad` gate (null outputs), WAIRE `1/0` guard, `> 0` validation, savings rows conditional |
| C3 failing test | **Fixed** — zero-DC contract test rewritten; new null-output and WAIRE-finite tests added (22 total) |
| C4 silent data loss | **Fixed** — debounced draft autosave, beforeunload prompt, quota error surfaced in save bar |
| N1 chip duplication ×16 | **Fixed** — `SectionToggleChip` component, 13 files updated |
| N2 orphans + dead vars | **Fixed** — DonutChart/ReportFooter/ReportSectionSiteInfo deleted; dead import + unused vars removed; `ReportDisclaimer` kept (in use) |
| N3 lint errors ×9 | **Fixed** — SectionWrapper derives state during render (no setState-in-effect), node globals for config files |
| N4 referenceScenarioIndex bounds | **Fixed** — validated against `utilityEscalationRates.length` |
| N5 print magic numbers | **Open** (opportunity) |
| O1 inline styles | **Open** (opportunity) |
| O2 Ctrl+S / O3 NumberInput empty-state / O4 chart update-in-place | **Open** (opportunities) |
| O5 CI gate | **Fixed** — `.github/workflows/ci.yml` runs test + lint + build on every push/PR |

Remaining to reach the full elite bar: print-layout primitives instead of per-section pixel tuning (N5), inline styles into the token scale (O1), Ctrl+S (O2), and a true empty-state for optional numeric fields (O3).

---

# Original audit — 2026-06-12 (branch `audit/2026-06-12`)

Bar: Palantir-grade data integrity, Apple-grade craft, single-user internal tool.
Scope assumptions: purpose = client-facing solar PPA/feasibility PDF reports; hosting = Vercel; data = project records + base64 images in browser localStorage that real client work depends on.

## Grades

| Area | Grade | Why | Basis |
|---|---|---|---|
| Data integrity | **prototype → solid** | Versioned migrations exist (good bones), but version counter has drifted from the migration chain, newer fields have no migrations, unguarded division produces Infinity in the UI, and 1 of 20 tests fails. | **verified** (test run, lint run, code read, Infinity observed in-session) |
| Speed | **solid** | Calc is memoized; charts destroy/recreate but datasets are tiny; build is 378ms/500KB; no observable jank for one user. | verified (build) / inferred (runtime feel) |
| Design craft | **solid** | Real token scale (colors, radius, shadow), consistent table/card/KPI language, designed empty/error states. Held back by ~8 inline style escapes and print magic numbers. | **verified** (code read) |
| Ergonomics | **prototype → solid** | Section chips, collapse persistence, presets are genuinely good. But: no autosave, no Ctrl+S, no unsaved-changes warning — one accidental tab close loses an afternoon of inputs. | **verified** (no `beforeunload` handler exists anywhere) |
| Engineering | **solid** | Clean layering (constants → context → utils → form/report), pure calc core, tests on the math. Held back by 12× copy-pasted chip toggle, 3 orphaned components, 9 lint errors, failing test. | **verified** (lint + test runs, grep counts) |

## Empirical results (run on this branch, 2026-06-12)

- `npm run build` — **PASS** (`✓ built in 378ms`, `dist/assets/index-BZPI31K3.js 499.74 kB │ gzip: 157.38 kB`)
- `npm test` — **FAIL**: `Tests 1 failed | 19 passed (20)` — `calculations.test.js > throws when total DC kW is zero: AssertionError: expected [Function] to throw an error`
- `npm run lint` — **FAIL**: `✖ 9 problems (9 errors, 0 warnings)`
- `npm audit` — **PASS**: `found 0 vulnerabilities`
- Secrets scan (working tree + full git history) — **CLEAN**: no `.env` files, no credential patterns, ever committed.

## Coverage

Examined: all of `src/` (constants, context, form, hooks, report, tabs, utils, __tests__), `package.json`, `vite.config.js`, `eslint.config.js`, README, git log. Ran build/lint/test/audit. The `Solar Offset: ~Infinity%` failure was observed live in the app earlier this session (screenshot evidence) before that card was removed from the report — the underlying expression is still unguarded.
NOT examined: `dist/` output fidelity, cross-browser print rendering (Chrome assumed), Vercel config, full git-history code archaeology beyond the secrets scan. Items I could not execute are marked *inferred*.

---

## Critical gaps / risks

### C1. Schema-version drift: `CURRENT_VERSION` lags the migration chain — **verified**
**What:** `storage.js:3` declares `CURRENT_VERSION = 5`, but a v5→v6 migration exists (`storage.js:91-103`). Every project saved today is stamped `version: 5`, so the v6 migration re-runs on every single load. Worse, the fields added *after* v6 — `showMonthlyTable` (`defaults.js:57`), the 8 `feas*` cost fields (`defaults.js:71-78`), `rooftopSizeACkW`/`carportSizeACkW` — have **no migration entries at all**. Today they survive only because `LOAD_PROJECT` happens to spread `DEFAULT_PROJECT` first (`ProjectContext.jsx:73`), which silently substitutes defaults rather than tracking schema history.
**Why it matters:** This is your single source of truth for saved client work. The moment a default changes meaning (e.g. `showMonthlyTable` flipped from implicit-true to `false` this session), old projects silently change behavior with no record of intent. That's exactly the "data silently mutated" failure class.
**Violates:** Data integrity — single source of truth.
**Severity/effort:** High / quick.
**Proposed fix:** Set `CURRENT_VERSION = 6` now; add a v6→v7 migration covering `showMonthlyTable`, the `feas*` octet, and the AC-split fields; bump to 7. Add a dev-mode assertion that every key in `DEFAULT_PROJECT` is reachable via the migration chain.
**Principle:** *Every schema change ships in the same commit as its migration and a version bump. The defaults object is the shape of "new"; the migration chain is the shape of "old" — they must never diverge.*

### C2. Compute layer is not total: unguarded division yields NaN/Infinity — **verified (Infinity observed in UI this session)**
**What:** `calculations.js:28` `solarOffset = annualMwh / p.annualSiteLoadMwh` — site load was made optional this session (guard removed) but the division was left in; with site load 0 this rendered `Solar Offset: ~Infinity%` in the live app. Same class: `calculations.js:51` `1 / p.waireGenMwhPerPt` (validation at `validation.js:66` checks falsy, not `<= 0`); `calculations.js:34` `year1AvoidedChargesUSD / annualKwh`; `calculations.js:101,103-104` divisions by `annualMwh`. `yr1TotalUtilBillNoSolar/WithSolar` (`:37-38`) also compute from a 0 site load, producing a misleading `$0` "Without Solar" bill in the savings table rather than suppressing the rows.
**Why it matters:** This tool's entire value is "I can trust what it shows without double-checking." A single Infinity/NaN/wrong-zero in a client-facing PDF is the worst possible failure.
**Violates:** Data integrity — validation at every boundary; model the domain accurately (optional input ≠ zero input).
**Severity/effort:** High / quick.
**Proposed fix:** Make `computeCalc` total over its input domain: compute `hasSiteLoad = p.annualSiteLoadMwh > 0` once and return `null` for `solarOffset`, `gridImport`, `yr1TotalUtilBill*` when absent; report components already conditionally render and should key off `null`, not 0. Guard `waireGenMwhPerPt <= 0` in validation. (Note: a `hasSiteLoad` pattern existed on the remote branch that was force-pushed over earlier this session — it was the right idea.)
**Principle:** *Optional inputs must produce absent outputs, never arithmetic on zero. A pure compute core should be a total function: any input the UI can construct yields a well-defined, renderable result.*

### C3. Failing test = broken spec contract — **verified (test run)**
**What:** `calculations.test.js:73-75` expects `computeCalc` to throw on zero total DC kW; the guard was deliberately removed (`calculations.js:18`) to let reports render with empty sizing, but the test was not updated. The suite has been red for the latter half of this session's 20+ commits to `main`.
**Why it matters:** A permanently red suite trains you to ignore it — which then hides the *next* real regression in the math your clients see. There is also no CI, so nothing forces the issue.
**Violates:** Engineering quality — guardrails on data-critical paths.
**Severity/effort:** High / quick.
**Proposed fix:** Decide the contract: if zero-DC is now legal, rewrite the test to assert the defined degenerate behavior (e.g. `totalDCkW === 0`, yield `null`); add a Vercel/GitHub Action that runs `npm test && npm run lint` on push so red can't land on `main` unnoticed.
**Principle:** *Tests are the executable spec. A behavior change and its test change belong in the same commit; a red suite is an outage, not a backlog item.*

### C4. Typed-but-unsaved work is one tab-close from gone — **verified (no handler exists)**
**What:** All form edits live only in React context until the manual Save button is clicked (`SaveLoadBar.jsx`). There is no autosave, no `beforeunload` warning, no draft persistence. Additionally `saveAll` (`storage.js:116-122`) only `console.warn`s at 4MB and does not catch `QuotaExceededError` — a large base64 layout image can make Save itself throw with no UI feedback.
**Why it matters:** For a daily-driver, the most expensive asset is the 45 minutes of client data you just typed. Both loss paths (close without save; save that silently fails) are live today.
**Violates:** Data integrity — no path where data is silently lost.
**Severity/effort:** High / moderate.
**Proposed fix:** (1) Debounced draft autosave of the working project to a dedicated localStorage key, restored on load. (2) `beforeunload` prompt when working state differs from last save. (3) Wrap `localStorage.setItem` in try/catch and surface quota failure in the save bar UI.
**Principle:** *Data the user typed is sacred. Persist drafts continuously; treat explicit Save as naming/promoting, not as the only durability point.*

---

## Concerns

### N1. `chip()` toggle copy-pasted 12× — **verified (grep: 12 `const chip` definitions, 13 files touch `report-section-toggle`)**
Same ~10-line a11y-sensitive JSX (role, tabIndex, Enter/Space handling) duplicated across nearly every `form/Section*.jsx`. A behavior fix (e.g. keyboard handling) now requires 12 synchronized edits.
**Violates:** Engineering — no copy-paste sprawl. **Severity/effort:** Med / quick.
**Fix:** Extract `<SectionToggleChip flagKey label />` once in `form/`; delete the 12 locals.
**Principle:** *Rule of three — on the third copy, extract. Duplication of interaction logic is worse than duplication of markup because it drifts invisibly.*

### N2. Orphaned components + dead imports — **verified (grep + lint)**
`DonutChart.jsx` and `ReportFooter.jsx` have zero importers; `ReportSectionSiteInfo.jsx` is imported in `ReportTab.jsx:10` but never rendered (lint: `no-unused-vars`). `ReportDisclaimer.jsx` IS still used (imported by `ReportSectionGeneration.jsx:2`) — do not delete it. Also dead: `cityShort` (`ReportCover.jsx:2`), `totalACkW` (`ReportSectionOverview.jsx:13`), legacy `systemSizeACkW` fallback (`defaults.js:18`).
**Violates:** Engineering — no dead code. **Severity/effort:** Low / quick.
**Fix:** Delete the two true orphans + the unused import/vars; keep `ReportDisclaimer`.
**Principle:** *Delete dead code the moment it dies — git remembers. Dead files mislead every future reader (and every future AI session) about what the app actually does.*

### N3. Nine lint errors, suite not run as a gate — **verified (lint run)**
Breakdown: 4× `react-hooks/set-state-in-effect` + 3× `no-empty` in `SectionWrapper.jsx:26-42`, plus the unused vars above, plus `vite.config.js:6` `process` no-undef (missing node globals in eslint config for config files).
**Violates:** Engineering quality. **Severity/effort:** Med / quick-to-moderate.
**Fix:** Rework `SectionWrapper`'s override effect to derive open-state during render (or use the event handlers that set the override to also write localStorage); add `globals.node` for `vite.config.js` in `eslint.config.js`; fix empty catches with a comment or log.
**Principle:** *Lint debt compounds: 9 tolerated errors make the 10th invisible. The bar is zero, enforced mechanically.*

### N4. `referenceScenarioIndex` can dangle — **verified by read; UI degrades gracefully**
`defaults.js` sets index 1 into `utilityEscalationRates` (3 entries). Nothing validates the index against array length if rates are edited. Consumers null-check (`ReportSectionOverview.jsx:5-6`, `ReportSectionChart.jsx:6-7`) so it renders `0`/`?` rather than crashing — i.e. a silently wrong report number instead of an error.
**Violates:** Data integrity — validation at boundaries. **Severity/effort:** Low / quick.
**Fix:** Clamp in validation (`referenceScenarioIndex < utilityEscalationRates.length`) or clamp at read time in `computeCalc`.
**Principle:** *Cross-field invariants (index ↔ array) belong in the validation layer, not scattered null-checks downstream — the null-check hides the bug, validation surfaces it.*

### N5. Print stylesheet relies on tuned magic numbers — **verified by read; fidelity inferred**
`report.css` print block hard-codes `#cashflowChart { height: 200px !important }`, `.layout-photo { max-height: 280px }`, per-section `break-*` overrides accumulated through this session's iterative PDF fixes. It works now (confirmed via your PDF screenshots) but is brittle: any new section or longer content re-opens the pagination whack-a-mole.
**Violates:** Design craft — considered details vs. tuned-until-it-fits. **Severity/effort:** Med / moderate.
**Fix:** Define a small set of print primitives (`.print-keep`, `.print-page`, one density scale) and have sections opt into them, instead of per-section pixel overrides.
**Principle:** *Make the layout system express intent ("keep together", "own page") and let the engine paginate — pixel-tuning encodes today's content into the stylesheet.*

---

## Opportunities

- **O1. Inline styles → tokens** (~8 instances: `ReportSectionOverview.jsx:26,38,52`, `ReportSectionLayout.jsx:26`, `ReportSectionNextSteps` footnote spacing, etc.). The KPI "value + small unit" pattern repeats 3× — make it a `.kpi-value-unit` class. *Design craft; low/quick.* Principle: a token scale only pays off if escapes are rare enough to be noticed in review.
- **O2. Ctrl+S to save, named-project status in header** (current name + dirty indicator). *Ergonomics; low/quick.* Power users live on the keyboard; the save bar currently requires scroll-to-top.
- **O3. NumberInput cannot represent "empty"** (`NumberInput.jsx:39-44` coerces blank → 0). With optional fields now meaningful (site load), 0 and "not provided" are different facts. *Data integrity adjacent; low/moderate.* Principle: the input layer must be able to express every state the domain model has.
- **O4. Chart update-in-place** — `MonthlyProductionChart`/`CashflowChart` destroy/recreate per prop change. Fine at this scale; if charts grow, switch to `chart.data = …; chart.update()`. *Speed; low/quick.*
- **O5. CI gate** — a 10-line GitHub Action running `npm test && npm run lint` on push would have caught C3 the day it happened. *Engineering; high leverage/quick.*
- **O6. Already elite, keep it:** the pure-function calc core + memoized `useCalc`, the versioned-migration *architecture* (once C1 fixes the drift), `SectionWrapper`/`FormField` reuse, the per-section visibility chip system, and JSON export as a backup escape hatch are all genuinely good patterns. Don't churn them.

---

## Top 5 moves (impact ÷ effort, descending)

1. **Re-align the version chain (C1)** — bump `CURRENT_VERSION`, add migrations for all post-v6 fields. Protects every saved client project; ~30 minutes.
2. **Make `computeCalc` total (C2) + fix the red test (C3)** — guard the four division sites, define zero-DC behavior, update the test in the same commit. Removes the entire NaN-in-client-PDF failure class; ~1 hour.
3. **Draft autosave + beforeunload + quota catch (C4)** — eliminates both silent-loss paths; ~2 hours.
4. **CI gate (O5)** — makes regressions on 1–3 impossible to land silently; ~20 minutes.
5. **Extract `SectionToggleChip`, delete orphans, zero the lint (N1–N3)** — one cleanup PR that pays rent on every future session; ~1 hour.
