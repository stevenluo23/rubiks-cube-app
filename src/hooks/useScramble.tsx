import { useRef, useState } from "react";
import { generateScramble, Cube, applyScramble } from "react-rubiks-cube-utils";

// possible/usable scrambles: "2x2", "3x3", "4x4", "5x5", "6x6"
const useScramble = (scrambleType: string) => {
  const prevScramble = useRef(generateScramble({ type: scrambleType }).toString());
  const [scramble, setScramble] = useState(prevScramble.current);

  const handleNewScramble = (newScrambleType?: string) => {
    const newScramble = generateScramble({ type: newScrambleType || scrambleType }).toString();
    prevScramble.current = scramble;
    setScramble(newScramble);
  };

  const handlePrevScramble = () => {
    setScramble(prevScramble.current);
  };

  const myCube: Cube = applyScramble({ type: scrambleType, scramble: scramble });

  return { scramble, prevScramble, myCube, handleNewScramble, handlePrevScramble };
};

export default useScramble;
