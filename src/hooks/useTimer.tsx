import { useEffect, useRef, useState } from "react";

function useTimer() {
  const [timeMs, setTimeMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTime = useRef(0);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      startTime.current = Date.now() - timeMs;
      intervalId = setInterval(() => {
        setTimeMs(Date.now() - startTime.current);
      }, 1);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timeMs]);

  return { timeMs, setTimeMs, isRunning, setIsRunning };
}

export default useTimer;
