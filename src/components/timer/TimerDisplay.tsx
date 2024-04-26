interface DisplayProps {
  solves: number;
  timeMs: number;
  isKeyDown: boolean;
  wasStopped: boolean;
}

function TimerDisplay({ solves, timeMs, isKeyDown, wasStopped }: DisplayProps) {
  const minutes = Math.floor(timeMs / 60000);
  const seconds = Math.floor((timeMs % 60000) / 1000);
  const hundredths = Math.floor((timeMs % 1000) / 10);
  return (
    // Figure out how to dynamically resize timer display as it grows to fit in container
    <div className="flex flex-col items-center text-center">
      <span
        className={`font-lcd select-none
        ${isKeyDown ? "text-green-400" : wasStopped ? "text-red-400" : ""}
        `}
      >
        {minutes > 0 && (
          <span className="text-8xl sm:text-[12rem]">{minutes}:</span>
        )}
        <span className="text-8xl sm:text-[12rem]">
          {minutes > 0 ? seconds.toString().padStart(2, "0") : seconds}.
        </span>
        <span className="text-[2rem] sm:text-[8rem]">
          {hundredths.toString().padStart(2, "0")}
        </span>
      </span>
      <span
        className={`text-xl transition-opacity duration-1000 md:block hidden ${
          solves !== 0 ? "opacity-0" : "opacity-100"
        }`}
      >
        Press <strong>Spacebar</strong> to start the timer and{" "}
        <strong>Any key</strong> to stop it
      </span>
    </div>
  );
}

export default TimerDisplay;