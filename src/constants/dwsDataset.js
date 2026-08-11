// DWS portfolio dataset — generated from the DWS EU Ops Data Request (August 2026
// revision: rooftop layouts landscape/10°/1.2 ft spacing except Citria) merged with
// site-specific considerations. Monthly distributions remain per the June 2026
// PVsyst simulation (the August workbook monthly rows are pending ops input).
// Applied via the Portfolio tab → Edit Portfolio Content → data-update button:
// existing saved projects get ONLY the fields in DWS_PATCH_FIELDS (layout images
// and other edits preserved); missing projects are created in full.

export const DWS_DATASET_LABEL = 'August 2026 ops revision';

export const DWS_PATCH_FIELDS = [
  "rooftopSizeDCkW",
  "rooftopSizeACkW",
  "carportSizeDCkW",
  "carportSizeACkW",
  "rooftopAreaUsedSqFt",
  "rooftopTotalSqFt",
  "carportAreaUsedSqFt",
  "carportTotalSqFt",
  "pointsOfInterconnection",
  "annualMwhHelioScope",
  "additionalNotes",
  "siteBuildingType",
  "reportType"
];

export const DWS_DATASET = [
 {
  "name": "Eastland Center",
  "data": {
   "companyName": "Great Circle Solar Management Corp.",
   "address": "2753 East Eastland Drive",
   "city": "West Covina, California",
   "province": "CA",
   "clientName": "DWS Asset Management",
   "tenantName": "",
   "projectName": "Eastland Center",
   "reportDate": "",
   "reportType": "Preliminary Solar Development Opportunity Assessment",
   "rooftopSizeDCkW": 2270,
   "carportSizeDCkW": 2710,
   "rooftopSizeACkW": 1900,
   "carportSizeACkW": 2200,
   "systemSizeACkW": 0,
   "rooftopAreaUsedSqFt": 105000,
   "rooftopTotalSqFt": 568100,
   "carportAreaUsedSqFt": 440790,
   "carportTotalSqFt": 1103000,
   "annualMwhHelioScope": 8029,
   "monthlyDistributions": [
    {
     "label": "CA",
     "pct": [
      5.87,
      6.39,
      8.61,
      9.37,
      10.23,
      11.14,
      10.66,
      10.39,
      8.56,
      7.37,
      5.96,
      5.45
     ]
    },
    {
     "label": "AZ",
     "pct": [
      5.5,
      7,
      9.5,
      10.5,
      11,
      11,
      9.5,
      9.5,
      9,
      8,
      5.5,
      4
     ]
    },
    {
     "label": "NV",
     "pct": [
      5,
      6.5,
      9,
      10.5,
      12,
      12.5,
      10.5,
      10.5,
      9,
      7.5,
      5,
      2
     ]
    },
    {
     "label": "FL",
     "pct": [
      7,
      7.5,
      8.5,
      9,
      9.5,
      9,
      9,
      9,
      8.5,
      8.5,
      7.5,
      7
     ]
    },
    {
     "label": "TX",
     "pct": [
      6,
      7,
      9,
      10,
      10.5,
      11,
      11,
      11,
      9.5,
      8,
      6,
      1
     ]
    }
   ],
   "activeDistributionIndex": 0,
   "monthlyPct": [
    3.9,
    6.3,
    9.1,
    10.2,
    11.2,
    11,
    12.3,
    11.4,
    9.3,
    7.5,
    4.7,
    3.1
   ],
   "annualSiteLoadMwh": 0,
   "waireEnabled": false,
   "recEnabled": false,
   "currency": "USD",
   "showCoverSection": true,
   "showFeaturesSection": true,
   "showSystemSection": true,
   "showRoofSection": true,
   "showLayoutSection": true,
   "showGenerationSection": true,
   "showEmissionsSection": true,
   "showPPATermsSection": false,
   "showRECsSection": false,
   "showWAIRESection": false,
   "showDegradationSection": true,
   "showSiteInfoSection": true,
   "showMarketContextSection": false,
   "showNextStepsSection": true,
   "showDisclaimerSection": true,
   "additionalNotes": "The number of points of interconnection will depend on the existing electrical layout and metering arrangement, to be confirmed during electrical feasibility.\nCarport layouts to be coordinated with existing parking-lot pole lighting.\nA geotechnical assessment is recommended to confirm carport foundation feasibility.\nUnderground utility locates and trenching will be required to route carport circuits.",
   "pointsOfInterconnection": 5,
   "feasElectricalMin": 5000,
   "feasElectricalMax": 10000,
   "feasStructuralMin": 5000,
   "feasStructuralMax": 15000,
   "feasGeotechnicalMin": 10000,
   "feasGeotechnicalMax": 15000,
   "feasInterconnectionMin": 5000,
   "feasInterconnectionMax": 5000,
   "ppaTerm": 25,
   "ppaDiscountRate": 0.1,
   "ppaEscalationRate": 0.03,
   "referenceScenarioIndex": 1,
   "year1AvoidedChargesUSD": 0,
   "year1PPARateMWh": 0,
   "utilityEscalationRates": [
    0.03,
    0.04,
    0.05
   ],
   "year1RECValue": 10,
   "recEscalationRate": 0,
   "recProgramName": "RECs",
   "year1WAIREPointValue": 1000,
   "waireEscalationRate": 0,
   "waireInstallPtsPerMW": 150,
   "waireGenMwhPerPt": 165,
   "degradationRate": 0.005,
   "gridEmissionsIntensity": 430,
   "gridEmissionsSource": "U.S. EPA eGRID — CAMX (California)",
   "gridEmissionsRegion": "California, USA",
   "equivHomesLabel": "U.S.",
   "gridEmissionsDisclaimer": "Grid emissions factor sourced from U.S. EPA eGRID CAMX subregion (California).",
   "waireDisclaimer": "WAIRE compliance point generation is subject to CARB methodology and facility-specific activity data.",
   "siteLatLong": "",
   "siteClimateZone": "",
   "sitePSH": "",
   "siteGHI": "",
   "siteAvgTemp": "",
   "siteBuildingType": "",
   "siteRoofType": "",
   "siteUtility": "",
   "siteSolarProgram": "",
   "layoutImageDataUrl": null,
   "marketContextTitle": "California State Overview",
   "marketContextDescription": "California remains one of the largest and most mature distributed solar markets in North America, driven by high retail electricity prices, strong decarbonisation policy, and widespread commercial and industrial load centres suitable for rooftop and carport deployment.",
   "marketContextMonetizationHeader": "Monetization Opportunities",
   "marketContextMonetizationIntro": "The Net Billing Tariff (NBT) is California's standard compensation framework for commercial solar exports. Under NBT, project economics are driven by the balance between on-site consumption and the value of exported energy.",
   "marketContextMonetizationRows": [
    {
     "mechanism": "On-Site Consumption",
     "behaviour": "Solar generation first offsets instantaneous on-site consumption at the full avoided retail electricity rate."
    },
    {
     "mechanism": "Excess Exports",
     "behaviour": "Generation exported to the grid receives a published hourly export credit."
    },
    {
     "mechanism": "Midday Export Pricing",
     "behaviour": "Generally lower than retail energy rates, particularly during high solar production hours."
    },
    {
     "mechanism": "Evening Exports",
     "behaviour": "Export values are often materially higher, improving the economics of battery-backed systems."
    }
   ],
   "marketContextImplicationHeader": "Strategic Implication",
   "marketContextImplicationIntro": "Under the NBT framework, system economics are maximised when generation is consumed on-site or shifted to higher-value evening hours.",
   "marketContextImplicationRows": [
    {
     "priority": "Maximise on-site self-consumption",
     "rationale": "Each MWh consumed on-site offsets the full retail rate — the highest-value use of generation."
    },
    {
     "priority": "Right-size to tenant load",
     "rationale": "Sizing capacity to tenant load profiles avoids over-export at depressed midday rates."
    },
    {
     "priority": "Integrated energy store",
     "rationale": "Battery energy storage systems (BESS) can shift excess generation from midday into higher-value evening export hours."
    }
   ]
  }
 },
 {
  "name": "Courtyard at the Commons",
  "data": {
   "companyName": "Great Circle Solar Management Corp.",
   "address": "23631-23741 Calabasas Road",
   "city": "Calabasas, California",
   "province": "CA",
   "clientName": "DWS Asset Management",
   "tenantName": "",
   "projectName": "Courtyard at the Commons",
   "reportDate": "",
   "reportType": "Preliminary Solar Development Opportunity Assessment",
   "rooftopSizeDCkW": 466.24,
   "carportSizeDCkW": 675.18,
   "rooftopSizeACkW": 400,
   "carportSizeACkW": 550,
   "systemSizeACkW": 0,
   "rooftopAreaUsedSqFt": 21000,
   "rooftopTotalSqFt": 98700,
   "carportAreaUsedSqFt": 33000,
   "carportTotalSqFt": 121000,
   "annualMwhHelioScope": 1837,
   "monthlyDistributions": [
    {
     "label": "CA",
     "pct": [
      5.87,
      6.39,
      8.61,
      9.37,
      10.23,
      11.14,
      10.66,
      10.39,
      8.56,
      7.37,
      5.96,
      5.45
     ]
    },
    {
     "label": "AZ",
     "pct": [
      5.5,
      7,
      9.5,
      10.5,
      11,
      11,
      9.5,
      9.5,
      9,
      8,
      5.5,
      4
     ]
    },
    {
     "label": "NV",
     "pct": [
      5,
      6.5,
      9,
      10.5,
      12,
      12.5,
      10.5,
      10.5,
      9,
      7.5,
      5,
      2
     ]
    },
    {
     "label": "FL",
     "pct": [
      7,
      7.5,
      8.5,
      9,
      9.5,
      9,
      9,
      9,
      8.5,
      8.5,
      7.5,
      7
     ]
    },
    {
     "label": "TX",
     "pct": [
      6,
      7,
      9,
      10,
      10.5,
      11,
      11,
      11,
      9.5,
      8,
      6,
      1
     ]
    }
   ],
   "activeDistributionIndex": 0,
   "monthlyPct": [
    5.01,
    6.04,
    8.66,
    9.84,
    10.72,
    10.48,
    12.09,
    11.12,
    8.96,
    7.06,
    5.35,
    4.67
   ],
   "annualSiteLoadMwh": 0,
   "waireEnabled": false,
   "recEnabled": false,
   "currency": "USD",
   "showCoverSection": true,
   "showFeaturesSection": true,
   "showSystemSection": true,
   "showRoofSection": true,
   "showLayoutSection": true,
   "showGenerationSection": true,
   "showEmissionsSection": true,
   "showPPATermsSection": false,
   "showRECsSection": false,
   "showWAIRESection": false,
   "showDegradationSection": true,
   "showSiteInfoSection": true,
   "showMarketContextSection": false,
   "showNextStepsSection": true,
   "showDisclaimerSection": true,
   "additionalNotes": "Solar penetration on neighbouring buildings is high; available utility hosting capacity to be confirmed through the utility interconnection review.\nCarport layouts to be coordinated with existing parking-lot pole lighting.\nA geotechnical assessment is recommended to confirm carport foundation feasibility.\nUnderground utility locates and trenching will be required to route carport circuits.",
   "pointsOfInterconnection": 2,
   "feasElectricalMin": 5000,
   "feasElectricalMax": 10000,
   "feasStructuralMin": 5000,
   "feasStructuralMax": 15000,
   "feasGeotechnicalMin": 10000,
   "feasGeotechnicalMax": 15000,
   "feasInterconnectionMin": 5000,
   "feasInterconnectionMax": 5000,
   "ppaTerm": 25,
   "ppaDiscountRate": 0.1,
   "ppaEscalationRate": 0.03,
   "referenceScenarioIndex": 1,
   "year1AvoidedChargesUSD": 0,
   "year1PPARateMWh": 0,
   "utilityEscalationRates": [
    0.03,
    0.04,
    0.05
   ],
   "year1RECValue": 10,
   "recEscalationRate": 0,
   "recProgramName": "RECs",
   "year1WAIREPointValue": 1000,
   "waireEscalationRate": 0,
   "waireInstallPtsPerMW": 150,
   "waireGenMwhPerPt": 165,
   "degradationRate": 0.005,
   "gridEmissionsIntensity": 430,
   "gridEmissionsSource": "U.S. EPA eGRID — CAMX (California)",
   "gridEmissionsRegion": "California, USA",
   "equivHomesLabel": "U.S.",
   "gridEmissionsDisclaimer": "Grid emissions factor sourced from U.S. EPA eGRID CAMX subregion (California).",
   "waireDisclaimer": "WAIRE compliance point generation is subject to CARB methodology and facility-specific activity data.",
   "siteLatLong": "",
   "siteClimateZone": "",
   "sitePSH": "",
   "siteGHI": "",
   "siteAvgTemp": "",
   "siteBuildingType": "",
   "siteRoofType": "",
   "siteUtility": "",
   "siteSolarProgram": "",
   "layoutImageDataUrl": null,
   "marketContextTitle": "California State Overview",
   "marketContextDescription": "California remains one of the largest and most mature distributed solar markets in North America, driven by high retail electricity prices, strong decarbonisation policy, and widespread commercial and industrial load centres suitable for rooftop and carport deployment.",
   "marketContextMonetizationHeader": "Monetization Opportunities",
   "marketContextMonetizationIntro": "The Net Billing Tariff (NBT) is California's standard compensation framework for commercial solar exports. Under NBT, project economics are driven by the balance between on-site consumption and the value of exported energy.",
   "marketContextMonetizationRows": [
    {
     "mechanism": "On-Site Consumption",
     "behaviour": "Solar generation first offsets instantaneous on-site consumption at the full avoided retail electricity rate."
    },
    {
     "mechanism": "Excess Exports",
     "behaviour": "Generation exported to the grid receives a published hourly export credit."
    },
    {
     "mechanism": "Midday Export Pricing",
     "behaviour": "Generally lower than retail energy rates, particularly during high solar production hours."
    },
    {
     "mechanism": "Evening Exports",
     "behaviour": "Export values are often materially higher, improving the economics of battery-backed systems."
    }
   ],
   "marketContextImplicationHeader": "Strategic Implication",
   "marketContextImplicationIntro": "Under the NBT framework, system economics are maximised when generation is consumed on-site or shifted to higher-value evening hours.",
   "marketContextImplicationRows": [
    {
     "priority": "Maximise on-site self-consumption",
     "rationale": "Each MWh consumed on-site offsets the full retail rate — the highest-value use of generation."
    },
    {
     "priority": "Right-size to tenant load",
     "rationale": "Sizing capacity to tenant load profiles avoids over-export at depressed midday rates."
    },
    {
     "priority": "Integrated energy store",
     "rationale": "Battery energy storage systems (BESS) can shift excess generation from midday into higher-value evening export hours."
    }
   ]
  }
 },
 {
  "name": "DC Station Retail",
  "data": {
   "companyName": "Great Circle Solar Management Corp.",
   "address": "1901 Junipero Serra Blvd",
   "city": "Daly City, California",
   "province": "CA",
   "clientName": "DWS Asset Management",
   "tenantName": "",
   "projectName": "DC Station Retail",
   "reportDate": "",
   "reportType": "Preliminary Solar Development Opportunity Assessment",
   "rooftopSizeDCkW": 283.96,
   "carportSizeDCkW": 277.76,
   "rooftopSizeACkW": 250,
   "carportSizeACkW": 216,
   "systemSizeACkW": 0,
   "rooftopAreaUsedSqFt": 14000,
   "rooftopTotalSqFt": 49000,
   "carportAreaUsedSqFt": 15000,
   "carportTotalSqFt": 43000,
   "annualMwhHelioScope": 827,
   "monthlyDistributions": [
    {
     "label": "CA",
     "pct": [
      5.87,
      6.39,
      8.61,
      9.37,
      10.23,
      11.14,
      10.66,
      10.39,
      8.56,
      7.37,
      5.96,
      5.45
     ]
    },
    {
     "label": "AZ",
     "pct": [
      5.5,
      7,
      9.5,
      10.5,
      11,
      11,
      9.5,
      9.5,
      9,
      8,
      5.5,
      4
     ]
    },
    {
     "label": "NV",
     "pct": [
      5,
      6.5,
      9,
      10.5,
      12,
      12.5,
      10.5,
      10.5,
      9,
      7.5,
      5,
      2
     ]
    },
    {
     "label": "FL",
     "pct": [
      7,
      7.5,
      8.5,
      9,
      9.5,
      9,
      9,
      9,
      8.5,
      8.5,
      7.5,
      7
     ]
    },
    {
     "label": "TX",
     "pct": [
      6,
      7,
      9,
      10,
      10.5,
      11,
      11,
      11,
      9.5,
      8,
      6,
      1
     ]
    }
   ],
   "activeDistributionIndex": 0,
   "monthlyPct": [
    3,
    5.41,
    8.51,
    10.31,
    11.71,
    12.41,
    12.91,
    11.81,
    10.01,
    7.21,
    3.8,
    2.91
   ],
   "annualSiteLoadMwh": 0,
   "waireEnabled": false,
   "recEnabled": false,
   "currency": "USD",
   "showCoverSection": true,
   "showFeaturesSection": true,
   "showSystemSection": true,
   "showRoofSection": true,
   "showLayoutSection": true,
   "showGenerationSection": true,
   "showEmissionsSection": true,
   "showPPATermsSection": false,
   "showRECsSection": false,
   "showWAIRESection": false,
   "showDegradationSection": true,
   "showSiteInfoSection": true,
   "showMarketContextSection": false,
   "showNextStepsSection": true,
   "showDisclaimerSection": true,
   "additionalNotes": "Carport capacity is proposed above an existing parking structure; structural capacity to be confirmed.\nConstruction feasibility to be assessed in view of the increased working height of the parking structure and rooftops.",
   "pointsOfInterconnection": 1,
   "feasElectricalMin": 5000,
   "feasElectricalMax": 10000,
   "feasStructuralMin": 5000,
   "feasStructuralMax": 15000,
   "feasGeotechnicalMin": 10000,
   "feasGeotechnicalMax": 15000,
   "feasInterconnectionMin": 5000,
   "feasInterconnectionMax": 5000,
   "ppaTerm": 25,
   "ppaDiscountRate": 0.1,
   "ppaEscalationRate": 0.03,
   "referenceScenarioIndex": 1,
   "year1AvoidedChargesUSD": 0,
   "year1PPARateMWh": 0,
   "utilityEscalationRates": [
    0.03,
    0.04,
    0.05
   ],
   "year1RECValue": 10,
   "recEscalationRate": 0,
   "recProgramName": "RECs",
   "year1WAIREPointValue": 1000,
   "waireEscalationRate": 0,
   "waireInstallPtsPerMW": 150,
   "waireGenMwhPerPt": 165,
   "degradationRate": 0.005,
   "gridEmissionsIntensity": 430,
   "gridEmissionsSource": "U.S. EPA eGRID — CAMX (California)",
   "gridEmissionsRegion": "California, USA",
   "equivHomesLabel": "U.S.",
   "gridEmissionsDisclaimer": "Grid emissions factor sourced from U.S. EPA eGRID CAMX subregion (California).",
   "waireDisclaimer": "WAIRE compliance point generation is subject to CARB methodology and facility-specific activity data.",
   "siteLatLong": "",
   "siteClimateZone": "",
   "sitePSH": "",
   "siteGHI": "",
   "siteAvgTemp": "",
   "siteBuildingType": "",
   "siteRoofType": "",
   "siteUtility": "",
   "siteSolarProgram": "",
   "layoutImageDataUrl": null,
   "marketContextTitle": "California State Overview",
   "marketContextDescription": "California remains one of the largest and most mature distributed solar markets in North America, driven by high retail electricity prices, strong decarbonisation policy, and widespread commercial and industrial load centres suitable for rooftop and carport deployment.",
   "marketContextMonetizationHeader": "Monetization Opportunities",
   "marketContextMonetizationIntro": "The Net Billing Tariff (NBT) is California's standard compensation framework for commercial solar exports. Under NBT, project economics are driven by the balance between on-site consumption and the value of exported energy.",
   "marketContextMonetizationRows": [
    {
     "mechanism": "On-Site Consumption",
     "behaviour": "Solar generation first offsets instantaneous on-site consumption at the full avoided retail electricity rate."
    },
    {
     "mechanism": "Excess Exports",
     "behaviour": "Generation exported to the grid receives a published hourly export credit."
    },
    {
     "mechanism": "Midday Export Pricing",
     "behaviour": "Generally lower than retail energy rates, particularly during high solar production hours."
    },
    {
     "mechanism": "Evening Exports",
     "behaviour": "Export values are often materially higher, improving the economics of battery-backed systems."
    }
   ],
   "marketContextImplicationHeader": "Strategic Implication",
   "marketContextImplicationIntro": "Under the NBT framework, system economics are maximised when generation is consumed on-site or shifted to higher-value evening hours.",
   "marketContextImplicationRows": [
    {
     "priority": "Maximise on-site self-consumption",
     "rationale": "Each MWh consumed on-site offsets the full retail rate — the highest-value use of generation."
    },
    {
     "priority": "Right-size to tenant load",
     "rationale": "Sizing capacity to tenant load profiles avoids over-export at depressed midday rates."
    },
    {
     "priority": "Integrated energy store",
     "rationale": "Battery energy storage systems (BESS) can shift excess generation from midday into higher-value evening export hours."
    }
   ]
  }
 },
 {
  "name": "100 Hamilton",
  "data": {
   "companyName": "Great Circle Solar Management Corp.",
   "address": "100 Hamilton Avenue",
   "city": "Palo Alto, California",
   "province": "CA",
   "clientName": "DWS Asset Management",
   "tenantName": "",
   "projectName": "100 Hamilton",
   "reportDate": "",
   "reportType": "Preliminary Solar Development Opportunity Assessment",
   "rooftopSizeDCkW": 34.72,
   "carportSizeDCkW": 0,
   "rooftopSizeACkW": 33,
   "carportSizeACkW": 0,
   "systemSizeACkW": 0,
   "rooftopAreaUsedSqFt": 2100,
   "rooftopTotalSqFt": 18500,
   "carportAreaUsedSqFt": 0,
   "carportTotalSqFt": 0,
   "annualMwhHelioScope": 51,
   "monthlyDistributions": [
    {
     "label": "CA",
     "pct": [
      5.87,
      6.39,
      8.61,
      9.37,
      10.23,
      11.14,
      10.66,
      10.39,
      8.56,
      7.37,
      5.96,
      5.45
     ]
    },
    {
     "label": "AZ",
     "pct": [
      5.5,
      7,
      9.5,
      10.5,
      11,
      11,
      9.5,
      9.5,
      9,
      8,
      5.5,
      4
     ]
    },
    {
     "label": "NV",
     "pct": [
      5,
      6.5,
      9,
      10.5,
      12,
      12.5,
      10.5,
      10.5,
      9,
      7.5,
      5,
      2
     ]
    },
    {
     "label": "FL",
     "pct": [
      7,
      7.5,
      8.5,
      9,
      9.5,
      9,
      9,
      9,
      8.5,
      8.5,
      7.5,
      7
     ]
    },
    {
     "label": "TX",
     "pct": [
      6,
      7,
      9,
      10,
      10.5,
      11,
      11,
      11,
      9.5,
      8,
      6,
      1
     ]
    }
   ],
   "activeDistributionIndex": 0,
   "monthlyPct": [
    3.79,
    5.28,
    8.16,
    10.12,
    11.61,
    12.3,
    12.73,
    11.59,
    9.6,
    6.91,
    4.32,
    3.59
   ],
   "annualSiteLoadMwh": 0,
   "waireEnabled": false,
   "recEnabled": false,
   "currency": "USD",
   "showCoverSection": true,
   "showFeaturesSection": true,
   "showSystemSection": true,
   "showRoofSection": true,
   "showLayoutSection": true,
   "showGenerationSection": true,
   "showEmissionsSection": true,
   "showPPATermsSection": false,
   "showRECsSection": false,
   "showWAIRESection": false,
   "showDegradationSection": true,
   "showSiteInfoSection": true,
   "showMarketContextSection": false,
   "showNextStepsSection": true,
   "showDisclaimerSection": true,
   "additionalNotes": "Rooftop mechanical and architectural obstructions materially constrain the available layout; proposed capacity reflects the remaining usable area.\nThe property is served by the City of Palo Alto municipal utility, whose solar programs differ from the CPUC framework described on the state page.",
   "pointsOfInterconnection": 1,
   "feasElectricalMin": 5000,
   "feasElectricalMax": 10000,
   "feasStructuralMin": 5000,
   "feasStructuralMax": 15000,
   "feasGeotechnicalMin": 10000,
   "feasGeotechnicalMax": 15000,
   "feasInterconnectionMin": 5000,
   "feasInterconnectionMax": 5000,
   "ppaTerm": 25,
   "ppaDiscountRate": 0.1,
   "ppaEscalationRate": 0.03,
   "referenceScenarioIndex": 1,
   "year1AvoidedChargesUSD": 0,
   "year1PPARateMWh": 0,
   "utilityEscalationRates": [
    0.03,
    0.04,
    0.05
   ],
   "year1RECValue": 10,
   "recEscalationRate": 0,
   "recProgramName": "RECs",
   "year1WAIREPointValue": 1000,
   "waireEscalationRate": 0,
   "waireInstallPtsPerMW": 150,
   "waireGenMwhPerPt": 165,
   "degradationRate": 0.005,
   "gridEmissionsIntensity": 430,
   "gridEmissionsSource": "U.S. EPA eGRID — CAMX (California)",
   "gridEmissionsRegion": "California, USA",
   "equivHomesLabel": "U.S.",
   "gridEmissionsDisclaimer": "Grid emissions factor sourced from U.S. EPA eGRID CAMX subregion (California).",
   "waireDisclaimer": "WAIRE compliance point generation is subject to CARB methodology and facility-specific activity data.",
   "siteLatLong": "",
   "siteClimateZone": "",
   "sitePSH": "",
   "siteGHI": "",
   "siteAvgTemp": "",
   "siteBuildingType": "",
   "siteRoofType": "",
   "siteUtility": "",
   "siteSolarProgram": "",
   "layoutImageDataUrl": null,
   "marketContextTitle": "California State Overview",
   "marketContextDescription": "California remains one of the largest and most mature distributed solar markets in North America, driven by high retail electricity prices, strong decarbonisation policy, and widespread commercial and industrial load centres suitable for rooftop and carport deployment.",
   "marketContextMonetizationHeader": "Monetization Opportunities",
   "marketContextMonetizationIntro": "The Net Billing Tariff (NBT) is California's standard compensation framework for commercial solar exports. Under NBT, project economics are driven by the balance between on-site consumption and the value of exported energy.",
   "marketContextMonetizationRows": [
    {
     "mechanism": "On-Site Consumption",
     "behaviour": "Solar generation first offsets instantaneous on-site consumption at the full avoided retail electricity rate."
    },
    {
     "mechanism": "Excess Exports",
     "behaviour": "Generation exported to the grid receives a published hourly export credit."
    },
    {
     "mechanism": "Midday Export Pricing",
     "behaviour": "Generally lower than retail energy rates, particularly during high solar production hours."
    },
    {
     "mechanism": "Evening Exports",
     "behaviour": "Export values are often materially higher, improving the economics of battery-backed systems."
    }
   ],
   "marketContextImplicationHeader": "Strategic Implication",
   "marketContextImplicationIntro": "Under the NBT framework, system economics are maximised when generation is consumed on-site or shifted to higher-value evening hours.",
   "marketContextImplicationRows": [
    {
     "priority": "Maximise on-site self-consumption",
     "rationale": "Each MWh consumed on-site offsets the full retail rate — the highest-value use of generation."
    },
    {
     "priority": "Right-size to tenant load",
     "rationale": "Sizing capacity to tenant load profiles avoids over-export at depressed midday rates."
    },
    {
     "priority": "Integrated energy store",
     "rationale": "Battery energy storage systems (BESS) can shift excess generation from midday into higher-value evening export hours."
    }
   ]
  }
 },
 {
  "name": "Tuscany on Fig",
  "data": {
   "companyName": "Great Circle Solar Management Corp.",
   "address": "3770 S Figueroa St.",
   "city": "Los Angeles, California",
   "province": "CA",
   "clientName": "DWS Asset Management",
   "tenantName": "",
   "projectName": "Tuscany on Fig",
   "reportDate": "",
   "reportType": "Preliminary Solar Development Opportunity Assessment",
   "rooftopSizeDCkW": 72.54,
   "carportSizeDCkW": 0,
   "rooftopSizeACkW": 60,
   "carportSizeACkW": 0,
   "systemSizeACkW": 0,
   "rooftopAreaUsedSqFt": 3400,
   "rooftopTotalSqFt": 40000,
   "carportAreaUsedSqFt": 0,
   "carportTotalSqFt": 0,
   "annualMwhHelioScope": 121,
   "monthlyDistributions": [
    {
     "label": "CA",
     "pct": [
      5.87,
      6.39,
      8.61,
      9.37,
      10.23,
      11.14,
      10.66,
      10.39,
      8.56,
      7.37,
      5.96,
      5.45
     ]
    },
    {
     "label": "AZ",
     "pct": [
      5.5,
      7,
      9.5,
      10.5,
      11,
      11,
      9.5,
      9.5,
      9,
      8,
      5.5,
      4
     ]
    },
    {
     "label": "NV",
     "pct": [
      5,
      6.5,
      9,
      10.5,
      12,
      12.5,
      10.5,
      10.5,
      9,
      7.5,
      5,
      2
     ]
    },
    {
     "label": "FL",
     "pct": [
      7,
      7.5,
      8.5,
      9,
      9.5,
      9,
      9,
      9,
      8.5,
      8.5,
      7.5,
      7
     ]
    },
    {
     "label": "TX",
     "pct": [
      6,
      7,
      9,
      10,
      10.5,
      11,
      11,
      11,
      9.5,
      8,
      6,
      1
     ]
    }
   ],
   "activeDistributionIndex": 0,
   "monthlyPct": [
    4.4,
    5.8,
    8.8,
    10.2,
    11.1,
    10.7,
    12.4,
    11.5,
    9,
    7,
    4.9,
    4.2
   ],
   "annualSiteLoadMwh": 0,
   "waireEnabled": false,
   "recEnabled": false,
   "currency": "USD",
   "showCoverSection": true,
   "showFeaturesSection": true,
   "showSystemSection": true,
   "showRoofSection": true,
   "showLayoutSection": true,
   "showGenerationSection": true,
   "showEmissionsSection": true,
   "showPPATermsSection": false,
   "showRECsSection": false,
   "showWAIRESection": false,
   "showDegradationSection": true,
   "showSiteInfoSection": true,
   "showMarketContextSection": false,
   "showNextStepsSection": true,
   "showDisclaimerSection": true,
   "additionalNotes": "Significant rooftop obstructions constrain the available layout; proposed capacity reflects the remaining usable area.\nThe existing tenant metering arrangement is to be confirmed; individually metered residential units may affect how a building-level system is integrated and credited.\nThe property is served by LADWP, whose solar programs differ from the CPUC framework described on the state page.",
   "pointsOfInterconnection": 1,
   "feasElectricalMin": 5000,
   "feasElectricalMax": 10000,
   "feasStructuralMin": 5000,
   "feasStructuralMax": 15000,
   "feasGeotechnicalMin": 10000,
   "feasGeotechnicalMax": 15000,
   "feasInterconnectionMin": 5000,
   "feasInterconnectionMax": 5000,
   "ppaTerm": 25,
   "ppaDiscountRate": 0.1,
   "ppaEscalationRate": 0.03,
   "referenceScenarioIndex": 1,
   "year1AvoidedChargesUSD": 0,
   "year1PPARateMWh": 0,
   "utilityEscalationRates": [
    0.03,
    0.04,
    0.05
   ],
   "year1RECValue": 10,
   "recEscalationRate": 0,
   "recProgramName": "RECs",
   "year1WAIREPointValue": 1000,
   "waireEscalationRate": 0,
   "waireInstallPtsPerMW": 150,
   "waireGenMwhPerPt": 165,
   "degradationRate": 0.005,
   "gridEmissionsIntensity": 430,
   "gridEmissionsSource": "U.S. EPA eGRID — CAMX (California)",
   "gridEmissionsRegion": "California, USA",
   "equivHomesLabel": "U.S.",
   "gridEmissionsDisclaimer": "Grid emissions factor sourced from U.S. EPA eGRID CAMX subregion (California).",
   "waireDisclaimer": "WAIRE compliance point generation is subject to CARB methodology and facility-specific activity data.",
   "siteLatLong": "",
   "siteClimateZone": "",
   "sitePSH": "",
   "siteGHI": "",
   "siteAvgTemp": "",
   "siteBuildingType": "Multi-family residential",
   "siteRoofType": "",
   "siteUtility": "",
   "siteSolarProgram": "",
   "layoutImageDataUrl": null,
   "marketContextTitle": "California State Overview",
   "marketContextDescription": "California remains one of the largest and most mature distributed solar markets in North America, driven by high retail electricity prices, strong decarbonisation policy, and widespread commercial and industrial load centres suitable for rooftop and carport deployment.",
   "marketContextMonetizationHeader": "Monetization Opportunities",
   "marketContextMonetizationIntro": "The Net Billing Tariff (NBT) is California's standard compensation framework for commercial solar exports. Under NBT, project economics are driven by the balance between on-site consumption and the value of exported energy.",
   "marketContextMonetizationRows": [
    {
     "mechanism": "On-Site Consumption",
     "behaviour": "Solar generation first offsets instantaneous on-site consumption at the full avoided retail electricity rate."
    },
    {
     "mechanism": "Excess Exports",
     "behaviour": "Generation exported to the grid receives a published hourly export credit."
    },
    {
     "mechanism": "Midday Export Pricing",
     "behaviour": "Generally lower than retail energy rates, particularly during high solar production hours."
    },
    {
     "mechanism": "Evening Exports",
     "behaviour": "Export values are often materially higher, improving the economics of battery-backed systems."
    }
   ],
   "marketContextImplicationHeader": "Strategic Implication",
   "marketContextImplicationIntro": "Under the NBT framework, system economics are maximised when generation is consumed on-site or shifted to higher-value evening hours.",
   "marketContextImplicationRows": [
    {
     "priority": "Maximise on-site self-consumption",
     "rationale": "Each MWh consumed on-site offsets the full retail rate — the highest-value use of generation."
    },
    {
     "priority": "Right-size to tenant load",
     "rationale": "Sizing capacity to tenant load profiles avoids over-export at depressed midday rates."
    },
    {
     "priority": "Integrated energy store",
     "rationale": "Battery energy storage systems (BESS) can shift excess generation from midday into higher-value evening export hours."
    }
   ]
  }
 },
 {
  "name": "London Square",
  "data": {
   "companyName": "Great Circle Solar Management Corp.",
   "address": "13550 SW 120th Street",
   "city": "Miami, Florida",
   "province": "FL",
   "clientName": "DWS Asset Management",
   "tenantName": "",
   "projectName": "London Square",
   "reportDate": "",
   "reportType": "Preliminary Solar Development Opportunity Assessment",
   "rooftopSizeDCkW": 334.8,
   "carportSizeDCkW": 962.24,
   "rooftopSizeACkW": 300,
   "carportSizeACkW": 787,
   "systemSizeACkW": 0,
   "rooftopAreaUsedSqFt": 17000,
   "rooftopTotalSqFt": 84500,
   "carportAreaUsedSqFt": 47000,
   "carportTotalSqFt": 205000,
   "annualMwhHelioScope": 2095,
   "monthlyDistributions": [
    {
     "label": "CA",
     "pct": [
      5.87,
      6.39,
      8.61,
      9.37,
      10.23,
      11.14,
      10.66,
      10.39,
      8.56,
      7.37,
      5.96,
      5.45
     ]
    },
    {
     "label": "AZ",
     "pct": [
      5.5,
      7,
      9.5,
      10.5,
      11,
      11,
      9.5,
      9.5,
      9,
      8,
      5.5,
      4
     ]
    },
    {
     "label": "NV",
     "pct": [
      5,
      6.5,
      9,
      10.5,
      12,
      12.5,
      10.5,
      10.5,
      9,
      7.5,
      5,
      2
     ]
    },
    {
     "label": "FL",
     "pct": [
      7,
      7.5,
      8.5,
      9,
      9.5,
      9,
      9,
      9,
      8.5,
      8.5,
      7.5,
      7
     ]
    },
    {
     "label": "TX",
     "pct": [
      6,
      7,
      9,
      10,
      10.5,
      11,
      11,
      11,
      9.5,
      8,
      6,
      1
     ]
    }
   ],
   "activeDistributionIndex": 0,
   "monthlyPct": [
    7,
    7,
    9,
    10,
    10,
    9,
    10,
    9,
    8,
    8,
    7,
    6
   ],
   "annualSiteLoadMwh": 0,
   "waireEnabled": false,
   "recEnabled": false,
   "currency": "USD",
   "showCoverSection": true,
   "showFeaturesSection": true,
   "showSystemSection": true,
   "showRoofSection": true,
   "showLayoutSection": true,
   "showGenerationSection": true,
   "showEmissionsSection": true,
   "showPPATermsSection": false,
   "showRECsSection": false,
   "showWAIRESection": false,
   "showDegradationSection": true,
   "showSiteInfoSection": true,
   "showMarketContextSection": false,
   "showNextStepsSection": true,
   "showDisclaimerSection": true,
   "additionalNotes": "The property lies approximately 0.6 miles from the threshold of TMB runway 27R, beneath the approach path; a solar glare hazard analysis may be required.\nMature tree coverage in the parking areas presents potential shading, to be reflected in final carport layouts.\nCarport layouts to be coordinated with existing parking-lot pole lighting.\nA geotechnical assessment is recommended to confirm carport foundation feasibility.\nUnderground utility locates and trenching will be required to route carport circuits.",
   "pointsOfInterconnection": 1,
   "feasElectricalMin": 5000,
   "feasElectricalMax": 10000,
   "feasStructuralMin": 5000,
   "feasStructuralMax": 15000,
   "feasGeotechnicalMin": 10000,
   "feasGeotechnicalMax": 15000,
   "feasInterconnectionMin": 5000,
   "feasInterconnectionMax": 5000,
   "ppaTerm": 25,
   "ppaDiscountRate": 0.1,
   "ppaEscalationRate": 0.03,
   "referenceScenarioIndex": 1,
   "year1AvoidedChargesUSD": 0,
   "year1PPARateMWh": 0,
   "utilityEscalationRates": [
    0.03,
    0.04,
    0.05
   ],
   "year1RECValue": 10,
   "recEscalationRate": 0,
   "recProgramName": "RECs",
   "year1WAIREPointValue": 1000,
   "waireEscalationRate": 0,
   "waireInstallPtsPerMW": 150,
   "waireGenMwhPerPt": 165,
   "degradationRate": 0.005,
   "gridEmissionsIntensity": 785,
   "gridEmissionsSource": "U.S. EPA eGRID — FRCC (Florida)",
   "gridEmissionsRegion": "Florida, USA",
   "equivHomesLabel": "U.S.",
   "gridEmissionsDisclaimer": "Grid emissions factor sourced from U.S. EPA eGRID FRCC subregion (Florida).",
   "waireDisclaimer": "WAIRE compliance point generation is subject to CARB methodology and facility-specific activity data.",
   "siteLatLong": "",
   "siteClimateZone": "",
   "sitePSH": "",
   "siteGHI": "",
   "siteAvgTemp": "",
   "siteBuildingType": "",
   "siteRoofType": "",
   "siteUtility": "",
   "siteSolarProgram": "",
   "layoutImageDataUrl": null,
   "marketContextTitle": "California State Overview",
   "marketContextDescription": "California remains one of the largest and most mature distributed solar markets in North America, driven by high retail electricity prices, strong decarbonisation policy, and widespread commercial and industrial load centres suitable for rooftop and carport deployment.",
   "marketContextMonetizationHeader": "Monetization Opportunities",
   "marketContextMonetizationIntro": "The Net Billing Tariff (NBT) is California's standard compensation framework for commercial solar exports. Under NBT, project economics are driven by the balance between on-site consumption and the value of exported energy.",
   "marketContextMonetizationRows": [
    {
     "mechanism": "On-Site Consumption",
     "behaviour": "Solar generation first offsets instantaneous on-site consumption at the full avoided retail electricity rate."
    },
    {
     "mechanism": "Excess Exports",
     "behaviour": "Generation exported to the grid receives a published hourly export credit."
    },
    {
     "mechanism": "Midday Export Pricing",
     "behaviour": "Generally lower than retail energy rates, particularly during high solar production hours."
    },
    {
     "mechanism": "Evening Exports",
     "behaviour": "Export values are often materially higher, improving the economics of battery-backed systems."
    }
   ],
   "marketContextImplicationHeader": "Strategic Implication",
   "marketContextImplicationIntro": "Under the NBT framework, system economics are maximised when generation is consumed on-site or shifted to higher-value evening hours.",
   "marketContextImplicationRows": [
    {
     "priority": "Maximise on-site self-consumption",
     "rationale": "Each MWh consumed on-site offsets the full retail rate — the highest-value use of generation."
    },
    {
     "priority": "Right-size to tenant load",
     "rationale": "Sizing capacity to tenant load profiles avoids over-export at depressed midday rates."
    },
    {
     "priority": "Integrated energy store",
     "rationale": "Battery energy storage systems (BESS) can shift excess generation from midday into higher-value evening export hours."
    }
   ]
  }
 },
 {
  "name": "Citria at Fruitville Commons",
  "data": {
   "companyName": "Great Circle Solar Management Corp.",
   "address": "3017 Clementine Court",
   "city": "Sarasota, Florida",
   "province": "FL",
   "clientName": "DWS Asset Management",
   "tenantName": "",
   "projectName": "Citria at Fruitville Commons",
   "reportDate": "",
   "reportType": "Preliminary Solar Development Opportunity Assessment",
   "rooftopSizeDCkW": 456.32,
   "carportSizeDCkW": 1100,
   "rooftopSizeACkW": 358,
   "carportSizeACkW": 930,
   "systemSizeACkW": 0,
   "rooftopAreaUsedSqFt": 22000,
   "rooftopTotalSqFt": 109300,
   "carportAreaUsedSqFt": 54000,
   "carportTotalSqFt": 128000,
   "annualMwhHelioScope": 2412,
   "monthlyDistributions": [
    {
     "label": "CA",
     "pct": [
      5.87,
      6.39,
      8.61,
      9.37,
      10.23,
      11.14,
      10.66,
      10.39,
      8.56,
      7.37,
      5.96,
      5.45
     ]
    },
    {
     "label": "AZ",
     "pct": [
      5.5,
      7,
      9.5,
      10.5,
      11,
      11,
      9.5,
      9.5,
      9,
      8,
      5.5,
      4
     ]
    },
    {
     "label": "NV",
     "pct": [
      5,
      6.5,
      9,
      10.5,
      12,
      12.5,
      10.5,
      10.5,
      9,
      7.5,
      5,
      2
     ]
    },
    {
     "label": "FL",
     "pct": [
      7,
      7.5,
      8.5,
      9,
      9.5,
      9,
      9,
      9,
      8.5,
      8.5,
      7.5,
      7
     ]
    },
    {
     "label": "TX",
     "pct": [
      6,
      7,
      9,
      10,
      10.5,
      11,
      11,
      11,
      9.5,
      8,
      6,
      1
     ]
    }
   ],
   "activeDistributionIndex": 0,
   "monthlyPct": [
    6.4,
    7.04,
    9.44,
    9.73,
    10.56,
    10.09,
    10.12,
    9.19,
    8.27,
    7.61,
    6.12,
    5.43
   ],
   "annualSiteLoadMwh": 0,
   "waireEnabled": false,
   "recEnabled": false,
   "currency": "USD",
   "showCoverSection": true,
   "showFeaturesSection": true,
   "showSystemSection": true,
   "showRoofSection": true,
   "showLayoutSection": true,
   "showGenerationSection": true,
   "showEmissionsSection": true,
   "showPPATermsSection": false,
   "showRECsSection": false,
   "showWAIRESection": false,
   "showDegradationSection": true,
   "showSiteInfoSection": true,
   "showMarketContextSection": false,
   "showNextStepsSection": true,
   "showDisclaimerSection": true,
   "additionalNotes": "Rooftop areas are sloped shingle roofing; flush-mount racking carries higher temperature losses than flat-roof tilted systems, and attachment methodology and roof condition are to be confirmed.\nThe existing tenant metering arrangement is to be confirmed; individually metered residential units may affect how a building-level system is integrated and credited.",
   "pointsOfInterconnection": 2,
   "feasElectricalMin": 5000,
   "feasElectricalMax": 10000,
   "feasStructuralMin": 5000,
   "feasStructuralMax": 15000,
   "feasGeotechnicalMin": 10000,
   "feasGeotechnicalMax": 15000,
   "feasInterconnectionMin": 5000,
   "feasInterconnectionMax": 5000,
   "ppaTerm": 25,
   "ppaDiscountRate": 0.1,
   "ppaEscalationRate": 0.03,
   "referenceScenarioIndex": 1,
   "year1AvoidedChargesUSD": 0,
   "year1PPARateMWh": 0,
   "utilityEscalationRates": [
    0.03,
    0.04,
    0.05
   ],
   "year1RECValue": 10,
   "recEscalationRate": 0,
   "recProgramName": "RECs",
   "year1WAIREPointValue": 1000,
   "waireEscalationRate": 0,
   "waireInstallPtsPerMW": 150,
   "waireGenMwhPerPt": 165,
   "degradationRate": 0.005,
   "gridEmissionsIntensity": 785,
   "gridEmissionsSource": "U.S. EPA eGRID — FRCC (Florida)",
   "gridEmissionsRegion": "Florida, USA",
   "equivHomesLabel": "U.S.",
   "gridEmissionsDisclaimer": "Grid emissions factor sourced from U.S. EPA eGRID FRCC subregion (Florida).",
   "waireDisclaimer": "WAIRE compliance point generation is subject to CARB methodology and facility-specific activity data.",
   "siteLatLong": "",
   "siteClimateZone": "",
   "sitePSH": "",
   "siteGHI": "",
   "siteAvgTemp": "",
   "siteBuildingType": "Multi-family residential",
   "siteRoofType": "",
   "siteUtility": "",
   "siteSolarProgram": "",
   "layoutImageDataUrl": null,
   "marketContextTitle": "California State Overview",
   "marketContextDescription": "California remains one of the largest and most mature distributed solar markets in North America, driven by high retail electricity prices, strong decarbonisation policy, and widespread commercial and industrial load centres suitable for rooftop and carport deployment.",
   "marketContextMonetizationHeader": "Monetization Opportunities",
   "marketContextMonetizationIntro": "The Net Billing Tariff (NBT) is California's standard compensation framework for commercial solar exports. Under NBT, project economics are driven by the balance between on-site consumption and the value of exported energy.",
   "marketContextMonetizationRows": [
    {
     "mechanism": "On-Site Consumption",
     "behaviour": "Solar generation first offsets instantaneous on-site consumption at the full avoided retail electricity rate."
    },
    {
     "mechanism": "Excess Exports",
     "behaviour": "Generation exported to the grid receives a published hourly export credit."
    },
    {
     "mechanism": "Midday Export Pricing",
     "behaviour": "Generally lower than retail energy rates, particularly during high solar production hours."
    },
    {
     "mechanism": "Evening Exports",
     "behaviour": "Export values are often materially higher, improving the economics of battery-backed systems."
    }
   ],
   "marketContextImplicationHeader": "Strategic Implication",
   "marketContextImplicationIntro": "Under the NBT framework, system economics are maximised when generation is consumed on-site or shifted to higher-value evening hours.",
   "marketContextImplicationRows": [
    {
     "priority": "Maximise on-site self-consumption",
     "rationale": "Each MWh consumed on-site offsets the full retail rate — the highest-value use of generation."
    },
    {
     "priority": "Right-size to tenant load",
     "rationale": "Sizing capacity to tenant load profiles avoids over-export at depressed midday rates."
    },
    {
     "priority": "Integrated energy store",
     "rationale": "Battery energy storage systems (BESS) can shift excess generation from midday into higher-value evening export hours."
    }
   ]
  }
 },
 {
  "name": "The Shops at Oak Brook Place",
  "data": {
   "companyName": "Great Circle Solar Management Corp.",
   "address": "2155 W. 22nd Street",
   "city": "Oak Brook, Illinois",
   "province": "IL",
   "clientName": "DWS Asset Management",
   "tenantName": "",
   "projectName": "The Shops at Oak Brook Place",
   "reportDate": "",
   "reportType": "Preliminary Solar Development Opportunity Assessment",
   "rooftopSizeDCkW": 1200,
   "carportSizeDCkW": 1490,
   "rooftopSizeACkW": 1000,
   "carportSizeACkW": 1240,
   "systemSizeACkW": 0,
   "rooftopAreaUsedSqFt": 56000,
   "rooftopTotalSqFt": 178000,
   "carportAreaUsedSqFt": 72000,
   "carportTotalSqFt": 227000,
   "annualMwhHelioScope": 3366,
   "monthlyDistributions": [
    {
     "label": "CA",
     "pct": [
      5.87,
      6.39,
      8.61,
      9.37,
      10.23,
      11.14,
      10.66,
      10.39,
      8.56,
      7.37,
      5.96,
      5.45
     ]
    },
    {
     "label": "AZ",
     "pct": [
      5.5,
      7,
      9.5,
      10.5,
      11,
      11,
      9.5,
      9.5,
      9,
      8,
      5.5,
      4
     ]
    },
    {
     "label": "NV",
     "pct": [
      5,
      6.5,
      9,
      10.5,
      12,
      12.5,
      10.5,
      10.5,
      9,
      7.5,
      5,
      2
     ]
    },
    {
     "label": "FL",
     "pct": [
      7,
      7.5,
      8.5,
      9,
      9.5,
      9,
      9,
      9,
      8.5,
      8.5,
      7.5,
      7
     ]
    },
    {
     "label": "TX",
     "pct": [
      6,
      7,
      9,
      10,
      10.5,
      11,
      11,
      11,
      9.5,
      8,
      6,
      1
     ]
    }
   ],
   "activeDistributionIndex": 0,
   "monthlyPct": [
    2.8,
    5,
    9.1,
    10,
    12.8,
    13.4,
    13,
    12.3,
    9.6,
    6.9,
    2.8,
    2.3
   ],
   "annualSiteLoadMwh": 0,
   "waireEnabled": false,
   "recEnabled": false,
   "currency": "USD",
   "showCoverSection": true,
   "showFeaturesSection": true,
   "showSystemSection": true,
   "showRoofSection": true,
   "showLayoutSection": true,
   "showGenerationSection": true,
   "showEmissionsSection": true,
   "showPPATermsSection": false,
   "showRECsSection": false,
   "showWAIRESection": false,
   "showDegradationSection": true,
   "showSiteInfoSection": true,
   "showMarketContextSection": false,
   "showNextStepsSection": true,
   "showDisclaimerSection": true,
   "additionalNotes": "Carport layouts to be coordinated with existing parking-lot pole lighting.\nA geotechnical assessment is recommended to confirm carport foundation feasibility.\nUnderground utility locates and trenching will be required to route carport circuits.",
   "pointsOfInterconnection": 1,
   "feasElectricalMin": 5000,
   "feasElectricalMax": 10000,
   "feasStructuralMin": 5000,
   "feasStructuralMax": 15000,
   "feasGeotechnicalMin": 10000,
   "feasGeotechnicalMax": 15000,
   "feasInterconnectionMin": 5000,
   "feasInterconnectionMax": 5000,
   "ppaTerm": 25,
   "ppaDiscountRate": 0.1,
   "ppaEscalationRate": 0.03,
   "referenceScenarioIndex": 1,
   "year1AvoidedChargesUSD": 0,
   "year1PPARateMWh": 0,
   "utilityEscalationRates": [
    0.03,
    0.04,
    0.05
   ],
   "year1RECValue": 10,
   "recEscalationRate": 0,
   "recProgramName": "RECs",
   "year1WAIREPointValue": 1000,
   "waireEscalationRate": 0,
   "waireInstallPtsPerMW": 150,
   "waireGenMwhPerPt": 165,
   "degradationRate": 0.005,
   "gridEmissionsIntensity": 916,
   "gridEmissionsSource": "U.S. EPA eGRID — RFCW (Illinois)",
   "gridEmissionsRegion": "Illinois, USA",
   "equivHomesLabel": "U.S.",
   "gridEmissionsDisclaimer": "Grid emissions factor sourced from U.S. EPA eGRID RFCW subregion (Illinois).",
   "waireDisclaimer": "WAIRE compliance point generation is subject to CARB methodology and facility-specific activity data.",
   "siteLatLong": "",
   "siteClimateZone": "",
   "sitePSH": "",
   "siteGHI": "",
   "siteAvgTemp": "",
   "siteBuildingType": "",
   "siteRoofType": "",
   "siteUtility": "",
   "siteSolarProgram": "",
   "layoutImageDataUrl": null,
   "marketContextTitle": "California State Overview",
   "marketContextDescription": "California remains one of the largest and most mature distributed solar markets in North America, driven by high retail electricity prices, strong decarbonisation policy, and widespread commercial and industrial load centres suitable for rooftop and carport deployment.",
   "marketContextMonetizationHeader": "Monetization Opportunities",
   "marketContextMonetizationIntro": "The Net Billing Tariff (NBT) is California's standard compensation framework for commercial solar exports. Under NBT, project economics are driven by the balance between on-site consumption and the value of exported energy.",
   "marketContextMonetizationRows": [
    {
     "mechanism": "On-Site Consumption",
     "behaviour": "Solar generation first offsets instantaneous on-site consumption at the full avoided retail electricity rate."
    },
    {
     "mechanism": "Excess Exports",
     "behaviour": "Generation exported to the grid receives a published hourly export credit."
    },
    {
     "mechanism": "Midday Export Pricing",
     "behaviour": "Generally lower than retail energy rates, particularly during high solar production hours."
    },
    {
     "mechanism": "Evening Exports",
     "behaviour": "Export values are often materially higher, improving the economics of battery-backed systems."
    }
   ],
   "marketContextImplicationHeader": "Strategic Implication",
   "marketContextImplicationIntro": "Under the NBT framework, system economics are maximised when generation is consumed on-site or shifted to higher-value evening hours.",
   "marketContextImplicationRows": [
    {
     "priority": "Maximise on-site self-consumption",
     "rationale": "Each MWh consumed on-site offsets the full retail rate — the highest-value use of generation."
    },
    {
     "priority": "Right-size to tenant load",
     "rationale": "Sizing capacity to tenant load profiles avoids over-export at depressed midday rates."
    },
    {
     "priority": "Integrated energy store",
     "rationale": "Battery energy storage systems (BESS) can shift excess generation from midday into higher-value evening export hours."
    }
   ]
  }
 },
 {
  "name": "Tropical Center II",
  "data": {
   "companyName": "Great Circle Solar Management Corp.",
   "address": "6260 E. Ann Road",
   "city": "Las Vegas, Nevada",
   "province": "NV",
   "clientName": "DWS Asset Management",
   "tenantName": "",
   "projectName": "Tropical Center II",
   "reportDate": "",
   "reportType": "Preliminary Solar Development Opportunity Assessment",
   "rooftopSizeDCkW": 7070,
   "carportSizeDCkW": 976.5,
   "rooftopSizeACkW": 5700,
   "carportSizeACkW": 800,
   "systemSizeACkW": 0,
   "rooftopAreaUsedSqFt": 338000,
   "rooftopTotalSqFt": 712300,
   "carportAreaUsedSqFt": 49000,
   "carportTotalSqFt": 125000,
   "annualMwhHelioScope": 14031,
   "monthlyDistributions": [
    {
     "label": "CA",
     "pct": [
      5.87,
      6.39,
      8.61,
      9.37,
      10.23,
      11.14,
      10.66,
      10.39,
      8.56,
      7.37,
      5.96,
      5.45
     ]
    },
    {
     "label": "AZ",
     "pct": [
      5.5,
      7,
      9.5,
      10.5,
      11,
      11,
      9.5,
      9.5,
      9,
      8,
      5.5,
      4
     ]
    },
    {
     "label": "NV",
     "pct": [
      5,
      6.5,
      9,
      10.5,
      12,
      12.5,
      10.5,
      10.5,
      9,
      7.5,
      5,
      2
     ]
    },
    {
     "label": "FL",
     "pct": [
      7,
      7.5,
      8.5,
      9,
      9.5,
      9,
      9,
      9,
      8.5,
      8.5,
      7.5,
      7
     ]
    },
    {
     "label": "TX",
     "pct": [
      6,
      7,
      9,
      10,
      10.5,
      11,
      11,
      11,
      9.5,
      8,
      6,
      1
     ]
    }
   ],
   "activeDistributionIndex": 0,
   "monthlyPct": [
    2.3,
    6.4,
    10.1,
    11,
    12.2,
    12.1,
    11.8,
    11,
    9.8,
    8.1,
    3.7,
    1.5
   ],
   "annualSiteLoadMwh": 0,
   "waireEnabled": false,
   "recEnabled": false,
   "currency": "USD",
   "showCoverSection": true,
   "showFeaturesSection": true,
   "showSystemSection": true,
   "showRoofSection": true,
   "showLayoutSection": true,
   "showGenerationSection": true,
   "showEmissionsSection": true,
   "showPPATermsSection": false,
   "showRECsSection": false,
   "showWAIRESection": false,
   "showDegradationSection": true,
   "showSiteInfoSection": true,
   "showMarketContextSection": false,
   "showNextStepsSection": true,
   "showDisclaimerSection": true,
   "additionalNotes": "An existing rooftop PV array is installed; the proposed system’s interaction with the existing array (available area and interconnection capacity) is to be confirmed.\nThe property lies approximately 1.6 miles from the runways at Nellis AFB; a solar glare hazard analysis may be required.\nCarport layouts to be coordinated with existing parking-lot pole lighting.\nA geotechnical assessment is recommended to confirm carport foundation feasibility.\nUnderground utility locates and trenching will be required to route carport circuits.",
   "pointsOfInterconnection": 1,
   "feasElectricalMin": 5000,
   "feasElectricalMax": 10000,
   "feasStructuralMin": 5000,
   "feasStructuralMax": 15000,
   "feasGeotechnicalMin": 10000,
   "feasGeotechnicalMax": 15000,
   "feasInterconnectionMin": 5000,
   "feasInterconnectionMax": 5000,
   "ppaTerm": 25,
   "ppaDiscountRate": 0.1,
   "ppaEscalationRate": 0.03,
   "referenceScenarioIndex": 1,
   "year1AvoidedChargesUSD": 0,
   "year1PPARateMWh": 0,
   "utilityEscalationRates": [
    0.03,
    0.04,
    0.05
   ],
   "year1RECValue": 10,
   "recEscalationRate": 0,
   "recProgramName": "RECs",
   "year1WAIREPointValue": 1000,
   "waireEscalationRate": 0,
   "waireInstallPtsPerMW": 150,
   "waireGenMwhPerPt": 165,
   "degradationRate": 0.005,
   "gridEmissionsIntensity": 706,
   "gridEmissionsSource": "U.S. EPA eGRID — AZNM (Nevada)",
   "gridEmissionsRegion": "Nevada, USA",
   "equivHomesLabel": "U.S.",
   "gridEmissionsDisclaimer": "Grid emissions factor sourced from U.S. EPA eGRID AZNM subregion (Nevada).",
   "waireDisclaimer": "WAIRE compliance point generation is subject to CARB methodology and facility-specific activity data.",
   "siteLatLong": "",
   "siteClimateZone": "",
   "sitePSH": "",
   "siteGHI": "",
   "siteAvgTemp": "",
   "siteBuildingType": "",
   "siteRoofType": "",
   "siteUtility": "",
   "siteSolarProgram": "",
   "layoutImageDataUrl": null,
   "marketContextTitle": "California State Overview",
   "marketContextDescription": "California remains one of the largest and most mature distributed solar markets in North America, driven by high retail electricity prices, strong decarbonisation policy, and widespread commercial and industrial load centres suitable for rooftop and carport deployment.",
   "marketContextMonetizationHeader": "Monetization Opportunities",
   "marketContextMonetizationIntro": "The Net Billing Tariff (NBT) is California's standard compensation framework for commercial solar exports. Under NBT, project economics are driven by the balance between on-site consumption and the value of exported energy.",
   "marketContextMonetizationRows": [
    {
     "mechanism": "On-Site Consumption",
     "behaviour": "Solar generation first offsets instantaneous on-site consumption at the full avoided retail electricity rate."
    },
    {
     "mechanism": "Excess Exports",
     "behaviour": "Generation exported to the grid receives a published hourly export credit."
    },
    {
     "mechanism": "Midday Export Pricing",
     "behaviour": "Generally lower than retail energy rates, particularly during high solar production hours."
    },
    {
     "mechanism": "Evening Exports",
     "behaviour": "Export values are often materially higher, improving the economics of battery-backed systems."
    }
   ],
   "marketContextImplicationHeader": "Strategic Implication",
   "marketContextImplicationIntro": "Under the NBT framework, system economics are maximised when generation is consumed on-site or shifted to higher-value evening hours.",
   "marketContextImplicationRows": [
    {
     "priority": "Maximise on-site self-consumption",
     "rationale": "Each MWh consumed on-site offsets the full retail rate — the highest-value use of generation."
    },
    {
     "priority": "Right-size to tenant load",
     "rationale": "Sizing capacity to tenant load profiles avoids over-export at depressed midday rates."
    },
    {
     "priority": "Integrated energy store",
     "rationale": "Battery energy storage systems (BESS) can shift excess generation from midday into higher-value evening export hours."
    }
   ]
  }
 },
 {
  "name": "Candour House",
  "data": {
   "companyName": "Great Circle Solar Management Corp.",
   "address": "1050 Slater Road",
   "city": "Durham, North Carolina",
   "province": "NC",
   "clientName": "DWS Asset Management",
   "tenantName": "",
   "projectName": "Candour House",
   "reportDate": "",
   "reportType": "Preliminary Solar Development Opportunity Assessment",
   "rooftopSizeDCkW": 499.1,
   "carportSizeDCkW": 297.6,
   "rooftopSizeACkW": 442,
   "carportSizeACkW": 238,
   "systemSizeACkW": 0,
   "rooftopAreaUsedSqFt": 24000,
   "rooftopTotalSqFt": 83300,
   "carportAreaUsedSqFt": 15000,
   "carportTotalSqFt": 102000,
   "annualMwhHelioScope": 1112,
   "monthlyDistributions": [
    {
     "label": "CA",
     "pct": [
      5.87,
      6.39,
      8.61,
      9.37,
      10.23,
      11.14,
      10.66,
      10.39,
      8.56,
      7.37,
      5.96,
      5.45
     ]
    },
    {
     "label": "AZ",
     "pct": [
      5.5,
      7,
      9.5,
      10.5,
      11,
      11,
      9.5,
      9.5,
      9,
      8,
      5.5,
      4
     ]
    },
    {
     "label": "NV",
     "pct": [
      5,
      6.5,
      9,
      10.5,
      12,
      12.5,
      10.5,
      10.5,
      9,
      7.5,
      5,
      2
     ]
    },
    {
     "label": "FL",
     "pct": [
      7,
      7.5,
      8.5,
      9,
      9.5,
      9,
      9,
      9,
      8.5,
      8.5,
      7.5,
      7
     ]
    },
    {
     "label": "TX",
     "pct": [
      6,
      7,
      9,
      10,
      10.5,
      11,
      11,
      11,
      9.5,
      8,
      6,
      1
     ]
    }
   ],
   "activeDistributionIndex": 0,
   "monthlyPct": [
    4.73,
    5.66,
    8.18,
    10.35,
    11.78,
    11.74,
    11.7,
    10.8,
    8.57,
    7.21,
    5.16,
    4.12
   ],
   "annualSiteLoadMwh": 0,
   "waireEnabled": false,
   "recEnabled": false,
   "currency": "USD",
   "showCoverSection": true,
   "showFeaturesSection": true,
   "showSystemSection": true,
   "showRoofSection": true,
   "showLayoutSection": true,
   "showGenerationSection": true,
   "showEmissionsSection": true,
   "showPPATermsSection": false,
   "showRECsSection": false,
   "showWAIRESection": false,
   "showDegradationSection": true,
   "showSiteInfoSection": true,
   "showMarketContextSection": false,
   "showNextStepsSection": true,
   "showDisclaimerSection": true,
   "additionalNotes": "The existing tenant metering arrangement is to be confirmed; individually metered residential units may affect how a building-level system is integrated and credited.\nConstruction feasibility to be assessed in view of the building height.\nAdjacent buildings may cast shading on the proposed carport areas, to be reflected in final layouts.\nBuilding orientation poses challenges to optimising array azimuth and layout.",
   "pointsOfInterconnection": 4,
   "feasElectricalMin": 5000,
   "feasElectricalMax": 10000,
   "feasStructuralMin": 5000,
   "feasStructuralMax": 15000,
   "feasGeotechnicalMin": 10000,
   "feasGeotechnicalMax": 15000,
   "feasInterconnectionMin": 5000,
   "feasInterconnectionMax": 5000,
   "ppaTerm": 25,
   "ppaDiscountRate": 0.1,
   "ppaEscalationRate": 0.03,
   "referenceScenarioIndex": 1,
   "year1AvoidedChargesUSD": 0,
   "year1PPARateMWh": 0,
   "utilityEscalationRates": [
    0.03,
    0.04,
    0.05
   ],
   "year1RECValue": 10,
   "recEscalationRate": 0,
   "recProgramName": "RECs",
   "year1WAIREPointValue": 1000,
   "waireEscalationRate": 0,
   "waireInstallPtsPerMW": 150,
   "waireGenMwhPerPt": 165,
   "degradationRate": 0.005,
   "gridEmissionsIntensity": 596,
   "gridEmissionsSource": "U.S. EPA eGRID — SRVC (North Carolina)",
   "gridEmissionsRegion": "North Carolina, USA",
   "equivHomesLabel": "U.S.",
   "gridEmissionsDisclaimer": "Grid emissions factor sourced from U.S. EPA eGRID SRVC subregion (North Carolina).",
   "waireDisclaimer": "WAIRE compliance point generation is subject to CARB methodology and facility-specific activity data.",
   "siteLatLong": "",
   "siteClimateZone": "",
   "sitePSH": "",
   "siteGHI": "",
   "siteAvgTemp": "",
   "siteBuildingType": "Multi-family residential",
   "siteRoofType": "",
   "siteUtility": "",
   "siteSolarProgram": "",
   "layoutImageDataUrl": null,
   "marketContextTitle": "California State Overview",
   "marketContextDescription": "California remains one of the largest and most mature distributed solar markets in North America, driven by high retail electricity prices, strong decarbonisation policy, and widespread commercial and industrial load centres suitable for rooftop and carport deployment.",
   "marketContextMonetizationHeader": "Monetization Opportunities",
   "marketContextMonetizationIntro": "The Net Billing Tariff (NBT) is California's standard compensation framework for commercial solar exports. Under NBT, project economics are driven by the balance between on-site consumption and the value of exported energy.",
   "marketContextMonetizationRows": [
    {
     "mechanism": "On-Site Consumption",
     "behaviour": "Solar generation first offsets instantaneous on-site consumption at the full avoided retail electricity rate."
    },
    {
     "mechanism": "Excess Exports",
     "behaviour": "Generation exported to the grid receives a published hourly export credit."
    },
    {
     "mechanism": "Midday Export Pricing",
     "behaviour": "Generally lower than retail energy rates, particularly during high solar production hours."
    },
    {
     "mechanism": "Evening Exports",
     "behaviour": "Export values are often materially higher, improving the economics of battery-backed systems."
    }
   ],
   "marketContextImplicationHeader": "Strategic Implication",
   "marketContextImplicationIntro": "Under the NBT framework, system economics are maximised when generation is consumed on-site or shifted to higher-value evening hours.",
   "marketContextImplicationRows": [
    {
     "priority": "Maximise on-site self-consumption",
     "rationale": "Each MWh consumed on-site offsets the full retail rate — the highest-value use of generation."
    },
    {
     "priority": "Right-size to tenant load",
     "rationale": "Sizing capacity to tenant load profiles avoids over-export at depressed midday rates."
    },
    {
     "priority": "Integrated energy store",
     "rationale": "Battery energy storage systems (BESS) can shift excess generation from midday into higher-value evening export hours."
    }
   ]
  }
 },
 {
  "name": "1201 Avenue S",
  "data": {
   "companyName": "Great Circle Solar Management Corp.",
   "address": "1201 Avenue South",
   "city": "Grand Prairie, Texas",
   "province": "TX",
   "clientName": "DWS Asset Management",
   "tenantName": "",
   "projectName": "1201 Avenue S",
   "reportDate": "",
   "reportType": "Preliminary Solar Development Opportunity Assessment",
   "rooftopSizeDCkW": 1280,
   "carportSizeDCkW": 0,
   "rooftopSizeACkW": 1100,
   "carportSizeACkW": 0,
   "systemSizeACkW": 0,
   "rooftopAreaUsedSqFt": 59000,
   "rooftopTotalSqFt": 115900,
   "carportAreaUsedSqFt": 0,
   "carportTotalSqFt": 0,
   "annualMwhHelioScope": 2172,
   "monthlyDistributions": [
    {
     "label": "CA",
     "pct": [
      5.87,
      6.39,
      8.61,
      9.37,
      10.23,
      11.14,
      10.66,
      10.39,
      8.56,
      7.37,
      5.96,
      5.45
     ]
    },
    {
     "label": "AZ",
     "pct": [
      5.5,
      7,
      9.5,
      10.5,
      11,
      11,
      9.5,
      9.5,
      9,
      8,
      5.5,
      4
     ]
    },
    {
     "label": "NV",
     "pct": [
      5,
      6.5,
      9,
      10.5,
      12,
      12.5,
      10.5,
      10.5,
      9,
      7.5,
      5,
      2
     ]
    },
    {
     "label": "FL",
     "pct": [
      7,
      7.5,
      8.5,
      9,
      9.5,
      9,
      9,
      9,
      8.5,
      8.5,
      7.5,
      7
     ]
    },
    {
     "label": "TX",
     "pct": [
      6,
      7,
      9,
      10,
      10.5,
      11,
      11,
      11,
      9.5,
      8,
      6,
      1
     ]
    }
   ],
   "activeDistributionIndex": 0,
   "monthlyPct": [
    4.19,
    6.68,
    9.17,
    9.47,
    10.78,
    11.48,
    11.71,
    11.23,
    9.43,
    8.37,
    5.28,
    2.21
   ],
   "annualSiteLoadMwh": 0,
   "waireEnabled": false,
   "recEnabled": false,
   "currency": "USD",
   "showCoverSection": true,
   "showFeaturesSection": true,
   "showSystemSection": true,
   "showRoofSection": true,
   "showLayoutSection": true,
   "showGenerationSection": true,
   "showEmissionsSection": true,
   "showPPATermsSection": false,
   "showRECsSection": false,
   "showWAIRESection": false,
   "showDegradationSection": true,
   "showSiteInfoSection": true,
   "showMarketContextSection": false,
   "showNextStepsSection": true,
   "showDisclaimerSection": true,
   "additionalNotes": "The property lies approximately 6.2 miles from the thresholds of DFW runways 36R/L, beneath the approach path; a solar glare hazard analysis may be required.",
   "pointsOfInterconnection": 1,
   "feasElectricalMin": 5000,
   "feasElectricalMax": 10000,
   "feasStructuralMin": 5000,
   "feasStructuralMax": 15000,
   "feasGeotechnicalMin": 10000,
   "feasGeotechnicalMax": 15000,
   "feasInterconnectionMin": 5000,
   "feasInterconnectionMax": 5000,
   "ppaTerm": 25,
   "ppaDiscountRate": 0.1,
   "ppaEscalationRate": 0.03,
   "referenceScenarioIndex": 1,
   "year1AvoidedChargesUSD": 0,
   "year1PPARateMWh": 0,
   "utilityEscalationRates": [
    0.03,
    0.04,
    0.05
   ],
   "year1RECValue": 10,
   "recEscalationRate": 0,
   "recProgramName": "RECs",
   "year1WAIREPointValue": 1000,
   "waireEscalationRate": 0,
   "waireInstallPtsPerMW": 150,
   "waireGenMwhPerPt": 165,
   "degradationRate": 0.005,
   "gridEmissionsIntensity": 737,
   "gridEmissionsSource": "U.S. EPA eGRID — ERCT (Texas)",
   "gridEmissionsRegion": "Texas, USA",
   "equivHomesLabel": "U.S.",
   "gridEmissionsDisclaimer": "Grid emissions factor sourced from U.S. EPA eGRID ERCT subregion (Texas).",
   "waireDisclaimer": "WAIRE compliance point generation is subject to CARB methodology and facility-specific activity data.",
   "siteLatLong": "",
   "siteClimateZone": "",
   "sitePSH": "",
   "siteGHI": "",
   "siteAvgTemp": "",
   "siteBuildingType": "",
   "siteRoofType": "",
   "siteUtility": "",
   "siteSolarProgram": "",
   "layoutImageDataUrl": null,
   "marketContextTitle": "California State Overview",
   "marketContextDescription": "California remains one of the largest and most mature distributed solar markets in North America, driven by high retail electricity prices, strong decarbonisation policy, and widespread commercial and industrial load centres suitable for rooftop and carport deployment.",
   "marketContextMonetizationHeader": "Monetization Opportunities",
   "marketContextMonetizationIntro": "The Net Billing Tariff (NBT) is California's standard compensation framework for commercial solar exports. Under NBT, project economics are driven by the balance between on-site consumption and the value of exported energy.",
   "marketContextMonetizationRows": [
    {
     "mechanism": "On-Site Consumption",
     "behaviour": "Solar generation first offsets instantaneous on-site consumption at the full avoided retail electricity rate."
    },
    {
     "mechanism": "Excess Exports",
     "behaviour": "Generation exported to the grid receives a published hourly export credit."
    },
    {
     "mechanism": "Midday Export Pricing",
     "behaviour": "Generally lower than retail energy rates, particularly during high solar production hours."
    },
    {
     "mechanism": "Evening Exports",
     "behaviour": "Export values are often materially higher, improving the economics of battery-backed systems."
    }
   ],
   "marketContextImplicationHeader": "Strategic Implication",
   "marketContextImplicationIntro": "Under the NBT framework, system economics are maximised when generation is consumed on-site or shifted to higher-value evening hours.",
   "marketContextImplicationRows": [
    {
     "priority": "Maximise on-site self-consumption",
     "rationale": "Each MWh consumed on-site offsets the full retail rate — the highest-value use of generation."
    },
    {
     "priority": "Right-size to tenant load",
     "rationale": "Sizing capacity to tenant load profiles avoids over-export at depressed midday rates."
    },
    {
     "priority": "Integrated energy store",
     "rationale": "Battery energy storage systems (BESS) can shift excess generation from midday into higher-value evening export hours."
    }
   ]
  }
 },
 {
  "name": "Lakeside A",
  "data": {
   "companyName": "Great Circle Solar Management Corp.",
   "address": "1201 Lakeside Parkway",
   "city": "Flower Mound, Texas",
   "province": "TX",
   "clientName": "DWS Asset Management",
   "tenantName": "",
   "projectName": "Lakeside A",
   "reportDate": "",
   "reportType": "Preliminary Solar Development Opportunity Assessment",
   "rooftopSizeDCkW": 1500,
   "carportSizeDCkW": 0,
   "rooftopSizeACkW": 1200,
   "carportSizeACkW": 0,
   "systemSizeACkW": 0,
   "rooftopAreaUsedSqFt": 72000,
   "rooftopTotalSqFt": 152100,
   "carportAreaUsedSqFt": 0,
   "carportTotalSqFt": 0,
   "annualMwhHelioScope": 2522,
   "monthlyDistributions": [
    {
     "label": "CA",
     "pct": [
      5.87,
      6.39,
      8.61,
      9.37,
      10.23,
      11.14,
      10.66,
      10.39,
      8.56,
      7.37,
      5.96,
      5.45
     ]
    },
    {
     "label": "AZ",
     "pct": [
      5.5,
      7,
      9.5,
      10.5,
      11,
      11,
      9.5,
      9.5,
      9,
      8,
      5.5,
      4
     ]
    },
    {
     "label": "NV",
     "pct": [
      5,
      6.5,
      9,
      10.5,
      12,
      12.5,
      10.5,
      10.5,
      9,
      7.5,
      5,
      2
     ]
    },
    {
     "label": "FL",
     "pct": [
      7,
      7.5,
      8.5,
      9,
      9.5,
      9,
      9,
      9,
      8.5,
      8.5,
      7.5,
      7
     ]
    },
    {
     "label": "TX",
     "pct": [
      6,
      7,
      9,
      10,
      10.5,
      11,
      11,
      11,
      9.5,
      8,
      6,
      1
     ]
    }
   ],
   "activeDistributionIndex": 0,
   "monthlyPct": [
    4,
    6.7,
    9.2,
    9.6,
    10.9,
    11.6,
    11.9,
    11.3,
    9.5,
    8.4,
    5,
    1.9
   ],
   "annualSiteLoadMwh": 0,
   "waireEnabled": false,
   "recEnabled": false,
   "currency": "USD",
   "showCoverSection": true,
   "showFeaturesSection": true,
   "showSystemSection": true,
   "showRoofSection": true,
   "showLayoutSection": true,
   "showGenerationSection": true,
   "showEmissionsSection": true,
   "showPPATermsSection": false,
   "showRECsSection": false,
   "showWAIRESection": false,
   "showDegradationSection": true,
   "showSiteInfoSection": true,
   "showMarketContextSection": false,
   "showNextStepsSection": true,
   "showDisclaimerSection": true,
   "additionalNotes": "The property lies approximately 5.2 miles from the thresholds of DFW runways 18R/L, beneath the approach path; a solar glare hazard analysis may be required.",
   "pointsOfInterconnection": 1,
   "feasElectricalMin": 5000,
   "feasElectricalMax": 10000,
   "feasStructuralMin": 5000,
   "feasStructuralMax": 15000,
   "feasGeotechnicalMin": 10000,
   "feasGeotechnicalMax": 15000,
   "feasInterconnectionMin": 5000,
   "feasInterconnectionMax": 5000,
   "ppaTerm": 25,
   "ppaDiscountRate": 0.1,
   "ppaEscalationRate": 0.03,
   "referenceScenarioIndex": 1,
   "year1AvoidedChargesUSD": 0,
   "year1PPARateMWh": 0,
   "utilityEscalationRates": [
    0.03,
    0.04,
    0.05
   ],
   "year1RECValue": 10,
   "recEscalationRate": 0,
   "recProgramName": "RECs",
   "year1WAIREPointValue": 1000,
   "waireEscalationRate": 0,
   "waireInstallPtsPerMW": 150,
   "waireGenMwhPerPt": 165,
   "degradationRate": 0.005,
   "gridEmissionsIntensity": 737,
   "gridEmissionsSource": "U.S. EPA eGRID — ERCT (Texas)",
   "gridEmissionsRegion": "Texas, USA",
   "equivHomesLabel": "U.S.",
   "gridEmissionsDisclaimer": "Grid emissions factor sourced from U.S. EPA eGRID ERCT subregion (Texas).",
   "waireDisclaimer": "WAIRE compliance point generation is subject to CARB methodology and facility-specific activity data.",
   "siteLatLong": "",
   "siteClimateZone": "",
   "sitePSH": "",
   "siteGHI": "",
   "siteAvgTemp": "",
   "siteBuildingType": "",
   "siteRoofType": "",
   "siteUtility": "",
   "siteSolarProgram": "",
   "layoutImageDataUrl": null,
   "marketContextTitle": "California State Overview",
   "marketContextDescription": "California remains one of the largest and most mature distributed solar markets in North America, driven by high retail electricity prices, strong decarbonisation policy, and widespread commercial and industrial load centres suitable for rooftop and carport deployment.",
   "marketContextMonetizationHeader": "Monetization Opportunities",
   "marketContextMonetizationIntro": "The Net Billing Tariff (NBT) is California's standard compensation framework for commercial solar exports. Under NBT, project economics are driven by the balance between on-site consumption and the value of exported energy.",
   "marketContextMonetizationRows": [
    {
     "mechanism": "On-Site Consumption",
     "behaviour": "Solar generation first offsets instantaneous on-site consumption at the full avoided retail electricity rate."
    },
    {
     "mechanism": "Excess Exports",
     "behaviour": "Generation exported to the grid receives a published hourly export credit."
    },
    {
     "mechanism": "Midday Export Pricing",
     "behaviour": "Generally lower than retail energy rates, particularly during high solar production hours."
    },
    {
     "mechanism": "Evening Exports",
     "behaviour": "Export values are often materially higher, improving the economics of battery-backed systems."
    }
   ],
   "marketContextImplicationHeader": "Strategic Implication",
   "marketContextImplicationIntro": "Under the NBT framework, system economics are maximised when generation is consumed on-site or shifted to higher-value evening hours.",
   "marketContextImplicationRows": [
    {
     "priority": "Maximise on-site self-consumption",
     "rationale": "Each MWh consumed on-site offsets the full retail rate — the highest-value use of generation."
    },
    {
     "priority": "Right-size to tenant load",
     "rationale": "Sizing capacity to tenant load profiles avoids over-export at depressed midday rates."
    },
    {
     "priority": "Integrated energy store",
     "rationale": "Battery energy storage systems (BESS) can shift excess generation from midday into higher-value evening export hours."
    }
   ]
  }
 },
 {
  "name": "Lakeside B",
  "data": {
   "companyName": "Great Circle Solar Management Corp.",
   "address": "501 Gerault Road",
   "city": "Flower Mound, Texas",
   "province": "TX",
   "clientName": "DWS Asset Management",
   "tenantName": "",
   "projectName": "Lakeside B",
   "reportDate": "",
   "reportType": "Preliminary Solar Development Opportunity Assessment",
   "rooftopSizeDCkW": 3080,
   "carportSizeDCkW": 0,
   "rooftopSizeACkW": 2500,
   "carportSizeACkW": 0,
   "systemSizeACkW": 0,
   "rooftopAreaUsedSqFt": 149000,
   "rooftopTotalSqFt": 297500,
   "carportAreaUsedSqFt": 0,
   "carportTotalSqFt": 0,
   "annualMwhHelioScope": 5206,
   "monthlyDistributions": [
    {
     "label": "CA",
     "pct": [
      5.87,
      6.39,
      8.61,
      9.37,
      10.23,
      11.14,
      10.66,
      10.39,
      8.56,
      7.37,
      5.96,
      5.45
     ]
    },
    {
     "label": "AZ",
     "pct": [
      5.5,
      7,
      9.5,
      10.5,
      11,
      11,
      9.5,
      9.5,
      9,
      8,
      5.5,
      4
     ]
    },
    {
     "label": "NV",
     "pct": [
      5,
      6.5,
      9,
      10.5,
      12,
      12.5,
      10.5,
      10.5,
      9,
      7.5,
      5,
      2
     ]
    },
    {
     "label": "FL",
     "pct": [
      7,
      7.5,
      8.5,
      9,
      9.5,
      9,
      9,
      9,
      8.5,
      8.5,
      7.5,
      7
     ]
    },
    {
     "label": "TX",
     "pct": [
      6,
      7,
      9,
      10,
      10.5,
      11,
      11,
      11,
      9.5,
      8,
      6,
      1
     ]
    }
   ],
   "activeDistributionIndex": 0,
   "monthlyPct": [
    4,
    7,
    9,
    10,
    11,
    12,
    12,
    11,
    9,
    8,
    5,
    2
   ],
   "annualSiteLoadMwh": 0,
   "waireEnabled": false,
   "recEnabled": false,
   "currency": "USD",
   "showCoverSection": true,
   "showFeaturesSection": true,
   "showSystemSection": true,
   "showRoofSection": true,
   "showLayoutSection": true,
   "showGenerationSection": true,
   "showEmissionsSection": true,
   "showPPATermsSection": false,
   "showRECsSection": false,
   "showWAIRESection": false,
   "showDegradationSection": true,
   "showSiteInfoSection": true,
   "showMarketContextSection": false,
   "showNextStepsSection": true,
   "showDisclaimerSection": true,
   "additionalNotes": "The property lies approximately 5.2 miles from the thresholds of DFW runways 18R/L, beneath the approach path; a solar glare hazard analysis may be required.",
   "pointsOfInterconnection": 1,
   "feasElectricalMin": 5000,
   "feasElectricalMax": 10000,
   "feasStructuralMin": 5000,
   "feasStructuralMax": 15000,
   "feasGeotechnicalMin": 10000,
   "feasGeotechnicalMax": 15000,
   "feasInterconnectionMin": 5000,
   "feasInterconnectionMax": 5000,
   "ppaTerm": 25,
   "ppaDiscountRate": 0.1,
   "ppaEscalationRate": 0.03,
   "referenceScenarioIndex": 1,
   "year1AvoidedChargesUSD": 0,
   "year1PPARateMWh": 0,
   "utilityEscalationRates": [
    0.03,
    0.04,
    0.05
   ],
   "year1RECValue": 10,
   "recEscalationRate": 0,
   "recProgramName": "RECs",
   "year1WAIREPointValue": 1000,
   "waireEscalationRate": 0,
   "waireInstallPtsPerMW": 150,
   "waireGenMwhPerPt": 165,
   "degradationRate": 0.005,
   "gridEmissionsIntensity": 737,
   "gridEmissionsSource": "U.S. EPA eGRID — ERCT (Texas)",
   "gridEmissionsRegion": "Texas, USA",
   "equivHomesLabel": "U.S.",
   "gridEmissionsDisclaimer": "Grid emissions factor sourced from U.S. EPA eGRID ERCT subregion (Texas).",
   "waireDisclaimer": "WAIRE compliance point generation is subject to CARB methodology and facility-specific activity data.",
   "siteLatLong": "",
   "siteClimateZone": "",
   "sitePSH": "",
   "siteGHI": "",
   "siteAvgTemp": "",
   "siteBuildingType": "",
   "siteRoofType": "",
   "siteUtility": "",
   "siteSolarProgram": "",
   "layoutImageDataUrl": null,
   "marketContextTitle": "California State Overview",
   "marketContextDescription": "California remains one of the largest and most mature distributed solar markets in North America, driven by high retail electricity prices, strong decarbonisation policy, and widespread commercial and industrial load centres suitable for rooftop and carport deployment.",
   "marketContextMonetizationHeader": "Monetization Opportunities",
   "marketContextMonetizationIntro": "The Net Billing Tariff (NBT) is California's standard compensation framework for commercial solar exports. Under NBT, project economics are driven by the balance between on-site consumption and the value of exported energy.",
   "marketContextMonetizationRows": [
    {
     "mechanism": "On-Site Consumption",
     "behaviour": "Solar generation first offsets instantaneous on-site consumption at the full avoided retail electricity rate."
    },
    {
     "mechanism": "Excess Exports",
     "behaviour": "Generation exported to the grid receives a published hourly export credit."
    },
    {
     "mechanism": "Midday Export Pricing",
     "behaviour": "Generally lower than retail energy rates, particularly during high solar production hours."
    },
    {
     "mechanism": "Evening Exports",
     "behaviour": "Export values are often materially higher, improving the economics of battery-backed systems."
    }
   ],
   "marketContextImplicationHeader": "Strategic Implication",
   "marketContextImplicationIntro": "Under the NBT framework, system economics are maximised when generation is consumed on-site or shifted to higher-value evening hours.",
   "marketContextImplicationRows": [
    {
     "priority": "Maximise on-site self-consumption",
     "rationale": "Each MWh consumed on-site offsets the full retail rate — the highest-value use of generation."
    },
    {
     "priority": "Right-size to tenant load",
     "rationale": "Sizing capacity to tenant load profiles avoids over-export at depressed midday rates."
    },
    {
     "priority": "Integrated energy store",
     "rationale": "Battery energy storage systems (BESS) can shift excess generation from midday into higher-value evening export hours."
    }
   ]
  }
 },
 {
  "name": "Post & Paddock",
  "data": {
   "companyName": "Great Circle Solar Management Corp.",
   "address": "1025 Post & Paddock Street",
   "city": "Grand Prairie, Texas",
   "province": "TX",
   "clientName": "DWS Asset Management",
   "tenantName": "",
   "projectName": "Post & Paddock",
   "reportDate": "",
   "reportType": "Preliminary Solar Development Opportunity Assessment",
   "rooftopSizeDCkW": 4130,
   "carportSizeDCkW": 232.5,
   "rooftopSizeACkW": 3400,
   "carportSizeACkW": 200,
   "systemSizeACkW": 0,
   "rooftopAreaUsedSqFt": 198000,
   "rooftopTotalSqFt": 420500,
   "carportAreaUsedSqFt": 11000,
   "carportTotalSqFt": 38000,
   "annualMwhHelioScope": 7388,
   "monthlyDistributions": [
    {
     "label": "CA",
     "pct": [
      5.87,
      6.39,
      8.61,
      9.37,
      10.23,
      11.14,
      10.66,
      10.39,
      8.56,
      7.37,
      5.96,
      5.45
     ]
    },
    {
     "label": "AZ",
     "pct": [
      5.5,
      7,
      9.5,
      10.5,
      11,
      11,
      9.5,
      9.5,
      9,
      8,
      5.5,
      4
     ]
    },
    {
     "label": "NV",
     "pct": [
      5,
      6.5,
      9,
      10.5,
      12,
      12.5,
      10.5,
      10.5,
      9,
      7.5,
      5,
      2
     ]
    },
    {
     "label": "FL",
     "pct": [
      7,
      7.5,
      8.5,
      9,
      9.5,
      9,
      9,
      9,
      8.5,
      8.5,
      7.5,
      7
     ]
    },
    {
     "label": "TX",
     "pct": [
      6,
      7,
      9,
      10,
      10.5,
      11,
      11,
      11,
      9.5,
      8,
      6,
      1
     ]
    }
   ],
   "activeDistributionIndex": 0,
   "monthlyPct": [
    4.16,
    6.68,
    9.19,
    9.48,
    10.8,
    11.5,
    11.73,
    11.25,
    9.44,
    8.39,
    5.29,
    2.09
   ],
   "annualSiteLoadMwh": 0,
   "waireEnabled": false,
   "recEnabled": false,
   "currency": "USD",
   "showCoverSection": true,
   "showFeaturesSection": true,
   "showSystemSection": true,
   "showRoofSection": true,
   "showLayoutSection": true,
   "showGenerationSection": true,
   "showEmissionsSection": true,
   "showPPATermsSection": false,
   "showRECsSection": false,
   "showWAIRESection": false,
   "showDegradationSection": true,
   "showSiteInfoSection": true,
   "showMarketContextSection": false,
   "showNextStepsSection": true,
   "showDisclaimerSection": true,
   "additionalNotes": "The property lies approximately 5.7 miles from the thresholds of DFW runways 36R/L, directly beneath the approach path; a solar glare hazard analysis may be required.\nA geotechnical assessment is recommended to confirm carport foundation feasibility.\nUnderground utility locates and trenching will be required to route carport circuits.",
   "pointsOfInterconnection": 1,
   "feasElectricalMin": 5000,
   "feasElectricalMax": 10000,
   "feasStructuralMin": 5000,
   "feasStructuralMax": 15000,
   "feasGeotechnicalMin": 10000,
   "feasGeotechnicalMax": 15000,
   "feasInterconnectionMin": 5000,
   "feasInterconnectionMax": 5000,
   "ppaTerm": 25,
   "ppaDiscountRate": 0.1,
   "ppaEscalationRate": 0.03,
   "referenceScenarioIndex": 1,
   "year1AvoidedChargesUSD": 0,
   "year1PPARateMWh": 0,
   "utilityEscalationRates": [
    0.03,
    0.04,
    0.05
   ],
   "year1RECValue": 10,
   "recEscalationRate": 0,
   "recProgramName": "RECs",
   "year1WAIREPointValue": 1000,
   "waireEscalationRate": 0,
   "waireInstallPtsPerMW": 150,
   "waireGenMwhPerPt": 165,
   "degradationRate": 0.005,
   "gridEmissionsIntensity": 737,
   "gridEmissionsSource": "U.S. EPA eGRID — ERCT (Texas)",
   "gridEmissionsRegion": "Texas, USA",
   "equivHomesLabel": "U.S.",
   "gridEmissionsDisclaimer": "Grid emissions factor sourced from U.S. EPA eGRID ERCT subregion (Texas).",
   "waireDisclaimer": "WAIRE compliance point generation is subject to CARB methodology and facility-specific activity data.",
   "siteLatLong": "",
   "siteClimateZone": "",
   "sitePSH": "",
   "siteGHI": "",
   "siteAvgTemp": "",
   "siteBuildingType": "",
   "siteRoofType": "",
   "siteUtility": "",
   "siteSolarProgram": "",
   "layoutImageDataUrl": null,
   "marketContextTitle": "California State Overview",
   "marketContextDescription": "California remains one of the largest and most mature distributed solar markets in North America, driven by high retail electricity prices, strong decarbonisation policy, and widespread commercial and industrial load centres suitable for rooftop and carport deployment.",
   "marketContextMonetizationHeader": "Monetization Opportunities",
   "marketContextMonetizationIntro": "The Net Billing Tariff (NBT) is California's standard compensation framework for commercial solar exports. Under NBT, project economics are driven by the balance between on-site consumption and the value of exported energy.",
   "marketContextMonetizationRows": [
    {
     "mechanism": "On-Site Consumption",
     "behaviour": "Solar generation first offsets instantaneous on-site consumption at the full avoided retail electricity rate."
    },
    {
     "mechanism": "Excess Exports",
     "behaviour": "Generation exported to the grid receives a published hourly export credit."
    },
    {
     "mechanism": "Midday Export Pricing",
     "behaviour": "Generally lower than retail energy rates, particularly during high solar production hours."
    },
    {
     "mechanism": "Evening Exports",
     "behaviour": "Export values are often materially higher, improving the economics of battery-backed systems."
    }
   ],
   "marketContextImplicationHeader": "Strategic Implication",
   "marketContextImplicationIntro": "Under the NBT framework, system economics are maximised when generation is consumed on-site or shifted to higher-value evening hours.",
   "marketContextImplicationRows": [
    {
     "priority": "Maximise on-site self-consumption",
     "rationale": "Each MWh consumed on-site offsets the full retail rate — the highest-value use of generation."
    },
    {
     "priority": "Right-size to tenant load",
     "rationale": "Sizing capacity to tenant load profiles avoids over-export at depressed midday rates."
    },
    {
     "priority": "Integrated energy store",
     "rationale": "Battery energy storage systems (BESS) can shift excess generation from midday into higher-value evening export hours."
    }
   ]
  }
 }
];

// Bundled HelioScope layout images (public/layouts/). Attached by the data
// updater only where a project has no image yet — a manually uploaded or
// replaced image is never overwritten.
export const DWS_LAYOUT_IMAGES = {
  'Eastland Center': '/layouts/eastland.png',
  'Courtyard at the Commons': '/layouts/courtyard.png',
  'DC Station Retail': '/layouts/dc-station.png',
  '100 Hamilton': '/layouts/100-hamilton.png',
  'Tuscany on Fig': '/layouts/tuscany.png',
  'London Square': '/layouts/london-square.png',
  'Citria at Fruitville Commons': '/layouts/citria.png',
  'The Shops at Oak Brook Place': '/layouts/oak-brook.png',
  'Tropical Center II': '/layouts/tropical-center-ii.png',
  'Candour House': '/layouts/candour-house.png',
  '1201 Avenue S': '/layouts/1201-avenue-s.png',
  'Lakeside A': '/layouts/lakeside-a.png',
  'Lakeside B': '/layouts/lakeside-b.png',
  'Post & Paddock': '/layouts/post-paddock.png',
};
