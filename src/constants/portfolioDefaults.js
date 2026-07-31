// Portfolio document seed content. State one-pager copy is taken verbatim from
// "DWS State 1 Pagers - Revised 2026.07.02" (sources lines intentionally
// omitted from the document — see PORTFOLIO_SOURCES.md at the repo root).
// Everything here is a SEED: the working copy lives in localStorage
// (gcsr_portfolio) and is freely editable from the Portfolio tab.

export const STATE_ORDER = ['CA', 'NV', 'IL', 'FL', 'NC', 'TX'];

// Shared scorecard — identical table on every state page (column order matches STATE_ORDER).
// The client view renders COLOUR BANDS only (3 → strong, 2 → moderate, 1 → weak);
// the numeric scores, category weights, and weighted totals below are retained
// as the auditable basis for those colours and are not printed in the document.
export const SCORECARD = {
  stateNames: ['California', 'Nevada', 'Illinois', 'Florida', 'North Carolina', 'Texas'],
  rows: [
    { category: 'Utility Billing Structure',    scores: [2, 3, 2, 3, 3, 2], weight: 7 },
    { category: 'State-Led REC Program',        scores: [1, 2, 3, 1, 2, 1], weight: 8 },
    { category: 'Prevailing Electricity Rates', scores: [3, 1, 2, 2, 1, 1], weight: 10 },
    { category: 'Solar Resource',               scores: [3, 3, 1, 2, 2, 3], weight: 5 },
    { category: 'Other Considerations',         scores: [2, 3, 2, 1, 1, 2], weight: 6 },
  ],
  weighted: ['2.2', '2.2', '2.1', '1.8', '1.8', '1.6'],
  // Overall band per state, derived from the weighted totals above
  // (≥2.0 → strong; 1.7–1.9 → moderate; <1.7 → weak). Mirrors the header
  // badges: LEADING / POLICY-LED → strong, SELECTIVE → moderate,
  // OPPORTUNISTIC → weak.
  overall: [3, 3, 3, 2, 2, 1],
  footnote: 'Relative colour bands for these six states; assumes large C&I behind-the-meter rooftop/carport projects generally up to 1 MWac. Other Considerations includes system-size limits, third-party ownership, interconnection and program compliance.',
};

const SCREENING_NOTE = 'Screening note: Current as at the date of this document. State-level ratings are directional; final underwriting requires the applicable utility tariff, interval load, interconnection review and project-specific legal documentation.';

