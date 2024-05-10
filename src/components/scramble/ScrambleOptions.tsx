import React, { useRef } from "react";
import Button from "../button/Button";

interface ScrambleOptionsProps {
  prevScramble: React.MutableRefObject<string>;
  scramble: string;
  scrambleType: string;
  onNewScrambleType: (newScrambleType: string) => void;
  onNewScramble: (newScramble: string) => void;
  onPrevScramble: () => void;
}

const ScrambleOptions: React.FC<ScrambleOptionsProps> = ({
  prevScramble,
  scramble,
  scrambleType,
  onNewScrambleType,
  onNewScramble,
  onPrevScramble,
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const handleNewScrambleType = (value: string) => {
    onNewScrambleType(value);
    if (selectRef.current) {
      selectRef.current.blur();
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <select ref={selectRef} className="rounded-md" value={scrambleType} onChange={(e) => handleNewScrambleType(e.target.value)}>
        {Array.from({ length: 5 }, (_, i) => i + 2).map((num) => (
          <option value={`${num}x${num}`} key={`${num}x${num}`}>
            {num}x{num}
          </option>
        ))}
      </select>
      <Button onClick={onPrevScramble} disabled={prevScramble.current.toString() === scramble}>
        last
      </Button>
      <Button onClick={() => onNewScramble(scrambleType)}>next</Button>
    </div>
  );
};

export default ScrambleOptions;
