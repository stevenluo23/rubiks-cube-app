import { Solve } from "../lib";

interface Times {
  seconds: number;
  minutes: number;
  hundredths: number;
  tenths: number;
}

export function calculateAo5(solves: Solve[]): number | null {
  if (solves.length < 5) {
    return null;
  }

  const lastFiveSolves = solves.slice(-5).map((solve) => solve.time);
  const sortedSolves = lastFiveSolves.sort((a, b) => a - b);
  const middleThreeSolves = sortedSolves.slice(1, -1); // Remove fastest and slowest solve
  const sum = middleThreeSolves.reduce((a, b) => a + b, 0);
  const average = sum / middleThreeSolves.length; // Calculate average
  return average;
}

export function calculateTimes(timeMs: number): Times {
  const seconds = Math.floor((timeMs / 1000) % 60);
  const minutes = Math.floor((timeMs / (1000 * 60)) % 60);
  const hundredths = Math.floor((timeMs / 10) % 100);
  const tenths = Math.floor((timeMs / 100) % 10);
  return { seconds, minutes, hundredths, tenths };
}

export function calculateTimeChange(solves: Solve[]): number | null {
  if (solves.length < 2) {
    return null;
  }

  const lastSolve = solves[solves.length - 1];
  const secondToLastSolve = solves[solves.length - 2];
  const timeChange = lastSolve.time - secondToLastSolve.time;
  return timeChange;
}
