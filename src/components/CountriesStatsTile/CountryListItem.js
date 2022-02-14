import {useState} from "react";

export default function CountryListItem({ country }) {
  const [showDetails, setShowDetails] = useState(false);

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
          <div className="card">
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
          </div>
        </div>
      )}
    </li>
  );
}