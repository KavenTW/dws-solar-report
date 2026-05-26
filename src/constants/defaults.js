export const DEFAULT_PROJECT = {
  // Identity
  companyName:  'Great Circle Solar Management Corp.',
  address:      '450 E. Rider St',
  city:         'Perris, California',
  province:     'CA',
  clientName:   'IDI Logistics',
  tenantName:   'Exol',
  projectName:  'Rider Logistics Center 2',
  reportDate:   'March 2026',
  reportType:   'PPA Proposal',

  // System
  systemSizeDCkW: 1500,
  systemSizeACkW: 1250,
  moduleWp:        550,

  // Roof
  roofUsedSqFt:  250000,
  roofTotalSqFt: 804803,

  // Generation
  annualMwhHelioScope: 2475,

  // Monthly distributions (5 state/province presets — one active at a time)
  monthlyDistributions: [
    { label: 'CA', pct: [5.87, 6.39, 8.61, 9.37, 10.23, 11.14, 10.66, 10.39, 8.56, 7.37, 5.96, 5.45] },
    { label: 'AZ', pct: [5.50, 7.00, 9.50, 10.50, 11.00, 11.00, 9.50, 9.50, 9.00, 8.00, 5.50, 4.00] },
    { label: 'NV', pct: [5.00, 6.50, 9.00, 10.50, 12.00, 12.50, 10.50, 10.50, 9.00, 7.50, 5.00, 2.00] },
    { label: 'FL', pct: [7.00, 7.50, 8.50, 9.00, 9.50, 9.00, 9.00, 9.00, 8.50, 8.50, 7.50, 7.00] },
    { label: 'TX', pct: [6.00, 7.00, 9.00, 10.00, 10.50, 11.00, 11.00, 11.00, 9.50, 8.00, 6.00, 1.00] },
  ],
  activeDistributionIndex: 0,

  // monthlyPct mirrors the active distribution and drives calculations
  monthlyPct: [5.87, 6.39, 8.61, 9.37, 10.23, 11.14, 10.66, 10.39, 8.56, 7.37, 5.96, 5.45],

  // Site load
  annualSiteLoadMwh: 5633.621,

  // Feature flags
  waireEnabled: true,
  recEnabled:   true,
  currency:     'USD',

  // Report section visibility — one flag per input section (all true = include in output)
  showCoverSection:         true,
  showFeaturesSection:      true,
  showSystemSection:        true,
  showRoofSection:          true,
  showLayoutSection:        true,
  showGenerationSection:    true,
  showEmissionsSection:     true,
  showPPATermsSection:      true,
  showRECsSection:          true,
  showWAIRESection:         true,
  showDegradationSection:   true,
  showSiteInfoSection:      true,
  showMarketContextSection: true,
  showDisclaimerSection:    true,

  // PPA terms
  ppaTerm:               15,
  ppaDiscountRate:       0.10,
  ppaEscalationRate:     0.03,
  referenceScenarioIndex: 1,

  // Pricing
  year1AvoidedChargesUSD: 320000,
  year1PPARateMWh:        139,
  utilityEscalationRates: [0.03, 0.04, 0.05],

  // RECs
  year1RECValue:     10,
  recEscalationRate: 0,
  recProgramName:    'RECs',

  // WAIRE
  year1WAIREPointValue:  1000,
  waireEscalationRate:   0,
  waireInstallPtsPerMW:  150,
  waireGenMwhPerPt:      165,

  // Degradation
  degradationRate: 0.005,

  // Emissions
  gridEmissionsIntensity:   195,
  gridEmissionsSource:      'U.S. EPA eGRID / CARB — California Average Grid Emissions Factor (WECC), 2026',
  gridEmissionsRegion:      'California, USA',
  equivHomesLabel:          'U.S.',
  gridEmissionsDisclaimer:  'California 2026 average grid emissions factor sourced from U.S. EPA eGRID — Western Electricity Coordinating Council (WECC).',
  waireDisclaimer:          'WAIRE compliance point generation is subject to CARB methodology and facility-specific activity data.',

  // Site info
  siteLatLong:     '33.79°N / 117.23°W',
  siteClimateZone: 'Zone 3B (Hot-Dry)',
  sitePSH:         '~5.7 PSH / day (annual avg)',
  siteGHI:         '~2,060 kWh/m²/yr',
  siteAvgTemp:     '~18.2°C',
  siteBuildingType: 'Logistics / Distribution Center',
  siteRoofType:    'TPO membrane (flat)',
  siteUtility:     'Southern California Edison (SCE)',
  siteSolarProgram: 'NEM 3.0 — TOU-8-D',

  // Image (stored as base64 data URL)
  layoutImageDataUrl: null,

  // Market Context
  marketContextTitle:              'California State Overview',
  marketContextDescription:        'California remains one of the largest and most mature distributed solar markets in North America, driven by high retail electricity prices, strong decarbonisation policy, and widespread commercial and industrial load centres suitable for rooftop and carport deployment.',
  marketContextMonetizationHeader: 'Monetization Opportunities',
  marketContextMonetizationIntro:  'The Net Billing Tariff (NBT) is California\'s standard compensation framework for commercial solar exports. Under NBT, project economics are driven by the balance between on-site consumption and the value of exported energy.',
  marketContextMonetizationRows: [
    { mechanism: 'On-Site Consumption',  behaviour: 'Solar generation first offsets instantaneous on-site consumption at the full avoided retail electricity rate.' },
    { mechanism: 'Excess Exports',        behaviour: 'Generation exported to the grid receives a published hourly export credit.' },
    { mechanism: 'Midday Export Pricing', behaviour: 'Generally lower than retail energy rates, particularly during high solar production hours.' },
    { mechanism: 'Evening Exports',       behaviour: 'Export values are often materially higher, improving the economics of battery-backed systems.' },
  ],
  marketContextImplicationHeader: 'Strategic Implication',
  marketContextImplicationIntro:  'Under the NBT framework, system economics are maximised when generation is consumed on-site or shifted to higher-value evening hours.',
  marketContextImplicationRows: [
    { priority: 'Maximise on-site self-consumption', rationale: 'Each kWh consumed on-site offsets the full retail rate — the highest-value use of generation.' },
    { priority: 'Right-size to tenant load',          rationale: 'Sizing capacity to tenant load profiles avoids over-export at depressed midday rates.' },
    { priority: 'Integrated energy store',            rationale: 'Battery energy storage systems (BESS) can shift excess generation from midday into higher-value evening export hours.' },
  ],
};
