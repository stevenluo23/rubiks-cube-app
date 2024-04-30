import { useState, useEffect } from "react";
import { Solve } from "./lib";
import RubiksTimer from "./pages/RubiksTimer";
import TimerTable from "./components/sidebar/TimerTable";
import Nav from "./components/sidebar/Nav";

function App() {
  const [solves, setSolves] = useState<Solve[]>(() => {
    // Load the solves from local storage when initializing the state
    const savedSolves = localStorage.getItem("solves");
    return savedSolves ? JSON.parse(savedSolves) : [];
  });

  useEffect(() => {
    // Save the solves to local storage whenever it changes
    localStorage.setItem("solves", JSON.stringify(solves));
  }, [solves]);

  return (
    <div className="flex">
      <div className="grid grid-rows-3 h-screen sm:w-1/4">
        <div className="row-span-1">
          <Nav />
        </div>
        <div className="row-span-2">
          <TimerTable solves={solves} />
        </div>
      </div>
      <RubiksTimer onSolve={setSolves} solves={solves} />
    </div>
  );
}

export default App;
