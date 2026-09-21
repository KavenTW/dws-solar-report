# HANDOFF — 2026-09-21

Point-in-time state. Read **CLAUDE.md** first for how the repo works.
Last commit at handoff: `221f9ab` + this audit. Working tree clean, `main`
pushed, CI green.

## Status in one line

The DWS 14-asset portfolio deliverable is **restructured, audited and
deployed**. What remains is the publish routine, GCS sign-off on the
prioritization basis, and Karen's review of the rebuilt document.

## Do this first (publish routine)

1. Hard-refresh https://dws-solar-report.vercel.app (**Ctrl+Shift+R**)
2. **Portfolio → Edit Portfolio Content → MAINTENANCE** (first block):
   - **"Load / update DWS data — August 2026 ops revision"** — sizing,
     production, site notes, roof years, building types, glare flags, and
     all 14 layout images. Expect "14 updated, 0 created".
   - **"Reset text to latest defaults"** — the seeded copy.
   - **"Estimate TOC page numbers"** — fills all 35 contents entries.
3. Check the Executive Summary reads **14 sites · 31,401 kW DC ·
   51,169 MWh**. If it says 15 or 16, an old duplicate is ticked under
   *Included Reports* (see "Known traps").
4. Test print, spot-check a few page numbers, print final.

The document is **64 pages**. Title-page date is seeded as 22 September 2026.

## Document structure

Title → TOC → Scope of Engagement → Executive Summary → Proposed Asset
Prioritization → Portfolio Asset Summary → Methodology & Basis of Estimates
(with Net Metering & System Sizing, then Glossary, on the same page) → Key
Considerations → six state one-pagers (CA, NV, IL, FL, NC, TX) → Next Steps
→ closing Disclaimer → Appendices: an index page, then Appendix A–F, one per
state, each followed by that state's asset reports.

Assets are ordered **prioritization group first, then largest capacity**,
within each state. The appendices, the contents and the state tables all read
from that one sort, so page order never depends on localStorage ordering.

## Outstanding — needs GCS, not code

1. **Prioritization basis — OPEN ITEM in `PORTFOLIO_SOURCES.md`.** The three
   groups are the document's central recommendation. The factors are recorded
   (building use and likely on-site load; market conditions as tailwind or
   headwind; roof age and replacement timing; structural and site constraints;
   points of interconnection; jurisdictional constraints) but their **relative
   weighting is not**. The user has stated the call is **more commercial than
   the report captures**, so a reader cannot fully reconstruct it from the
   document — by design. Worth one line in the register saying so; offered,
   not yet done.
2. **Group membership is a draft** assigned by Claude for review, never
   confirmed.
3. **Group 3's rationale still cites "scale"** while the register records that
   size is *not* a prioritization factor. The user has seen this and chose to
   leave it.
4. **Karen has not reviewed the restructured document.** Her 4 Aug markup was
   against a document that no longer exists in that form.

## Known traps

- **Duplicate saved projects.** The user's browser has held
  "Eastland Center 2026.07.02" and "Courtyard at the Commons 2026.07.02" —
  July-vintage copies under dated names. `applyDatasetUpdate` never touches
  them (it matches on name), so they stay frozen on old numbers while
  everything else updates. Untick under *Included Reports*; the totals should
  read 14 sites / 31,401 kW DC.
- **The seeded copy loses browser edits.** "Reset text to latest defaults"
  replaces all portfolio text, keeping only report selections and TOC page
  numbers. Prioritization group membership is seeded text, so it resets too.
- **Page numbers are an estimate.** `utils/pageEstimate.js` measures the
  document against the printed page; it cannot reproduce the flex/canvas print
  behaviour noted in CLAUDE.md. Spot-check against one test print.

## Data vintage

Sizing, AC capacities, specific production and Yr-1 generation are the
**August 2026** ops revision. **Monthly distributions are the June 2026 PVsyst
seasonal profile** applied to the August annual totals — the August workbook's
monthly rows were left blank for ops input, and GCS has accepted the June
profile. The methodology page describes the monthly figures as indicative of
distribution across the year rather than independent monthly estimates, so the
wording stays true when ops fills the rows in.

Roof install / replacement years, building types and building sizes come from
the **Prioritization sheet of "EU Portfolio 2026.09.08.xlsx"**. Roof year is
known for six assets; the rest print "To be confirmed". Candour House is
**multifamily residential** — the workbook's "Indoor Parking" label is wrong.

Full lineage, including the corrected EU fund attribution (the *Working* sheet
disagrees with the DWS original for six assets — the original is right), is in
`PORTFOLIO_SOURCES.md`.

## Source files the user supplies (not in repo)

- `X:\14 DWS\2 - Projects\Portfolio Triage & Pre-Feasibility\3 EU Portfolio\
  Archive\EU Portfolio 2026.09.08.xlsx` — fund, utility, building type and
  size, roof age, load customer, GCS recommendation, working notes.
- `X:\14 DWS\1 - Engagements\Executed\EU Fund Advisory.pdf` — the engagement
  letter. **Scanned images; no text layer.** Scope 1B was supplied by the user
  as text and is reproduced in the document.
- `…/DWS EU Ops Data Request.xlsx` — the ops workbook behind `dwsDataset.js`.
- `…/Desktop/_PNGs/` — the 14 HelioScope layout exports.

Reviewer markup arrives as a commented PDF. Annotations extract
programmatically — parse each `N G obj` block for `/Contents` plus `/Rect` and
`/QuadPoints`, then map rect → page via pdfjs and pull the marked text from the
text layer. Note `pdfjs.getAnnotations()` returned empty contents on the last
file; the raw object parse is the reliable path. Extract, play the list back
for confirmation, then implement.

## Recent arc

Newest first — commit bodies carry the detail:

- `221f9ab` deterministic asset order within each state
- `35d37d7` page numbers resolve by asset name when the project id does not
- `ea80d34` **"Estimate TOC page numbers"** — no more manual page numbering
- `4da8e37` per-asset prioritization notes retired; building types; group sort
- `d38cfc8` prioritization basis corrected — **system size is not a factor**
- `7dd1948` horizontal capacity chart; computed site overview
- `6098aa4` audit: stage-gate chips, column arithmetic (headline 31,399 →
  31,401 — capacity columns now total their rounded rows so the printed
  column adds up)
- `ebc693c` the reviewer's 44 markup comments applied in full
- `46aaa67` **restructure**: scope-led, prioritization-group based, scorecard
  removed
- `e8b14eb` asset reports moved into lettered appendices
- `89dd542` asset summary on every state one-pager; bullet narrative; no
  decimals

## Regenerating the dataset (when ops data changes)

`src/constants/dwsDataset.js` is generated, not hand-written. Rebuild from the
ops workbook: parse the sheet (shared strings + `sheet1.xml`; rows are Asset 9,
Address 10, City 11, State 12, rooftop DC/AC/spec 14/15/16, occupied/total roof
17/18, carport DC/AC/spec 21/22/23, occupied/total parking 24/25, points of
interconnection 28, monthly % 35–46, notes 60), compute
`annualMwh = (rDC·rSpec + cDC·cSpec)/1000`, merge over `DEFAULT_PROJECT`, keep
the `DWS_LAYOUT_IMAGES` map and the fields added since (roof years, building
type, glare flag), then push. The user clicks "Load / update DWS data" once.
Keep `PORTFOLIO_SOURCES.md` in step with the vintage.
