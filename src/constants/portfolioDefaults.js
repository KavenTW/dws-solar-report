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
    'Site Constraint Identification | For each site, GCS will identify the key technical, commercial and data-related considerations that must be addressed in the next stage of feasibility assessments — roof age and replacement timing, structural capacity, electrical infrastructure, tenant electricity consumption data requirements, metering, constraints on sizing or monetization arising from jurisdictional electricity market rules, and other jurisdictional or operational considerations.',
    'Portfolio Solar Deployment Potential | A portfolio-level summary across the evaluated sites — total estimated rooftop and parking canopy capacity, estimated annual generation potential, and further refinement of site prioritization for near-term opportunities and next steps.',
  ].join('\n'),

  // ── Executive summary (narrative; the KPI strip beneath it is computed live) ──
  execSummary: [
    'Great Circle Solar Management Corp. ("GCS") was engaged under Scope 1B of the executed advisory agreement to quantify the maximum solar deployment potential across the prioritized sites in the DWS portfolio, and has completed that preliminary desktop assessment.',
    'Assets are grouped below into three prioritization groups reflecting deployment potential and site readiness. A market one-pager for each state summarizes the utility billing framework, REC program availability and key development considerations, and summarizes the projects analyzed in that state. The individual opportunity assessments are provided in the appendices.',
    'System sizing and generation estimates are derived from solar production simulation; roof and parking areas from aerial measurement; and avoided-emissions estimates from published regional grid-emissions factors. All figures are preliminary desktop estimates and are subject to the further detailed analysis described in each asset assessment and in the Next Steps section at the end of this document.',
  ].join('\n\n'),

  // ── Next steps (narrative; stage-gate chips render beneath it) ──
  nextSteps: [
    'GCS pre-feasibility for all assets in this document is complete and is reflected in the individual reports.',
    'For assets selected to advance, the recommended path is a stage-gated sequence of GCS-conducted pre-feasibility and third-party studies.',
    'Indicative costs for each study are stated in the individual asset reports and depend on actual on-site conditions, the number of roof structures, and the number of points of interconnection. The actual full feasibility costs will be determined after the Load Analysis is complete and final number of points of interconnection are determined. All studies must be completed by locally licensed and certified engineering firms; GCS can assist in coordinating appropriate firms upon engagement.',
  ].join('\n\n'),

  // ── Proposed asset prioritization (its own page; drives the Executive
  //     Summary, the capacity chart and the Portfolio Asset Summary grouping).
  //     DRAFT membership — assigned by GCS for review, fully editable. ──
  tiers: [
    {
      name: 'Prioritization Group 1',
      assets: 'Eastland Center; The Shops at Oak Brook Place; DC Station Retail; Tuscany on Fig',
      rationale: 'Highest-priority projects to advance first.',
    },
    {
      name: 'Prioritization Group 2',
      assets: 'Tropical Center II; 1201 Avenue S; Courtyard at the Commons; Candour House; 100 Hamilton',
      rationale: 'Promising projects, but with notable constraints or more uncertainty.',
    },
    {
      name: 'Prioritization Group 3',
      assets: 'Post & Paddock; Lakeside B; Citria at Fruitville Commons; Lakeside A; London Square',
      rationale: 'Lowest-priority projects due to limited opportunity, scale, complexity or questionable economics, where the state market framework defers deployment, or where deployment is best aligned with scheduled roof replacement.',
    },
  ],

  // ── Net metering & system sizing — renders after the methodology narrative
  //     and before the glossary. ──
  sizingBasis: [
    'The system capacities presented in this document are maximum buildable capacities: the largest rooftop and carport arrays that the available roof and parking areas can physically accommodate. This reflects the scope of this engagement, which was to quantify maximum solar deployment potential across the portfolio. Analysis of on-site electrical load was not within that scope and has not been performed.',
    'In practice, system size is usually constrained by consumption rather than by area. Net metering and equivalent billing frameworks in most of the states reviewed require a system to be sized at or below the host customer’s own electricity requirements. In some instances, state imposed solar system size caps are also imposed. The next phase of analysis will determine if any of these constraints apply.',
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
    'System sizing in this report reflects the maximum buildable rooftop and carport layouts identified for each asset using solar design software, subject to the site conditions visible from aerial imagery and available drawings. Actual buildable capacity may be further constrained by site electrical loads and consumption profiles, which are assessed in the next stage of analysis.',
    'Year-one generation is calculated as DC capacity multiplied by the modelled specific production for each array. The monthly figures apply the modelled seasonal profile for each site to that annual total, and are therefore indicative of distribution across the year rather than independent monthly estimates.',
    'Avoided-emissions estimates apply regional grid output emission factors published by the U.S. Environmental Protection Agency (eGRID) for each asset’s grid subregion to modelled generation, summed over a 25-year term with 0.5% annual module degradation. Household equivalents reflect average U.S. residential electricity consumption as published by the U.S. Energy Information Administration.',
    'Indicative feasibility costs are based on quotations obtained from independent, licensed engineering firms for comparable scopes, scaled where noted by site characteristics such as the number of points of interconnection. All figures are preliminary desktop estimates prepared for screening purposes.',
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
        'Mature solar market.',
        'High avoidable energy charges and strong solar resource.',
        'Majority of state serviced by three primary utilities which are regulated by the CPUC. Select municipalities are served by smaller utilities, of which some are represented in this portfolio.',
      ].join('\n'),
      marketPosition: [
        'High retail and solar-avoided charges for daytime heavy power consumers.',
        'Strongest where daytime demand is sustained.',
        'Weaker weighted average avoided charges when solar output would largely be exported to the grid at approximately wholesale rates.',
      ].join('\n'),
      utilityBilling: [
        'Solar offsets retail rates when instantaneously offsetting on-site consumption.',
        'Exports are credited hourly, below the retail import rate.',
        'Demand and non-bypassable charges are not uniformly reduced.',
        'Best practice requires modeling historic interval loads and simulated solar production against the solar tariff.',
      ].join('\n'),
      recProgram: [
        'Voluntary REC market; no standardized state contract.',
        'RECs may be sold bilaterally or passed to the tenant.',
      ].join('\n'),
      devConsiderations: [
        'AB 2143 prevailing-wage and reporting requirements apply.',
        'Interconnection processes are well established and standardized for the primary utilities.',
        'Warehouse properties located in the South Coast AQM District over 100,000 SF may unlock additional monetization opportunities through the WAIRE program.',
      ].join('\n'),
      groupingRationale: [
        'Eastland Center | Strong candidate, recommended to advance to feasibility in the first phase.',
        'DC Station Retail | Strong candidate, recommended to advance to feasibility in the first phase.',
        'Tuscany on Fig | Strong candidate; solar should be considered as part of the planned redevelopment and new construction.',
        'Courtyard at the Commons | Space constraints across both the roof and parking areas are expected to limit deployable capacity.',
        '100 Hamilton | Favorable municipal net-metering program, though fixed costs weigh heavily at this system scale.',
      ].join('\n'),
      projectsIntro: '',
    },
    NV: {
      name: 'Nevada',
      subtitle: 'Rooftop & Carport Solar Market One-Pager',
      repUtility: 'NV Energy',
      projectSummary: [
        'Excellent solar resource and a favorable billing structure (net metering).',
        'A single-utility framework simplifies diligence.',
        '1 MW cap on exporting systems, and relatively low retail electricity rates. The cap will be a limiting factor on many systems.',
      ].join('\n'),
      marketPosition: [
        'Among the strongest solar resources in the United States.',
        'Lower electricity avoided charges temper the resource advantage.',
      ].join('\n'),
      utilityBilling: [
        'Full retail rate net metering applies from 25 kW to 1,000 kW.',
        'Excess is carried forward as kWh credits.',
        'Solar will not offset all bill charges — Service and demand charges remain.',
      ].join('\n'),
      recProgram: [
        'Voluntary REC trading market.',
        'No fixed-price state purchase contract.',
      ].join('\n'),
      devConsiderations: [
        'The 1 MW cap can prevent full use of large roofs.',
      ].join('\n'),
      groupingRationale: [
        'Tropical Center II | Any new system must serve load beyond that already met by the existing rooftop array, on a roof at mid-life.',
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
        'Weaker resource and partial export credits offset this.',
      ].join('\n'),
      marketPosition: [
        'Moderate prices; weakest solar resource in the portfolio.',
        'Contracted REC revenue is unique to this state.',
        'Interconnection has historically been an issue in Illinois.',
      ].join('\n'),
      utilityBilling: [
        'Export credit treatment favors high consumers of power in the daytime.',
        'Avoided rates are currently moderate but Northern Illinois is in the PJM wholesale market region which has been experiencing increases in electricity pricing recently, which is anticipated to continue as demand surges.',
      ].join('\n'),
      recProgram: [
        'State led REC program applies to behind the meter installations covering 10 kW AC to 2 MW AC.',
        '2026 approvals use a 15-year REC contract.',
        '15% is paid at energization, the balance over six years.',
        'Pricing, capacity and timing are confirmed each program year.',
      ].join('\n'),
      devConsiderations: [
        'Prevailing-wage compliance applies to most projects.',
        'Hosting capacity and program queues affect timing. PJM is a historically constrained region.',
      ].join('\n'),
      groupingRationale: [
        'The Shops at Oak Brook Place | Strong candidate, recommended to advance to feasibility in the first phase.',
      ].join('\n'),
      projectsIntro: '',
    },
    FL: {
      name: 'Florida',
      subtitle: 'Rooftop & Carport Solar Market One-Pager',
      repUtility: 'Florida Power & Light',
      projectSummary: [
        'Net metering is applicable for systems up to 2 MW AC.',
      ].join('\n'),
      marketPosition: [
        'Moderate resource and commercial prices.',
      ].join('\n'),
      utilityBilling: [
        'System size capped at 2 MW.',
        'Excess kWh carry forward and applied to reduce future bills for up to twelve months.',
        'Annual residual credits settle at the avoided-energy rate.',
        'Solar will not offset all bill charges — Demand and minimum-bill components remain.',
      ].join('\n'),
      recProgram: [
        'No material state REC procurement for new C&I projects.',
      ].join('\n'),
      devConsiderations: [
        'Extreme weather conditions in Florida will require additional engineering and insurance considerations.',
        'Regulatory hurdles apply for structuring of power offtake agreement with tenant.',
      ].join('\n'),
      groupingRationale: [
        'Citria at Fruitville Commons | Building form and sloped roof construction, combined with Florida’s jurisdictional constraints, are expected to make this property challenging to execute.',
        'London Square | Jurisdictional constraints in Florida are expected to make this property challenging to execute.',
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
      ].join('\n'),
      marketPosition: [
        'Moderate solar resource and low large-commercial avoided electricity rates.',
      ].join('\n'),
      utilityBilling: [
        'Net metering is available up to 1,000 kW.',
      ].join('\n'),
      recProgram: [
        'No standardized long-term fixed-price contract.',
        'Voluntary REC trading market.',
      ].join('\n'),
      devConsiderations: [
        'Regulatory hurdles apply for structuring of power offtake agreement with tenant.',
      ].join('\n'),
      groupingRationale: [
        'Candour House | Multifamily asset subject to North Carolina’s jurisdictional constraints, but a credible candidate once resolved.',
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
        'Consumer electricity market dominated by retailers (over 100 retailers across the state)',
      ].join('\n'),
      marketPosition: [
        'Strong resource, particularly in North and West Texas.',
        'On-site arrangements are more workable than in Florida or North Carolina.',
        'Low energy prices limit avoided-cost value.',
      ].join('\n'),
      utilityBilling: [
        'The delivery utility handles interconnection and metering.',
        'The retail provider supplies imports and may buy exports.',
        'Exports need not be bought at the import price.',
        'Export credit may be capped or unavailable.',
      ].join('\n'),
      recProgram: [
        'The state administers a voluntary REC trading program.',
        'Credits may be sold bilaterally or passed to the tenant.',
        'No state-administered fixed-price purchase program.',
      ].join('\n'),
      devConsiderations: [
        'Availability of net metering programs is dependent on the load customer’s utility and retailer of choice.',
        'No standard tariff or state-led programs create uncertainty around future power prices.',
        'A deregulated energy market creates uncertainty with near- and long-term energy rates.',
      ].join('\n'),
      groupingRationale: [
        '1201 Avenue S | Deployment is gated by the delivery utility and the tenant’s retailer, but a credible candidate once those are confirmed.',
        'Post & Paddock | Deployment is best aligned with the tentative 2033 roof replacement.',
        'Lakeside B | Deployment is best aligned with the tentative 2033 roof replacement.',
        'Lakeside A | Deployment is best aligned with the tentative 2033 roof replacement.',
      ].join('\n'),
      projectsIntro: '',
    },
  },
};
