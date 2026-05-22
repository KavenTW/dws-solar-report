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
  const [inputError, setInputError] = useState(null);

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
        setInputError(null);
      }}
      onBlur={() => {
        setFocused(false);
        const stripped = String(draft).replace(/,/g, '');
        if (stripped !== '' && isNaN(parseFloat(stripped))) {
          setInputError('Enter a valid number');
          onValueChange(0);
        } else {
          setInputError(null);
          onValueChange(parseFloat(stripped) || 0);
        }
      }}
      onChange={e => {
        setDraft(e.target.value);
        setInputError(null);
      }}
      {...rest}
    />
  );

  const error = inputError && <span className="field-error" role="alert">{inputError}</span>;

  if (unit) {
    return (
      <>
        <div className="input-unit-wrap">
          {input}
          <span className="input-unit">{unit}</span>
        </div>
        {error}
      </>
    );
  }
  return <>{input}{error}</>;
}
