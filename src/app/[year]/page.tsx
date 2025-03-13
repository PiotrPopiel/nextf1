import LoadingSpinner from "@/components/LoadingSpinner";
import Season from "@/components/Season/Season";
import { fetchSeason } from "@/lib/fetchSeason";
import { Suspense } from "react";

type YearPageProps = {
  params: {
    year: string;
  };
};

export default async function YearPage({ params }: YearPageProps) {
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
