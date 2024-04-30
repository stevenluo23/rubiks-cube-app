import { useEffect, useState, useRef, useCallback } from "react";
import { Solve } from "../lib";
import { generateScramble } from "react-rubiks-cube-utils";
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
  const [scramble, setScramble] = useState<string>("");

  const handleKeyDownAction = () => {
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
      {!isRunning && <Scramble scramble={scramble} onClear={() => onSolve([])} />}
      <div onTouchStart={handleKeyDownAction} onTouchEnd={handleKeyUpaction}>
        <TimerDisplay solves={solves} timeMs={timeMs} isKeyDown={isKeyDown} wasStopped={wasStopped} isRunning={isRunning} />
      </div>
    </div>
  );
};

export default RubiksTimer;
