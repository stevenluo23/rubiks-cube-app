interface TimerDashboardProps {
  navComponent: React.ReactNode;
  scrambleComponent: React.ReactNode;
  timerTableComponent: React.ReactNode;
  cubeDisplayComponent: React.ReactNode;
}

const TimerDashboard: React.FC<TimerDashboardProps> = ({ navComponent, scrambleComponent, timerTableComponent, cubeDisplayComponent }) => {
  return (
    <>
      <div className="custom-border absolute z-20 border-red-200 bg-red-300 max-[768px]:bottom-0 max-[768px]:left-0 max-[768px]:right-0 max-[768px]:top-auto max-[768px]:h-[11.8vw] max-[768px]:w-auto max-[768px]:text-[2.5vw] md:h-[13.5rem] md:w-[14.3rem]">
        {navComponent}
      </div>
      {scrambleComponent}
      {timerTableComponent}
      <div className="absolute bottom-0 right-0 z-20 rounded-[0.35rem] border-[0.15rem] border-solid border-slate-200 bg-slate-300 p-[0.3rem] max-[768px]:bottom-[11.8vw]">
        {cubeDisplayComponent}
      </div>
    </>
  );
};

export default TimerDashboard;
