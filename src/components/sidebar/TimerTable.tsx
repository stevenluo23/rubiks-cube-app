import React from "react";
import { Solve } from "../../lib";
import { calculateTimes } from "../../utils";

const TimerTable: React.FC<{ solves: Solve[] }> = ({ solves }) => {
  return (
    <div className="custom-border absolute bottom-0 left-0 top-[13.5rem] z-20 border-orange-200 bg-orange-300 max-[768px]:bottom-[11.8vw] max-[768px]:top-auto">
      <div className="no-scrollbar h-full w-full touch-pan-y overflow-y-auto overflow-x-hidden max-[768px]:max-h-[13.5rem]">
        <table className="min-w-[13.5rem] table-fixed">
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
                    <div>
                      {solve.ao5
                        ? `${ao5Minutes > 0 ? `${ao5Minutes}:` : ""}${ao5Seconds.toString().padStart(1, "0")}.${ao5Hundredths.toString().padStart(2, "0")}`
                        : "-"}
                    </div>
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
