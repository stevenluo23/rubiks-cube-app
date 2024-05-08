import { useState } from "react";
import { Solve } from "../lib";
import { Cube, DisplayCube, applyScramble, generateScramble } from "react-rubiks-cube-utils";
import { calculateAo5 } from "../utils";
import Nav from "../components/navigation/Nav";
import TimerTable from "../components/table/TimerTable";
import Timer from "../components/timer/Timer";
import useLocalStorageState from "../hooks/useLocalStorageState";
import Scramble from "../components/scramble/Scramble";
import TimerDashboard from "../components/dashboard/TimerDashboard";

const RubiksTimerPage = () => {
  const [solves, setSolves] = useLocalStorageState<Solve[]>([], "solves");
  const [scramble, setScramble] = useState(generateScramble({ type: "3x3" }).toString());
  const [isRunning, setIsRunning] = useState(false);
  const myCube: Cube = applyScramble({ type: "3x3", scramble: scramble });

  const handleAddSolve = (timeMs: number) => {
    // logic to add solve and generate new scramble
    setSolves((prevSolves) => {
      // Add the new solve
      const newSolves = [
        ...prevSolves,
        {
          count: prevSolves.length + 1,
          time: timeMs,
          ao5: null, // Temporarily set Ao5 to null
          scramble: scramble,
          date: new Date(),
        },
      ];

      // Calculate the Ao5 when we have >= 5 solves
      const ao5 = calculateAo5(newSolves);

      // Update the new solve with the calculated Ao5 if it exists, updates to null otherwise
      newSolves[newSolves.length - 1].ao5 = ao5;

      return newSolves;
    });
    // Generate new scramble for next solve
    setScramble(generateScramble({ type: "3x3" }).toString());
  };

  const handleClearSolves = () => {
    setSolves([]);
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
          timerTableComponent={<TimerTable solves={solves} clearSolves={handleClearSolves} />}
          cubeDisplayComponent={<DisplayCube cube={myCube} size={6} />}
        />
      </div>
      <Timer solves={solves} addSolve={handleAddSolve} toggleDashboard={handleToggleDashboard} />
    </div>
  );
};

export default RubiksTimerPage;
