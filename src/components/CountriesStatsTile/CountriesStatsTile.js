import "./style.css";
import FilterBar from "./FilterBar";
import CountryListItem from "./CountryListItem";

export default function CountriesStatsTile({countriesStats}) {
  return (
    <div className="StatsTile CountriesStatsTile">
      <FilterBar />

      <ul className="countriesList">
      {countriesStats.map((country) => {
        return <CountryListItem key={country.id} country={country} />;
      })}
    </ul>

    </div>
  );

}
