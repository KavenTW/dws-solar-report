import { describe, it, expect } from 'vitest';
import { validateProject, monthlyPctSum } from '../constants/validation';

const VALID = {
  companyName: 'Great Circle Solar',
  address: '123 Main St',
  city: 'Los Angeles, CA',
  clientName: 'Acme Corp',
  tenantName: 'Acme Tenant',
  gridEmissionsSource: 'eGRID 2022',
  gridEmissionsRegion: 'WECC',
  equivHomesLabel: 'avg. US home',
  gridEmissionsDisclaimer: 'Based on eGRID data.',
  annualMwhHelioScope: 2475,
  rooftopSizeDCkW: 1000,
  carportSizeDCkW: 500,
  ppaTerm: 15,
  ppaDiscountRate: 0.10,
  year1AvoidedChargesUSD: 350000,
  degradationRate: 0.005,
  gridEmissionsIntensity: 700,
  monthlyPct: [6, 6, 9, 9, 10, 11, 11, 10, 9, 7, 6, 6],
  utilityEscalationRates: [0.02, 0.04, 0.06],
  referenceScenarioIndex: 1,
  waireEnabled: false,
  recEnabled: false,
};

describe('validateProject', () => {
  it('returns no errors for a valid project', () => {
    expect(validateProject(VALID)).toEqual({});
  });

  it('errors when companyName is missing', () => {
    const errs = validateProject({ ...VALID, companyName: '' });
    expect(errs.companyName).toBeDefined();
  });

  it('errors when annualMwhHelioScope is zero', () => {
    const errs = validateProject({ ...VALID, annualMwhHelioScope: 0 });
    expect(errs.annualMwhHelioScope).toBeDefined();
  });

  it('errors when ppaTerm is out of range', () => {
    const errs = validateProject({ ...VALID, ppaTerm: 50 });
    expect(errs.ppaTerm).toBeDefined();
  });

  it('errors when monthlyPct does not sum to 100', () => {
    const bad = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]; // sums to 60
    const errs = validateProject({ ...VALID, monthlyPct: bad });
    expect(errs.monthlyPct).toBeDefined();
  });

  it('errors on missing WAIRE fields when waireEnabled', () => {
    const errs = validateProject({
      ...VALID,
      waireEnabled: true,
      waireInstallPtsPerMW: 0,
      waireGenMwhPerPt: 0,
      year1WAIREPointValue: '',
      waireDisclaimer: '',
    });
    expect(errs.waireInstallPtsPerMW).toBeDefined();
  });
});

describe('monthlyPctSum', () => {
  it('sums a valid 12-month array to 100', () => {
    expect(monthlyPctSum([6, 6, 9, 9, 10, 11, 11, 10, 9, 7, 6, 6])).toBe(100);
  });

  it('returns 0 for null input', () => {
    expect(monthlyPctSum(null)).toBe(0);
  });
});
