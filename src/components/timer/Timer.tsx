import { useEffect, useState } from "react";
import useKey from "../../hooks/useKey";
import useTimer from "../../hooks/useTimer";
import TimerDisplay from "./TimerDisplay";

function Timer({ onSolve }: { onSolve: () => void }) {
  const { timeMs, setTimeMs, isRunning, setIsRunning } = useTimer();
  const [isKeyDown, setIsKeyDown] = useState<boolean>(false);
  const [wasStopped, setWasStopped] = useState<boolean>(false);
  const [canStart, setCanStart] = useState<boolean>(true);

  const seconds = Math.floor(timeMs / 1000);
  const hundredths = Math.floor((timeMs % 1000) / 10);

  const handleKeyDownAction = () => {
    if (isRunning) {
      setIsRunning(false);
      setWasStopped(true);
      setTimeout(() => {
        setWasStopped(false);
      }, 100);
      onSolve();
    } else if (canStart) {
      setIsKeyDown(true);
    }
  };

  const handleKeyUpaction = () => {
    if (isKeyDown && canStart) {
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
    <div onTouchStart={handleKeyDownAction} onTouchEnd={handleKeyUpaction}>
      <TimerDisplay
        seconds={seconds}
        hundredths={hundredths}
        isKeyDown={isKeyDown}
        wasStopped={wasStopped}
      />
    </div>
  );
}

export default Timer;
