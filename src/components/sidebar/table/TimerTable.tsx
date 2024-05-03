import React from "react";
import SolveRow from "./SolveRow";
import { Solve } from "../../../lib";

const TimerTable: React.FC<{ solves: Solve[] }> = ({ solves }) => {
  return (
    <div className="custom-border absolute bottom-0 left-0 top-[13.5rem] z-20 border-orange-200 bg-orange-300 max-[768px]:bottom-[11.8vw] max-[768px]:top-auto">
      <div className="no-scrollbar h-full touch-pan-y overflow-y-auto overflow-x-hidden max-[768px]:max-h-[10.7rem]">
        <table className="w-full max-w-[13.5rem] table-fixed">
          <thead>
            <tr>
              <th colSpan={3}>Solves: {solves.length}</th>
            </tr>
            <tr>
              <th className="text-blue-600">#</th>
              <th className="text-blue-600">time</th>
              <th className="text-blue-600">ao5</th>
            </tr>
          </thead>
          <tbody>
            {[...solves].reverse().map((solve) => (
              <SolveRow key={solve.count} solve={solve} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimerTable;