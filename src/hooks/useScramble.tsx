import { useState } from "react";
import { generateScramble, Cube, applyScramble } from "react-rubiks-cube-utils";

const useScramble = () => {
  const [scramble, setScramble] = useState(generateScramble({ type: "3x3" }).toString());

  const handleNewScramble = () => {
    setScramble(generateScramble({ type: "3x3" }).toString());
  };

  const myCube: Cube = applyScramble({ type: "3x3", scramble: scramble });

  return { scramble, myCube, handleNewScramble };
};

export default useScramble;
