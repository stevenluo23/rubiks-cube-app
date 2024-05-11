import { useRef, useState } from "react";
import { generateScramble } from "react-rubiks-cube-utils";
import { useLocalStorageState } from "./useLocalStorageState";
// possible/usable scrambles: "2x2", "3x3", "4x4", "5x5", "6x6"
export function useScramble() {
  const [scrambleType, setScrambleType] = useLocalStorageState<string>("3x3", "scrambleType");
  const prevScramble = useRef(generateScramble({ type: scrambleType }).toString());
  const [scramble, setScramble] = useState(prevScramble.current);

  const handleNewScrambleType = (newScrambleType: string) => {
    setScrambleType(newScrambleType);
    handleNewScramble(newScrambleType);
  };

  const handleNewScramble = (newScrambleType?: string) => {
    const newScramble = generateScramble({ type: newScrambleType || scrambleType }).toString();
    prevScramble.current = scramble;
    setScramble(newScramble);
  };

  const handlePrevScramble = () => {
    setScramble(prevScramble.current);
  };

  return { scramble, prevScramble, scrambleType, handleNewScrambleType, handleNewScramble, handlePrevScramble };
}
