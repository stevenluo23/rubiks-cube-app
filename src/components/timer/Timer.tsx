import { useEffect, useState, useRef } from "react";
import { Solve } from "../../lib";
import { generateScramble } from "react-rubiks-cube-utils";
import useKey from "../../hooks/useKey";
import TimerDisplay from "./TimerDisplay";
import { calculateAo5 } from "../../utils";

interface TimerProps {
  setSolves: React.Dispatch<React.SetStateAction<Solve[]>>;
  solves: Solve[];
  setScramble: React.Dispatch<React.SetStateAction<string>>;
  scramble: string;
  timeMs: number;
  setTimeMs: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timer: React.FC<TimerProps> = ({ setSolves, solves, setScramble, scramble, timeMs, setTimeMs, isRunning, setIsRunning }) => {
  const [isKeyDown, setIsKeyDown] = useState(false);
  const [wasStopped, setWasStopped] = useState(false);
  const [canStart, setCanStart] = useState(true);
  const keyHeldRef = useRef(false);
  const escapeKeyRef = useRef(false);

  const handleKeyDownAction = () => {
    keyHeldRef.current = true;
    if (isRunning) {
      // Stop timer
      setIsRunning(false);
      setWasStopped(true);
      setTimeout(() => {
        setWasStopped(false);
      }, 100);

      // Add solve
      const ao5 = calculateAo5(solves, timeMs);
      setSolves((prevSolves) => [...prevSolves, { count: prevSolves.length + 1, time: timeMs, ao5: ao5, scramble: scramble, date: new Date() }]);

      // Generate new scramble for next solve
      setScramble(generateScramble({ type: "3x3" }).toString());
    } else if (canStart) {
      setIsKeyDown(true);
    }
  };

  const handleKeyUpaction = () => {
    keyHeldRef.current = false;
    if (isKeyDown && canStart && !escapeKeyRef.current) {
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

  // Prevent timer from starting when the user presses escape
  useKey({
    key: "Escape",
    keydownAction: () => {
      setIsKeyDown(false);
      keyHeldRef.current = false;
      escapeKeyRef.current = true;
    },
    keyupAction: () => (escapeKeyRef.current = false),
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

  return (
    <div onTouchStart={handleKeyDownAction} onTouchEnd={handleKeyUpaction} className={`flex h-svh items-center justify-center ${isRunning ? "" : "md:ml-[5%]"}`}>
      <TimerDisplay solves={solves} timeMs={timeMs} isKeyDown={isKeyDown} wasStopped={wasStopped} isRunning={isRunning} />
    </div>
  );
};

export default Timer;
