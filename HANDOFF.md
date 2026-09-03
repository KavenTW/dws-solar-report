# HANDOFF — 2026-09-03

Point-in-time state. Read **CLAUDE.md** first for how the repo works.
Last commit at handoff: `aa100a4` (+ MAINTENANCE block moved to the top of
the portfolio editor). Working tree clean, `main` pushed, CI green.

## Status in one line

The DWS 14-asset portfolio deliverable is **content-complete and deployed**.
What remains is the user's 3-step publish routine, plus a short list of
questions the reviewer (Karen Wharton) must answer.

## Do this first (user's publish routine)

The deploy carries the data and images; the user's browser needs one click to
pick them up.

1. Hard-refresh https://dws-solar-report.vercel.app (**Ctrl+Shift+R**)
2. **Portfolio → Edit Portfolio Content → MAINTENANCE is now the first block
   in the left column → "Load / update DWS data — August 2026 ops revision"**
   → applies sizing, production, site notes, report type, and all 14 layout
   images. Expect an alert like "14 updated, 0 created, 14 layout images
   attached".
3. Directly below it → **"Reset text to latest defaults"** (pulls in the
   latest wording; keeps report selections and TOC page numbers)
4. Set the **title-page date**, do one test print, fill the **TOC page
   numbers**, print final.

Expected portfolio totals after step 2: **14 sites · 31,399 kW DC ·
51,169 MWh Yr-1 · ~348,500 t CO₂e lifetime** (the CO₂e figure will shift
slightly with the August generation numbers — it recomputes live).

## Outstanding — needs Karen (blocking sign-off, not code)

Substantive:

1. **Scorecard / prioritisation vs. engagement scope.** Her comment: *"not
   specified in the scope… I still want to discuss this approach."* The
   scorecard, colour bands, Overall row, and the whole Prioritisation page
   depend on this. Left in the document as-is, at her instruction ("leave for
   now").
2. **Monthly distribution data vintage.** The August ops workbook's monthly
   rows are blank (marked "ops to input"), so the production charts still use
   **June PVsyst monthly shapes against August annual totals**. Either ops
   fills those rows (then regenerate `dwsDataset.js`) or Karen accepts the
   June shapes. *This is the one real data inconsistency left in the document.*
3. **"Why is June lower than May and July?"** (p.31) — that is genuinely the
   PVsyst weather-file output for that site; data is faithful. Question is
   whether she wants an explanatory footnote. Related to #2.
4. **Canopy stage-gating** (p.12) — is structural-before-geotechnical the right
   sequence for carport-dominated sites?

Wording clarifications — she flagged these but I can't tell which sentence:

5. p.6 CA pager — *"not entirely clear what we are trying to say here"*
6. p.8 — *"rename"* (first CA asset page; target unclear)
7. p.27 — **"Florida is almost the same as Ontario?"** Likely flagging copy
   that reads template-like versus another engagement.
8. p.35 NC pager ×3 — *"what does this mean?"*, *"is this just for export
   rates?"*, *"does this apply to rooftop solar?"* → best handled as one joint
   rewrite of the NC Utility Billing paragraph.
9. p.38 TX pager — *"owner?"* (target unclear)

Everything else from her 4 Aug markup (51 comments, all extracted) is already
in the live document.

## Recent additions

- **Portfolio Asset Summary** page (after Prioritisation, before the TOC):
  all 14 assets on one page — rooftop/carport kW DC split, Yr-1 MWh, roof and
  parking utilisation, points of interconnection, tier. Every figure is
  computed from the same `calc` as the asset reports; the Tier column is
  looked up from the editable prioritisation tiers by asset name. Hard-coded
  footnote (like the other portfolio page footnotes), so **no text reset is
  needed** to see it. Measures 601px of the 941px printable height.

## Open technical items (small, optional)

- Remaining `AUDIT.md` opportunities, none blocking: inline styles → token
  classes (O1), print-layout primitives instead of per-section pixel tuning
  (N5), Ctrl+S save (O2), `NumberInput` cannot represent "empty" (O3),
  Chart.js update-in-place (O4).
- `src/report/ReportDisclaimer.jsx` is still used by the standalone report
  path; do not delete it.

## How the current content got here (recent arc)

Newest first — read commit bodies for detail, they're written to be useful:

- `2355fdb` 14 HelioScope layouts bundled into the one-click update
- `9a1bbac` Load now pre-fills the project name (Save was creating
  "Untitled Project" — silent trap during image upload)
- `2f62d71` **data ships in the deploy**, one-click updater (replaced
  console-paste snippets; user explicitly rejected console work)
- `97c6f40` Karen's comment batch: retitle, feasibility→opportunity, sources
  named in methodology, CA/NV/TX/NC/IL pager rewrites, asset names in section
  titles, load-analysis category, 3–6 month interconnection footnote
- `18acb06`, `1a23d51` the two print-clipping fixes (see CLAUDE.md print rules)
- `bc7fb59`, `6368541` decision layer (tiers, capacity chart, methodology,
  glossary, immediate actions) + de-duplication of per-asset boilerplate
- `556ba44` scorecard de-quantified to colour bands (no numbers in client view)
- Earlier: the engineering audit (`AUDIT.md`) and its fixes — storage version
  chain, total `computeCalc`, draft autosave + quota handling, CI gate,
  `SectionToggleChip` extraction

Data lineage is recorded in `PORTFOLIO_SOURCES.md` — including that sizing is
**August 2026** while monthly distributions are **June 2026** (item #2 above).

## Source files the user supplies (not in repo)

- `…/OneDrive - Great Circle Solar/DWS EU Ops Data Request.xlsx` — the ops
  workbook; sizing/production/notes come from here (column per asset, C–P)
- `…/Attachments/DRAFT EU Report … kw comments.pdf` — reviewer markup. PDF
  annotations **can** be extracted programmatically (parse objects incl.
  ObjStm-compressed, decode `/Contents`, map via `/Annots` per page). If she
  sends another marked-up PDF, extract, play the list back for confirmation,
  then implement.
- `…/Desktop/_PNGs/` — HelioScope layout exports, named per asset. Plain
  layouts only; **no dimensioned versions** (confirmed by user).

## Regenerating the dataset (when ops data changes)

The 14-asset dataset is generated, not hand-written. Rebuild
`src/constants/dwsDataset.js` from the ops workbook: parse the sheet
(shared strings + `sheet1.xml`; rows are Asset 9, Address 10, City 11,
State 12, rooftop DC/AC/spec 14/15/16, occupied/total roof 17/18, carport
DC/AC/spec 21/22/23, occupied/total parking 24/25, points of interconnection
28, monthly % 35–46, notes 60), compute
`annualMwh = (rDC·rSpec + cDC·cSpec)/1000`, merge over `DEFAULT_PROJECT`,
keep the `DWS_LAYOUT_IMAGES` map, then push. The user clicks the update button
once. Keep `PORTFOLIO_SOURCES.md` in step with the vintage.
