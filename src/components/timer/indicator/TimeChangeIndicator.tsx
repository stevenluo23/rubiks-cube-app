interface TimeChangeIndicatorProps {
  timeChange: number | null;
  formattedTimes: {
    minutes: number;
    seconds: number;
    hundredths: number;
  };
}

const TimeChangeIndicator: React.FC<TimeChangeIndicatorProps> = ({ timeChange, formattedTimes }) => {
  if (!timeChange) {
    return null;
  }

  return (
    <p className={`pb-4 md:pb-8 md:text-[2em] ${timeChange > 0 ? "text-red-400" : "text-green-400"}`}>
      ({timeChange > 0 ? "+" : "-"}
      {formattedTimes.minutes > 0 ? `${formattedTimes.minutes}:` : ""}
      {formattedTimes.seconds}.{formattedTimes.hundredths.toString().padStart(2, "0")})
    </p>
  );
};

export default TimeChangeIndicator;
