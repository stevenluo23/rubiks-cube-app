import { useEffect, useState, useRef } from "react";
import { generateScramble } from "react-rubiks-cube-utils";
import useKey from "../../hooks/useKey";
import TimerDisplay from "./TimerDisplay";
import { calculateAo5 } from "../../utils";
import { TimerProps } from "../../lib";

const Timer: React.FC<TimerProps> = ({ setSolves, solves, setScramble, scramble, timeMs, setTimeMs, isRunning, setIsRunning }) => {
  const [isKeyDown, setIsKeyDown] = useState(false);
  const [wasStopped, setWasStopped] = useState(false);
  const [canStart, setCanStart] = useState(true);
  const keyHeldRef = useRef(false);
  const escapeKeyRef = useRef(false);

  const handleKeyDownAction = () => {
    keyHeldRef.current = true;
    if (isRunning) {
      // Stop timer
      setIsRunning(false);
      setWasStopped(true);
      setTimeout(() => {
        setWasStopped(false);
      }, 100);

      setSolves((prevSolves) => {
        // Add the new solve
        const newSolves = [
          ...prevSolves,
          {
            count: prevSolves.length + 1,
            time: timeMs,
            ao5: null, // Temporarily set Ao5 to null
            scramble: scramble,
            date: new Date(),
          },
        ];

        // Calculate the Ao5 when we have >= 5 solves
        const ao5 = calculateAo5(newSolves);

        // Update the new solve with the calculated Ao5 if it exists, updates to null otherwise
        newSolves[newSolves.length - 1].ao5 = ao5;

        return newSolves;
      });

      // Generate new scramble for next solve
      setScramble(generateScramble({ type: "3x3" }).toString());
    } else if (!isKeyDown && canStart) {
      setIsKeyDown(true);
    }
  };

  const handleKeyUpaction = () => {
    keyHeldRef.current = false;
    // Avoids starting the timer on release if the ESC key was hit
    if (isKeyDown && canStart && !escapeKeyRef.current) {
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

  // Prevent timer from starting when the user presses escape
  useKey({
    key: "Escape",
    keydownAction: () => {
      if (!keyHeldRef.current) {
        setTimeMs(0);
      }
      setIsKeyDown(false);
      keyHeldRef.current = false;
      escapeKeyRef.current = true;
    },
    keyupAction: () => (escapeKeyRef.current = false),
  });

  // Prevents user from restarting immediately after stopping (safeguard)
  useEffect(() => {
    if (wasStopped) {
      setCanStart(false);
      setTimeout(() => {
        setCanStart(true);
      }, 500);
    }
  }, [wasStopped]);

  return (
    <div
      onTouchStart={handleKeyDownAction}
      onTouchEnd={handleKeyUpaction}
      className={`flex h-svh items-center justify-center ${isRunning ? "" : "md:ml-[5%]"}`}
    >
      <TimerDisplay solves={solves} timeMs={timeMs} isKeyDown={isKeyDown} wasStopped={wasStopped} isRunning={isRunning} />
    </div>
  );
};

export default Timer;
