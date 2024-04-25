import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {}, []);

  return (
    <div className="rounded-3xl bg-slate-400 p-5">
      <span className="text-5xl">44.</span>
      <span className="text-lg">44</span>
    </div>
  );
}

export default App;
