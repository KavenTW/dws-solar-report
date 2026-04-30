import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';

export default function SectionIdentity() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const f = k => e => dispatch({ type: 'UPDATE_FIELD', key: k, value: e.target.value });

  return (
    <SectionWrapper title="Identity">
      <FormField label="Company Name (Prepared By)">
        <input type="text" value={p.companyName} onChange={f('companyName')} />
      </FormField>
      <FormField label="Report Type">
        <input type="text" value={p.reportType} onChange={f('reportType')} />
      </FormField>
      <FormField label="Property Address">
        <input type="text" value={p.address} onChange={f('address')} />
      </FormField>
      <FormField label="City, State">
        <input type="text" value={p.city} onChange={f('city')} />
      </FormField>
      <FormField label="State / Province Code">
        <input type="text" value={p.province} onChange={f('province')} />
      </FormField>
      <FormField label="Report Date">
        <input type="text" value={p.reportDate} onChange={f('reportDate')} placeholder="e.g. March 2026" />
      </FormField>
      <FormField label="Property Owner / Client Name">
        <input type="text" value={p.clientName} onChange={f('clientName')} />
      </FormField>
      <FormField label="Tenant / PPA Offtaker">
        <input type="text" value={p.tenantName} onChange={f('tenantName')} />
      </FormField>
      <FormField label="Project Name">
        <input type="text" value={p.projectName} onChange={f('projectName')} />
      </FormField>
    </SectionWrapper>
  );
}
