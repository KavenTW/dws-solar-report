export default function FormField({ label, error, children, className = '' }) {
  return (
    <div className={`form-field ${className}`}>
      <label>{label}</label>
      {children}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}
