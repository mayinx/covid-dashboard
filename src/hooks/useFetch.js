import { useState, useEffect, useRef } from "react";

// TODO: Refactor this into a reducer - and perhaps share the result
// via useContext to avoid props drilling...
// TODO: Implement pagination for search/filter-results as well
export default function useFetch(){
  const [countriesStats, setCountriesStats] = useState([]);
  const [filteredCountriesStats, setFilteredCountriesStats] = useState([]);
  const [countryStats, setCountryStats] = useState({});
  const [globalStats, setGlobalStats] = useState({});
  const [noOfPages, setNoOfPages] = useState(0);
  const currentPage = useRef(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const hasMoreRef = useRef(false);
  // const [loadsMore, setLoadsMore] = useState(false);
  const loadsMoreRef = useRef(false);
  const countriesStatsListRef = useRef();

  const loadData = () =>{
    setLoading(true);
    setError(null);
    fetch("https://api.covid19api.com/summary")
      .then((response) => response.json())
      .then((data) => {
        setGlobalStats(data.Global || {});
        setCountryStats(data.Countries.find(country => country.Slug === "germany") || {});

        setCountriesStats(data.Countries || []);
        setFilteredCountriesStats(data.Countries.slice(0, 10) || {});

        setNoOfPages(Math.ceil(data.Countries.length / 10));

        // TODO: That's not DRY at all
        hasMoreRef.current = data.Countries.length > 10;
        setHasMore(hasMoreRef.current);
        currentPage.current = 1;

        setLoading(false);
      })
      .catch((e) => setError(e));
  };



  const loadMoreCountriesStats = async () =>{
    loadsMoreRef.current = true;

    const nextPage = currentPage.current+1;
    const startPos = currentPage.current * 10;
    const endPos = startPos + 10;
    console.log("currentPage:", currentPage.current);
    console.log("nextPage:", nextPage);
    console.log("startPos:", startPos);
    console.log("EndPos:", startPos + 10);
    console.log("countriesStats.length BEFORE slice: ", countriesStats.length);
    const moreStats = countriesStats.slice(startPos, endPos);

    console.log("countriesStats.length after slice: ", countriesStats.length);
    console.log("moreStats.length after slice: ", moreStats.length);
    console.log("moreStats: ", moreStats);
    console.log("filteredCountriesStats.length before merge: ", filteredCountriesStats.length);
    console.log("filteredCountriesStats before merge: ", filteredCountriesStats);

    setFilteredCountriesStats(prevStats => [ ...prevStats, ...moreStats] );

    currentPage.current = nextPage;
    setHasMore(nextPage<noOfPages);
    console.log("hasMoreRef.current in loadMore BEFORE: ", hasMoreRef.current)
    hasMoreRef.current = nextPage<noOfPages;
    console.log("hasMoreRef.current in loadMore AFTER: ", hasMoreRef.current)

    console.log("moreStats: ", moreStats);

    loadsMoreRef.current = false;
  };

  const canLoadMore = () => {
    return (!loadsMoreRef.current && hasMoreRef.current);
  };

  const handleScroll = async () =>{
    console.log("scroll");

    if (canLoadMore()){
      console.log("AND CAN load more");

      let scrollEl = countriesStatsListRef.current;

      if (scrollEl && (scrollEl.getBoundingClientRect().bottom) < window.innerHeight) {

        console.log("REACHED end of list - scroll more!")

         await loadMoreCountriesStats();


      }
    }
  };



  const filterCountriesStats = (e) =>{
    const searchStr = e.target.value.toLowerCase();
    const result = countriesStats.filter((country)=>{
      let cname = country.Country.toLowerCase();
      let ccode = country.CountryCode.toLowerCase();
      return (ccode.search(searchStr) !== -1 || cname.search(searchStr) !== -1 );
    });

    setNoOfPages(Math.ceil(result.length / 10));
    setHasMore(result.length > 10);
    hasMoreRef.current = result.length > 10;
    currentPage.current = 1;
    setFilteredCountriesStats(result);
  };


  useEffect(() => {
    loadData();
  }, []);

  // TODO: Investigate / Discuss
  // Interesting: This seems to be necessary to get reliable access to the
  // above laoded state-data in the below registered event handlers - otherwise
  // the originally filled 'countriesStats'-ary (state) is empty in mentioned handlers
  // (and subsequently called functions like 'loadMoreCountriesStats') - at least "every
  // now and then".
  // At a first glance it seems to be unwise to execute the below an every rerender
  // - but as someone clever stated in an react isssue: "useEffect doesn't block paint
  // and addEventListener is very fast. It's no big deal to re-execute it once in
  // a while"  ... ?
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  });

  return {countryStats, globalStats, countriesStats, filteredCountriesStats, error, loading, filterCountriesStats, loadMoreCountriesStats, countriesStatsListRef, hasMore};
}