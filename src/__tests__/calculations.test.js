import { describe, it, expect } from 'vitest';
import { computeCalc } from '../utils/calculations';

const BASE = {
  annualMwhHelioScope: 2475,
  rooftopSizeDCkW: 1000,
  carportSizeDCkW: 500,
  rooftopAreaUsedSqFt: 250000,
  rooftopTotalSqFt: 804803,
  carportAreaUsedSqFt: 0,
  carportTotalSqFt: 0,
  annualSiteLoadMwh: 3000,
  year1AvoidedChargesUSD: 350000,
  ppaDiscountRate: 0.10,
  ppaEscalationRate: 0,
  ppaTerm: 15,
  degradationRate: 0.005,
  utilityEscalationRates: [0.02, 0.04, 0.06],
  monthlyPct: [6, 6, 9, 9, 10, 11, 11, 10, 9, 7, 6, 6],
  gridEmissionsIntensity: 700,
  avgHomeKwhYr: 10632,
  waireEnabled: false,
  recEnabled: false,
  year1RECValue: 0,
  year1WAIREPointValue: 0,
  waireInstallPtsPerMW: 0,
  waireGenMwhPerPt: 1,
};

describe('computeCalc', () => {
  it('computes core PPA values correctly', () => {
    const c = computeCalc(BASE);
    expect(c.annualKwh).toBe(2_475_000);
    expect(c.totalDCkW).toBe(1500);
    // year1UtilityRate = 350000 / 2475000
    const expectedUtilRate = 350000 / 2_475_000;
    expect(c.year1UtilityRate).toBeCloseTo(expectedUtilRate, 6);
    expect(c.ppaRate).toBeCloseTo(expectedUtilRate * 0.90, 6);
    expect(c.yr1ElecSavings).toBeCloseTo(350000 * 0.10, 2);
    expect(c.solarOffset).toBeCloseTo(2475 / 3000, 4);
  });

  it('produces zero WAIRE outputs when disabled', () => {
    const c = computeCalc(BASE);
    expect(c.waireInstallPoints).toBe(0);
    expect(c.waireYear1TotalPoints).toBe(0);
    expect(c.waire15YrTotalPoints).toBe(0);
    expect(c.waireYear1SavingsUSD).toBe(0);
  });

  it('computes WAIRE point totals when enabled', () => {
    const p = {
      ...BASE,
      waireEnabled: true,
      waireInstallPtsPerMW: 200,
      waireGenMwhPerPt: 8,
      year1WAIREPointValue: 316,
    };
    const c = computeCalc(p);
    // systemMW = 1500/1000 = 1.5 → install pts = ceil(1.5 * 200 * 10)/10 = 300
    expect(c.waireInstallPoints).toBeGreaterThan(0);
    expect(c.waireYear1TotalPoints).toBe(c.waireInstallPoints + c.waireYear1GenPoints);
    expect(c.waire15YrTotalPoints).toBeCloseTo(
      c.waireYear1TotalPoints + c.waireYear1GenPoints * (p.ppaTerm - 1),
      1
    );
  });

  it('throws when annualMwhHelioScope is zero', () => {
    expect(() => computeCalc({ ...BASE, annualMwhHelioScope: 0 })).toThrow();
  });

  it('allows zero total DC kW and reports it as 0 (sizing-less report)', () => {
    const c = computeCalc({ ...BASE, rooftopSizeDCkW: 0, carportSizeDCkW: 0 });
    expect(c.totalDCkW).toBe(0);
    expect(Number.isFinite(c.annualKwh)).toBe(true);
  });

  it('returns null consumption outputs when annualSiteLoadMwh is absent — never NaN/Infinity', () => {
    const c = computeCalc({ ...BASE, annualSiteLoadMwh: 0 });
    expect(c.hasSiteLoad).toBe(false);
    expect(c.solarOffset).toBeNull();
    expect(c.gridImport).toBeNull();
    expect(c.yr1TotalUtilBillNoSolar).toBeNull();
    expect(c.yr1TotalUtilBillWithSolar).toBeNull();
    expect(c.yr1BillReduction).toBeNull();
    expect(c.yr1BillReductionPerMwh).toBeNull();
    // PPA savings are independent of site load and must remain finite
    expect(Number.isFinite(c.yr1ElecSavings)).toBe(true);
  });

  it('yields finite WAIRE outputs when waireGenMwhPerPt is zero (no 1/0)', () => {
    const c = computeCalc({
      ...BASE,
      waireEnabled: true,
      waireInstallPtsPerMW: 200,
      waireGenMwhPerPt: 0,
      year1WAIREPointValue: 316,
    });
    expect(Number.isFinite(c.waireYear1GenPoints)).toBe(true);
    expect(c.waireYear1GenPoints).toBe(0);
    expect(Number.isFinite(c.waire15YrTotalPoints)).toBe(true);
  });

  it('returns cumSavings array matching ppaTerm length for each scenario', () => {
    const c = computeCalc(BASE);
    expect(c.scenarios).toHaveLength(3);
    c.scenarios.forEach(s => expect(s.cumSavings).toHaveLength(BASE.ppaTerm));
  });

  it('cumulative savings increase year-over-year at positive escalation', () => {
    const c = computeCalc(BASE);
    const highScenario = c.scenarios[2]; // 6% escalation
    for (let i = 1; i < highScenario.cumSavings.length; i++) {
      expect(highScenario.cumSavings[i]).toBeGreaterThan(highScenario.cumSavings[i - 1]);
    }
  });
});
