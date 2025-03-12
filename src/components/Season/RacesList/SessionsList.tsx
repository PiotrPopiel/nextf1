import type { RaceType } from "@/types";
import Session from "./Session";

type SessionListProps = {
  race: RaceType;
};

export default function SessionList({ race }: SessionListProps) {
  const renderedSessions = race.sessions.map(
    (session) =>
      session && (
        <Session
          key={session.name}
          tabIdx={+race.id + 0.1}
          session={session}
          raceName={race.name}
          countryName={race.country}
        />
      )
  );

  return <div className="p-2">{renderedSessions}</div>;
}
