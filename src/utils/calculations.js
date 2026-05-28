const CONSTANTS = {
  lbsPerTonne:  2204.62,
  avgHomeKwhYr: 10632,
};

const roundup = (val, dec) => {
  const f = Math.pow(10, dec);
  return Math.ceil(val * f) / f;
};

export function computeCalc(p) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // Edge-case guards — throw descriptive errors caught by useCalc
  if (!p.annualMwhHelioScope || p.annualMwhHelioScope <= 0)
    throw new Error('Annual generation (MWh) must be greater than 0.');

  const totalDCkW = (p.rooftopSizeDCkW || 0) + (p.carportSizeDCkW || 0);
  if (totalDCkW <= 0)
    throw new Error('Total system size DC (kW) must be greater than 0.');

  if (!p.annualSiteLoadMwh || p.annualSiteLoadMwh <= 0)
    throw new Error('Annual site load (MWh) must be greater than 0.');

  const annualMwh  = p.annualMwhHelioScope;
  const annualKwh  = annualMwh * 1000;
  const monthlyMwh = p.monthlyPct.map(pct => pct / 100 * annualMwh);
  const pct        = p.monthlyPct;
  const roofUtil   = p.rooftopTotalSqFt > 0 ? p.rooftopAreaUsedSqFt / p.rooftopTotalSqFt : 0;
  const gridImport  = Math.max(0, p.annualSiteLoadMwh - annualMwh);
  const solarOffset = annualMwh / p.annualSiteLoadMwh;
  const energyIntensity = p.rooftopTotalSqFt > 0
    ? (p.annualSiteLoadMwh * 1000) / p.rooftopTotalSqFt
    : 0;

  // PPA pricing
  const year1UtilityRate = p.year1AvoidedChargesUSD / annualKwh;
  const ppaRate          = year1UtilityRate * (1 - p.ppaDiscountRate);
  const yr1ElecSavings   = p.year1AvoidedChargesUSD * p.ppaDiscountRate;
  const yr1TotalUtilBillNoSolar   = p.annualSiteLoadMwh * 1000 * year1UtilityRate;
  const yr1TotalUtilBillWithSolar = (p.annualSiteLoadMwh - annualMwh) * 1000 * year1UtilityRate + annualKwh * ppaRate;

  const ppaRECPrice   = p.recEnabled   ? p.year1RECValue       * (1 - p.ppaDiscountRate) : 0;
  const ppaWAIREPrice = p.waireEnabled ? p.year1WAIREPointValue * (1 - p.ppaDiscountRate) : 0;

  // WAIRE
  let waireInstallPoints = 0, waireYear1GenPoints = 0, waireYear1TotalPoints = 0;
  let waireYear1ValueUSD = 0, waireYear1SavingsUSD = 0, waireRecurringPoints = 0, waireRecurringValueUSD = 0;
  let waire15YrOnlyPoints = 0, waire15YrTotalPoints = 0, waire15YrTotalValueUSD = 0, waireYrs2to15ValueUSD = 0;
  let waireYear1MktValueUSD = 0, waire15YrTotalMktValueUSD = 0, waireYrs2to15MktValueUSD = 0;

  if (p.waireEnabled) {
    const WAIRE_INSTALL_PTS_PER_MW = p.waireInstallPtsPerMW;
    const WAIRE_GEN_PTS_PER_MWH   = 1 / p.waireGenMwhPerPt;
    const systemMW                 = totalDCkW / 1000;
    waireInstallPoints      = roundup(systemMW * WAIRE_INSTALL_PTS_PER_MW, 1);
    waireYear1GenPoints     = roundup(p.annualMwhHelioScope * WAIRE_GEN_PTS_PER_MWH, 1);
    waireYear1TotalPoints   = waireInstallPoints + waireYear1GenPoints;
    waireYear1ValueUSD      = waireYear1TotalPoints * ppaWAIREPrice;
    waireYear1SavingsUSD    = waireYear1TotalPoints * p.year1WAIREPointValue * p.ppaDiscountRate;
    waireRecurringPoints    = waireYear1GenPoints;
    waireRecurringValueUSD  = waireRecurringPoints * ppaWAIREPrice;
    waire15YrOnlyPoints     = waireYear1GenPoints * (p.ppaTerm - 1);
    waire15YrTotalPoints    = waireYear1TotalPoints + waire15YrOnlyPoints;
    waire15YrTotalValueUSD  = waire15YrTotalPoints * ppaWAIREPrice;
    waireYrs2to15ValueUSD   = waire15YrOnlyPoints * ppaWAIREPrice;
    waireYear1MktValueUSD     = waireYear1TotalPoints * p.year1WAIREPointValue;
    waire15YrTotalMktValueUSD = waire15YrTotalPoints * p.year1WAIREPointValue;
    waireYrs2to15MktValueUSD  = waire15YrOnlyPoints * p.year1WAIREPointValue;
  }

  // Emissions
  const annualCO2e   = (annualKwh / 1000) * p.gridEmissionsIntensity / CONSTANTS.lbsPerTonne;
  const lifetimeCO2e = Array.from({ length: p.ppaTerm }, (_, i) =>
    (annualKwh * Math.pow(1 - p.degradationRate, i) / 1000) * p.gridEmissionsIntensity / CONSTANTS.lbsPerTonne
  ).reduce((a, b) => a + b, 0);
  const equivHomes   = Math.round(annualKwh / (p.avgHomeKwhYr || CONSTANTS.avgHomeKwhYr));

  // Cumulative savings scenarios
  function annualSavings(y, utilEsc) {
    const genKwh    = annualKwh * Math.pow(1 - p.degradationRate, y - 1);
    const utilRateY = year1UtilityRate * Math.pow(1 + utilEsc, y - 1);
    const ppaRateY  = ppaRate * Math.pow(1 + (p.ppaEscalationRate || 0), y - 1);
    return genKwh * (utilRateY - ppaRateY);
  }

  const savingsLabels = [];
  for (let y = 1; y <= p.ppaTerm; y++) savingsLabels.push(`Yr ${y}`);

  const scenarios = p.utilityEscalationRates.map(rate => {
    const cumSavings = [];
    let cum = 0;
    for (let y = 1; y <= p.ppaTerm; y++) {
      cum += annualSavings(y, rate);
      cumSavings.push(Math.round(cum));
    }
    return { rate, cumSavings };
  });

  const yr1RECSavings = p.recEnabled ? annualMwh * (p.year1RECValue - ppaRECPrice) : 0;
  const yr1SubTotal   = yr1ElecSavings + yr1RECSavings + waireYear1SavingsUSD;

  const yr1BillReduction      = yr1TotalUtilBillNoSolar - yr1TotalUtilBillWithSolar;
  const yr1BillReductionPerMwh = yr1BillReduction / annualMwh;

  const waireYear1PpaMwhRate = p.waireEnabled ? waireYear1TotalPoints * ppaWAIREPrice / annualMwh : 0;
  const waireYear1MktMwhRate = p.waireEnabled ? waireYear1MktValueUSD / annualMwh : 0;

  return {
    months, annualMwh, annualKwh, monthlyMwh, pct, totalDCkW, roofUtil,
    gridImport, solarOffset, energyIntensity,
    year1UtilityRate, ppaRate, yr1ElecSavings, yr1TotalUtilBillNoSolar, yr1TotalUtilBillWithSolar,
    yr1BillReduction, yr1BillReductionPerMwh,
    ppaRECPrice, ppaWAIREPrice,
    waireYear1PpaMwhRate, waireYear1MktMwhRate,
    yr1RECSavings, yr1SubTotal,
    waireInstallPoints, waireYear1GenPoints, waireYear1TotalPoints,
    waireYear1ValueUSD, waireYear1SavingsUSD, waireRecurringPoints, waireRecurringValueUSD,
    waire15YrOnlyPoints, waire15YrTotalPoints, waire15YrTotalValueUSD, waireYrs2to15ValueUSD,
    waireYear1MktValueUSD, waire15YrTotalMktValueUSD, waireYrs2to15MktValueUSD,
    annualCO2e, lifetimeCO2e, equivHomes,
    savingsLabels, scenarios,
  };
}
