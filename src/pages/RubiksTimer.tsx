import { useState, useEffect } from "react";
import useTimer from "../hooks/useTimer";
import { Solve } from "../lib";
import { Cube, DisplayCube, applyScramble, generateScramble } from "react-rubiks-cube-utils";
import Nav from "../components/sidebar/Nav";
import TimerTable from "../components/sidebar/TimerTable";
import Timer from "../components/timer/Timer";
import useLocalStorageState from "../hooks/useLocalStorageState";
import Scramble from "../components/scramble/Scramble";

function RubiksTimer() {
  const { timeMs, setTimeMs, isRunning, setIsRunning } = useTimer();
  const [solves, setSolves] = useLocalStorageState<Solve[]>([], "solves");
  const [scramble, setScramble] = useState("");
  const myCube: Cube = applyScramble({ type: "3x3", scramble: scramble });

  // On initialization, set the scramble
  useEffect(() => {
    setScramble(generateScramble({ type: "3x3" }).toString());
  }, []);

  return (
    <>
      <div style={{ height: "calc(100svh - env(safe-area-inset-bottom))" }} className="absolute w-full z-0">
        {!isRunning && (
          <>
            <Nav setSolves={setSolves} />
            <Scramble scramble={scramble} />
            <TimerTable solves={solves} />
            <div className="absolute max-[768px]:bottom-[11.8vw] right-0 bottom-0 bg-slate-300 border-slate-200 border-solid border-[0.15rem] rounded-[0.35rem] p-[0.3rem] z-20">
              <DisplayCube cube={myCube} size={6} />
            </div>
          </>
        )}
        <div className="relative z-10">
          <Timer setSolves={setSolves} solves={solves} setScramble={setScramble} scramble={scramble} timeMs={timeMs} setTimeMs={setTimeMs} isRunning={isRunning} setIsRunning={setIsRunning} />
        </div>
      </div>
    </>
  );
}

export default RubiksTimer;
