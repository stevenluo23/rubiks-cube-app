import { useState, useRef } from "react";
import { Solve } from "../../lib";
import useKey from "../../hooks/useKey";
import useTimer from "../../hooks/useStopwatch";
import TimerDisplay from "./TimerDisplay";
import TimeChange from "./TimeChange";
import Ao5 from "./Ao5";

interface TimerProps {
  solves: Solve[];
  addSolve: (timeMs: number) => void;
  toggleDashboard: () => void;
}

const Timer: React.FC<TimerProps> = ({ solves, addSolve, toggleDashboard }) => {
  const { timeMs, isRunning, reset, start, stop } = useTimer();

  const [isKeyDown, setIsKeyDown] = useState(false);
  const [wasStopped, setWasStopped] = useState(false);
  const [canStart, setCanStart] = useState(true);
  const keyHeldRef = useRef(false);
  const escapeKeyRef = useRef(false);

  const handleKeyDownAction = () => {
    keyHeldRef.current = true;
    if (isRunning) {
      stop();
      toggleDashboard();

      // Styling for TimerDisplay
      setWasStopped(true);
      setTimeout(() => {
        setWasStopped(false);
      }, 100);

      // Prevent user from restarting immediately after stopping
      setCanStart(false);
      setTimeout(() => {
        setCanStart(true);
      }, 500);

      addSolve(timeMs);
    } else if (!isKeyDown && canStart) {
      setIsKeyDown(true);
    }
  };

  const handleKeyUpaction = () => {
    keyHeldRef.current = false;
    // Avoids starting the timer on release if the ESC key was hit
    if (isKeyDown && canStart && !escapeKeyRef.current) {
      reset();
      setIsKeyDown(false); // Changes styling for TimerDisplay
      start();

      toggleDashboard();
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
      if (!keyHeldRef.current) {
        reset();
      }
      setIsKeyDown(false);
      keyHeldRef.current = false;
      escapeKeyRef.current = true;
    },
    keyupAction: () => (escapeKeyRef.current = false),
  });

  return (
    <div
      onTouchStart={handleKeyDownAction}
      onTouchEnd={handleKeyUpaction}
      className={`relative z-10 flex h-svh items-center justify-center ${isRunning ? "" : "md:ml-[5%]"}`}
    >
      <TimerDisplay
        timeMs={timeMs}
        isKeyDown={isKeyDown}
        wasStopped={wasStopped}
        isRunning={isRunning}
        timeChangeComponent={<TimeChange solves={solves} />}
        ao5Component={<Ao5 solves={solves} />}
      />
    </div>
  );
};

export default Timer;
