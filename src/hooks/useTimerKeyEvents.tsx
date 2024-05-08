import { useState, useRef } from "react";
import useKeyEvents from "./useKeyEvents";

const useTimerKeyEvents = (
  isRunning: boolean,
  timeMs: number,
  start: () => void,
  stop: () => void,
  reset: () => void,
  addSolve: (timeMs: number) => void,
  toggleDashboard: () => void,
) => {
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
      }, 700);

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
  useKeyEvents({
    key: isRunning ? "any" : " ",
    keydownAction: handleKeyDownAction,
    keyupAction: handleKeyUpaction,
  });

  // Prevent timer from starting when the user presses escape
  useKeyEvents({
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

  return { isKeyDown, wasStopped, handleKeyDownAction, handleKeyUpaction };
};

export default useTimerKeyEvents;
