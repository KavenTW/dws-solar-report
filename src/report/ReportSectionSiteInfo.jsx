export default function ReportSectionSiteInfo({ p }) {
  return (
    <div className="section">
      <div className="section-title">Site Information</div>
      <div className="card">
        <div className="card-title">Location &amp; Solar Resource</div>
        <table className="fin-table">
          <tbody>
            {(p.address || p.city) && <tr><td>Address</td><td>{[p.address, p.city].filter(Boolean).join(', ')}</td></tr>}
            {p.siteLatLong     && <tr><td>Lat / Long</td><td>{p.siteLatLong.split(',').map(v => { const n = parseFloat(v); return isNaN(n) ? v.trim() : n.toFixed(5); }).join(', ')}</td></tr>}
            {p.siteClimateZone && <tr><td>Climate Zone</td><td>{p.siteClimateZone}</td></tr>}
            {p.sitePSH         && <tr><td>Avg. Peak Sun Hours</td><td>{p.sitePSH}</td></tr>}
            {p.siteGHI         && <tr><td>Annual GHI</td><td>{p.siteGHI}</td></tr>}
            <tr><td>Simulation Tool</td><td>HelioScope (NREL / NASA POWER)</td></tr>
            {p.siteAvgTemp     && <tr><td>Avg. Annual Temperature</td><td>{p.siteAvgTemp}</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
