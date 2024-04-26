import { useEffect, useRef, useState } from "react";

interface TimerState {
  timeMs: number;
  setTimeMs: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

function useTimer(): TimerState {
  const [timeMs, setTimeMs] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const startTime = useRef<number>(0);
  const timeMsRef = useRef(timeMs);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      startTime.current = Date.now() - timeMsRef.current;
      intervalId = setInterval(() => {
        setTimeMs(Date.now() - startTime.current);
      }, 1);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  return { timeMs, setTimeMs, isRunning, setIsRunning };
}

export default useTimer;
