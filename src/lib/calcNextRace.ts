import { RaceType } from "@/types";
import { DateTime } from "luxon";

export default function calcNextRace(shedule: RaceType[] | undefined) {
  const now = DateTime.now().toString();

  if (shedule) {
    const nextRaces = shedule.filter((race) => {
      const raceDate = `${race.date}T${race.time}`;
      if (now < raceDate) {
        return race;
      }
    });
    return nextRaces[0];
  }
}
