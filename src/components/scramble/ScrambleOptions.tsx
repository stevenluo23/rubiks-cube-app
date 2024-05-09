import React from "react";
import Button from "../button/Button";

interface ScrambleOptionsProps {
  prevScramble: React.MutableRefObject<string>;
  scramble: string;
  onNewScramble: () => void;
  onPrevScramble: () => void;
}

const ScrambleOptions: React.FC<ScrambleOptionsProps> = ({ prevScramble, scramble, onNewScramble, onPrevScramble }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button onClick={onPrevScramble} disabled={prevScramble.current.toString() === scramble}>
        last
      </Button>
      <Button onClick={onNewScramble}>next</Button>
    </div>
  );
};

export default ScrambleOptions;
