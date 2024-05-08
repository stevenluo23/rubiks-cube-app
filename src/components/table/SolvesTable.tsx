import React from "react";
import { Solve } from "../../lib";
import SolveRow from "./SolveRow";

interface SolvesTableProps {
  solves: Solve[];
  onModalOpen: (solve: Solve) => void;
}

const SolvesTable: React.FC<SolvesTableProps> = ({ solves, onModalOpen }) => (
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
      {[...solves].reverse().map((solve, idx, self) => (
        <SolveRow key={idx} index={self.length - idx} solve={solve} onModalOpen={() => onModalOpen(solve)} />
      ))}
    </tbody>
  </table>
);

export default SolvesTable;
