import { useState, useEffect } from "react";

export default function useFetch(){
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
  };

  return {countryStats, globalStats, countriesStats, filteredSountriesStats, error, loading, filterCountriesStats};
}