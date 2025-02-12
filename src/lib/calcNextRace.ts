import { RaceType } from "@/types";
import { DateTime } from "luxon";

export default function calcNextRace(season: RaceType[] | undefined) {
  const now = DateTime.now().toString();

  if (season) {
    const nextRaces = season.filter((race) => {
      const raceDate = `${race.date}T${race.time}`;
      if (now < raceDate) {
        return race;
      }
    });
    return nextRaces[0];
  }
}
