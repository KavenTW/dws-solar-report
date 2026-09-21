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

**Six-state scorecard — REMOVED from the document.** The scorecard (category
scores 1-3, weights /10, weighted totals CA 2.2, NV 2.2, IL 2.1, FL 1.8,
NC 1.8, TX 1.6), its colour bands, the Overall Market Position row and the
state header badges (LEADING / POLICY-LED / SELECTIVE / OPPORTUNISTIC) were
removed at the client's direction. The state page ORDER it produced is
retained: CA, NV, IL, FL, NC, TX. The source list above still supports the
state one-pager narrative, which remains in the document.

**Proposed Asset Prioritization — BASIS NOT YET RECORDED.**

> **OPEN ITEM — needs GCS sign-off before the document is issued.** The three
> prioritization groups are the document's central recommendation, and this
> register currently records no basis for them. The membership seeded in
> `portfolioDefaults.js` is a DRAFT assigned for review. Per-asset
> prioritization notes have been retired — the group rationale on the
> Proposed Asset Prioritization page is now the only explanation. Until the factors
> and their relative weighting are recorded here, the document makes a
> prioritization claim with nothing auditable behind it — the same gap raised
> in review of the previous scorecard-based ranking.

The factors carried in the draft grouping are: roof age and scheduled
replacement timing; system scale (kW DC) and roof/parking utilization;
structural and site constraints (existing rooftop systems, vegetation over
parking areas, distributed roof planes); points of interconnection; and
jurisdictional constraints on sizing or monetization. Their relative
weighting is not defined. Confirmation of DWS investment objectives, hold
periods and return requirements is also outstanding — recorded in the
document under Key Considerations.

**Roof vintage.** Roof installation/last-replacement year and scheduled
replacement year are from the 'Prioritization' sheet of EU Portfolio
2026.09.08 (columns G and H). Known for five assets only: Tuscany on Fig
(2006/2025), Tropical Center II (2019/2030), 1201 Avenue S (2014/2027),
Lakeside A, Lakeside B and Post & Paddock (2014/2033), plus 100 Hamilton
(replacement 2027, install year not stated). Tropical Center II's install
year is taken from the workbook comment recording a 20-year manufacturer
warranty in effect from 2019; the roof-age column states '6 years'. London
Square's roof age is recorded as '3-4 Years' rather than a year and has been
left blank pending confirmation. Every asset report prints both rows, showing
'To be confirmed' where the year is not known.

**Glare study.** Priced at $2,500–$5,000, ~4 weeks, noted "If required", and
included in the site total. Applied to the six assets whose site notes flag a
glare hazard: London Square, Tropical Center II, 1201 Avenue S, Lakeside A,
Lakeside B and Post & Paddock.

**Per-asset market context.** The per-project market-context fields are
populated for California assets only. They previously carried California text
on all fourteen assets; the section does not render in this document, and the
non-California copies have been cleared.

**Per-asset Site-Specific Considerations.** Drafted from the "technical notes
unique to the project" column of "DWS EU Ops Data Request" (August 2026
revision); airport distances and constraints as stated there.

**Applied data revision (August 2026).** System sizing, AC capacities,
specific production, and Year-1 generation reflect the "DWS EU Ops Data
Request" August 2026 revision (rooftop layouts changed to landscape
orientation, 10° tilt, 1.2 ft row spacing, except Citria at Fruitville).
Portfolio totals under this revision: 31,401 kW DC; 51,169 MWh Year-1.
Capacity columns total the rounded per-asset values so printed columns add up
to their printed totals; this puts the headline at 31,401 rather than the
31,399 that summing unrounded values and rounding once produced.
Monthly production distributions are the June 2026 PVsyst seasonal profile
(twelve percentages summing to 100%) applied to the August annual totals —
the August workbook's monthly rows were left blank for ops input. GCS has
accepted the June profile as the basis. Note the August revision changed
rooftop orientation and tilt, which shifts the seasonal curve slightly, so
the profile is indicative rather than an exact match to the current geometry;
the methodology page describes the monthly figures on that basis.

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
