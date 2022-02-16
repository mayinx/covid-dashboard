import {useState} from "react";
import DataCard from "../shared/DataCard/DataCard";
import _ from "lodash";

export default function CountryListItem({ country, idx }) {
  const [showDetails, setShowDetails] = useState(false);
  const dataCards = ["NewConfirmed", "TotalConfirmed", "NewDeaths", "TotalDeaths"].map((dataAttr) => {
    return <DataCard
      key={`country_${dataAttr}`}
      title={_.startCase(dataAttr).replace("Confirmed", "Cases")}
      data={country[dataAttr]} />;
    }
  );



  return (
    <li className={showDetails && "selected" } onClick={() => setShowDetails(!showDetails)}>
      <div className="liHeader" >
        <div>
          <span className="countryNo">{idx+1}.</span>{" "}
          <span className="countryName">{country.Country}</span>{" "}
          <span className="countryCode">({country.CountryCode})</span>
        </div>
        <div className="liDataShort">
          New: {country.NewConfirmed} Cases | {country.NewDeaths} Deaths
        </div>
      </div>

      {showDetails && (<div className="DataCards">{dataCards}</div>)}
    </li>
  );
}