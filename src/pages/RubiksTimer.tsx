import { useState } from "react";
import useTimer from "../hooks/useTimer";
import { Solve, TimerProps } from "../lib";
import { Cube, DisplayCube, applyScramble, generateScramble } from "react-rubiks-cube-utils";
import Nav from "../components/sidebar/Nav";
import TimerTable from "../components/sidebar/table/TimerTable";
import Timer from "../components/timer/Timer";
import useLocalStorageState from "../hooks/useLocalStorageState";
import Scramble from "../components/scramble/Scramble";

const RubiksTimer = () => {
  const { timeMs, setTimeMs, isRunning, setIsRunning } = useTimer();
  const [solves, setSolves] = useLocalStorageState<Solve[]>([], "solves");
  const [scramble, setScramble] = useState(generateScramble({ type: "3x3" }).toString());
  const myCube: Cube = applyScramble({ type: "3x3", scramble: scramble });

  const timerProps: TimerProps = {
    setSolves,
    solves,
    setScramble,
    scramble,
    timeMs,
    setTimeMs,
    isRunning,
    setIsRunning,
  };

  return (
    <>
      <div style={{ height: "calc(100svh - env(safe-area-inset-bottom))" }} className="absolute z-0 w-full touch-none select-none">
        <div className={`transition-opacity duration-500 ${isRunning ? "opacity-0" : "opacity-100"}`}>
          <Nav setSolves={setSolves} />
          <Scramble scramble={scramble} />
          <TimerTable solves={solves} />
          <div className="absolute bottom-0 right-0 z-20 rounded-[0.35rem] border-[0.15rem] border-solid border-slate-200 bg-slate-300 p-[0.3rem] max-[768px]:bottom-[11.8vw]">
            <DisplayCube cube={myCube} size={6} />
          </div>
        </div>
        <div className="relative z-10">
          <Timer {...timerProps} />
        </div>
      </div>
    </>
  );
};

export default RubiksTimer;
