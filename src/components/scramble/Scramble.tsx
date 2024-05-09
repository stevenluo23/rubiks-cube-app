import React from "react";
import ScrambleOptions from "./ScrambleOptions";

interface ScrambleProps {
  scramble: string;
  prevScramble: React.MutableRefObject<string>;
  handleNewScramble: () => void;
  handlePrevScramble: () => void;
}

const Scramble: React.FC<ScrambleProps> = ({ scramble, prevScramble, handleNewScramble, handlePrevScramble }) => {
  return (
    <>
      <ScrambleOptions scramble={scramble} prevScramble={prevScramble} onNewScramble={handleNewScramble} onPrevScramble={handlePrevScramble} />
      <span className="text-xl sm:text-4xl">{scramble}</span>
    </>
  );
};

export default Scramble;
