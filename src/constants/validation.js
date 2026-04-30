export function validateProject(p) {
  const errs = {};

  const textRequired = {
    companyName:             'Company name is required',
    address:                 'Property address is required',
    city:                    'City / state is required',
    clientName:              'Client name is required',
    tenantName:              'Tenant / offtaker name is required',
    gridEmissionsSource:     'Source citation is required',
    gridEmissionsRegion:     'Emissions region is required',
    equivHomesLabel:         'Equiv. homes label is required',
    gridEmissionsDisclaimer: 'Emissions disclaimer is required',
  };
  Object.entries(textRequired).forEach(([k, msg]) => {
    if (!p[k]) errs[k] = msg;
  });

  if (!p.annualMwhHelioScope || p.annualMwhHelioScope <= 0)
    errs.annualMwhHelioScope = 'Must be > 0';
  if (!p.systemSizeDCkW || p.systemSizeDCkW <= 0)
    errs.systemSizeDCkW = 'Must be > 0';
  if (!p.ppaTerm || p.ppaTerm < 1 || p.ppaTerm > 40)
    errs.ppaTerm = 'Must be 1–40 years';
  if (!p.ppaDiscountRate || p.ppaDiscountRate <= 0 || p.ppaDiscountRate >= 1)
    errs.ppaDiscountRate = 'Must be between 0 and 1 (e.g. 0.10)';
  if (!p.year1AvoidedChargesUSD || p.year1AvoidedChargesUSD <= 0)
    errs.year1AvoidedChargesUSD = 'Must be > 0';
  if (p.degradationRate < 0 || p.degradationRate >= 0.1)
    errs.degradationRate = 'Must be 0–10% (e.g. 0.005)';
  if (!p.gridEmissionsIntensity || p.gridEmissionsIntensity <= 0)
    errs.gridEmissionsIntensity = 'Must be > 0';

  if (!Array.isArray(p.monthlyPct) || p.monthlyPct.length !== 12) {
    errs.monthlyPct = 'Must have exactly 12 values';
  } else {
    const sum = p.monthlyPct.reduce((a, b) => a + b, 0);
    if (Math.abs(sum - 100) > 0.2)
      errs.monthlyPct = `Sums to ${sum.toFixed(2)}%, must equal 100%`;
  }

  if (p.waireEnabled) {
    if (!p.waireInstallPtsPerMW) errs.waireInstallPtsPerMW = 'Required when WAIRE is enabled';
    if (!p.waireGenMwhPerPt)     errs.waireGenMwhPerPt     = 'Required when WAIRE is enabled';
    if (p.year1WAIREPointValue == null || p.year1WAIREPointValue === '')
      errs.year1WAIREPointValue = 'Required when WAIRE is enabled';
    if (!p.waireDisclaimer) errs.waireDisclaimer = 'Required when WAIRE is enabled';
  }

  if (p.recEnabled) {
    if (p.year1RECValue == null || p.year1RECValue === '')
      errs.year1RECValue = 'Required when RECs are enabled';
    if (!p.recProgramName) errs.recProgramName = 'Required when RECs are enabled';
  }

  return errs;
}

export function monthlyPctSum(monthlyPct) {
  if (!Array.isArray(monthlyPct)) return 0;
  return monthlyPct.reduce((a, b) => a + (parseFloat(b) || 0), 0);
}
