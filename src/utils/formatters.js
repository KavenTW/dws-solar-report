export function makeFmt(currency) {
  const sym = currency === 'CAD' ? 'C$' : '$';
  const intStr  = n => Math.round(Math.abs(n)).toLocaleString();
  const numStr  = (n, d = 0) => Number(Math.abs(n)).toLocaleString(undefined, {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
  return {
    sym,
    /** Dollar amount, rounded to whole dollars, with commas */
    usd:    n => sym + intStr(n),
    /** Compact: $1.2M or $120K */
    kilo:   n => { const a = Math.abs(n); return a >= 1e6 ? sym + numStr(a / 1e6, 1) + 'M' : sym + intStr(a / 1000) + 'K'; },
    /** Round to nearest 100 */
    rnd100: n => Math.round(n / 100) * 100,
    /** Integer with commas, no symbol */
    num:    n => intStr(n),
    /** Decimal with commas */
    dec:    (n, d = 1) => numStr(n, d),
  };
}
