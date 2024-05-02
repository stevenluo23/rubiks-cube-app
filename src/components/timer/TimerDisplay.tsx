import React from "react";
import { Solve } from "../../lib";
import { calculateTimes } from "../../utils";

interface TimerDisplayProps {
  solves: Solve[];
  timeMs: number;
  isKeyDown: boolean;
  wasStopped: boolean;
  isRunning: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ solves, timeMs, isKeyDown, wasStopped, isRunning }) => {
  const { seconds, minutes, hundredths, tenths } = calculateTimes(timeMs);
  return (
    // Figure out how to dynamically resize timer display as it grows to fit in container
    <div className="flex flex-col items-center justify-center">
      <div
        className={`font-lcd
    ${isKeyDown ? "text-green-400" : wasStopped ? "text-red-400" : ""}
    `}
      >
        {minutes > 0 && <span className="text-8xl md:text-[12rem]">{minutes}:</span>}
        <span className="text-8xl md:text-[12rem]">{minutes > 0 ? seconds.toString().padStart(2, "0") : seconds}.</span>
        {isRunning ? <span className="text-[2rem] md:text-[8rem]">{tenths.toString()}</span> : <span className="text-[2rem] md:text-[8rem]">{hundredths.toString().padStart(2, "0")}</span>}
      </div>
      <div className={`w-1/2 text-center text-xl transition-opacity duration-1000 md:block hidden ${solves.length !== 0 ? "opacity-0" : "opacity-100"}`}>
        Press <strong>Spacebar</strong> to start the timer and <strong>Any key</strong> to stop it
      </div>
    </div>
  );
};

export default TimerDisplay;
