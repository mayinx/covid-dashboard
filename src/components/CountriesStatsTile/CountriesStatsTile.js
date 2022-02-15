import "./style.css";
import FilterBar from "./FilterBar";
import CountryListItem from "./CountryListItem";

export default function CountriesStatsTile({countriesStats, filterStats, totalCount, listRef, hasMore}) {
  return (
    <div className="StatsTile CountriesStatsTile">
      <h2>Countries Stats</h2>

      <FilterBar filterStats={filterStats} fiteredCount={countriesStats.length} totalCount={totalCount} hasMore={hasMore} />

      <ul className="countriesList"  ref={listRef} >
      {countriesStats.map((country, id) => {
        return <CountryListItem key={country.id + '_' + id} country={country} idx={id} />;
      })}
      <li className="loadMoreIndicator">
        {hasMore && ("Scroll down to load more country stats....")}
        {!hasMore && ("All country stats loaded.")}
      </li>
    </ul>
    </div>
  );

}
