import { useState, useEffect, useRef } from "react";

// TODO: Implement pagination for search/filter-results as well [ d ]
// TODO: Refactor this into a reducer - and perhaps share the result
// via useContext to avoid props drilling... [ ]
export default function useFetch(){
  const [countriesStats, setCountriesStats] = useState([]);
  const [filteredCountriesStats, setFilteredCountriesStats] = useState([]);
  const [countryStats, setCountryStats] = useState({});
  const [globalStats, setGlobalStats] = useState({});
  const noOfPagesRef  = useRef(1);
  const currentPage = useRef(1);
  const queryStrRef = useRef("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const hasMoreRef = useRef(false);
  const loadsMoreRef = useRef(false);
  const countriesStatsListRef = useRef();

  // const reloadData = () =>{

  //   reloadData

  // };

  const loadData = () =>{
    setLoading(true);
    setError(null);
    fetch("https://api.covid19api.com/summary")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.Countries;
        const total = countries.length
        setGlobalStats(data.Global || {});
        setCountryStats(countries.find(country => country.Slug === "germany") || {});

         // TODO: That's not DRY at all
        setCountriesStats(countries || []);
        setFilteredCountriesStats(countries.slice(0, 10) || []);

        setTotalCount(total);
        noOfPagesRef.current = Math.ceil(total / 10);

        // TODO: ... neither is this:
        // Check: Refactor into event handler that's passed to child componentes
        // to query the ref if possible and get rid of the state ... ?
        hasMoreRef.current = total > 10;
        setHasMore(hasMoreRef.current);
        currentPage.current = 1;

        setLoading(false);
      })
      .catch((e) => setError(e));
  };


  const filterCountriesStats = async (e) =>{
    queryStrRef.current = e.target.value.toLowerCase();
    const {statsSliced, totalStats} = await getCountriesStatsSliced(0,10);
    noOfPagesRef.current = Math.ceil(totalStats / 10);
    console.log("NO OF PAGES IN FILTERCOUNTRIESSTATS: ", noOfPagesRef.current);
    setHasMore(totalStats > 10);
    hasMoreRef.current = totalStats > 10;
    currentPage.current = 1;
    setFilteredCountriesStats(statsSliced);
  };

  // Returns a sliced ary of filtered or all countries stats
  const getCountriesStatsSliced = async (startPos=0, endPos=10) =>{
    let stats = [];
    let totalStats = 0;
    let query = queryStrRef.current?.toLowerCase();

    if (query.length > 0) {
      stats =  countriesStats.filter((country)=>{
      let cname = country.Country.toLowerCase();
      let ccode = country.CountryCode.toLowerCase();
      return (ccode.search(queryStrRef.current) !== -1 || cname.search(queryStrRef.current) !== -1 );
    })}
    else {
      stats =  countriesStats;
      queryStrRef.current = "";
    }

    totalStats = stats.length
    setTotalCount(totalStats);

    return {statsSliced: stats.slice(startPos, endPos), totalStats}

  };

  const loadMoreCountriesStats = async () =>{
    loadsMoreRef.current = true;

    const nextPage = currentPage.current+1;
    const startPos = currentPage.current * 10;
    const endPos = startPos + 10;

    const {statsSliced} = await getCountriesStatsSliced(startPos, endPos);
    setFilteredCountriesStats(prevStats => [ ...prevStats, ...statsSliced] );

    currentPage.current = nextPage;
    setHasMore(nextPage<noOfPagesRef.current);
    hasMoreRef.current = nextPage<noOfPagesRef.current;
    loadsMoreRef.current = false;
  };

  const canLoadMore = () => {
    return (!loadsMoreRef.current && hasMoreRef.current);
  };

  const handleScroll = async () =>{
    if (canLoadMore()){
      let scrollEl = countriesStatsListRef.current;
      if (scrollEl && (scrollEl.getBoundingClientRect().bottom) < window.innerHeight) {
         await loadMoreCountriesStats();
      }
    }
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

  return {countryStats, globalStats, countriesStats, filteredCountriesStats, error, loading, loadData, filterCountriesStats, loadMoreCountriesStats, countriesStatsListRef, hasMore, totalCount};
}