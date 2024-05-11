import React, { useRef, useEffect } from "react";
import Button from "../button/Button";

interface ScrambleOptionsProps {
  scramble: string;
  scrambleType: string;
  prevScramble: React.MutableRefObject<string>;
  onNewScrambleType: (newScrambleType: string) => void;
  onNewScramble: () => void;
  onPrevScramble: () => void;
}

const ScrambleOptions: React.FC<ScrambleOptionsProps> = ({
  scramble,
  scrambleType,
  prevScramble,
  onNewScrambleType,
  onNewScramble,
  onPrevScramble,
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const prevScrambleTypeRef = useRef(scrambleType);

  useEffect(() => {
    prevScrambleTypeRef.current = scrambleType;
  }, [scrambleType]);

  const handleScrambleChange = (newScrambleType: string) => {
    onNewScrambleType(newScrambleType);
    if (selectRef.current) {
      selectRef.current.blur();
    }
  };

  const isLastButtonDisabled = prevScramble.current.toString() === scramble || scrambleType !== prevScrambleTypeRef.current;

  return (
    <div className="flex items-center justify-center gap-4">
      <label htmlFor="scrambleTypeSelect" className="sr-only">
        Scramble Type
      </label>
      <select
        id="scrambleTypeSelect"
        ref={selectRef}
        className="rounded-md"
        value={scrambleType}
        onChange={(e) => handleScrambleChange(e.target.value)}
        aria-label="Select Scramble Type"
      >
        {Array.from({ length: 5 }, (_, i) => i + 2).map((num) => (
          <option value={`${num}x${num}`} key={`${num}x${num}`}>
            {num}x{num}
          </option>
        ))}
      </select>
      <Button onClick={onPrevScramble} disabled={isLastButtonDisabled}>
        last
      </Button>
      <Button onClick={() => onNewScramble()}>next</Button>
    </div>
  );
};

export default ScrambleOptions;
