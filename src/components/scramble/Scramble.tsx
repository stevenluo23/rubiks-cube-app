import { useEffect, useState } from "react";
import { generateScramble } from "react-rubiks-cube-utils";
import Spinner from "../spinner/Spinner";

const Scramble: React.FC<{ solves: number }> = ({ solves }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [scramble, setScramble] = useState<string>("");

  useEffect(() => {
    function fetchScramble() {
      try {
        setIsLoading(true);
        const scramble = generateScramble({ type: "3x3" });
        setScramble(scramble.toString());
      } catch (err) {
        if (err instanceof Error) {
          setErrorMsg(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchScramble();
  }, [solves]);

  return (
    <header className="flex justify-center items-center gap-8 bg-orange-300 h-[20vh]]">
      {isLoading && <Spinner />}
      {errorMsg && <div>Error: {errorMsg}</div>}
      {!isLoading && !errorMsg && (
        <span className="text-xl pl-2 py-2">{scramble}</span>
      )}
      <h1 className="bg-slate-300 p-3 m-2 rounded-md">
        Solves: <strong>{solves}</strong>
      </h1>
    </header>
  );
};

export default Scramble;
