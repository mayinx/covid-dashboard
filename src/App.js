import "./App.css";

import CountryStatsTile from "./components/CountryStatsTile/CountryStatsTile";
import GlobalStatsTile from "./components/GlobalStatsTile/GlobalStatsTile";
import CountriesStatsTile from "./components/CountriesStatsTile/CountriesStatsTile";

import { useState, useEffect } from "react";

import useFetch from "./hooks/useFetch";

function App() {
  const {countryStats, globalStats, countriesStats, filteredCountriesStats, error, loading, filterCountriesStats, countriesStatsListRef,  hasMore, loadsMore } = useFetch();

  const [pageNo, setPageNo] = useState(1);

  return (
    <div className="App">
      <header className="header">
        <h1>COVID-19-Dashboard</h1>
      </header>
      <main className="main">

      {error && <div>An error occured: {error.message}</div>}

      {loading && !error && <div>Fetching  Data...</div>}

      {!loading && (
        <>
          <CountryStatsTile countryStats={countryStats} />
          <GlobalStatsTile globalStats={globalStats} />
          <CountriesStatsTile countriesStats={filteredCountriesStats} filterStats={filterCountriesStats} totalCount={countriesStats.length}  listRef={countriesStatsListRef} hasMore={hasMore}   />
        </>
      )}
      </main>
      <footer className="footer">- Footer - </footer>
    </div>
  );
}

export default App;
