import { useEffect, useState } from "react";
import { generateScramble } from "react-rubiks-cube-utils";
import Spinner from "../spinner/Spinner";

function Scramble({ solves }: { solves: number }) {
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
    <>
      {isLoading && <Spinner />}
      {errorMsg && <div>Error: {errorMsg}</div>}
      <span className="text-xl">{scramble}</span>
    </>
  );
}

export default Scramble;
