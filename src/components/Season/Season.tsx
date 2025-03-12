import RacesList from "./RacesList/RacesList";
import Timer from "./Timer/Timer";
import { SessionInfoProvider } from "@/contexts/SessionInfo";

import calcNextRace from "@/lib/calcNextRace";
import { RaceType } from "@/types";
import { use } from "react";

type SeasonProps = {
  seasonPromise: Promise<RaceType[] | undefined>;
};

export default function Season({ seasonPromise }: SeasonProps) {
  const season = use(seasonPromise);
  const nextRace = calcNextRace(season);

  return (
    <div className="w-full flex flex-col items-center gap-20 h-full md:flex-row-reverse md:items-start md:justify-end">
      <SessionInfoProvider>
        <Timer nextRace={nextRace} />
        <RacesList season={season} />
      </SessionInfoProvider>
    </div>
  );
}