export const PORTFOLIO_DEFAULTS = {
  // ── Title page ──
  title: 'Solar Feasibility Portfolio Review',
  subtitle: 'Behind-the-Meter Rooftop & Carport Solar',
  reportMeta: 'Preliminary Solar Feasibility Assessment',
  preparedFor: 'DWS Asset Management',
  preparedBy: 'Great Circle Solar Management Corp.',
  reportDate: '',

  // ── Executive summary (narrative; the KPI strip beneath it is computed live) ──
  execSummary: [
    'Great Circle Solar Management Corp. ("GCS") has completed a preliminary desktop feasibility review of behind-the-meter rooftop and carport solar opportunities across assets in the DWS portfolio, located in six U.S. states.',
    'This document presents the results of that review. For each state, a market one-pager summarises the utility billing framework, REC program availability, and key development considerations, followed by an individual feasibility report for each asset in that state. States appear in order of relative market attractiveness per the scorecard included on each state page.',
    'System sizing and generation estimates are derived from solar production simulation; roof and parking areas from aerial measurement; and avoided-emissions estimates from published regional grid-emissions factors. All figures are preliminary desktop estimates and are subject to the further detailed analysis described in each asset report and in the Next Steps section at the end of this document.',
  ].join('\n\n'),

  // ── Next steps (narrative; stage-gate chips render beneath it) ──
  nextSteps: [
    'GCS pre-feasibility for all assets in this document is complete and is reflected in the individual reports.',
    'For assets selected to advance, the recommended path is a stage-gated sequence of third-party studies: structural feasibility, geotechnical feasibility (carport sites), electrical feasibility, and utility interconnection documentation. Each workstream is estimated at approximately four weeks and can run concurrently per site where preferred; sequencing them instead allows a project to proceed, pause, or redirect before further cost is committed.',
    'Indicative costs for each study are stated in the individual asset reports and depend on actual on-site conditions, the number of roof structures, and the number of points of interconnection. All studies must be completed by locally licensed and certified engineering firms; GCS can assist in coordinating appropriate firms upon engagement.',
  ].join('\n\n'),

  // ── Proposed asset prioritisation (rendered in the Executive Summary;
  //     directional proposal for discussion — fully editable) ──
  tiers: [
    {
      name: 'Tier 1 — Advance',
      assets: 'Eastland Center; Courtyard at the Commons; Tropical Center II; The Shops at Oak Brook Place',
      rationale: 'Strongest state market bands (California and Nevada leading; Illinois policy-led), largest system scale, and conventional structures. Recommended to proceed directly to stage-one structural feasibility.',
    },
    {
      name: 'Tier 2 — Advance subject to confirmations',
      assets: 'DC Station Retail; London Square; Citria at Fruitville Commons; Candour House; Post & Paddock; Lakeside B',
      rationale: 'Attractive scale with site-specific items to resolve first: structural capacity above parking structures, glare-study requirements, roof type, and metering or contracting structure.',
    },
    {
      name: 'Tier 3 — Hold / opportunistic',
      assets: '100 Hamilton; Tuscany on Fig; 1201 Avenue S; Lakeside A',
      rationale: 'Limited system scale, municipal-utility frameworks assessed separately from the state programs (Palo Alto, LADWP), or the weakest market band relative to system size.',
    },
  ],

  // ── Methodology & basis of estimates (renders after the TOC) ──
  methodology: [
    'System sizing reflects the maximum buildable rooftop and carport layouts identified for each asset using solar design software, subject to the site conditions visible from aerial imagery and available drawings.',
    'Year-one generation is calculated as DC capacity multiplied by the modelled specific production for each mounting type; monthly distribution follows detailed simulation for each site. Roof and parking areas occupied are measured from the proposed layouts; total available areas are measured from aerial imagery.',
    'Avoided-emissions estimates apply published regional grid output emission factors for each asset’s grid subregion to modelled generation, summed over a 25-year term with 0.5% annual module degradation. Household equivalents reflect average U.S. residential electricity consumption.',
    'Indicative feasibility costs are based on quotations obtained from independent, licensed engineering firms for comparable scopes, scaled where noted by site characteristics such as the number of points of interconnection. All figures are preliminary desktop estimates prepared for screening purposes.',
  ].join('\n\n'),

  // ── Glossary (one entry per line: "Term — definition") ──
  glossary: [
    'Behind-the-Meter (BTM) — A solar system connected on the customer’s side of the utility meter, serving on-site load before exporting to the grid.',
    'kW DC / kW AC — Direct-current module capacity versus alternating-current inverter capacity of a system.',
    'Specific production (MWh/MWdc) — Expected annual energy yield per megawatt of DC capacity, reflecting local solar resource and system design.',
    'Point of interconnection — The location where a solar system connects to the utility or customer electrical infrastructure; a key driver of electrical feasibility cost.',
    'Net metering / Net Billing Tariff (NBT) — Utility frameworks that determine how exported solar energy is credited.',
    'Renewable Energy Certificate (REC) — A tradeable certificate representing the environmental attributes of one MWh of renewable generation.',
    'WAIRE — The South Coast AQMD Warehouse Actions and Investments to Reduce Emissions program, under which qualifying on-site solar earns compliance points.',
    'Geotechnical assessment — Subsurface investigation confirming foundation conditions, required for carport structures.',
    'CO₂e — Carbon-dioxide equivalent, the standard unit for greenhouse-gas accounting.',
  ].join('\n'),

  // ── Proposed immediate actions (bullet list at the end of Next Steps) ──
  nextActions: [
    'DWS to confirm the priority assets to advance to stage-one structural feasibility.',
    'GCS to obtain firm structural-feasibility quotations and confirmed timelines for the selected assets.',
    'Remaining gates (geotechnical for carport sites, electrical, and interconnection documentation) to proceed per the sequence above as each stage clears.',
  ].join('\n'),

  // ── Document-level disclaimer (renders once, at the very end) ──
  disclaimer: [
    'This document presents preliminary estimates based on desktop analysis, simulation outputs, and publicly available data for the assets identified herein. All figures are projections subject to change following site survey, structural engineering review, utility interconnection study, and final equipment selection.',
    'Grid emissions factors are drawn from published regional grid data; avoided-emissions figures assume full displacement of grid electricity by solar generation and include module degradation over the stated term. State-level market commentary is directional screening, not underwriting or legal advice. Utility tariffs, program rules and REC values must be confirmed for each asset at the time of contracting.',
    'This document does not constitute a binding contract, engineering certification, or financial, tax or legal advice.',
  ].join('\n\n'),

  // ── Inclusion control: saved projects excluded from the compiled document ──
  excludedProjects: ['Courtyard at the Commons Solar'],

  // ── TOC page numbers (slug → user-entered number, filled after a test print) ──
  tocPages: {},

  // ── State one-pagers (verbatim from the user's draft; editable) ──
  states: {
    CA: {
      name: 'California',
      subtitle: 'Behind-the-Meter Rooftop & Carport Solar Market One-Pager',
      repUtility: 'PG&E, SCE and SDG&E; municipal utilities assessed separately',
      badge: 'LEADING',
      projectSummary: 'California remains one of the strongest economic markets in the group because high solar-avoidable energy charges and strong solar resource can support meaningful onsite savings. The central constraint is the CPUC Net Billing Tariff: exported energy receives time-varying, avoided-cost-based credits, making load matching and interval tariff modelling essential. Municipal utilities such as Palo Alto and LADWP operate separate programs and should not be screened using the CPUC framework.',
      marketPosition: 'The market combines the highest electricity-rate score in the portfolio with strong irradiance and a mature commercial solar ecosystem. The opportunity is strongest at properties with sustained daytime demand. Standalone solar becomes less attractive where a material share of output would be exported, particularly when the customer load falls before higher-priced evening periods.',
      utilityBilling: "For the three investor-owned utilities, onsite generation first serves onsite load under the Net Billing Tariff. Excess production is credited using hourly Energy Export Credits rather than the customer's retail import rate. Large commercial bills also contain demand, fixed and non-bypassable components that solar does not uniformly eliminate. The underwriting model should therefore apply the actual tariff to interval load and production data rather than use a blended retail rate.",
      recProgram: 'California does not provide a standardised state-administered REC purchase contract for ordinary C&I rooftop and carport projects. Any REC value should be treated as project-specific merchant or bilateral revenue, not a core portfolio assumption.',
      devConsiderations: 'Qualifying NEM/NBT projects are subject to AB 2143 prevailing-wage and payroll-reporting requirements. Interconnection is utility-specific under Rule 21, and municipal utilities have separate eligibility and compensation rules. For warehouses in the South Coast AQMD area, qualifying onsite solar may also contribute WAIRE compliance points; this is a site-specific operating benefit rather than a statewide solar tariff.',
      projectsIntro: '',
      screeningNote: SCREENING_NOTE,
    },
    NV: {
      name: 'Nevada',
      subtitle: 'Behind-the-Meter Rooftop & Carport Solar Market One-Pager',
      repUtility: 'NV Energy',
      badge: 'LEADING',
      projectSummary: 'Nevada is a leading market in this portfolio because it combines excellent solar resource with a comparatively favourable utility billing structure and a concentrated utility framework. For large C&I projects, the principal limitations are the 1 MW net-metering cap and relatively low solar-avoidable electricity rates. Projects should be sized to onsite load and screened carefully for the value of demand-charge reduction.',
      marketPosition: 'Nevada has one of the strongest solar resources in the United States and a relatively straightforward market structure dominated by NV Energy. The state is most attractive for high-load commercial facilities that can absorb production onsite. Lower prevailing rates than California mean the policy and resource advantages do not automatically produce high returns.',
      utilityBilling: "NV Energy's NMR-B tariff applies to non-small systems above 25 kW and below 1,000 kW. Excess generation is recorded as kWh credits and carried forward to future billing periods; under time-of-use service, credits generally remain in the period in which they were produced. The structure is favourable relative to the other states, but it does not eliminate basic service, demand or other non-volumetric charges. A system must be intended primarily to offset the customer's electricity requirements.",
      recProgram: "Nevada operates a recognised Portfolio Energy Credit market for renewable portfolio compliance, and NV Energy's current interconnection handbook states that credits issued for a customer solar system belong to the system owner. The market does not provide an Illinois-style fixed-price state purchase contract, so REC revenue should be treated as market-exposed.",
      devConsiderations: 'The 1 MW project cap is the main portfolio constraint and can prevent full use of large roofs or carports. Interconnection may still require distribution upgrades, and the commercial agreement must align the landlord, tenant and utility customer of record. Within those limits, the single-utility framework and established net-metering process make Nevada comparatively straightforward to diligence and execute.',
      projectsIntro: '',
      screeningNote: SCREENING_NOTE,
    },
    IL: {
      name: 'Illinois',
      subtitle: 'Behind-the-Meter Rooftop & Carport Solar Market One-Pager',
      repUtility: 'ComEd',
      badge: 'POLICY-LED',
      projectSummary: 'Illinois is the strongest policy-driven market in the group. The Illinois Shines Large Distributed Generation category can provide a long-term, state-administered REC revenue stream that materially improves project economics. That benefit is offset by weaker solar resource and supply-only net-metering treatment for large C&I exports, making daytime self-consumption and REC program eligibility the central underwriting variables.',
      marketPosition: 'Illinois has moderate commercial electricity prices and the weakest solar resource score in the portfolio. The market remains attractive because Illinois Shines can provide contracted REC revenue that is not available in the other states. The best projects combine available REC capacity, a clean interconnection path and a customer load profile that minimises exports.',
      utilityBilling: "In ComEd territory, large commercial and industrial customers are generally competitively declared supply customers and receive supply-only net-metering credits for excess generation. Onsite production can still reduce imported energy and certain delivery charges, but exported energy does not offset the full retail bill. The customer's retail supplier agreement should be reviewed for netted volumes, export-credit treatment and any interaction with hedged supply products.",
      recProgram: 'Illinois Shines is a state-administered program. Large DG covers behind-the-meter projects above 10 kW AC and up to 2 MW AC. For 2026 approvals, Large DG uses a 15-year REC delivery contract, with 15% of the calculated REC payment made at energization and the remainder paid ratably over six years. REC pricing, category capacity and application timing must be confirmed for each program year.',
      devConsiderations: 'Projects require an Illinois Shines Approved Vendor and must satisfy program documentation, metering and verification requirements. Most commercial DG projects are subject to prevailing-wage compliance. Distribution hosting capacity and interconnection upgrades can constrain projects, while program-category capacity and application queues can affect timing even where the roof and load are otherwise attractive.',
      projectsIntro: '',
      screeningNote: SCREENING_NOTE,
    },
    FL: {
      name: 'Florida',
      subtitle: 'Behind-the-Meter Rooftop & Carport Solar Market One-Pager',
      repUtility: 'Florida Power & Light',
      badge: 'SELECTIVE',
      projectSummary: 'Florida offers a favourable net-metering structure and a workable system-size limit for large commercial projects, but the contemplated landlord-to-tenant business model faces a material regulatory constraint. A direct per-kWh sale of solar electricity by a private landlord can create public-utility risk. Projects should be structured so that the tenant remains the utility customer and does not purchase electricity from the landlord, subject to Florida regulatory counsel.',
      marketPosition: 'Florida has moderate solar resource and commercial electricity prices relative to the six-state group. Full monthly kWh netting can support projects with variable load, but demand and minimum-bill components remain. The state is therefore a selective market: the tariff can be attractive, while ownership and contracting structure may determine whether a project is executable.',
      utilityBilling: "FPL classifies systems above 100 kW and up to 2 MW as Tier 3. Excess kWh are carried forward and used to offset energy use in later months for up to twelve months; remaining annual credits are settled using FPL's avoided-energy tariff. The customer remains responsible for the greater of the applicable minimum charge or the base and demand charges under its rate schedule. Tier 3 projects also face project-specific interconnection review and upgrade exposure.",
      recProgram: 'Florida does not offer a material state-administered REC procurement program for new C&I rooftop and carport projects. REC revenue should not be included as a standard underwriting assumption.',
      devConsiderations: 'The central issue is the landlord-to-tenant commercial structure. Florida law and precedent create risk where an unregulated entity supplies electricity for compensation, even to a single customer. Additional diligence includes Tier 3 application requirements, visible disconnect and protection equipment, potential transformer upgrades, and engineering for hurricane wind loads, water intrusion and coastal corrosion where applicable.',
      projectsIntro: '',
      screeningNote: SCREENING_NOTE,
    },
    NC: {
      name: 'North Carolina',
      subtitle: 'Behind-the-Meter Rooftop & Carport Solar Market One-Pager',
      repUtility: 'Duke Energy Carolinas / Duke Energy Progress',
      badge: 'SELECTIVE',
      projectSummary: "North Carolina combines a strong current net-metering score and a recognised REC compliance market with low solar-avoidable electricity rates and a significant contracting restriction. A landlord generally should not sell electricity to a tenant under a per-kWh PPA. A compliant equipment lease can be used, but it must follow the statutory leasing framework and cannot base payments on the system's electric output.",
      marketPosition: 'The state has a substantial solar sector, but utility-scale development does not translate directly into strong C&I rooftop economics. Solar resource is moderate and large-commercial avoided rates are comparatively low. The market is most viable where the property has strong daytime consumption, a clean Duke interconnection path and a commercial structure that complies with the Distributed Resources Access Act.',
      utilityBilling: "Duke Energy currently offers net metering for non-residential renewable generation up to 1,000 kW. For a third-party leased system, the statutory size limit is the lesser of 1,000 kW or 100% of the customer's contract demand, and the system must be intended to offset no more than the tenant's own consumption. Long-term modelling should also account for tariff-transition risk: state law permits certain customers to retain the rate in effect at interconnection only through January 1, 2027.",
      recProgram: 'NC-RETS issues and tracks RECs used by utilities for state portfolio-standard compliance. This is a recognised compliance market, but it does not provide a standardised long-term fixed-price purchase contract comparable to Illinois Shines. REC ownership and transfer should be stated expressly in the equipment lease and project documents.',
      devConsiderations: 'A compliant structure is an equipment lease to the tenant, who remains the utility customer and owns the electrical output. The lessor must obtain an NCUC certificate, register each facility, serve one lessee at one premises and comply with required lease terms. A lease outside that framework, or an agreement with payments based on electric output, can cause the lessor to be treated as a public utility and violate the incumbent utility’s service rights.',
      projectsIntro: '',
      screeningNote: SCREENING_NOTE,
    },
    TX: {
      name: 'Texas',
      subtitle: 'Behind-the-Meter Rooftop & Carport Solar Market One-Pager',
      repUtility: 'Oncor delivery territory with a competitive Retail Electric Provider',
      badge: 'OPPORTUNISTIC',
      projectSummary: "Texas has strong solar resource and a flexible competitive retail market, but it lacks a uniform statewide net-metering tariff and has the lowest solar-avoidable electricity-rate score in the group. Project economics depend primarily on onsite self-consumption and the export product offered by the tenant's Retail Electric Provider. The market is therefore opportunistic rather than broadly program-driven.",
      marketPosition: 'The resource is strong, particularly in North and West Texas, and third-party onsite arrangements are generally more commercially workable than in Florida or North Carolina. However, low energy prices and competitive supply contracts can limit avoided-cost value. The opportunity is strongest at facilities with high daytime load, limited exports and a long-term tenant commitment.',
      utilityBilling: 'In competitive ERCOT areas, the transmission and distribution utility handles interconnection and metering, while the Retail Electric Provider supplies imported energy and may purchase exported energy. Texas does not require a REP to buy exports at the same price charged for imports. Export credit may be fixed, market-linked, capped or unavailable, and delivery and demand charges may remain. The REP contract is therefore a core project document.',
      recProgram: 'ERCOT administers a statewide REC trading program, and eligible small producers may register to earn and trade RECs. The score remains 1 because Texas does not offer a state-administered fixed-price REC procurement program for ordinary C&I rooftop projects. Merchant REC revenue should not be relied upon without a specific buyer and transfer arrangement.',
      devConsiderations: 'The owner, tenant, customer of record, REP and Oncor must be aligned before interconnection and commercial close. The project must complete the TDU interconnection process, and the export arrangement must be accepted by the REP. The absence of a standard statewide tariff creates renewal and repricing risk when the tenant changes supplier or its retail contract expires.',
      projectsIntro: '',
      screeningNote: SCREENING_NOTE,
    },
  },
};
