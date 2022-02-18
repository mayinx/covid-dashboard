import "./App.css";

import CountryStatsTile from "./components/CountryStatsTile/CountryStatsTile";
import GlobalStatsTile from "./components/GlobalStatsTile/GlobalStatsTile";
import CountriesStatsTile from "./components/CountriesStatsTile/CountriesStatsTile";

import useFetch from "./hooks/useFetch";

import { MdOutlineCoronavirus } from 'react-icons/md';

function App() {
  const {state, loadData, filterCountriesStats, countriesStatsListRef} = useFetch();

  return (
    <div className="App">
      <header className="header">
        <MdOutlineCoronavirus size="2.5rem" />{""}
        <h1>COVID-19 Dashboard</h1>
      </header>
      <main className="main">

      {state.error && <div>An error occured: {state.error.message}</div>}

      {state.loading && !state.error && <div>Fetching  Data...</div>}

      {!state.error && !state.loading && (
        <>
          <CountryStatsTile countryStats={state.countryStats} />
          <GlobalStatsTile globalStats={state.globalStats} />
          <CountriesStatsTile countriesStats={state.filteredCountriesStats} filterStats={filterCountriesStats} totalCount={state.totalCount}  listRef={countriesStatsListRef} hasMore={state.hasMore} />
        </>
      )}
      </main>

      <footer className="footer">Status: {(new Date(state.globalStats.Date)).toLocaleString()}
        <button className="btn green" onClick={loadData}>Update Data</button>
      </footer>
    </div>
  );
}

export default App;
