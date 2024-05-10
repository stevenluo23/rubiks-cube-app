import { useState } from "react";
import { DisplayCube } from "react-rubiks-cube-utils";
import Nav from "../components/navigation/Nav";
import TimerTable from "../components/table/TimerTable";
import Timer from "../components/timer/Timer";
import Scramble from "../components/scramble/Scramble";
import TimerDashboard from "../components/dashboard/TimerDashboard";
import useSolves from "../hooks/useSolves";
import useScramble from "../hooks/useScramble";
import useLocalStorageState from "../hooks/useLocalStorageState";

const RubiksTimerPage = () => {
  const { solves, setSolves, handleAddSolve, handleClearSolves } = useSolves();
  const [scrambleType, setScrambleType] = useLocalStorageState<string>("3x3", "scrambleType");
  const { scramble, prevScramble, myCube, handleNewScramble, handlePrevScramble } = useScramble(scrambleType);
  const [isRunning, setIsRunning] = useState(false);

  const handleAddSolveAndGenerateNewScramble = (timeMs: number) => {
    handleAddSolve(timeMs, scramble);
    handleNewScramble(scrambleType);
  };

  const handleToggleDashboard = () => {
    setIsRunning(!isRunning);
  };

  // Determine if the DisplayCube component should be rendered
  const shouldRenderCube = scrambleType === "2x2" || scrambleType === "3x3";

  return (
    <div style={{ height: "calc(100svh - env(safe-area-inset-bottom))" }} className="absolute z-0 w-full touch-none select-none">
      <div className={`transition-opacity duration-500 ${isRunning ? "opacity-0" : "opacity-100"}`}>
        <TimerDashboard
          navComponent={<Nav />}
          scrambleComponent={
            <Scramble
              scramble={scramble}
              scrambleType={scrambleType}
              handleScrambleChange={(newScramble: string) => {
                setScrambleType(newScramble);
                handleNewScramble(newScramble);
              }}
              prevScramble={prevScramble}
              handleNewScramble={(newScramble: string) => handleNewScramble(newScramble)}
              handlePrevScramble={handlePrevScramble}
            />
          }
          timerTableComponent={<TimerTable solves={solves} clearSolves={handleClearSolves} setSolves={setSolves} />}
          cubeDisplayComponent={shouldRenderCube ? <DisplayCube cube={myCube} size={6} /> : null}
        />
      </div>
      <Timer solves={solves} addSolve={handleAddSolveAndGenerateNewScramble} toggleDashboard={handleToggleDashboard} />
    </div>
  );
};

export default RubiksTimerPage;
