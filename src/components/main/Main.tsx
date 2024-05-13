import { Cube, DisplayCube, applyScramble } from "react-rubiks-cube-utils";
import { useScramble } from "../../hooks/useScramble";
import ScrambleDisplay from "../scramble/ScrambleDisplay";
import ScrambleOptions from "../scramble/ScrambleOptions";
import Timer from "../timer/Timer";
import { Solve } from "../../lib";

interface MainProps {
  solves: Solve[];
  isRunning: boolean;
  onAddSolve: (timeMs: number, scramble: string) => void;
  onToggleSidebar: () => void;
}

const Main: React.FC<MainProps> = ({ solves, isRunning, onAddSolve, onToggleSidebar }) => {
  const { scramble, prevScramble, scrambleType, handleNewScrambleType, handleNewScramble, handlePrevScramble } = useScramble();
  const myCube: Cube = applyScramble({ type: scrambleType, scramble: scramble });

  // Determine if the DisplayCube component should be rendered
  const shouldRenderCube = scrambleType === "2x2" || scrambleType === "3x3";

  const handleAddSolveAndGenerateNewScramble = (timeMs: number) => {
    onAddSolve(timeMs, scramble);
    handleNewScramble();
  };

  return (
    <main>
      <div className={`transition-opacity duration-500 ${isRunning ? "opacity-0" : "opacity-100"}`}>
        <ScrambleDisplay>
          <ScrambleOptions
            scramble={scramble}
            scrambleType={scrambleType}
            prevScramble={prevScramble}
            onNewScrambleType={(newScrambleType: string) => handleNewScrambleType(newScrambleType)}
            onNewScramble={handleNewScramble}
            onPrevScramble={handlePrevScramble}
          />
          <span className="text-xl sm:text-4xl">{scramble}</span>
        </ScrambleDisplay>
        {shouldRenderCube ? (
          <figure className="absolute bottom-0 right-0 z-20 rounded-[0.35rem] border-[0.15rem] border-solid border-slate-200 bg-slate-300 p-[0.3rem] max-lg:bottom-[11.8vw]">
            <DisplayCube cube={myCube} size={6} />
          </figure>
        ) : null}
      </div>
      <Timer solves={solves} addSolve={handleAddSolveAndGenerateNewScramble} toggleSidebar={onToggleSidebar} />
    </main>
  );
};

export default Main;
