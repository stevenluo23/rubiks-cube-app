import { useEffect, useState, useRef } from "react";
import useKey from "../hooks/useKey";
import useTimer from "../hooks/useTimer";
import TimerDisplay from "../components/timer/TimerDisplay";
import Scramble from "../components/scramble/Scramble";

const RubiksTimer = () => {
  const { timeMs, setTimeMs, isRunning, setIsRunning } = useTimer();
  const [solves, setSolves] = useState(0);
  const [isKeyDown, setIsKeyDown] = useState(false);
  const [wasStopped, setWasStopped] = useState(false);
  const [canStart, setCanStart] = useState(true);
  const keyHeldRef = useRef(false);

  const handleKeyDownAction = () => {
    if (!keyHeldRef.current) {
      keyHeldRef.current = true;
      if (isRunning) {
        setIsRunning(false);
        setWasStopped(true);
        setTimeout(() => {
          setWasStopped(false);
        }, 100);
        setSolves((solves) => solves + 1);
      } else if (canStart) {
        setIsKeyDown(true);
      }
    }
  };

  const handleKeyUpaction = () => {
    keyHeldRef.current = false;
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
    <div className="flex select-none flex-col h-screen w-screen">
      {!isRunning && <Scramble solves={solves} />}
      <div onTouchStart={handleKeyDownAction} onTouchEnd={handleKeyUpaction}>
        <TimerDisplay
          solves={solves}
          timeMs={timeMs}
          isKeyDown={isKeyDown}
          wasStopped={wasStopped}
        />
      </div>
    </div>
  );
};

export default RubiksTimer;
