import React from "react";
import { calculateTimes } from "../../utils";

interface TimerDisplayProps {
  timeMs: number;
  isKeyDown: boolean;
  wasStopped: boolean;
  isRunning: boolean;
  timeChangeComponent: React.ReactNode;
  ao5Component: React.ReactNode;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeMs, isKeyDown, wasStopped, isRunning, timeChangeComponent, ao5Component }) => {
  const { seconds, minutes, hundredths, tenths } = calculateTimes(timeMs);

  const renderTimerDisplay = () => {
    return (
      <div className={`font-lcd ${isKeyDown ? "text-green-400" : wasStopped ? "text-red-400" : ""}`}>
        {minutes > 0 && <span className="text-8xl md:text-[12rem]">{minutes}:</span>}
        <span className="text-[6em] md:text-[12em]">{minutes > 0 ? seconds.toString().padStart(2, "0") : seconds}.</span>
        {/* Display only tenths place when timer is running for quicker timer calculations */}
        {isRunning ? (
          <span className="text-[3em] md:text-[8em]">{tenths.toString()}</span>
        ) : (
          <span className="text-[3em] md:text-[8em]">{hundredths.toString().padStart(2, "0")}</span>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-end gap-4 leading-none">
        {renderTimerDisplay()}
        {!isRunning && timeChangeComponent}
      </div>
      {!isRunning && ao5Component}
    </div>
  );
};

export default TimerDisplay;
