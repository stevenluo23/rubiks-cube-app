import { Solve } from "../lib";

interface Times {
  seconds: number;
  minutes: number;
  hundredths: number;
  tenths: number;
}

export function calculateAo5(solves: Solve[], timeMs: number): number | null {
  if (solves.length >= 4) {
    const lastFiveSolves = [...solves.slice(-4).map((solve) => solve.time), timeMs];
    const sortedSolves = lastFiveSolves.sort((a, b) => a - b);
    const ao5Solves = sortedSolves.slice(1, -1); // Remove fastest and slowest solve
    return ao5Solves.reduce((a, b) => a + b, 0) / ao5Solves.length; // Calculate average
  }
  return null;
}

export function calculateTimes(timeMs: number): Times {
  const seconds = Math.floor((timeMs / 1000) % 60);
  const minutes = Math.floor((timeMs / (1000 * 60)) % 60);
  const hundredths = Math.floor((timeMs / 10) % 100);
  const tenths = Math.floor((timeMs / 100) % 10);
  return { seconds, minutes, hundredths, tenths };
}
