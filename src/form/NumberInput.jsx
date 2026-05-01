import { useState } from 'react';

/**
 * Formatted number input — displays with commas when not focused,
 * shows raw value while editing. Calls onValueChange(number) on blur.
 *
 * Props:
 *   value          {number}   current numeric value
 *   onValueChange  {fn}       called with parsed number on blur
 *   decimals       {number}   decimal places to display (default 0 = integer)
 *   unit           {string}   optional unit badge shown inside input (e.g. "kW", "MWh")
 *   All other props forwarded to <input> (id, aria-invalid, min, max, etc.)
 */
export default function NumberInput({ value, onValueChange, decimals = 0, unit, ...rest }) {
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState('');

  const formatted = decimals > 0
    ? Number(value).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : Math.round(value).toLocaleString();

  const input = (
    <input
      type="text"
      inputMode={decimals > 0 ? 'decimal' : 'numeric'}
      value={focused ? draft : formatted}
      onFocus={() => {
        setFocused(true);
        setDraft(String(value));
      }}
      onBlur={() => {
        setFocused(false);
        const parsed = parseFloat(String(draft).replace(/,/g, '')) || 0;
        onValueChange(parsed);
      }}
      onChange={e => setDraft(e.target.value)}
      {...rest}
    />
  );

  if (unit) {
    return (
      <div className="input-unit-wrap">
        {input}
        <span className="input-unit">{unit}</span>
      </div>
    );
  }
  return input;
}
