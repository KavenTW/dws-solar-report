export function makeFmt(currency) {
  const sym = currency === 'CAD' ? 'C$' : '$';
  return {
    sym,
    usd:    n => sym + Math.abs(Math.round(n)).toLocaleString(),
    kilo:   n => { const a = Math.abs(n); return a >= 1e6 ? sym + (a / 1e6).toFixed(2) + 'M' : sym + Math.round(a / 1000) + 'K'; },
    rnd100: n => Math.round(n / 100) * 100,
  };
}
