export interface TimerProps {
  setSolves: React.Dispatch<React.SetStateAction<Solve[]>>;
  solves: Solve[];
  setScramble: React.Dispatch<React.SetStateAction<string>>;
  scramble: string;
  timeMs: number;
  setTimeMs: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Solve {
  count: number;
  time: number;
  ao5: number | null;
  scramble: string;
  date: Date;
}
