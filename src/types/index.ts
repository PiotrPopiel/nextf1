export type RaceType = {
  name: string;
  id: string;
  country: string;
  date: string;
  time: string;
  sessions: SessionType[];
};

export type SessionType =
  | {
      name: string;
      date: string;
      time: string;
    }
  | undefined;

export type FetchRace = {
  raceName: string;
  round: string;
  Circuit: {
    Location: {
      country: string;
    };
  };
  date: string;
  time: string;
  FirstPractice: {};
  SecondPractice: {};
  ThirdPractice: {};
  Qualifying?: {};
  SprintQualifying?: {};
  Sprint?: {};
};

export type FetchSeasonData = {
  MRData: {
    RaceTable: {
      Races: FetchRace[];
    };
  };
};
