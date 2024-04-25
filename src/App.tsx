import { useState } from "react";
import Timer from "./components/timer/Timer";
import Scramble from "./components/scramble/Scramble";

function App() {
  const [solves, setSolves] = useState<number>(0);
  return (
    <>
      <div className="flex justify-center items-center gap-4 bg-orange-300 p-2">
        <Scramble solves={solves} />
        <h1 className="bg-slate-300 p-3 rounded-md">
          Solves: <strong>{solves}</strong>
        </h1>
      </div>
      <div className="flex items-center justify-around flex-col">
        <Timer onSolve={() => setSolves((solves) => solves + 1)} />
        <span className="text-xl text-center">
          Press <strong>Spacebar</strong> to start the timer and{" "}
          <strong>Any key</strong> to stop it
        </span>
      </div>
    </>
  );
}

export default App;
