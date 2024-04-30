import Nav from "./Nav";
import TimerTable from "./TimerTable";
import { Solve } from "../../lib";

const Sidebar = ({ solves }: { solves: Solve[] }) => {
  return (
    <div className="hidden sm:grid grid-rows-3 h-screen w-[200px]">
      <div className="row-span-1 w-inherit">
        <Nav />
      </div>
      <div className="row-span-2">
        <TimerTable solves={solves} />
      </div>
    </div>
  );
};

export default Sidebar;
