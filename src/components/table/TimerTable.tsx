import React from "react";
import { Solve } from "../../lib";
import SolveRow from "./SolveRow";
import Button from "../button/Button";

const TimerTable: React.FC<{ solves: Solve[]; clearSolves: () => void }> = ({ solves, clearSolves }) => {
  return (
    <div className="custom-border absolute bottom-0 left-0 top-[13.5rem] z-20 space-y-3 border-orange-200 bg-orange-300 max-[768px]:bottom-[11.8vw] max-[768px]:top-auto">
      <Button onClick={clearSolves}>Clear Solves</Button>
      <div
        className={`no-scrollbar ${solves.length === 0 ? "h-auto" : "h-[90%] touch-pan-y overflow-x-hidden overflow-y-scroll overscroll-contain max-[768px]:max-h-[9.5rem]"}`}
      >
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
