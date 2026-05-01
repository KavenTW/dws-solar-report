import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';

const STATES_PROVINCES = [
  { value: '', label: '— Select —' },
  { value: 'AL', label: 'AL — Alabama' },
  { value: 'AK', label: 'AK — Alaska' },
  { value: 'AZ', label: 'AZ — Arizona' },
  { value: 'AR', label: 'AR — Arkansas' },
  { value: 'CA', label: 'CA — California' },
  { value: 'CO', label: 'CO — Colorado' },
  { value: 'CT', label: 'CT — Connecticut' },
  { value: 'DE', label: 'DE — Delaware' },
  { value: 'FL', label: 'FL — Florida' },
  { value: 'GA', label: 'GA — Georgia' },
  { value: 'HI', label: 'HI — Hawaii' },
  { value: 'ID', label: 'ID — Idaho' },
  { value: 'IL', label: 'IL — Illinois' },
  { value: 'IN', label: 'IN — Indiana' },
  { value: 'IA', label: 'IA — Iowa' },
  { value: 'KS', label: 'KS — Kansas' },
  { value: 'KY', label: 'KY — Kentucky' },
  { value: 'LA', label: 'LA — Louisiana' },
  { value: 'ME', label: 'ME — Maine' },
  { value: 'MD', label: 'MD — Maryland' },
  { value: 'MA', label: 'MA — Massachusetts' },
  { value: 'MI', label: 'MI — Michigan' },
  { value: 'MN', label: 'MN — Minnesota' },
  { value: 'MS', label: 'MS — Mississippi' },
  { value: 'MO', label: 'MO — Missouri' },
  { value: 'MT', label: 'MT — Montana' },
  { value: 'NE', label: 'NE — Nebraska' },
  { value: 'NV', label: 'NV — Nevada' },
  { value: 'NH', label: 'NH — New Hampshire' },
  { value: 'NJ', label: 'NJ — New Jersey' },
  { value: 'NM', label: 'NM — New Mexico' },
  { value: 'NY', label: 'NY — New York' },
  { value: 'NC', label: 'NC — North Carolina' },
  { value: 'ND', label: 'ND — North Dakota' },
  { value: 'OH', label: 'OH — Ohio' },
  { value: 'OK', label: 'OK — Oklahoma' },
  { value: 'OR', label: 'OR — Oregon' },
  { value: 'PA', label: 'PA — Pennsylvania' },
  { value: 'RI', label: 'RI — Rhode Island' },
  { value: 'SC', label: 'SC — South Carolina' },
  { value: 'SD', label: 'SD — South Dakota' },
  { value: 'TN', label: 'TN — Tennessee' },
  { value: 'TX', label: 'TX — Texas' },
  { value: 'UT', label: 'UT — Utah' },
  { value: 'VT', label: 'VT — Vermont' },
  { value: 'VA', label: 'VA — Virginia' },
  { value: 'WA', label: 'WA — Washington' },
  { value: 'WV', label: 'WV — West Virginia' },
  { value: 'WI', label: 'WI — Wisconsin' },
  { value: 'WY', label: 'WY — Wyoming' },
  { value: 'DC', label: 'DC — Washington D.C.' },
  { value: 'AB', label: 'AB — Alberta' },
  { value: 'BC', label: 'BC — British Columbia' },
  { value: 'MB', label: 'MB — Manitoba' },
  { value: 'NB', label: 'NB — New Brunswick' },
  { value: 'NL', label: 'NL — Newfoundland' },
  { value: 'NS', label: 'NS — Nova Scotia' },
  { value: 'ON', label: 'ON — Ontario' },
  { value: 'PE', label: 'PE — Prince Edward Island' },
  { value: 'QC', label: 'QC — Quebec' },
  { value: 'SK', label: 'SK — Saskatchewan' },
];

/** "March 2026" → "2026-03" for <input type="month"> */
function toMonthInput(str) {
  if (!str) return '';
  const months = ['january','february','march','april','may','june',
                  'july','august','september','october','november','december'];
  const parts = str.toLowerCase().trim().split(/\s+/);
  if (parts.length < 2) return '';
  const monthIdx = months.findIndex(m => m.startsWith(parts[0].slice(0, 3)));
  const year = parseInt(parts[1]);
  if (monthIdx < 0 || isNaN(year)) return '';
  return `${year}-${String(monthIdx + 1).padStart(2, '0')}`;
}

/** "2026-03" → "March 2026" for storage */
function fromMonthInput(val) {
  if (!val) return '';
  const [y, m] = val.split('-');
  if (!y || !m) return '';
  return new Date(+y, +m - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export default function SectionIdentity() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;
  const f = k => ev => dispatch({ type: 'UPDATE_FIELD', key: k, value: ev.target.value });

  const hasErrors = !!(e?.companyName || e?.address || e?.city || e?.clientName || e?.tenantName);

  return (
    <SectionWrapper title="Identity" hasErrors={hasErrors}>
      <FormField label="Company Name (Prepared By)" fieldId="companyName" error={e?.companyName}>
        <input type="text" value={p.companyName} onChange={f('companyName')} />
      </FormField>
      <FormField label="Report Type" fieldId="reportType">
        <input type="text" value={p.reportType} onChange={f('reportType')} />
      </FormField>
      <FormField label="Property Address" fieldId="address" error={e?.address}>
        <input type="text" value={p.address} onChange={f('address')} />
      </FormField>
      <FormField label="City, State" fieldId="city" error={e?.city}>
        <input type="text" value={p.city} onChange={f('city')} />
      </FormField>
      <FormField label="State / Province" fieldId="province">
        <select
          value={p.province}
          onChange={ev => dispatch({ type: 'UPDATE_FIELD', key: 'province', value: ev.target.value })}
        >
          {STATES_PROVINCES.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </FormField>
      <FormField label="Report Date" fieldId="reportDate">
        <input
          type="month"
          value={toMonthInput(p.reportDate)}
          onChange={ev => dispatch({ type: 'UPDATE_FIELD', key: 'reportDate', value: fromMonthInput(ev.target.value) })}
        />
      </FormField>
      <FormField label="Property Owner / Client Name" fieldId="clientName" error={e?.clientName}>
        <input type="text" value={p.clientName} onChange={f('clientName')} />
      </FormField>
      <FormField label="Tenant / PPA Offtaker" fieldId="tenantName" error={e?.tenantName}>
        <input type="text" value={p.tenantName} onChange={f('tenantName')} />
      </FormField>
      <FormField label="Project Name" fieldId="projectName">
        <input type="text" value={p.projectName} onChange={f('projectName')} />
      </FormField>
    </SectionWrapper>
  );
}
