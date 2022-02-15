import "./style.css";
import FilterBar from "./FilterBar";
import CountryListItem from "./CountryListItem";
import {useEffect} from "react";

export default function CountriesStatsTile({countriesStats, filterStats, totalCount, listRef, hasMore}) {


  // {hasMore && <li className="loadMoreIndicator">Scroll down to load more country stats...</li>}
  // {loadsMore && <li className="loadMoreIndicator">Loading more country stats...</li>}
  // Status: HasMore: {hasMore.current === true ? "true" : "false"} | LoadsMore: {loadsMore ? "true" : "false"}




  return (
    <div className="StatsTile CountriesStatsTile">
      <h2>Countries Stats</h2>

      <FilterBar filterStats={filterStats} fiteredCount={countriesStats.length} totalCount={totalCount} />

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
