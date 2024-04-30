import { applyScramble, Cube, DisplayCube } from "react-rubiks-cube-utils";

const Scramble: React.FC<{ scramble: string }> = ({ scramble }) => {
  const myCube: Cube = applyScramble({ type: "3x3", scramble: scramble });

  return (
    <>
      <header className="flex justify-center items-center gap-8 bg-orange-300 h-fit sm:h-[12svh]">
        <span className="flex text-xl sm:text-2xl items-center justify-center h-full w-fit pl-2 py-2">{scramble}</span>
        {/* <h1 className="bg-slate-300 p-3 m-2 rounded-md">
          Solves: <strong>{solves}</strong>
        </h1> */}
      </header>
      <div className="p-2 rounded-lg bg-slate-300 w-fit h-fit fixed right-0 bottom-0 md:block hidden">
        <DisplayCube cube={myCube} size={10} />
      </div>
    </>
  );
};

export default Scramble;
