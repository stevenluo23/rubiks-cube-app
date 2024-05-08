import { useState } from "react";
import { DisplayCube } from "react-rubiks-cube-utils";
import Nav from "../components/navigation/Nav";
import TimerTable from "../components/table/TimerTable";
import Timer from "../components/timer/Timer";
import Scramble from "../components/scramble/Scramble";
import TimerDashboard from "../components/dashboard/TimerDashboard";
import useSolves from "../hooks/useSolves";
import useScramble from "../hooks/useScramble";

const RubiksTimerPage = () => {
  const { solves, setSolves, handleAddSolve, handleClearSolves } = useSolves();
  const { scramble, myCube, handleNewScramble } = useScramble();
  const [isRunning, setIsRunning] = useState(false);

  const handleAddSolveAndGenerateNewScramble = (timeMs: number) => {
    handleAddSolve(timeMs, scramble);
    handleNewScramble();
  };

  const handleToggleDashboard = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div style={{ height: "calc(100svh - env(safe-area-inset-bottom))" }} className="absolute z-0 w-full touch-none select-none">
      <div className={`transition-opacity duration-500 ${isRunning ? "opacity-0" : "opacity-100"}`}>
        <TimerDashboard
          navComponent={<Nav />}
          scrambleComponent={<Scramble scramble={scramble} />}
          timerTableComponent={<TimerTable solves={solves} clearSolves={handleClearSolves} setSolves={setSolves} />}
          cubeDisplayComponent={<DisplayCube cube={myCube} size={6} />}
        />
      </div>
      <Timer solves={solves} addSolve={handleAddSolveAndGenerateNewScramble} toggleDashboard={handleToggleDashboard} />
    </div>
  );
};

export default RubiksTimerPage;
