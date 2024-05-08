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
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ solves, timeMs, isKeyDown, wasStopped, isRunning }) => {
  const timeToCalculate = isRunning ? timeMs : timeMs === 0 || solves.length === 0 ? 0 : solves[solves.length - 1].time;
  const { seconds, minutes, hundredths, tenths } = calculateTimes(timeToCalculate);

  const renderTimerDisplay = () => {
    return (
      <div className={`font-lcd ${isKeyDown ? "text-green-400" : wasStopped ? "text-red-400" : ""}`}>
        {minutes > 0 && <span className="text-8xl md:text-[12rem]">{minutes}:</span>}
        <span className="text-[6em] md:text-[12em]">{minutes > 0 ? seconds.toString().padStart(2, "0") : seconds}.</span>
        <span className="text-[3em] md:text-[8em]">{isRunning ? tenths.toString() : hundredths.toString().padStart(2, "0")}</span>
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
