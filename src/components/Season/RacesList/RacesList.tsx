"use client";

import Race from "./Race";
import { useState } from "react";
import type { RaceType } from "@/types";

type RacesListProps = {
  season: RaceType[] | undefined;
};

export default function RacesList({ season }: RacesListProps) {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleExpandedIndex = (index: number) => {
    if (index === expandedIndex) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <ul className="w-full max-w-[640px] md:max-w-[370px]">
      {!season ? (
        <div className="w-full flex justify-center">
          <p className="p-2 text-xl">No Data...</p>
        </div>
      ) : (
        season.map((race) => {
          const isExpanded = Number(race.id) === expandedIndex;

          return (
            <Race
              key={race.id}
              race={race}
              handleExpandedIndex={handleExpandedIndex}
              isExpanded={isExpanded}
            />
          );
        })
      )}
    </ul>
  );
}
