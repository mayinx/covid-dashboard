import DataCard from "../shared/DataCard/DataCard";
import _ from "lodash";

export default function CountryStatsTile({countryStats}) {
  const dataCards = ["NewConfirmed", "TotalConfirmed", "NewDeaths", "TotalDeaths"].map((dataAttr) => {
    return <DataCard
      key={`countryStats_${dataAttr}`}
      title={_.startCase(dataAttr).replace("Confirmed", "Cases")}
      data={countryStats[dataAttr]} />;
    }
  );

  return (
    <div className="StatsTile CountryStatsTile">
      <h2>Stats for {countryStats.Country}</h2>
      <div className="DataCards">{dataCards}</div>
    </div>
  );
}
