import "./App.css";

import CountryStatsTile from "./components/CountryStatsTile/CountryStatsTile";
import GlobalStatsTile from "./components/GlobalStatsTile/GlobalStatsTile";
import CountriesStatsTile from "./components/CountriesStatsTile/CountriesStatsTile";

import useFetch from "./hooks/useFetch";

function App() {
  const {countryStats, globalStats, countriesStats, filteredCountriesStats, error, loading, loadData, filterCountriesStats, countriesStatsListRef,  hasMore,   totalCount} = useFetch();

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
          <CountriesStatsTile countriesStats={filteredCountriesStats} filterStats={filterCountriesStats} totalCount={totalCount}  listRef={countriesStatsListRef} hasMore={hasMore}   />
        </>
      )}
      </main>
      <footer className="footer">Status: {(new Date(globalStats.Date)).toLocaleString()}

      <button onClick={loadData}>Update Data</button>
       </footer>
    </div>
  );
}

export default App;
