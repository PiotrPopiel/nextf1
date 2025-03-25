"use client";

import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

type TimerProps = {
  target: DateTime;
};

export default function Timer({ target }: TimerProps) {
  const [[days, hours, minutes, seconds], setDuration] = useState<number[]>([]);

  const now = DateTime.now();
  const diff = target.diff(now, ["days", "hours", "minutes", "seconds"]);

  useEffect(() => {
    let interval = setInterval(() => {
      setDuration([
        diff.days,
        diff.hours,
        diff.minutes,
        Math.floor(diff.seconds),
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, [diff, target]);

  return (
    <>
      {seconds === undefined ? (
        <div className="flex justify-center items-center h-[68px]  md:h-full md:w-full">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-wrap gap-3 justify-center items-center">
          <div className="flex flex-col items-center p-2">
            <h2 className="text-5xl">{days}</h2>
            <p>days</p>
          </div>
          <div className="flex flex-col items-center p-2">
            <h2 className="text-5xl">{hours}</h2>
            <p>hours</p>
          </div>
          <div className="flex flex-col items-center p-2">
            <h2 className="text-5xl">{minutes}</h2>
            <p>minutes</p>
          </div>
          <div className="flex flex-col items-center p-2">
            <h2 className="text-5xl">{seconds}</h2>
            <p>seconds</p>
          </div>
        </div>
      )}
    </>
  );
}
