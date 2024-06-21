import RacesList from "./RacesList/RacesList";
import Countdown from "./Countdown/Countdown";
import { SessionInfoProvider } from "@/contexts/SessionInfo";
import { fetchShedule } from "@/lib/fetchShedule";
import calcNextRace from "@/lib/calcNextRace";

export default async function Shedule() {
  const shedule = await fetchShedule();
  const nextRace = calcNextRace(shedule);

  return (
    <div className="w-full flex flex-col items-center gap-20 h-full md:flex-row-reverse md:items-start md:justify-end">
      <SessionInfoProvider>
        <div className="w-full max-w-[640px] md:max-w-full ">
          <Countdown nextRace={nextRace} />
        </div>

        <div className="w-full max-w-[640px] h-full md:max-w-[370px] ">
          <RacesList shedule={shedule} />
        </div>
      </SessionInfoProvider>
    </div>
  );
}
