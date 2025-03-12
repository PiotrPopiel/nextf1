import type { RaceType } from "@/types";
import SessionsList from "./SessionsList";
import Image from "next/image";
import { DateTime } from "luxon";

type RaceProps = {
  race: RaceType;
  isExpanded: boolean;
  handleExpandedIndex: (index: number) => void;
};

type EventType = React.KeyboardEvent<HTMLDivElement> &
  React.MouseEvent<HTMLDivElement>;

export default function Race({
  race,
  isExpanded,
  handleExpandedIndex,
}: RaceProps) {
  let raceTime;
  if (race.date && race.time) {
    raceTime = DateTime.fromISO(`${race.date}T${race.time}`);
  } else {
    raceTime = null;
  }

  function handleClick(e: EventType) {
    if (e.key === "Enter" || e.type === "click")
      handleExpandedIndex(Number(race.id));
  }

  return (
    <>
      <div
        onClick={handleClick}
        onKeyDown={handleClick}
        tabIndex={+race.id}
        className="w-full flex py-3 px-5 items-center hover:bg-slate-900 justify-between cursor-pointer border-b-[1px] border-slate-900 ">
        <div className="flex items-center gap-5">
          <Image
            src={`/country-flags/${race.country}.svg`}
            alt={race.name}
            width={30}
            height={30}
          />
          <p className="text-sm font-semibold ">{race.name}</p>
        </div>

        <span className="text-xs text-gray-400">
          {raceTime ? raceTime.toFormat("d LLL") : <p>No Date</p>}
        </span>
      </div>
      {isExpanded && <SessionsList race={race} />}
    </>
  );
}
