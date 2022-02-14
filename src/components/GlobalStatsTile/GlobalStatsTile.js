import DataCard from "../shared/DataCard/DataCard";
import _ from "lodash";

export default function GlobalStatsTile({globalStats}) {
  const dataCards = ["NewConfirmed", "TotalConfirmed", "NewDeaths", "TotalDeaths"].map((dataAttr) => {
    return <DataCard
      key={`globalStats_${dataAttr}`}
      title={_.startCase(dataAttr).replace("Confirmed", "Cases")}
      data={globalStats[dataAttr]} />;
    }
  );

  return (
    <div className="StatsTile GlobalStatsTile">
      <h2>World Stats</h2>
      <div className="DataCards">{dataCards}</div>
    </div>
  );
}
