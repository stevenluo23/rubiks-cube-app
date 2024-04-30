function TimerTable() {
  return (
    <table className="border-solid border-2 w-full table-fixed">
      <thead>
        <tr className="border-solid border-2">
          <th colSpan={2}>Solves: X</th>
        </tr>
      </thead>
      <tbody>
        {/* Render list of rows using solve # as first data cell, and time for second data cell*/}
        <tr>
          <td className="border-solid border-2">Solve #</td>
          <td className="border-solid border-2">1.00</td>
        </tr>
        <tr>
          <td className="border-solid border-2">Solve #</td>
          <td className="border-solid border-2">1.00</td>
        </tr>
        <tr>
          <td className="border-solid border-2">Solve #</td>
          <td className="border-solid border-2">1.00</td>
        </tr>
        <tr>
          <td className="border-solid border-2">Solve #</td>
          <td className="border-solid border-2">1.00</td>
        </tr>
        <tr>
          <td className="border-solid border-2">Solve #</td>
          <td className="border-solid border-2">1.00</td>
        </tr>
        <tr>
          <td className="border-solid border-2">Solve #</td>
          <td className="border-solid border-2">1.00</td>
        </tr>
      </tbody>
    </table>
  );
}

export default TimerTable;
