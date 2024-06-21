import type { RaceType } from "@/types";
import Session from "./Session";

type SessionListProps = {
  race: RaceType;
};

export default function SessionList({ race }: SessionListProps) {
  const renderedSessions = race.sessions.map(
    (session, idx) =>
      session && (
        <Session
          key={idx}
          session={session}
          raceName={race.name}
          countryName={race.country}
        />
      )
  );

  return <div className="flex flex-col p-2 w-full">{renderedSessions}</div>;
}
