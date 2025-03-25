import { useEffect, useState } from "react";
import Result from "./Result";
import type { ResultsType } from "@/types";

type ResultsTableProps = {
  results: ResultsType;
  sessionName: string | undefined;
};

export default function ResultsTable({
  results,
  sessionName,
}: ResultsTableProps) {
  const [width, setWidth] = useState(0);

  let renderedResults = results?.map(
    (result) =>
      result && (
        <Result
          key={result.position}
          result={result}
          width={width}
          sessionName={sessionName}
        />
      )
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    return () =>
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
  }, []);

  console.log(sessionName);

  return (
    <table className="w-full bg-slate-900 border-separate border-spacing-y-1 text-left max-w-[1200px]">
      <caption className="caption-top mb-5 text-xl">
        {sessionName ? sessionName + " " + "Results" : "No Data"}
      </caption>
      <thead>
        <tr className="text-gray-400">
          <th className="px-3 py-1">Pos.</th>
          <th className="px-3 py-1">Driver</th>
          {width > 600 && <th className="px-3 py-1">Team</th>}
          <th className="px-3 py-1">Time</th>
          {results[0].points && <th className="px-3 py-1">Points</th>}
        </tr>
      </thead>
      <tbody className="w-full">{renderedResults}</tbody>
    </table>
  );
}
