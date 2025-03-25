"use client";

import teamColors from "@/lib/teamColors";
import type { ResultType } from "@/types";

type ResultProps = {
  result: ResultType;
  width: number;
  sessionName: string | undefined;
};

export default function Result({ result, width, sessionName }: ResultProps) {
  const { Constructor, Driver, position, Time, points } = result;

  const color = Constructor.constructorId;

  let renderTime;
  if (sessionName === "Qualifying") {
    result.Q3
      ? (renderTime = `Q3:  ${result.Q3}`)
      : result.Q2
      ? (renderTime = `Q2:  ${result.Q2}`)
      : result.Q1
      ? (renderTime = `Q1:  ${result.Q1}`)
      : (renderTime = "DNF");
  } else {
    Time ? (renderTime = `${Time.time}s`) : (renderTime = "DNF");
  }

  return (
    <tr
      className={`${teamColors[color]} bg-radial-[at_65%_30%] from-slate-950 from-60% w-full hover:from-50% `}>
      <td className="py-3 px-4 font-bold">{position}.</td>
      <td className="py-3 px-4 font-bold text-sm">
        {width > 400
          ? Driver.givenName.slice(0, 1) + ". " + Driver.familyName
          : Driver.code}
      </td>
      {width > 600 && (
        <td className="py-3 px-4 text-sm text-gray-200">{Constructor.name}</td>
      )}
      <td className="py-3 px-4 font-bold text-sm">{renderTime}</td>
      {result.points && <td className="py-3 px-4 font-bold">{points}</td>}
    </tr>
  );
}
