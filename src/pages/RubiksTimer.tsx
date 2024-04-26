import { useState } from "react";
import Timer from "../components/timer/Timer";
import Scramble from "../components/scramble/Scramble";

function RubiksTimer() {
  const [solves, setSolves] = useState<number>(0);
  return (
    <div className="flex select-none flex-col h-screen w-screen">
      <Scramble solves={solves} />
      <Timer
        solves={solves}
        onSolve={() => setSolves((solves) => solves + 1)}
      />
    </div>
  );
}

export default RubiksTimer;
