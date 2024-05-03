import React from "react";
import TimeChangeIndicator from "./indicator/TimeChangeIndicator";
import ZeroTimeIndicator from "./indicator/ZeroTimeIndicator";
import { Solve } from "../../lib";
import { calculateTimes, calculateAo5, calculateTimeChange } from "../../utils";

interface TimerDisplayProps {
  solves: Solve[];
  timeMs: number;
  isKeyDown: boolean;
  wasStopped: boolean;
  isRunning: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ solves, timeMs, isKeyDown, wasStopped, isRunning }) => {
  const { seconds, minutes, hundredths, tenths } = calculateTimes(timeMs);
  const ao5 = calculateAo5(solves);
  const timeChange = calculateTimeChange(solves);

  const formattedAo5 = ao5 && calculateTimes(ao5);
  const formattedTimes = timeChange && calculateTimes(Math.abs(timeChange));

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

  const renderIndicator = () => {
    if (formattedTimes) {
      return <TimeChangeIndicator timeChange={timeChange} formattedTimes={formattedTimes} />;
    } else if (timeMs && solves.length > 1) {
      return <ZeroTimeIndicator solves={solves} timeChange={timeChange || 0} />;
    }
    return null;
  };

  const renderAo5 = () => {
    if (!formattedAo5) {
      return null;
    }

    return (
      <div className="text-center text-xl text-blue-600 md:text-2xl">
        <p>
          ao5: {formattedAo5.minutes > 0 ? `${formattedAo5.minutes}:` : ""}
          {formattedAo5.seconds}.{formattedAo5.hundredths.toString().padStart(2, "0")}
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-end gap-4 leading-none">
        {renderTimerDisplay()}
        {!isRunning && renderIndicator()}
      </div>
      {!isRunning && renderAo5()}
      <div
        className={`hidden w-1/2 text-center text-xl transition-opacity duration-1000 md:block ${solves.length !== 0 ? "opacity-0" : "opacity-100"}`}
      >
        Press <strong>Spacebar</strong> to start the timer and <strong>Any key</strong> to stop it
      </div>
    </div>
  );
};

export default TimerDisplay;
