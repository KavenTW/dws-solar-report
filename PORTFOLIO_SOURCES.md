# Portfolio Report — Source Register

Sources are intentionally omitted from the client-facing portfolio document.
This register preserves them for audit. State one-pager sources are as listed
in "DWS State 1 Pagers – Revised 2026.07.02" (internal draft).

## State one-pagers (primary sources, per the draft)

| State | Primary sources |
|---|---|
| California | CPUC Net Metering and Net Billing · CPUC Prevailing Wage Guidance · City of Palo Alto NEM · LADWP Commercial Solar · South Coast AQMD WAIRE · NREL Solar Resource Maps |
| Nevada | NV Energy Net Metering · NV Energy NMR-B Tariff · NV Energy Interconnection Handbook · Nevada PEC Trading Program · NREL Solar Resource Maps |
| Illinois | Illinois Net Metering Statute · ComEd 2026 Ratebook · Illinois Shines 2026-27 Guidebook · Illinois Shines Program Documents · NREL Solar Resource Maps |
| Florida | FPL Net Metering FAQ · FPL Net Metering Tariff · FPL Interconnection Agreements · Florida Public Utility Definition · NREL Solar Resource Maps |
| North Carolina | Duke Renewable Generation · NC Distributed Resources Access Act · NC-RETS · NREL Solar Resource Maps |
| Texas | PUCT Distributed Renewable Generation Rule · PUCT Distributed Generation Rules · ERCOT REC Program · Oncor Distributed Generation · NREL Solar Resource Maps |

Scorecard ratings, weights, and weighted scores: internal GCS relative
assessment as stated in the draft (directional screening, not underwriting).

**Colour-band mapping (client view).** The document renders the scorecard as
colour bands rather than numbers: green = strongest relative position
(score 3), soft amber = moderate (score 2), neutral grey = weakest relative
position (score 1). The underlying quantified matrix — per-category scores
(1–3), category weights (/10), and weighted totals (CA 2.2, NV 2.2, IL 2.1,
FL 1.8, NC 1.8, TX 1.6) — is retained in `src/constants/portfolioDefaults.js`
(`SCORECARD`) and is available on request. The state header badges (LEADING /
POLICY-LED / SELECTIVE / OPPORTUNISTIC) correspond to those weighted totals.

The "Overall Market Position" row maps from the weighted totals: ≥ 2.0 →
strongest band (CA, NV, IL), 1.7–1.9 → moderate (FL, NC), < 1.7 → weakest
(TX) — mirroring the header badges.

**Proposed Asset Prioritisation.** The tier assignments are a directional GCS
proposal combining: state scorecard band, system scale (kW DC), and the
site-specific considerations recorded in the DWS Technical Data Request
workbook (structural/parking-structure items, glare-study triggers,
multi-family metering, municipal-utility service territories). Editable in
the document; to be confirmed with DWS.

**Per-asset Site-Specific Considerations.** Drafted from the "technical notes
unique to the project" column of "DWS EU Ops Data Request" (August 2026
revision); airport distances and constraints as stated there.

**Applied data revision (August 2026).** System sizing, AC capacities,
specific production, and Year-1 generation reflect the "DWS EU Ops Data
Request" August 2026 revision (rooftop layouts changed to landscape
orientation, 10° tilt, 1.2 ft row spacing, except Citria at Fruitville).
Portfolio totals under this revision: 31,399 kW DC; 51,169 MWh Year-1.
Monthly production distributions remain per the June 2026 PVsyst
simulation — the August workbook's monthly rows are pending ops input.

## Asset report data sources

- **System sizing, generation, monthly production distribution**: HelioScope
  simulation and PVsyst monthly distribution, per the DWS EU Fund Technical
  Data Request workbook ("Inputs for Claude.xlsx", June 2026). Yr-1 generation
  computed as kW DC × specific production (kWh/kWDC/yr) per mounting type.
- **Roof / parking areas**: occupied area per HelioScope; total area per
  Google Earth measurement (same workbook).
- **Points of interconnection**: estimated counts per the same workbook.
- **Grid emissions factors** (lbs CO₂e/MWh, total output emission rates by
  eGRID subregion): U.S. EPA eGRID summary tables — CAMX 430 (CA), FRCC 785
  (FL), RFCW 916 (IL), AZNM 706 (NV), SRVC 596 (NC), ERCT 737 (TX).
- **Equivalent homes**: U.S. EIA average annual household electricity
  consumption (~10.6 MWh/yr).
- **Lifetime CO₂e**: year-by-year sum over the stated term with 0.5%/yr module
  degradation applied.
- **Feasibility cost estimates**: indicative quotes from independent
  third-party licensed engineering firms; electrical scales per point of
  interconnection.
