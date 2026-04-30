import { useProject } from '../context/ProjectContext';
import SectionWrapper from './SectionWrapper';
import FormField from './FormField';

export default function SectionIdentity() {
  const { state, dispatch } = useProject();
  const p = state.project;
  const e = state.formErrors;
  const f = k => ev => dispatch({ type: 'UPDATE_FIELD', key: k, value: ev.target.value });

  return (
    <SectionWrapper title="Identity">
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
      <FormField label="State / Province Code" fieldId="province">
        <input type="text" value={p.province} onChange={f('province')} />
      </FormField>
      <FormField label="Report Date" fieldId="reportDate">
        <input type="text" value={p.reportDate} onChange={f('reportDate')} placeholder="e.g. March 2026" />
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
