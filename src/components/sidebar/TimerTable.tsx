import React from "react";
import { Solve } from "../../lib";
import { calculateAo5, calculateTimes } from "../../utils";

const TimerTable: React.FC<{ solves: Solve[] }> = ({ solves }) => {
  return (
    <div className="absolute max-[768px]:top-auto max-[768px]:bottom-[11.8vw] top-[13.5rem] left-0 bottom-0 border-orange-200 custom-border bg-orange-300 z-20">
      <div className="max-[768px]:max-h-[13.5rem] overflow-y-auto overflow-x-hidden h-full w-full no-scrollbar touch-pan-y">
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
            {[...solves].reverse().map((solve) => {
              const { seconds, minutes, hundredths } = calculateTimes(solve.time);
              const { seconds: ao5Seconds, minutes: ao5Minutes, hundredths: ao5Hundredths } = calculateTimes(solve.ao5 || 0);

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
                  <td className="text-center leading-10">
                    <div>{solve.ao5 ? `${ao5Minutes > 0 ? `${ao5Minutes}:` : ""}${ao5Seconds.toString().padStart(1, "0")}.${ao5Hundredths.toString().padStart(2, "0")}` : "-"}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimerTable;
