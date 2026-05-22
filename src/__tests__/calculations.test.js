import { describe, it, expect } from 'vitest';
import { computeCalc } from '../utils/calculations';

const BASE = {
  annualMwhHelioScope: 2475,
  systemSizeDCkW: 1500,
  moduleWp: 550,
  roofUsedSqFt: 250000,
  roofTotalSqFt: 804803,
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
    expect(c.moduleCount).toBe(Math.round((1500 * 1000) / 550));
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

  it('throws when systemSizeDCkW is zero', () => {
    expect(() => computeCalc({ ...BASE, systemSizeDCkW: 0 })).toThrow();
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
