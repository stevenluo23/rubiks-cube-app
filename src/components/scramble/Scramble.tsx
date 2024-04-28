import { useEffect, useState } from "react";
import {
  applyScramble,
  generateScramble,
  Cube,
  DisplayCube,
} from "react-rubiks-cube-utils";
import Spinner from "../spinner/Spinner";

const Scramble: React.FC<{ solves: number }> = ({ solves }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [scramble, setScramble] = useState<string>("");
  const myCube: Cube = applyScramble({ type: "3x3", scramble: scramble });
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
    <>
      <header className="flex justify-center items-center gap-8 bg-orange-300 h-fit sm:h-[10svh]">
        {isLoading && <Spinner />}
        {errorMsg && <div>Error: {errorMsg}</div>}
        {!isLoading && !errorMsg && (
          <span className="text-xl sm:text-2xl content-center h-full w-fit pl-2 py-2">
            {scramble}
          </span>
        )}
        <h1 className="bg-slate-300 p-3 m-2 rounded-md">
          Solves: <strong>{solves}</strong>
        </h1>
      </header>
      <div className="p-2 rounded-lg bg-slate-300 w-fit h-fit absolute right-0 bottom-0">
        <DisplayCube cube={myCube} size={10} />
      </div>
    </>
  );
};

export default Scramble;
