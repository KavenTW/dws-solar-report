export default function ReportSectionSiteInfo({ p }) {
  return (
    <div className="section">
      <div className="section-title">Site Information</div>
      <div className="two-col">
        <div className="card">
          <div className="card-title">Location &amp; Solar Resource</div>
          <table className="fin-table">
            <tbody>
              {(p.address || p.city) && <tr><td>Address</td><td>{[p.address, p.city].filter(Boolean).join(', ')}</td></tr>}
              {p.siteLatLong     && <tr><td>Lat / Long</td><td>{p.siteLatLong}</td></tr>}
              {p.siteClimateZone && <tr><td>Climate Zone</td><td>{p.siteClimateZone}</td></tr>}
              {p.sitePSH         && <tr><td>Avg. Peak Sun Hours</td><td>{p.sitePSH}</td></tr>}
              {p.siteGHI         && <tr><td>Annual GHI</td><td>{p.siteGHI}</td></tr>}
              <tr><td>Simulation Tool</td><td>HelioScope (NREL / NASA POWER)</td></tr>
              {p.siteAvgTemp     && <tr><td>Avg. Annual Temperature</td><td>{p.siteAvgTemp}</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="card">
          <div className="card-title">Roof Conditions</div>
          <table className="fin-table">
            <tbody>
              {p.siteBuildingType && <tr><td>Building Type</td><td>{p.siteBuildingType}</td></tr>}
              {p.siteRoofType     && <tr><td>Roof Type</td><td>{p.siteRoofType}</td></tr>}
              <tr><td>Roof Age / Est. Install Yr</td><td>Est. 2026 Install Yr</td></tr>
              <tr><td>Est. Usable Roof Area</td><td>{p.roofUsedSqFt.toLocaleString()} sq ft</td></tr>
              <tr><td>Structural Assessment</td><td>Pending engineering review</td></tr>
              <tr><td>Shading / Obstructions</td><td>HVAC units screened in layout</td></tr>
              {p.siteUtility      && <tr><td>Utility</td><td>{p.siteUtility}</td></tr>}
              {p.siteSolarProgram && <tr><td>Solar Program / Tariff</td><td>{p.siteSolarProgram}</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
