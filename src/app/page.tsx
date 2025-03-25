import LoadingSpinner from "@/components/LoadingSpinner";
import Season from "@/components/Season/Season";
import { fetchSeason } from "@/lib/fetchSeason";
import { Suspense } from "react";

export default function Home() {
  const seasonPromise = fetchSeason();

  return (
    <main className="">
      <Suspense fallback={<LoadingSpinner />}>
        <Season seasonPromise={seasonPromise} />
      </Suspense>
    </main>
  );
}
