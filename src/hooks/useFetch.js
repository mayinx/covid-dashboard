import { useState, useReducer, useEffect, useRef } from "react";

// TODO: Refactor this into a reducer - and perhaps share the result
//       in App.js via useContext to avoid happy props drilling... [d/o]
// TODO: Find better var names - brr & DRY everything up [o]
// TODO: Transform loadData into async function [o]
// TODO: And while you're on it: Use axios [o]
// TODO: Implement more filter options [o]
// TODO: Implement sort options [o]

const initialState = {
  countriesStats: [],
  filteredCountriesStats: [],
  countryStats: {},
  globalStats: {},

  error: null,
  loading: false,
  hasMore: false,
  totalCount: 0
}

export default function useFetch(){
  // uh. ah.
  const [state, dispatch] = useReducer(
    (state, updates) => ({
      ...state,
      ...updates,
    }),
    initialState
  );

  // Needed in various event handlers since those proove to be "more reliable"
  // in event handlers than states ;-)
  const noOfPagesRef  = useRef(1);
  const currentPage = useRef(1);
  const queryStrRef = useRef("");
  const hasMoreRef = useRef(false);
  const loadsMoreRef = useRef(false);
  const countriesStatsListRef = useRef(null);

  const loadData = () =>{
    dispatch({ loading: true })
    dispatch({ error: null })

    fetch("https://api.covid19api.com/summary")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.Countries;
        const total = countries.length;

        dispatch({globalStats: (data.Global || {})});
        dispatch({countryStats: (
          countries.find(country => country.Slug === "germany") || {})
        });

        dispatch({countriesStats: (countries || [])});
        dispatch(
          { filteredCountriesStats: (countries.slice(0, 10) || []) }
        );

        dispatch({totalCount: total});
        noOfPagesRef.current = Math.ceil(total / 10);

        hasMoreRef.current = total > 10;
        dispatch({type: "setHasMore", value: hasMoreRef.current});
        currentPage.current = 1;

        dispatch({ loading: false });
      })
      .catch((e) => dispatch({error: e}));
  };

  const filterCountriesStats = async (e) =>{
    queryStrRef.current = e.target.value.toLowerCase();
    const {statsSliced, totalStats} = await getCountriesStatsSliced(0,10);
    noOfPagesRef.current = Math.ceil(totalStats / 10);
    dispatch({hasMore: totalStats > 10});
    hasMoreRef.current = totalStats > 10;
    currentPage.current = 1;
    dispatch(
      { filteredCountriesStats: statsSliced }
    );
  };

  // Returns a sliced ary of filtered or unfiltered/all countries stats
  const getCountriesStatsSliced = async (startPos=0, endPos=10) =>{
    let stats = [];
    let totalStats = 0;
    let query = queryStrRef.current?.toLowerCase();

    if (query.length > 0) {
      stats =  state.countriesStats.filter((country)=>{
      let cname = country.Country.toLowerCase();
      let ccode = country.CountryCode.toLowerCase();
      return (ccode.search(queryStrRef.current) !== -1 || cname.search(queryStrRef.current) !== -1 );
    })}
    else {
      stats =  state.countriesStats;
      queryStrRef.current = "";
    }

    totalStats = stats.length
    dispatch({totalCount: totalStats});

    return {statsSliced: stats.slice(startPos, endPos), totalStats}

  };

  const loadMoreCountriesStats = async () =>{
    loadsMoreRef.current = true;

    const nextPage = currentPage.current+1;
    const startPos = currentPage.current * 10;
    const endPos = startPos + 10;

    const {statsSliced} = await getCountriesStatsSliced(startPos, endPos);
    dispatch(
      { filteredCountriesStats: [ ...state.filteredCountriesStats, ...statsSliced] }
    );

    currentPage.current = nextPage;
    dispatch({hasMore: nextPage<noOfPagesRef.current});
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
  // (and in subsequently called functions like 'loadMoreCountriesStats') - at least
  // "every now and then".
  // At a first glance it seems to be unwise to execute the below an every component-rerender
  // - but as someone clever stated in an react isssue discussion: "useEffect doesn't block
  // paint and addEventListener is very fast. It's no big deal to re-execute it once in a while"... ?
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  });

  return {state, loadData, filterCountriesStats, loadMoreCountriesStats, countriesStatsListRef};
}