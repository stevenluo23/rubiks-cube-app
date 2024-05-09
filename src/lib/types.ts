export interface Solve {
  id: string;
  count: number;
  time: number;
  ao5: number | null;
  scramble: string;
  date: Date;
}

export interface Times {
  seconds: number;
  minutes: number;
  hundredths: number;
  tenths: number;
}
