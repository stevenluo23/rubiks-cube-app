import React from "react";
import { Solve } from "../../lib";

const TimerTable: React.FC<{ solves: Solve[] }> = ({ solves }) => {
  return (
    <div className="absolute max-[768px]:top-auto max-[768px]:bottom-[11.8vw] top-[13.5rem] left-0 bottom-0 border-orange-200 custom-border bg-orange-300 z-20">
      <div className="max-[768px]:max-h-[13.5rem] overflow-y-auto h-full w-full no-scrollbar">
        <table className="table-fixed min-w-[13.5rem]">
          <thead>
            <tr>
              <th colSpan={3}>Solves: {solves.length}</th>
            </tr>
            <tr>
              <th>#</th>
              <th>time</th>
              <th>ao5</th>
            </tr>
          </thead>
          <tbody>
            {/* Render list of rows using solve # as first data cell, time for second data cell, and ao5 for third data cell */}
            {[...solves].reverse().map((solve) => (
              <tr key={solve.count}>
                <td className="text-center leading-10">
                  <div>{solve.count}</div>
                </td>
                <td className="text-center leading-10">
                  <div>{(Math.floor(solve.time / 10) / 100).toFixed(2)}</div>
                </td>
                <td className="text-center leading-10">
                  <div>{solve.ao5 ? (Math.floor(solve.ao5 / 10) / 100).toFixed(2) : "-"}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimerTable;
