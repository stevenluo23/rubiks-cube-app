import { Solve } from "../../lib";
import useTimer from "../../hooks/useStopwatch";
import TimerDisplay from "./TimerDisplay";
import useTimerKeyEvents from "../../hooks/useTimerKeyEvents";

interface TimerProps {
  solves: Solve[];
  addSolve: (timeMs: number) => void;
  toggleDashboard: () => void;
}

const Timer: React.FC<TimerProps> = ({ solves, addSolve, toggleDashboard }) => {
  const { timeMs, isRunning, reset, start, stop } = useTimer();

  const { isKeyDown, wasStopped, handleKeyDownAction, handleKeyUpaction } = useTimerKeyEvents(
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
