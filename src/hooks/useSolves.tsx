import { Solve } from "../lib";
import { useLocalStorageState } from "./useLocalStorageState";
import { calculateAo5 } from "../utils";
import { v4 as uuid } from "uuid";

export function useSolves() {
  const [solves, setSolves] = useLocalStorageState<Solve[]>([], "solves");

  const handleAddSolve = (timeMs: number, scramble: string) => {
    setSolves((prevSolves) => {
      const newSolves = [
        ...prevSolves,
        {
          id: uuid(),
          count: prevSolves.length + 1,
          time: timeMs,
          ao5: null,
          scramble: scramble,
          date: new Date(),
        },
      ];

      const ao5 = calculateAo5(newSolves);
      newSolves[newSolves.length - 1].ao5 = ao5;

      return newSolves;
    });
  };

  const handleClearSolves = () => {
    setSolves([]);
  };

  return { solves, setSolves, handleAddSolve, handleClearSolves };
}
