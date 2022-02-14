export default function CountryStatsTile({countryStats}) {
  return (
    <div className="StatsTile CountryStatsTile">
      <h2>Stats for {countryStats.Country}</h2>
      <div className="card">
        <div>New Cases</div>
        <h3>{countryStats.NewConfirmed}</h3>
      </div>
      <div className="card">
        <div>Total Cases</div>
        <h3>{countryStats.TotalConfirmed}</h3>
      </div>
      <div className="card">
        <div>New Deaths</div>
        <h3>{countryStats.NewDeaths}</h3>
      </div>
      <div className="card">
        <div>Total Deaths</div>
        <h3>{countryStats.TotalDeaths}</h3>
      </div>
    </div>
  );

}
