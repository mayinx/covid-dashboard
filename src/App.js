import "./App.css";

import CountryStatsTile from "./components/CountryStatsTile/CountryStatsTile";
import GlobalStatsTile from "./components/GlobalStatsTile/GlobalStatsTile";
import CountriesStatsTile from "./components/CountriesStatsTile/CountriesStatsTile";

import { useState, useEffect } from "react";


import useFetch from "./hooks/useFetch";

function App() {
  const {countryStats, globalStats, countriesStats, filteredSountriesStats, error, loading, filterCountriesStats } = useFetch();

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
        <CountriesStatsTile countriesStats={filteredSountriesStats} filterStats={filterCountriesStats} totalCount={countriesStats.length}/>
        </>

      )}
      </main>
      <footer className="footer">FOOTER</footer>
    </div>
  );
}

export default App;
