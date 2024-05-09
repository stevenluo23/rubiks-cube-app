import React from "react";
import { Solve } from "../../lib";
import { calculateTimes } from "../../utils";

interface SolveRowProps {
  solve: Solve;
  index: number;
  onModalOpen: () => void;
}

const SolveRow: React.FC<SolveRowProps> = ({ solve, onModalOpen, index }) => {
  const { seconds, minutes, hundredths } = calculateTimes(solve.time);
  const { seconds: ao5Seconds, minutes: ao5Minutes, hundredths: ao5Hundredths } = calculateTimes(solve.ao5 || 0);

  // Render row using solve # as first data cell, time for second data cell, and ao5 for third data cell
  return (
    <tr onClick={onModalOpen} className="cursor-pointer hover:bg-slate-300/50">
      <td className="text-center leading-10">
        <div>{index}</div>
      </td>
      <td className="text-center leading-10">
        <div>
          {minutes > 0 ? `${minutes}:${seconds.toString().padStart(2, "0")}.` : `${seconds.toString().padStart(1, "0")}.`}
          {hundredths.toString().padStart(2, "0")}
        </div>
      </td>
      <td className="text-center leading-10 ">
        <div>
          <div>
            {solve.ao5
              ? `${ao5Minutes > 0 ? `${ao5Minutes}:${ao5Seconds.toString().padStart(2, "0")}.` : `${ao5Seconds.toString().padStart(1, "0")}.`}${ao5Hundredths.toString().padStart(2, "0")}`
              : "-"}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default SolveRow;
