export default function GlobalStatsTile({globalStats}) {

  return (
    <div className="StatsTile GlobalStatsTile">
      <h2>World Stats</h2>
      <div className="card">
        <div>New Cases</div>
        <h3>{globalStats.NewConfirmed}</h3>
      </div>
      <div className="card">
        <div>Total Cases</div>
        <h3>{globalStats.TotalConfirmed}</h3>
      </div>
      <div className="card">
        <div>New Deaths</div>
        <h3>{globalStats.NewDeaths}</h3>
      </div>
      <div className="card">
        <div>Total Deaths</div>
        <h3>{globalStats.TotalDeaths}</h3>
      </div>
    </div>
  );


}
