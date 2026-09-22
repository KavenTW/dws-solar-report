// Portfolio document seed content. State one-pager copy is taken verbatim from
// "DWS State 1 Pagers - Revised 2026.07.02" (sources lines intentionally
// omitted from the document — see PORTFOLIO_SOURCES.md at the repo root).
// Everything here is a SEED: the working copy lives in localStorage
// (gcsr_portfolio) and is freely editable from the Portfolio tab.

export const STATE_ORDER = ['CA', 'NV', 'IL', 'FL', 'NC', 'TX'];

// State pages appear in this order throughout the document. The six-state
// scorecard that previously set this order has been removed; the order itself
// is retained.

export const PORTFOLIO_DEFAULTS = {
  // ── Title page ──
  title: 'Portfolio Solar Deployment Potential',
  subtitle: 'Rooftop & Carport Solar',
  reportMeta: 'Preliminary Solar Development Opportunity Assessment',
  preparedFor: 'DWS Asset Management',
  preparedBy: 'Great Circle Solar Management Corp.',
  reportDate: 'September 22, 2026',

  // ── Scope of engagement — Scope 1B of the executed advisory agreement.
  //     Reproduced for the client's reference; edit only against the agreement. ──
  scopeIntro: 'This document has been prepared under Scope 1B of the executed advisory agreement between DWS and Great Circle Solar Management Corp. ("GCS"). For the prioritized sites identified through Scope 1, GCS was engaged to provide further detailed analysis quantifying the maximum solar deployment potential across those sites.',
  scopeItems: [
    'Solar Capacity Assessment | Rooftop: where applicable, an estimate of the maximum rooftop solar capacity that could be accommodated based on building footprint and available rooftop area — an illustrative layout, estimated system capacity, and estimated annual production based on site solar resource assumptions.',
    'Solar Capacity Assessment | Carport: where applicable, a high-level estimate of the generation capacity that could be deployed through solar canopies based on parking lot footprint — an illustrative layout, estimated capacity supported by the parking area, and estimated annual production.',
    'Site Constraint Identification | For each site, the key technical, commercial and data-related constraints that must be addressed before projects can advance to full development feasibility — roof age and replacement timing, structural capacity, electrical infrastructure, tenant electricity consumption data requirements, metering, constraints on sizing or monetization arising from jurisdictional electricity market rules, and other jurisdictional or operational considerations.',
    'Portfolio Solar Deployment Potential | A portfolio-level summary across the evaluated sites — total estimated rooftop and parking canopy capacity, estimated annual generation potential, and further refinement of site prioritization for near-term opportunities and next steps.',
  ].join('\n'),

  // ── Executive summary (narrative; the KPI strip beneath it is computed live) ──
  execSummary: [
    'Great Circle Solar Management Corp. ("GCS") was engaged under Scope 1B of the executed advisory agreement to quantify the maximum solar deployment potential across the prioritized sites in the DWS portfolio, and has completed that preliminary desktop assessment.',
    'Assets are grouped below into three prioritization groups reflecting deployment potential and site readiness. A market one-pager for each state summarizes the utility billing framework, REC program availability and key development considerations, and the individual opportunity assessment for every asset is provided in the appendices.',
    'System sizing and generation estimates are derived from solar production simulation; roof and parking areas from aerial measurement; and avoided-emissions estimates from published regional grid-emissions factors. All figures are preliminary desktop estimates and are subject to the further detailed analysis described in each asset assessment and in the Next Steps section at the end of this document.',
  ].join('\n\n'),

  // ── Next steps (narrative; stage-gate chips render beneath it) ──
  nextSteps: [
    'GCS pre-feasibility for all assets in this document is complete and is reflected in the individual reports.',
    'For assets selected to advance, the recommended path is a stage-gated sequence of GCS-conducted pre-feasibility and third-party studies: site load analysis and system sizing, structural feasibility, geotechnical feasibility (carport sites), electrical feasibility, and preparation of interconnection documentation. Each workstream is estimated at approximately four weeks per site and can run concurrently where preferred; sequencing them instead allows a project to proceed, pause, or redirect before further cost is committed.',
    'Indicative costs for each study are stated in the individual asset reports and depend on actual on-site conditions, the number of roof structures, and the number of points of interconnection. All studies must be completed by locally licensed and certified engineering firms; GCS can assist in coordinating appropriate firms upon engagement.',
  ].join('\n\n'),

  // ── Proposed asset prioritization (its own page; drives the Executive
  //     Summary, the capacity chart and the Portfolio Asset Summary grouping).
  //     DRAFT membership — assigned by GCS for review, fully editable. ──
  tiers: [
    {
      name: 'Prioritization Group 1',
      assets: 'Eastland Center; The Shops at Oak Brook Place; Courtyard at the Commons; DC Station Retail; Tuscany on Fig',
      rationale: 'Highest-priority projects to advance first.',
    },
    {
      name: 'Prioritization Group 2',
      assets: '1201 Avenue S; 100 Hamilton; Citria at Fruitville Commons; London Square; Candour House',
      rationale: 'Promising projects, but with notable constraints or more uncertainty.',
    },
    {
      name: 'Prioritization Group 3',
      assets: 'Tropical Center II; Post & Paddock; Lakeside B; Lakeside A',
      rationale: 'Lowest-priority projects due to limited opportunity, scale, complexity or questionable economics, or where deployment is best aligned with scheduled roof replacement.',
    },
  ],

  // ── Net metering & system sizing — renders after the methodology narrative
  //     and before the glossary. ──
  sizingBasis: [
    'The system capacities presented in this document are maximum buildable capacities: the largest rooftop and carport arrays that the available roof and parking areas can physically accommodate. This reflects the scope of this engagement, which was to quantify maximum solar deployment potential across the portfolio. Analysis of on-site electrical load was not within that scope and has not been performed.',
    'In practice, system size is usually constrained by consumption rather than by area. Net metering and equivalent billing frameworks in most of the states reviewed require a system to be sized at or below the host customer’s own electricity requirements, and several impose explicit capacity caps in addition. Where those rules apply, a system cannot be built to the capacity stated here unless the on-site load supports it.',
    'The capacities in this document should therefore be read as an upper bound for portfolio planning, not as recommended system sizes. Confirmation of on-site electrical load is required for any asset advanced to feasibility, and the system size for that asset must be re-established against the confirmed load and the applicable utility framework before it is taken forward.',
  ].join('\n'),

  // ── Key considerations — document-level, high level. The per-asset
  //     "Issues for Further Consideration" sections carry the site specifics. ──
  keyConsiderationsIntro: 'The following apply across the portfolio and should be read alongside the issues identified for each individual asset.',
  keyConsiderations: [
    'On-site load analysis | System sizing in this document reflects the maximum buildable area, not the load available to absorb it. Detailed analysis of on-site electrical load is required at each site to inform final system sizing, and a review of metering infrastructure is required to confirm which meters to proceed with before electrical feasibility is commissioned.',
    'Roof age and replacement timing | Several assets have roof replacements already scheduled. Where a replacement falls within the early years of a system\'s operating life, the solar installation should be coordinated with those works rather than advanced ahead of them, to avoid removing and reinstalling an array.',
    'Objective and return alignment | The prioritization proposed in this document reflects deployment potential and site readiness. Confirmation of DWS investment objectives, hold periods and return requirements is required before the priority groups can be treated as an investment recommendation.',
  ].join('\n'),

  // ── Methodology & basis of estimates (renders after the TOC) ──
  methodology: [
    'System sizing reflects the maximum buildable rooftop and carport layouts identified for each asset using solar design software, subject to the site conditions visible from aerial imagery and available drawings. Actual buildable capacity may be further constrained by site electrical loads and consumption profiles, which are assessed in the next stage of analysis.',
    'Year-one generation is calculated as DC capacity multiplied by the modelled specific production for each array. The monthly figures apply the modelled seasonal profile for each site to that annual total, and are therefore indicative of distribution across the year rather than independent monthly estimates. Roof and parking areas occupied are measured from the proposed layouts; total available areas are measured from aerial imagery.',
    'Avoided-emissions estimates apply regional grid output emission factors published by the U.S. Environmental Protection Agency (eGRID) for each asset’s grid subregion to modelled generation, summed over a 25-year term with 0.5% annual module degradation. Household equivalents reflect average U.S. residential electricity consumption as published by the U.S. Energy Information Administration.',
    'Indicative feasibility costs are based on quotations obtained from independent, licensed engineering firms for comparable scopes, scaled where noted by site characteristics such as the number of points of interconnection. The number of points of interconnection is estimated from the existing electrical service arrangement identified during pre-feasibility and is confirmed through system sizing and electrical assessments. All figures are preliminary desktop estimates prepared for screening purposes.',
  ].join('\n\n'),

  // ── Glossary (one entry per line: "Term — definition") ──
  glossary: [
    'Prioritization group — The grouping applied to each asset in this document, reflecting relative deployment potential and site readiness; set out in Proposed Asset Prioritization.',
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
    'DWS and GCS to discuss and agree upon assets to advance to feasibility based on project specifics and program objectives.',
  ].join('\n'),

  // ── Document-level disclaimer (renders once, at the very end) ──
  disclaimer: [
    'This document presents preliminary estimates based on desktop analysis, simulation outputs, and publicly available data for the assets identified herein. All figures are projections subject to change following site survey, structural engineering review, utility interconnection study, and final equipment selection.',
    'Grid emissions factors are drawn from published regional grid data; avoided-emissions figures assume full displacement of grid electricity by solar generation and include module degradation over the stated term. State-level market commentary is directional screening, not underwriting or legal advice. Utility tariffs, program rules and REC values must be confirmed for each asset at the time of contracting.',
    'This document does not constitute a binding contract, engineering certification, or financial, tax or legal advice.',
  ].join('\n\n'),

  // ── Inclusion control: saved projects excluded from the compiled document ──
  excludedProjects: [],

  // ── TOC page numbers (slug → user-entered number, filled after a test print) ──
  tocPages: {},

  // ── State one-pagers (verbatim from the user's draft; editable) ──
  states: {
    CA: {
      name: 'California',
      subtitle: 'Rooftop & Carport Solar Market One-Pager',
      repUtility: 'PG&E, SCE and SDG&E; municipal utilities assessed separately',
      projectSummary: [
        'High avoidable energy charges and strong solar resource.',
        'Exports are credited at avoided cost, so load matching is central.',
        'Palo Alto and LADWP run separate programs.',
      ].join('\n'),
      marketPosition: [
        'High retail and solar-avoided charges for daytime heavy power consumers.',
        'Strongest where daytime demand is sustained.',
        'Weaker weighted average avoided charges when solar output would largely be exported to the grid at approximately wholesale rates.',
      ].join('\n'),
      utilityBilling: [
        'On-site load is served first under the Net Billing Tariff.',
        'Exports are credited hourly, below the retail import rate.',
        'Demand and non-bypassable charges are not uniformly reduced.',
        'Best practice requires modelling historic interval loads and simulated solar production against the solar tariff.',
      ].join('\n'),
      recProgram: [
        'Voluntary REC market; no standardized state contract.',
        'RECs may be sold bilaterally or passed to the tenant.',
      ].join('\n'),
      devConsiderations: [
        'AB 2143 prevailing-wage and reporting requirements apply.',
        'Interconnection is utility-specific under Rule 21.',
        'Municipal utilities have separate eligibility rules.',
        'Warehouse properties located in the South Coast AQM District over 100,000 SF may unlock additional monetization opportunities through the WAIRE program.',
      ].join('\n'),
      groupingRationale: [
        'Eastland Center | ',
        'Courtyard at the Commons | ',
        'DC Station Retail | ',
        'Tuscany on Fig | ',
        '100 Hamilton | ',
      ].join('\n'),
      projectsIntro: '',
    },
    NV: {
      name: 'Nevada',
      subtitle: 'Rooftop & Carport Solar Market One-Pager',
      repUtility: 'NV Energy',
      projectSummary: [
        'Excellent solar resource and a favourable billing structure.',
        'A single-utility framework simplifies diligence.',
        '1 MW cap on exporting systems, and relatively low retail electricity rates.',
      ].join('\n'),
      marketPosition: [
        'Among the strongest solar resources in the United States.',
        'Best suited to facilities that absorb output on site.',
        'Lower rates temper the resource advantage.',
      ].join('\n'),
      utilityBilling: [
        'NMR-B applies from 25 kW to 1,000 kW.',
        'Excess is carried forward as kWh credits.',
        'Under time-of-use, credits stay in the period produced.',
        'Service and demand charges remain.',
      ].join('\n'),
      recProgram: [
        'Recognized Portfolio Energy Credit market.',
        'No fixed-price state purchase contract.',
      ].join('\n'),
      devConsiderations: [
        'The 1 MW cap can prevent full use of large roofs.',
      ].join('\n'),
      groupingRationale: [
        'Tropical Center II | ',
      ].join('\n'),
      projectsIntro: '',
    },
    IL: {
      name: 'Illinois',
      subtitle: 'Rooftop & Carport Solar Market One-Pager',
      repUtility: 'ComEd',
      projectSummary: [
        'Historically high solar penetration through state-led programs.',
        'Illinois Shines can provide contracted REC revenue.',
        'Weaker resource and supply-only export treatment offset this.',
      ].join('\n'),
      marketPosition: [
        'Moderate prices; weakest solar resource in the portfolio.',
        'Contracted REC revenue is unique to this state.',
        'Requires REC capacity, interconnection and load to align.',
      ].join('\n'),
      utilityBilling: [
        'Large C&I customers are generally declared supply customers.',
        'Exports receive supply-only net-metering credit.',
        'On-site use still reduces energy and some delivery charges.',
      ].join('\n'),
      recProgram: [
        'Large DG covers 10 kW AC to 2 MW AC behind the meter.',
        '2026 approvals use a 15-year REC contract.',
        '15% is paid at energization, the balance over six years.',
        'Pricing, capacity and timing are confirmed each program year.',
      ].join('\n'),
      devConsiderations: [
        'Prevailing-wage compliance applies to most projects.',
        'Hosting capacity and program queues affect timing. PJM is a historically constrained region.',
      ].join('\n'),
      groupingRationale: [
        'The Shops at Oak Brook Place | ',
      ].join('\n'),
      projectsIntro: '',
    },
    FL: {
      name: 'Florida',
      subtitle: 'Rooftop & Carport Solar Market One-Pager',
      repUtility: 'Florida Power & Light',
      projectSummary: [
        'Direct sale of electricity from landlord to tenant via a per-kWh PPA may classify the landlord as a public utility.',
        'Legal review of investment structuring will be required prior to tenant commercial conversations.',
      ].join('\n'),
      marketPosition: [
        'Moderate resource and commercial prices.',
        'Monthly netting suits variable load.',
        'Demand and minimum-bill components remain.',
        'Structure, not tariff, tends to decide executability.',
      ].join('\n'),
      utilityBilling: [
        'Tier 3 covers 100 kW to 2 MW.',
        'Excess kWh carry forward for up to twelve months.',
        'Annual residual credits settle at the avoided-energy rate.',
        'Minimum, base and demand charges still apply.',
      ].join('\n'),
      recProgram: [
        'No material state REC procurement for new C&I projects.',
      ].join('\n'),
      devConsiderations: [
        'Commercial structure is the central issue.',
        'Tier 3 review, disconnect and protection equipment apply.',
        'Transformer upgrades may be required.',
        'Hurricane wind load and corrosion engineering where applicable.',
      ].join('\n'),
      groupingRationale: [
        'Citria at Fruitville Commons | ',
        'London Square | ',
      ].join('\n'),
      projectsIntro: '',
    },
    NC: {
      name: 'North Carolina',
      subtitle: 'Rooftop & Carport Solar Market One-Pager',
      repUtility: 'Duke Energy Carolinas / Duke Energy Progress',
      projectSummary: [
        'Strong net-metering position.',
        'Low solar-avoidable electricity rates.',
        'Direct sale of electricity from landlord to tenant via a per-kWh PPA may classify the landlord as a public utility.',
        'State law provides for an equipment lease to the tenant as a compliant alternative, subject to certification and prescribed lease terms.',
      ].join('\n'),
      marketPosition: [
        'Moderate resource and low large-commercial avoided rates.',
        'Needs strong daytime load and a compliant structure.',
      ].join('\n'),
      utilityBilling: [
        'Net metering is available up to 1,000 kW.',
        'Leased systems are capped at the customer’s contract demand.',
        'Systems must offset no more than the tenant’s own use.',
      ].join('\n'),
      recProgram: [
        'NC-RETS tracks RECs for portfolio-standard compliance.',
        'No standardized long-term fixed-price contract.',
        'REC ownership and transfer should be stated expressly.',
      ].join('\n'),
      devConsiderations: [
        'An equipment lease to the tenant is the compliant structure.',
        'The lessor must hold an NCUC certificate and register each facility.',
        'Legal review of investment structuring will be required prior to tenant commercial conversations.',
        'Alternative structures add complexity.',
      ].join('\n'),
      groupingRationale: [
        'Candour House | ',
      ].join('\n'),
      projectsIntro: '',
    },
    TX: {
      name: 'Texas',
      subtitle: 'Rooftop & Carport Solar Market One-Pager',
      repUtility: 'Oncor delivery territory with a competitive Retail Electric Provider',
      projectSummary: [
        'Strong resource and a flexible competitive retail market.',
        'No uniform statewide net-metering tariff.',
        'Lowest avoidable electricity-rate score in the group.',
        'Value rests on self-consumption and the retail export product.',
      ].join('\n'),
      marketPosition: [
        'Strong resource, particularly in North and West Texas.',
        'On-site arrangements are more workable than in Florida or North Carolina.',
        'Low energy prices limit avoided-cost value.',
        'Best at high daytime load with a long-term tenant.',
      ].join('\n'),
      utilityBilling: [
        'The delivery utility handles interconnection and metering.',
        'The retail provider supplies imports and may buy exports.',
        'Exports need not be bought at the import price.',
        'Export credit may be capped or unavailable.',
      ].join('\n'),
      recProgram: [
        'The state administers a REC trading program.',
        'Credits may be sold bilaterally or passed to the tenant.',
        'No state-administered fixed-price purchase program.',
      ].join('\n'),
      devConsiderations: [
        'Dependent on the delivery utility program.',
        'No standard tariff or state-led programs create renewal and repricing risk.',
        'A deregulated energy market creates uncertainty with near- and long-term energy rates.',
      ].join('\n'),
      groupingRationale: [
        '1201 Avenue S | ',
        'Post & Paddock | ',
        'Lakeside B | ',
        'Lakeside A | ',
      ].join('\n'),
      projectsIntro: '',
    },
  },
};
