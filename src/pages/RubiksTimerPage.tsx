import { useState } from "react";
import Nav from "../components/navigation/Nav";
import TimerTable from "../components/table/TimerTable";
import Sidebar from "../components/sidebar/Sidebar";
import { useSolves } from "../hooks/useSolves";
import Main from "../components/main/Main";

const RubiksTimerPage = () => {
  const { solves, setSolves, handleAddSolve, handleClearSolves } = useSolves();
  const [isRunning, setIsRunning] = useState(false);

  const handleToggleSidebar = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div style={{ height: "calc(100svh - env(safe-area-inset-bottom))" }} className="absolute z-0 w-full touch-none select-none">
      <aside className={`transition-opacity duration-500 ${isRunning ? "opacity-0" : "opacity-100"}`}>
        <Sidebar navComponent={<Nav />} timerTableComponent={<TimerTable solves={solves} clearSolves={handleClearSolves} setSolves={setSolves} />} />
      </aside>
      <Main solves={solves} isRunning={isRunning} onAddSolve={handleAddSolve} onToggleSidebar={handleToggleSidebar} />
    </div>
  );
};

export default RubiksTimerPage;
