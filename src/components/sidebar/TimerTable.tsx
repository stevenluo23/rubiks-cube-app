import React from "react";
import { Solve } from "../../lib";

const TimerTable: React.FC<{ solves: Solve[] }> = ({ solves }) => {
  return (
    <div className="h-[66svh] overflow-auto">
      <table className="border-solid border-2 w-full table-fixed min-h-10">
        <thead>
          <tr className="border-solid border-2">
            <th colSpan={2}>Solves: {solves.length}</th>
          </tr>
        </thead>
        <tbody>
          {/* Render list of rows using solve # as first data cell, and time for second data cell*/}
          {solves.map((solve) => (
            <tr key={solve.count}>
              <td className="border-solid border-2 text-center leading-10">
                <div className="h-10">{solve.count}</div>
              </td>
              <td className="border-solid border-2 text-center leading-10">
                <div className="h-10">{(solve.time / 1000).toFixed(2)}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimerTable;
