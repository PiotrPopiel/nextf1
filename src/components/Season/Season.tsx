"use client";

import RacesList from "./RacesList/RacesList";
import { SessionInfoProvider } from "@/contexts/SessionInfo";

import calcNextRace from "@/lib/calcNextRace";
import { RaceType } from "@/types";
import { use } from "react";
import ActiveSession from "./ActiveSession/ActiveSession";

type SeasonProps = {
  seasonPromise: Promise<RaceType[] | undefined>;
};

export default function Season({ seasonPromise }: SeasonProps) {
  const season = use(seasonPromise);

  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-20 h-full md:flex-row-reverse md:items-start md:justify-end">
      <SessionInfoProvider>
        <ActiveSession season={season} />
        <RacesList season={season} />
      </SessionInfoProvider>
    </div>
  );
}
