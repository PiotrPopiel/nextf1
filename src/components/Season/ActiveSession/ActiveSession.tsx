"use client";

import { useSessionInfo } from "@/contexts/SessionInfo";
import { RaceType } from "@/types";
import RaceInfo from "./RaceInfo";
import { DateTime } from "luxon";
import Timer from "./Timer";
import calcNextRace from "@/lib/calcNextRace";
import ShowResults from "./ShowResults";

type ActiveSessionProps = {
  season: RaceType[] | undefined;
};

export default function ActiveSession({ season }: ActiveSessionProps) {
  const nextRace = calcNextRace(season);
  const { sessionInfo } = useSessionInfo();
  const { sessionName, sessionDate, raceName, countryName } = sessionInfo;

  const target = sessionDate
    ? DateTime.fromISO(sessionDate)
    : DateTime.fromISO(`${nextRace?.date}T${nextRace?.time}`);

  const now = DateTime.now();
  const diff = target.diff(now, ["days", "hours", "minutes", "seconds"]);

  return (
    <div className="w-full max-w-[640px] md:max-w-full flex flex-col gap-10 items-center p-2">
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
      {diff.seconds && diff.seconds < 0 ? (
        <ShowResults
          raceName={raceName}
          sessionDate={sessionDate}
          sessionName={sessionName}
        />
      ) : (
        <Timer target={target} />
      )}
    </div>
  );
}
