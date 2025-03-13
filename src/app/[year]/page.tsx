import LoadingSpinner from "@/components/LoadingSpinner";
import Season from "@/components/Season/Season";
import { fetchSeason } from "@/lib/fetchSeason";
import { Suspense } from "react";

type Params = Promise<{ year: string }>;

export default async function YearPage({ params }: { params: Params }) {
  const { year } = await params;
  const seasonPromise = fetchSeason(year);
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Suspense fallback={<LoadingSpinner />}>
        <Season seasonPromise={seasonPromise} />
      </Suspense>
    </main>
  );
}
