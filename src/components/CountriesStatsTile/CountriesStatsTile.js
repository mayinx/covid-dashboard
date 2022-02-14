import "./style.css";
import FilterBar from "./FilterBar";
import CountryListItem from "./CountryListItem";

export default function CountriesStatsTile({countriesStats, filterStats, totalCount}) {
  return (
    <div className="StatsTile CountriesStatsTile">
      <h2>Countries Stats</h2>

      <FilterBar filterStats={filterStats} fiteredCount={countriesStats.length} totalCount={totalCount} />

      <ul className="countriesList">
      {countriesStats.map((country, id) => {
        return <CountryListItem key={country.id + '_' + id} country={country} />;
      })}
    </ul>

    </div>
  );

}
