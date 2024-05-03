import { Solve } from "../../lib";
import Button from "../button/Button";

const Nav = ({ setSolves }: { setSolves: React.Dispatch<React.SetStateAction<Solve[]>> }) => {
  return (
    <div className="custom-border absolute z-20 border-red-200 bg-red-300 max-[768px]:bottom-0 max-[768px]:left-0 max-[768px]:right-0 max-[768px]:top-auto max-[768px]:h-[11.8vw] max-[768px]:w-auto max-[768px]:text-[2.5vw] md:h-[13.5rem] md:w-[14.3rem]">
      <Button
        onClick={() => {
          setSolves([]);
        }}
      >
        Clear Solves
      </Button>
    </div>
  );
};

export default Nav;
