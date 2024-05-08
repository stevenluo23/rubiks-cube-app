const Scramble = ({ scramble }: { scramble: string }) => {
  return (
    <span className="custom-border absolute left-[14.3rem] right-0 top-0 z-20 border-orange-200 bg-orange-300 text-center text-xl max-[768px]:left-0 md:text-4xl">
      {scramble}
    </span>
  );
};

export default Scramble;
