import type { RaceType } from "@/types";
import SessionsList from "./SessionsList";
import Image from "next/image";
import { DateTime } from "luxon";

type RaceProps = {
  race: RaceType;
  isExpanded: boolean;
  handleExpandedIndex: (index: number) => void;
};

export default function Race({
  race,
  isExpanded,
  handleExpandedIndex,
}: RaceProps) {
  const raceTime = DateTime.fromISO(`${race.date}T${race.time}`);

  function handleClick() {
    handleExpandedIndex(Number(race.id));
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="w-full flex py-3 px-5 gap-3 items-center justify-between cursor-pointer border-t-[1px] border-slate-900 hover:bg-slate-900 ">
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
          {raceTime.toFormat("d LLL")}
        </span>
      </button>
      {isExpanded && <SessionsList race={race} />}
    </>
  );
}
