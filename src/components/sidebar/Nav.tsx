import { Solve } from "../../lib";

function Nav({ setSolves }: { setSolves: React.Dispatch<React.SetStateAction<Solve[]>> }) {
  return (
    <div className="absolute max-[768px]:bottom-0 max-[768px]:left-0 max-[768px]:top-auto max-[768px]:right-0 max-[768px]:w-auto max-[768px]:h-[11.8vw] max-[768px]:text-[2.5vw] bg-red-300 md:w-[14.3rem] md:h-[13.5rem] border-red-200 custom-border z-20">
      <button
        onClick={(e) => {
          setSolves([]);
          e.currentTarget.blur();
        }}
        className="bg-slate-300 p-2 rounded-md select-none hover:bg-slate-200 active:bg-slate-400 transition-colors duration-200 focus:outline-none"
      >
        Clear Solves
      </button>
    </div>
  );
}

export default Nav;
