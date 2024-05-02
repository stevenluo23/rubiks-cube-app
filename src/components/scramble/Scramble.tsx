import React from "react";

const Scramble = ({ scramble }: { scramble: string }) => {
  return <span className="absolute max-[768px]:left-0 left-[14.3rem] top-0 right-0 bg-orange-300 text-xl md:text-4xl text-center border-orange-200 custom-border z-20">{scramble}</span>;
};

export default Scramble;
