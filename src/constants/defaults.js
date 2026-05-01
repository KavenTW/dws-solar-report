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
};
