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
    <>
      {!season ? (
        <p className="p-2">No Data...</p>
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
    </>
  );
}
