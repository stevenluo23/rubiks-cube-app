import { Solve } from "./lib";
import RubiksTimer from "./pages/RubiksTimer";
import TimerTable from "./components/sidebar/TimerTable";
import Nav from "./components/sidebar/Nav";
import useLocalStorageState from "./hooks/useLocalStorageState";

function App() {
  const [solves, setSolves] = useLocalStorageState<Solve[]>([], "solves");

  return (
    <div className="flex">
      <div className="hidden sm:grid grid-rows-3 h-screen w-1/6">
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
