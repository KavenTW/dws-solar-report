export function validateProject(p) {
  const errs = [];

  const required = [
    'companyName','address','city','clientName','tenantName',
    'annualMwhHelioScope','systemSizeDCkW','ppaTerm','ppaDiscountRate',
    'year1AvoidedChargesUSD','degradationRate','monthlyPct',
    'gridEmissionsIntensity','utilityEscalationRates','referenceScenarioIndex',
    'waireEnabled','recEnabled','currency',
    'gridEmissionsSource','gridEmissionsRegion','equivHomesLabel',
    'recProgramName','gridEmissionsDisclaimer',
  ];
  required.forEach(k => { if (p[k] === undefined || p[k] === '') errs.push(`${k} is required`); });

  if (p.annualMwhHelioScope <= 0) errs.push('Annual generation must be > 0');
  if (p.systemSizeDCkW <= 0)      errs.push('System size DC must be > 0');
  if (p.ppaTerm < 1 || p.ppaTerm > 40) errs.push('PPA term must be 1–40 years');
  if (p.ppaDiscountRate <= 0 || p.ppaDiscountRate >= 1) errs.push('PPA discount rate must be between 0 and 1');
  if (p.year1AvoidedChargesUSD <= 0) errs.push('Year-1 avoided charges must be > 0');
  if (p.degradationRate < 0 || p.degradationRate >= 0.1) errs.push('Degradation rate must be 0–10%');

  if (!Array.isArray(p.monthlyPct) || p.monthlyPct.length !== 12) {
    errs.push('Monthly % must have exactly 12 values');
  } else {
    const sum = p.monthlyPct.reduce((a, b) => a + b, 0);
    if (Math.abs(sum - 100) > 0.2) errs.push(`Monthly % sums to ${sum.toFixed(2)}, must equal 100`);
  }

  if (!Array.isArray(p.utilityEscalationRates) || p.utilityEscalationRates.length !== 3) {
    errs.push('Utility escalation rates must have exactly 3 values');
  }

  if (p.waireEnabled) {
    ['waireInstallPtsPerMW','waireGenMwhPerPt','year1WAIREPointValue','waireDisclaimer']
      .forEach(k => { if (!p[k] && p[k] !== 0) errs.push(`${k} is required when WAIRE is enabled`); });
  }

  if (p.recEnabled && !p.year1RECValue && p.year1RECValue !== 0) {
    errs.push('year1RECValue is required when RECs are enabled');
  }

  return errs;
}

export function monthlyPctSum(monthlyPct) {
  if (!Array.isArray(monthlyPct)) return 0;
  return monthlyPct.reduce((a, b) => a + (parseFloat(b) || 0), 0);
}
