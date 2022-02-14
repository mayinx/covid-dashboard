import "./App.css";

import CountryStatsTile from "./components/CountryStatsTile";
import GlobalStatsTile from "./components/GlobalStatsTile";
import CountriesStatsTile from "./components/CountriesStatsTile";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>COVID-19-Dashboard</h1>
      </header>
      <main className="main">
        <CountryStatsTile />
        <GlobalStatsTile />
        <CountriesStatsTile />
      </main>
      <footer className="footer">FOOTER</footer>
    </div>
  );
}

export default App;
