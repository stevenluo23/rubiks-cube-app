import { useRef, useState } from "react";
import { generateScramble, Cube, applyScramble } from "react-rubiks-cube-utils";

const useScramble = () => {
  const prevScramble = useRef(generateScramble({ type: "3x3" }).toString());
  const [scramble, setScramble] = useState(prevScramble.current);

  const handleNewScramble = () => {
    const newScramble = generateScramble({ type: "3x3" }).toString();
    prevScramble.current = scramble;
    setScramble(newScramble);
  };

  const handlePrevScramble = () => {
    setScramble(prevScramble.current);
  };

  const myCube: Cube = applyScramble({ type: "3x3", scramble: scramble });

  return { scramble, prevScramble, myCube, handleNewScramble, handlePrevScramble };
};

export default useScramble;
