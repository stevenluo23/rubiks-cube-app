import { Solve, Times } from "../../lib";
import { calculateTimeChange, calculateTimes } from "../../utils";

const TimeChange: React.FC<{ solves: Solve[] }> = ({ solves }) => {
  const timeChange = calculateTimeChange(solves);
  if (timeChange === null) return null;

  const formattedTimes: Times = timeChange !== 0 ? calculateTimes(Math.abs(timeChange)) : { minutes: 0, seconds: 0, hundredths: 0, tenths: 0 };

  return (
    <p className={`pb-4 lg:pb-8 lg:text-[2em] ${timeChange <= 0 ? "text-green-400" : "text-red-400"}`}>
      ({timeChange > 0 ? "+" : timeChange < 0 ? "-" : ""}
      {formattedTimes.minutes > 0 ? `${formattedTimes.minutes}:` : ""}
      {formattedTimes.seconds}.{formattedTimes.hundredths.toString().padStart(2, "0")})
    </p>
  );
};

export default TimeChange;
