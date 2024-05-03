import React from "react";
import { Solve } from "../../../lib";
import { calculateTimes } from "../../../utils";

const SolveRow: React.FC<{ solve: Solve }> = ({ solve }) => {
  const { seconds, minutes, hundredths } = calculateTimes(solve.time);
  const { seconds: ao5Seconds, minutes: ao5Minutes, hundredths: ao5Hundredths } = calculateTimes(solve.ao5 || 0);

  // Render row using solve # as first data cell, time for second data cell, and ao5 for third data cell
  return (
    <tr key={solve.count}>
      <td className="text-center leading-10">
        <div>{solve.count}</div>
      </td>
      <td className="text-center leading-10">
        <div>
          {minutes > 0 ? `${minutes}:` : ""}
          {seconds.toString().padStart(1, "0")}.{hundredths.toString().padStart(2, "0")}
        </div>
      </td>
      <td className="text-center leading-10 ">
        <div>
          {solve.ao5
            ? `${ao5Minutes > 0 ? `${ao5Minutes}:` : ""}${ao5Seconds.toString().padStart(1, "0")}.${ao5Hundredths.toString().padStart(2, "0")}`
            : "-"}
        </div>
      </td>
    </tr>
  );
};

export default SolveRow;
