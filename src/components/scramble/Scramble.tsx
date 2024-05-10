import React from "react";
import ScrambleOptions from "./ScrambleOptions";

interface ScrambleProps {
  scramble: string;
  scrambleType: string;
  prevScramble: React.MutableRefObject<string>;
  handleScrambleChange: (newScrambleType: string) => void;
  handleNewScramble: (newScramble: string) => void;
  handlePrevScramble: () => void;
}

const Scramble: React.FC<ScrambleProps> = ({ scramble, scrambleType, prevScramble, handleScrambleChange, handleNewScramble, handlePrevScramble }) => {
  return (
    <>
      <ScrambleOptions
        scramble={scramble}
        scrambleType={scrambleType}
        prevScramble={prevScramble}
        onNewScrambleType={handleScrambleChange}
        onNewScramble={(newScramble: string) => handleNewScramble(newScramble)}
        onPrevScramble={handlePrevScramble}
      />
      <span className="text-xl sm:text-4xl">{scramble}</span>
    </>
  );
};

export default Scramble;
