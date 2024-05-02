import { Solve } from "../../lib";

function Nav({ setSolves }: { setSolves: React.Dispatch<React.SetStateAction<Solve[]>> }) {
  return (
    <div className="custom-border absolute z-20 border-red-200 bg-red-300 max-[768px]:bottom-0 max-[768px]:left-0 max-[768px]:right-0 max-[768px]:top-auto max-[768px]:h-[11.8vw] max-[768px]:w-auto max-[768px]:text-[2.5vw] md:h-[13.5rem] md:w-[14.3rem]">
      <button
        onClick={(e) => {
          setSolves([]);
          e.currentTarget.blur();
        }}
        className="select-none rounded-md bg-slate-300 p-2 transition-colors duration-200 hover:bg-slate-200 focus:outline-none active:bg-slate-400"
      >
        Clear Solves
      </button>
    </div>
  );
}

export default Nav;
