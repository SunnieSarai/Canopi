import React from "react";
import GardenList from "./components/GardenList";

function App(): JSX.Element {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Mind Garden</h1>
        <p className="subtitle">Plan gently. Grow steadily.</p>
      </header>

      <main>
        <GardenList />
      </main>

      <footer className="app-footer">
        <small>Mind Garden — visual planning for neurodivergent brains</small>
      </footer>
    </div>
  );
}

export default App;
