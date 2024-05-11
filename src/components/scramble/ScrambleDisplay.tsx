const ScrambleDisplay: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="custom-border absolute left-[14.3rem] right-0 top-0 z-20 border-orange-200 bg-orange-300 text-center max-lg:left-0 md:text-4xl">
      {children}
    </div>
  );
};

export default ScrambleDisplay;
