import "./App.css";

import CountryStatsTile from "./components/CountryStatsTile/CountryStatsTile";
import GlobalStatsTile from "./components/GlobalStatsTile/GlobalStatsTile";
import CountriesStatsTile from "./components/CountriesStatsTile/CountriesStatsTile";

import { useState, useEffect } from "react";

function App() {
  const [countriesStats, setCountriesStats] = useState([]);
  const [filteredSountriesStats, setFilteredCountriesStats] = useState([]);
  const [countryStats, setCountryStats] = useState({});
  const [globalStats, setGlobalStats] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("https://api.covid19api.com/summary")
      .then((response) => response.json())
      .then((data) => {
        setCountriesStats(data.Countries || []);
        setFilteredCountriesStats(data.Countries || {});
        setGlobalStats(data.Global || {});
        setCountryStats(data.Countries.find(country => country.Slug === "germany") || {});
        setLoading(false);
      })
      .catch((e) => setError(e));
  }, []);

  const filterCountriesStats = (e) =>{
    const searchStr = e.target.value.toLowerCase();
    const result = countriesStats.filter((country)=>{
      let cname = country.Country.toLowerCase();
      let ccode = country.CountryCode.toLowerCase();
      return (ccode.search(searchStr) !== -1 || cname.search(searchStr) !== -1 );
    });

    setFilteredCountriesStats(result);
  }

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
