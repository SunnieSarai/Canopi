import React from "react";
import GardenList from "./components/GardenList";
import GuidePanel from './components/GuidePanel';

function App(): JSX.Element {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🌿 Canopi</h1>
        <p className="subtitle">Grow your goals from seed to bloom</p>
      </header>

      <main>
        <GardenList />
      </main>

      <footer className="app-footer">
        <small>Canopi — break big goals into small, blooming steps</small>
      </footer>
      <GuidePanel />
    </div>
  );
}

export default App;