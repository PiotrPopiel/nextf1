import type { FetchSeasonData, RaceType } from "../types";

const currentYear = new Date().getFullYear().toString();

const fetchSeason = async (
  year = currentYear
): Promise<RaceType[] | undefined> => {
  try {
    const response = await fetch(`https://api.jolpi.ca/ergast/f1/${year}.json`);
    const data: FetchSeasonData = await response.json();

    const races = data.MRData.RaceTable.Races.map((race) => {
      return {
        name: race.raceName,
        id: race.round,
        country: race.Circuit.Location.country,
        date: race.date,
        time: race.time,
        sessions: [
          { ...race.FirstPractice, name: "First Practice" },
          race.SecondPractice
            ? { ...race.SecondPractice, name: "Second Practice" }
            : undefined,
          race.ThirdPractice
            ? { ...race.ThirdPractice, name: "Third Practice" }
            : undefined,
          { ...race.Qualifying, name: "Qualifying" },
          race.SprintQualifying
            ? { ...race.SprintQualifying, name: "Sprint Qualifying" }
            : undefined,
          race.Sprint ? { ...race.Sprint, name: "Sprint" } : undefined,
          { date: race.date, time: race.time, name: "Race" },
        ],
      };
    });

    return races as RaceType[];
  } catch (error) {
    return undefined;
  }
};

export { fetchSeason };
