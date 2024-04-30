import { useEffect, useState, useRef } from "react";
import { Solve } from "../lib";
import { generateScramble, applyScramble, Cube, DisplayCube } from "react-rubiks-cube-utils";
import useKey from "../hooks/useKey";
import useTimer from "../hooks/useTimer";
import TimerDisplay from "../components/timer/TimerDisplay";
import Scramble from "../components/scramble/Scramble";

interface RubiksTimerProps {
  onSolve: React.Dispatch<React.SetStateAction<Solve[]>>;
  solves: Solve[];
}

const RubiksTimer: React.FC<RubiksTimerProps> = ({ onSolve, solves }) => {
  const { timeMs, setTimeMs, isRunning, setIsRunning } = useTimer();
  const [isKeyDown, setIsKeyDown] = useState(false);
  const [wasStopped, setWasStopped] = useState(false);
  const [canStart, setCanStart] = useState(true);
  const [scramble, setScramble] = useState("");
  const myCube: Cube = applyScramble({ type: "3x3", scramble: scramble });
  const keyHeldRef = useRef(false);

  const handleKeyDownAction = () => {
    keyHeldRef.current = true;
    if (isRunning) {
      setIsRunning(false);
      setWasStopped(true);
      setTimeout(() => {
        setWasStopped(false);
      }, 100);
      onSolve((prevSolves) => [...prevSolves, { count: prevSolves.length + 1, time: timeMs, scramble: scramble, date: new Date() }]);
      setScramble(generateScramble({ type: "3x3" }).toString());
    } else if (canStart) {
      setIsKeyDown(true);
    }
  };

  const handleKeyUpaction = () => {
    keyHeldRef.current = false;
    if (isKeyDown && canStart) {
      setTimeMs(0);
      setIsKeyDown(false);
      setIsRunning(true);
    }
  };

  // Start timer on spacebar, stop on any key
  useKey({
    key: isRunning ? "any" : " ",
    keydownAction: handleKeyDownAction,
    keyupAction: handleKeyUpaction,
  });

  // Prevents user from restarting immediately after stopping (safeguard)
  useEffect(() => {
    if (wasStopped) {
      setCanStart(false);
      setTimeout(() => {
        setCanStart(true);
      }, 250);
    }
  }, [wasStopped]);

  // On initialization, set the scramble
  useEffect(() => {
    setScramble(generateScramble({ type: "3x3" }).toString());
  }, []);

  return (
    <div className="select-none h-svh w-svw">
      {!isRunning && (
        <>
          <header className="flex justify-center items-center gap-8 bg-orange-300 h-fit sm:h-[12svh]">
            <Scramble scramble={scramble} />
            <button onClick={() => onSolve([])} className="bg-slate-300 p-2 m-2 rounded-md select-none hover:bg-slate-200 transition-colors duration-200 focus:outline-none">
              Clear Solves
            </button>
          </header>
          <div className="p-2 rounded-lg bg-slate-300 w-fit h-fit fixed right-0 bottom-0 md:block hidden">
            <DisplayCube cube={myCube} size={10} />
          </div>
        </>
      )}
      <div onTouchStart={handleKeyDownAction} onTouchEnd={handleKeyUpaction}>
        <TimerDisplay solves={solves} timeMs={timeMs} isKeyDown={isKeyDown} wasStopped={wasStopped} isRunning={isRunning} />
      </div>
    </div>
  );
};

export default RubiksTimer;
