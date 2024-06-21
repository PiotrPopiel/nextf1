"use client";

import Race from "./Race";
import { useState } from "react";
import type { RaceType } from "@/types";

type RacesListProps = {
  shedule: RaceType[] | undefined;
};

export default function RacesList({ shedule }: RacesListProps) {
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
      {!shedule ? (
        <p className="p-2">No Data...</p>
      ) : (
        shedule.map((race) => {
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
