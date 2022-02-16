## TODO / ROADMAP

- [x]  Implement pagination/infinite scroll for search/filter-results as well
- [ ]  Refactor states in "useFetch"-custom-hook into a reducer - and perhaps share the result in App.js via useContext to avoid happy props drilling...
- [ ]  And while you're on it: Find better var names in useFetch-hook - brr - and DRY that beast up
- [ ]  Transform "loadData" in "useFetch"-hook into async function
- [ ]  And while you're on it: Use axios
- [ ]  Implement more filter options in countries search bar
- [ ]  Implement sort options
- [ ]  Implement comparision options (perhaps in dashboard footer) to load "comparison data" (e.g. covid stats from a week ago) that's visualized in every data card alongside the current covid data (ups/downs in % or similar & marked red/green accordingly)
- [ ]  Implement "dashboard auto-refresh" every 15 minutes or so (check API-docs for info on regular update intervals)
- [ ]  Redesign footer - you can do better ;-)
- [ ]  Modularize bloated App.css
- [ ]  Switch to CSS Modules & SASS/SCSS
- [ ]  Follow BEM
- [ ] ...