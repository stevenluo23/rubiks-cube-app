import { Solve } from "./lib";
import RubiksTimer from "./pages/RubiksTimer";
import Sidebar from "./components/sidebar/Sidebar";
import useLocalStorageState from "./hooks/useLocalStorageState";

function App() {
  const [solves, setSolves] = useLocalStorageState<Solve[]>([], "solves");

  return (
    <div className="flex">
      <Sidebar solves={solves} />
      <RubiksTimer onSolve={setSolves} solves={solves} />
    </div>
  );
}

export default App;
