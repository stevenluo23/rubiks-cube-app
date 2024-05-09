import { Solve, Times } from "../../lib";
import { calculateAo5, calculateTimes } from "../../utils";

const Ao5: React.FC<{ solves: Solve[] }> = ({ solves }) => {
  const ao5 = calculateAo5(solves);
  if (!ao5)
    return (
      <div className="text-center text-xl text-blue-600 md:text-2xl">
        ao5: <strong>-</strong>
      </div>
    );

  const formattedAo5: Times = ao5 !== 0 ? calculateTimes(ao5) : { minutes: 0, seconds: 0, hundredths: 0, tenths: 0 };
  return (
    <div className="text-center text-xl text-blue-600 md:text-2xl">
      <p>
        ao5: {formattedAo5.minutes > 0 ? `${formattedAo5.minutes}:` : ""}
        {formattedAo5.seconds}.{formattedAo5.hundredths.toString().padStart(2, "0")}
      </p>
    </div>
  );
};

export default Ao5;
