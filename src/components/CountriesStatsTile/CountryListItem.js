import {useState} from "react";
import DataCard from "../shared/DataCard/DataCard";
import _ from "lodash";

export default function CountryListItem({ country }) {
  const [showDetails, setShowDetails] = useState(false);
  const dataCards = ["NewConfirmed", "TotalConfirmed", "NewDeaths", "TotalDeaths"].map((dataAttr) => {
    return <DataCard
      key={`country_${dataAttr}`}
      title={_.startCase(dataAttr).replace("Confirmed", "Cases")}
      data={country[dataAttr]} />;
    }
  );



  return (
    <li>
      <div className="liHeader" onClick={() => setShowDetails(!showDetails)}>
        <div>
          <span className="countryName">{country.Country}</span>{" "}
          <span className="countryCode">{country.CountryCode}</span>
        </div>
        <div className="liDataShort">
          New: {country.NewConfirmed} Cases | {country.NewDeaths} Deaths
        </div>
      </div>

      {showDetails && (
        <div className="liDataPreview">


        {dataCards}


          {/* <div className="card">
            <div>New Cases</div>
            <h3>{country.NewConfirmed}</h3>
          </div>
          <div className="card">
            <div>Total Cases</div>
            <h3>{country.TotalConfirmed}</h3>
          </div>
          <div className="card">
            <div>New Deaths</div>
            <h3>{country.NewDeaths}</h3>
          </div>
          <div className="card">
            <div>Total Deaths</div>
            <h3>{country.TotalDeaths}</h3>
          </div> */}
        </div>
      )}
    </li>
  );
}