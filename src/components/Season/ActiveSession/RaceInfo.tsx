import Image from "next/image";
import { DateTime } from "luxon";

type RaceInfo = {
  country: string;
  raceName: string;
  raceTime: DateTime;
  sessionName?: string;
};

export default function RaceInfo({
  country,
  raceName,
  raceTime,
  sessionName = "Race",
}: RaceInfo) {
  return (
    <div className="flex flex-col gap-2 font-bold  items-center p-5">
      {country && (
        <Image
          alt={country}
          src={`/country-flags/${country}.svg`}
          width={80}
          height={50}
        />
      )}

      <h1 className="text-3xl mb-2">{raceName}</h1>
      <p className="text-xl">{sessionName}</p>
      {raceTime.isValid && (
        <p className="text-lg">({raceTime.toFormat("cccc t")})</p>
      )}
    </div>
  );
}
