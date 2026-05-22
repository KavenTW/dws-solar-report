import { useState } from 'react';

/**
 * Percentage input — displays as "10.00 %" when unfocused (for stored decimal 0.10),
 * shows raw percentage number while editing. Calls onValueChange(decimal) on blur.
 *
 * Props:
 *   value          {number}   stored decimal value (e.g. 0.10 for 10%)
 *   onValueChange  {fn}       called with decimal on blur (e.g. 0.10 when user typed "10")
 *   decimals       {number}   decimal places shown in % display (default 2)
 *   All other props forwarded to <input> (id, aria-invalid, etc.)
 */
export default function PercentInput({ value, onValueChange, decimals = 2, ...rest }) {
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState('');
  const [inputError, setInputError] = useState(null);

  const pctValue = (value || 0) * 100;
  const formatted =
    pctValue.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + ' %';

  return (
    <>
      <input
        type="text"
        inputMode="decimal"
        value={focused ? draft : formatted}
        onFocus={() => {
          setFocused(true);
          // Strip floating-point noise before showing editable draft
          setDraft(String(+pctValue.toFixed(decimals + 2)));
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
            onValueChange((parseFloat(stripped) || 0) / 100);
          }
        }}
        onChange={e => {
          setDraft(e.target.value);
          setInputError(null);
        }}
        {...rest}
      />
      {inputError && <span className="field-error" role="alert">{inputError}</span>}
    </>
  );
}
