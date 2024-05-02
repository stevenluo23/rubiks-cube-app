import { useEffect, useState } from "react";
import useLocalStorageState from "./useLocalStorageState";

function useTimer() {
  const [timeMs, setTimeMs] = useLocalStorageState(0, "timerTimeMs");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number | undefined = undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeMs((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, setTimeMs]);

  return { timeMs, setTimeMs, isRunning, setIsRunning };
}

export default useTimer;
