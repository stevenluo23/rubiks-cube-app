interface DisplayProps {
  seconds: number;
  hundredths: number;
  isKeyDown: boolean;
  wasStopped: boolean;
}

function TimerDisplay({
  seconds,
  hundredths,
  isKeyDown,
  wasStopped,
}: DisplayProps) {
  return (
    <span
      className={`font-lcd select-none
    ${isKeyDown ? "text-green-400" : wasStopped ? "text-red-400" : ""}
  `}
    >
      <span className="text-[15rem]">{seconds}.</span>
      <span className="text-[10rem]">
        {hundredths.toString().padStart(2, "0")}
      </span>
    </span>
  );
}

export default TimerDisplay;
