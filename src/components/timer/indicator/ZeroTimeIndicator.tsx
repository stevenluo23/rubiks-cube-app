import { Solve } from "../../../lib";

interface ZeroTimeIndicatorProps {
  solves: Solve[];
  timeChange: number | null;
}

const ZeroTimeIndicator: React.FC<ZeroTimeIndicatorProps> = ({ solves, timeChange }) => {
  if (solves.length <= 1) {
    return null;
  }

  return <p className={`pb-4 md:pb-8 md:text-[2em] ${timeChange && timeChange > 0 ? "text-red-400" : "text-green-400"}`}>(0.00)</p>;
};

export default ZeroTimeIndicator;
