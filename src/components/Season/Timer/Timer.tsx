"use client";

import { useSessionInfo } from "@/contexts/SessionInfo";
import { RaceType } from "@/types";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import RaceInfo from "./RaceInfo";
import { revalidatePath } from "next/cache";
import LoadingSpinner from "@/components/LoadingSpinner";

type TimerProps = {
  nextRace: RaceType | undefined;
};

export default function Timer({ nextRace }: TimerProps) {
  const { sessionInfo } = useSessionInfo();
  const { sessionName, sessionDate, raceName, countryName } = sessionInfo;
  const [[days, hours, minutes, seconds], setDuration] = useState<
    [
      number | undefined,
      number | undefined,
      number | undefined,
      number | undefined
    ]
  >([undefined, undefined, undefined, undefined]);

  const now = DateTime.now();
  const target = sessionDate
    ? DateTime.fromISO(sessionDate)
    : DateTime.fromISO(`${nextRace?.date}T${nextRace?.time}`);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = target
        .diff(now, ["days", "hours", "minutes", "seconds"])
        .normalize()
        .toObject();

      setDuration([
        diff.days,
        diff.hours,
        diff.minutes,
        diff.seconds && Math.floor(diff.seconds),
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, [now, target]);

  return (
    <div className="w-full max-w-[640px] md:max-w-full ">
      {sessionName === "" && nextRace ? (
        <RaceInfo
          country={nextRace.country}
          raceName={nextRace.name}
          raceTime={target}
        />
      ) : (
        <RaceInfo
          country={countryName}
          raceName={raceName}
          raceTime={target}
          sessionName={sessionName}
        />
      )}
      {seconds === undefined ? (
        <div className="flex justify-center items-center h-[88px] w-[640px] md:h-full md:w-full">
          <LoadingSpinner />
        </div>
      ) : seconds <= 0 ? (
        <div className="flex justify-center items-center p-4">
          <h1 className="text-3xl underline">Session Finished</h1>
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
    </div>
  );
}
