"use client";
import { use } from "react";

import ResultsTable from "./ResultsTable";

type ResultsProps = {
  resultsPromise: Promise<any[] | undefined>;
  sessionName: string | undefined;
};

export default function Results({ resultsPromise, sessionName }: ResultsProps) {
  const results = use(resultsPromise);

  console.log(results);

  return (
    <>
      {results === undefined ? (
        <p className="p-2 text-center text-xl">No Data...</p>
      ) : (
        <ResultsTable results={results} sessionName={sessionName} />
      )}
    </>
  );
}
