import RubiksTimer from "./pages/RubiksTimer";
import TimerTable from "./components/sidebar/TimerTable";
import Nav from "./components/sidebar/Nav";

function App() {
  return (
    <div className="flex">
      <div className="grid sm:w-1/4">
        <Nav />
        <TimerTable />
      </div>
      <RubiksTimer />
    </div>
  );
}

export default App;
