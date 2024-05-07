import { useEffect, useRef, useState } from "react";
import useLocalStorageState from "./useLocalStorageState";

function useStopwatch() {
  const [timeMs, setTimeMs] = useLocalStorageState(0, "timerTimeMs");
  const [isRunning, setIsRunning] = useState(false);
  const timeMsRef = useRef(timeMs);
  const startTime = useRef(0);

  // Keep timeMsRef current
  useEffect(() => {
    timeMsRef.current = timeMs;
  }, [timeMs]);

  useEffect(() => {
    let interval: number | undefined = undefined;
    if (isRunning) {
      startTime.current = Date.now() - timeMsRef.current;
      interval = setInterval(() => {
        setTimeMs(Date.now() - startTime.current);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, setTimeMs]);

  const reset = () => {
    setTimeMs(0);
  };

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  return { timeMs, isRunning, reset, start, stop };
}

export default useStopwatch;
