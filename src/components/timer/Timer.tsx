import { useEffect, useRef, useState } from "react";
import { useKey } from "../../hooks/useKey";

function Timer({ onSolve }: { onSolve: () => void }) {
  const [timeMs, setTimeMs] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isKeyDown, setIsKeyDown] = useState<boolean>(false);
  const [wasStopped, setWasStopped] = useState<boolean>(false);
  const [canStart, setCanStart] = useState<boolean>(true);
  const startTime = useRef<number>(0);

  const seconds = Math.floor(timeMs / 1000);
  const hundredths = Math.floor((timeMs % 1000) / 10);

  // Avoid running useEffect repeatedly as time updates
  const timeMsRef = useRef(timeMs);

  // Start or stop the timer on space bar
  useKey({
    key: " ",
    keydownAction: () => {
      if (isRunning) {
        setIsRunning(false);
        setWasStopped(true);
        onSolve();
      } else if (canStart) {
        setIsKeyDown(true);
      }
    },
    keyupAction: () => {
      if (isKeyDown && canStart) {
        setTimeMs(0);
        setIsKeyDown(false);
        setIsRunning(!isRunning);
      } else {
        setWasStopped(false);
      }
    },
  });

  // Stop the timer on any key
  useKey({
    key: "any",
    keydownAction: () => {
      if (isRunning) {
        setIsRunning(false);
        setWasStopped(true);
        setTimeout(() => {
          setWasStopped(false);
        }, 250);
        onSolve();
      }
    },
    keyupAction: () => {
      setWasStopped(false);
    },
  });

  // Timer functionality
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
    <div>
      <span
        className={`font-lcd
          ${isKeyDown ? "text-green-400" : wasStopped ? "text-red-400" : ""}
        `}
      >
        <span className="text-[15rem]">{seconds}.</span>
        <span className="text-[10rem]">
          {hundredths.toString().padStart(2, "0")}
        </span>
      </span>
    </div>
  );
}

export default Timer;
