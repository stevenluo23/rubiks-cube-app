import { Solve } from "../../lib";
import { useStopwatch } from "../../hooks/useStopwatch";
import TimerDisplay from "./TimerDisplay";
import { useStopwatchKeyEvents } from "../../hooks/useStopwatchKeyEvents";

interface TimerProps {
  solves: Solve[];
  addSolve: (timeMs: number) => void;
  toggleDashboard: () => void;
}

const Timer: React.FC<TimerProps> = ({ solves, addSolve, toggleDashboard }) => {
  const { timeMs, isRunning, reset, start, stop } = useStopwatch();

  const { isKeyDown, wasStopped, handleKeyDownAction, handleKeyUpaction } = useStopwatchKeyEvents(
    isRunning,
    timeMs,
    start,
    stop,
    reset,
    addSolve,
    toggleDashboard,
  );

  return (
    <div
      onTouchStart={handleKeyDownAction}
      onTouchEnd={handleKeyUpaction}
      className={`relative z-10 flex h-svh items-center justify-center ${isRunning ? "" : "md:ml-[10%]"}`}
    >
      <TimerDisplay solves={solves} timeMs={timeMs} isKeyDown={isKeyDown} wasStopped={wasStopped} isRunning={isRunning} />
    </div>
  );
};

export default Timer;
