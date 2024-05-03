import { useEffect, useRef, useState } from "react";
import useLocalStorageState from "./useLocalStorageState";

function useTimer() {
  const [timeMs, setTimeMs] = useLocalStorageState(0, "timerTimeMs");
  const timeMsRef = useRef(timeMs);
  const [isRunning, setIsRunning] = useState(false);
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

  return { timeMs, setTimeMs, isRunning, setIsRunning };
}

export default useTimer;
