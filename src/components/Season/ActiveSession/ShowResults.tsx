import LoadingSpinner from "@/components/LoadingSpinner";
import { fetchResults } from "@/lib/fetchResults";
import { Suspense, use } from "react";
import Results from "./Results";

type ShowResultsProps = {
  raceName: string;
  sessionDate: string;
  sessionName: string;
};

export default function ShowResults({
  raceName,
  sessionDate,
  sessionName,
}: ShowResultsProps) {
  let sessionType;

  if (sessionName === "Race") {
    sessionType = "results";
  } else if (sessionName === "Qualifying") {
    sessionType = "qualifying";
  } else if (sessionName === "Sprint") {
    sessionType = "sprint";
  } else {
    sessionType = undefined;
  }

  const year = String(new Date(sessionDate).getFullYear());
  const resultsPromise = fetchResults({ year, raceName, sessionType });

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Results resultsPromise={resultsPromise} sessionName={sessionName} />
    </Suspense>
  );
}
