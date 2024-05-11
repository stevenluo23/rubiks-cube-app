interface SidebarProps {
  navComponent: React.ReactNode;
  timerTableComponent: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ navComponent, timerTableComponent }) => {
  return (
    <>
      <div className="custom-border absolute z-20 border-red-200 bg-red-300 max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:top-auto max-lg:h-[11.8vw] max-lg:w-auto max-lg:text-[2.5vw] lg:h-[13.5rem] lg:w-[14.3rem]">
        {navComponent}
      </div>
      <div className="custom-border absolute bottom-0 left-0 top-[13.5rem] z-20 border-orange-200 bg-orange-300 max-lg:bottom-[11.8vw] max-lg:top-auto">
        {timerTableComponent}
      </div>
    </>
  );
};

export default Sidebar;
