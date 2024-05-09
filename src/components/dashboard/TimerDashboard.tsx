interface TimerDashboardProps {
  navComponent: React.ReactNode;
  scrambleComponent: React.ReactNode;
  timerTableComponent: React.ReactNode;
  cubeDisplayComponent: React.ReactNode;
}

const TimerDashboard: React.FC<TimerDashboardProps> = ({ navComponent, scrambleComponent, timerTableComponent, cubeDisplayComponent }) => {
  return (
    <>
      <div className="custom-border absolute z-20 border-red-200 bg-red-300 max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:top-auto max-lg:h-[11.8vw] max-lg:w-auto max-lg:text-[2.5vw] md:h-[13.5rem] md:w-[14.3rem]">
        {navComponent}
      </div>
      <div className="custom-border absolute left-[14.3rem] right-0 top-0 z-20 border-orange-200 bg-orange-300 text-center max-lg:left-0 md:text-4xl">
        {scrambleComponent}
      </div>
      <div className="custom-border absolute bottom-0 left-0 top-[13.5rem] z-20 border-orange-200 bg-orange-300 max-lg:bottom-[11.8vw] max-lg:top-auto">
        {timerTableComponent}
      </div>
      <div className="absolute bottom-0 right-0 z-20 rounded-[0.35rem] border-[0.15rem] border-solid border-slate-200 bg-slate-300 p-[0.3rem] max-lg:bottom-[11.8vw]">
        {cubeDisplayComponent}
      </div>
    </>
  );
};

export default TimerDashboard;
