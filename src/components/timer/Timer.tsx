import { Solve } from "../../lib";
import { useStopwatch } from "../../hooks/useStopwatch";
import TimerDisplay from "./TimerDisplay";
import { useStopwatchKeyEvents } from "../../hooks/useStopwatchKeyEvents";

interface TimerProps {
  solves: Solve[];
  addSolve: (timeMs: number) => void;
  toggleSidebar: () => void;
}

const Timer: React.FC<TimerProps> = ({ solves, addSolve, toggleSidebar }) => {
  const { timeMs, isRunning, reset, start, stop } = useStopwatch();

  const { isKeyDown, wasStopped, canStart, handleTouchStart, handleTouchEnd } = useStopwatchKeyEvents(
    isRunning,
    timeMs,
    start,
    stop,
    reset,
    addSolve,
    toggleSidebar,
  );

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative z-10 flex h-svh items-center justify-center ${isRunning ? "" : "md:ml-[10%]"}`}
    >
      <TimerDisplay solves={solves} timeMs={timeMs} isKeyDown={isKeyDown} wasStopped={wasStopped} isRunning={isRunning} canStart={canStart} />
    </div>
  );
};

export default Timer;
