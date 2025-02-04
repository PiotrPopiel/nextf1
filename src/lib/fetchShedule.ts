import type { FetchRacesData, RaceType } from "../types";

const currentYear = new Date().getFullYear().toString();

const fetchShedule = async (
  year = currentYear
): Promise<RaceType[] | undefined> => {
  try {
    const response = await fetch(
      `https://api.jolpi.ca/ergast/f1/${year}.json`,
      {
        cache: "no-store",
      }
    );
    const data: FetchRacesData = await response.json();

    const races = data.MRData.RaceTable.Races.map((race) => {
      return {
        name: race.raceName,
        id: race.round,
        country: race.Circuit.Location.country,
        date: race.date,
        time: race.time,
        sessions: [
          { ...race.FirstPractice, name: "First Practice" },
          { ...race.SecondPractice, name: "Second Practice" },
          race.ThirdPractice
            ? { ...race.ThirdPractice, name: "Third Practice" }
            : undefined,
          { ...race.Qualifying, name: "Qualifying" },
          race.Sprint ? { ...race.Sprint, name: "Sprint" } : undefined,
          { date: race.date, time: race.time, name: "Race" },
        ],
      };
    });
    console.log(races[1].sessions);

    return races as RaceType[];
  } catch (error) {
    return undefined;
  }
};

export { fetchShedule };
