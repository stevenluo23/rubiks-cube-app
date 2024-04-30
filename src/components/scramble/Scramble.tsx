const Scramble = ({ scramble }: { scramble: string }) => {
  return (
    <header className="flex justify-center items-center gap-8 bg-orange-300 h-fit sm:h-[12svh]">
      <span className="flex text-xl sm:text-2xl items-center justify-center h-full w-fit pl-2 py-2">{scramble}</span>
    </header>
  );
};

export default Scramble;
