import React from "react";
import { Solve } from "../../lib";

const TimerTable: React.FC<{ solves: Solve[] }> = ({ solves }) => {
  return (
    <div className="h-[66svh] overflow-auto no-scrollbar">
      <table className="w-full table-fixed min-h-10">
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
                <div className="h-10">{solve.count}</div>
              </td>
              <td className="text-center leading-10">
                <div className="h-10">{(Math.floor(solve.time / 10) / 100).toFixed(2)}</div>
              </td>
              <td className="text-center leading-10">
                <div className="h-10">{solve.ao5 ? (Math.floor(solve.ao5 / 10) / 100).toFixed(2) : "-"}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimerTable;
