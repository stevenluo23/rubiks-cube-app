import { useEffect, useState } from "react";

function useTimer() {
  const [timeMs, setTimeMs] = useState(0);
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
  }, [isRunning]);

  return { timeMs, setTimeMs, isRunning, setIsRunning };
}

export default useTimer;
