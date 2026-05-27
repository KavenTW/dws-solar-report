export function validateProject(p) {
  const errs = {};

  // Identity fields — only required when Cover section is included
  if (p.showCoverSection !== false) {
    if (!p.companyName) errs.companyName = 'Company name is required';
    if (!p.address)     errs.address     = 'Property address is required';
    if (!p.city)        errs.city        = 'City / state is required';
    if (!p.clientName)  errs.clientName  = 'Client name is required';
    if (!p.tenantName)  errs.tenantName  = 'Tenant / offtaker name is required';
  }

  // System size — only required when System section is included
  if (p.showSystemSection !== false) {
    const totalDCkW = (p.rooftopSizeDCkW || 0) + (p.carportSizeDCkW || 0);
    if (totalDCkW <= 0)
      errs.rooftopSizeDCkW = 'Rooftop + carport total must be > 0';
  }

  // Generation + monthly distribution — only required when Generation section is included
  if (p.showGenerationSection !== false) {
    if (!p.annualMwhHelioScope || p.annualMwhHelioScope <= 0)
      errs.annualMwhHelioScope = 'Must be > 0';
    if (!Array.isArray(p.monthlyPct) || p.monthlyPct.length !== 12) {
      errs.monthlyPct = 'Must have exactly 12 values';
    } else {
      const sum = p.monthlyPct.reduce((a, b) => a + b, 0);
      if (Math.abs(sum - 100) > 0.2)
        errs.monthlyPct = `Sums to ${sum.toFixed(2)}%, must equal 100%`;
    }
  }

  // PPA terms — only required when PPA Terms section is included
  if (p.showPPATermsSection !== false) {
    if (!p.ppaTerm || p.ppaTerm < 1 || p.ppaTerm > 40)
      errs.ppaTerm = 'Must be 1–40 years';
    if (!p.ppaDiscountRate || p.ppaDiscountRate <= 0 || p.ppaDiscountRate >= 1)
      errs.ppaDiscountRate = 'Must be between 0% and 100%';
    if (!p.year1AvoidedChargesUSD || p.year1AvoidedChargesUSD <= 0)
      errs.year1AvoidedChargesUSD = 'Must be > 0';
  }

  // Degradation — only required when Degradation section is included
  if (p.showDegradationSection !== false) {
    if (p.degradationRate < 0 || p.degradationRate >= 0.1)
      errs.degradationRate = 'Must be between 0% and 10%';
  }

  // Emissions — only required when Emissions section is included
  if (p.showEmissionsSection !== false) {
    if (!p.gridEmissionsIntensity || p.gridEmissionsIntensity <= 0)
      errs.gridEmissionsIntensity = 'Must be > 0';
    if (!p.gridEmissionsSource)
      errs.gridEmissionsSource = 'Source citation is required';
    if (!p.gridEmissionsRegion)
      errs.gridEmissionsRegion = 'Emissions region is required';
    if (!p.equivHomesLabel)
      errs.equivHomesLabel = 'Equiv. homes label is required';
    if (!p.gridEmissionsDisclaimer)
      errs.gridEmissionsDisclaimer = 'Emissions disclaimer is required';
  }

  // WAIRE — only required when both waireEnabled AND WAIRE section is included
  if (p.waireEnabled && p.showWAIRESection !== false) {
    if (!p.waireInstallPtsPerMW) errs.waireInstallPtsPerMW = 'Required when WAIRE is enabled';
    if (!p.waireGenMwhPerPt)     errs.waireGenMwhPerPt     = 'Required when WAIRE is enabled';
    if (p.year1WAIREPointValue == null || p.year1WAIREPointValue === '')
      errs.year1WAIREPointValue = 'Required when WAIRE is enabled';
    if (!p.waireDisclaimer) errs.waireDisclaimer = 'Required when WAIRE is enabled';
  }

  // RECs — only required when both recEnabled AND RECs section is included
  if (p.recEnabled && p.showRECsSection !== false) {
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
