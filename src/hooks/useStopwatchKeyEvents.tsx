import { useState, useRef } from "react";
import { useKeyEvents } from "./useKeyEvents";

export function useStopwatchKeyEvents(
  isRunning: boolean,
  timeMs: number,
  start: () => void,
  stop: () => void,
  reset: () => void,
  addSolve: (timeMs: number) => void,
  toggleSidebar: () => void,
) {
  const [wasStopped, setWasStopped] = useState(false);
  const [canStart, setCanStart] = useState(false);
  const [isKeyDown, setIsKeyDown] = useState(false);
  const keyDownRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    setIsKeyDown(true);
    keyDownRef.current = true;

    if (isRunning) {
      stop();
      setWasStopped(true);
      toggleSidebar();
      setCanStart(false);
      addSolve(timeMs);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        if (keyDownRef.current) {
          setCanStart(true);
        }
      }, 350);
    }
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    setIsKeyDown(false);
    keyDownRef.current = false;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (canStart) {
      reset();
      start();
      toggleSidebar();
      setCanStart(false);
    } else if (wasStopped) {
      setWasStopped(false);
    }
  };

  const handleKeyDownAction = (e: KeyboardEvent) => {
    if (e.key === " " || isRunning) {
      // Set isKeyDown to true to initiate timer styling
      setIsKeyDown(true);
      keyDownRef.current = true;
    }

    // Case when the user stops the timer
    if (isRunning) {
      stop();
      setWasStopped(true);
      toggleSidebar();
      setCanStart(false);
      addSolve(timeMs);
    } else if (e.key === " ") {
      // Clear any existing timeout to prevent multiple starts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Set a timeout to allow the user to hold the spacebar to start the timer
      timeoutRef.current = setTimeout(() => {
        if (keyDownRef.current) {
          setCanStart(true);
        }
      }, 350);
    } else if (e.key === "Escape") {
      // Reset timer display to 0.00 when key is not held
      if (!isKeyDown) {
        reset();
      } else {
        // Exit the timer when the escape key is pressed
        setCanStart(false);
        setIsKeyDown(false);
        keyDownRef.current = false;
      }
    }
  };

  const handleKeyUpaction = (e: KeyboardEvent) => {
    if (e.key === " " || wasStopped) {
      setIsKeyDown(false);
      setWasStopped(false);
      keyDownRef.current = false;

      // Clear the timeout when the key is released to prevent starting the timer
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Note: this will not run when the Escape key is hit
      if (canStart && e.key === " ") {
        // Clear timer display
        reset();
        start();

        // Hide sidebar
        toggleSidebar();
        setCanStart(false);
      }
    }
  };

  // Start timer on spacebar, stop on any key, reset on escape
  useKeyEvents({
    keydownAction: handleKeyDownAction,
    keyupAction: handleKeyUpaction,
  });

  return { isKeyDown, wasStopped, canStart, handleTouchStart, handleTouchEnd };
}
