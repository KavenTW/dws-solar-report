import React from 'react';

export default function FormField({ label, error, children, className = '', fieldId }) {
  const id = fieldId || label?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const child = React.Children.only(children);
  const childWithProps = React.cloneElement(child, {
    id,
    'aria-invalid': error ? 'true' : undefined,
  });
  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={id}>{label}</label>
      {childWithProps}
      {error && <span className="field-error" role="alert">{error}</span>}
    </div>
  );
}
