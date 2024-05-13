import React from "react";
import { calculateTimes } from "../../utils";
import { Solve } from "../../lib";
import TimeChange from "./TimeChange";
import Ao5 from "./Ao5";

interface TimerDisplayProps {
  solves: Solve[];
  timeMs: number;
  isKeyDown: boolean;
  wasStopped: boolean;
  isRunning: boolean;
  canStart: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ solves, timeMs, isKeyDown, wasStopped, isRunning, canStart }) => {
  const timeToCalculate = isRunning ? timeMs : timeMs === 0 || solves.length === 0 ? 0 : solves[solves.length - 1].time;
  const { seconds, minutes, hundredths, tenths } = calculateTimes(timeToCalculate);

  let timerStyling = "";

  if (isKeyDown) {
    timerStyling = wasStopped || !canStart ? "text-red-400" : "text-green-400";
  }

  // canStart represents whether the timer has been held long enough to be started
  const renderTimerDisplay = () => {
    return (
      <div className={`font-lcd ${timerStyling}`}>
        {minutes > 0 && <span className="text-8xl lg:text-[12rem]">{minutes}:</span>}
        <span className="text-[6em] lg:text-[12em]">{minutes > 0 ? seconds.toString().padStart(2, "0") : seconds}.</span>
        <span className="text-[3em] lg:text-[8em]">{isRunning ? tenths.toString() : hundredths.toString().padStart(2, "0")}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-end gap-4 leading-none">
        {renderTimerDisplay()}
        {!isRunning && <TimeChange solves={solves} />}
      </div>
      {!isRunning && <Ao5 solves={solves} />}
    </div>
  );
};

export default TimerDisplay;
