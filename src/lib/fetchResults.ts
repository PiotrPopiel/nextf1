// let sessionType = "results";
//"sprint" "qualifying" "results"
// let year = "2024";
// let raceName = "United States Grand Prix";

type fetchResultsProps = {
  year: string;
  raceName: string;
  sessionType: string | undefined;
};

const fetchResults = async ({
  year,
  raceName,
  sessionType,
}: fetchResultsProps) => {
  if (sessionType) {
    try {
      const response = await fetch(
        `https://api.jolpi.ca/ergast/f1/${year}/${sessionType}/`
      );
      const data = await response.json();

      let allData = [];

      allData.push(...data.MRData.RaceTable.Races);

      let limit = +data.MRData.limit;
      let offset = +data.MRData.offset + 30;
      const total = +data.MRData.total;

      while (offset < total) {
        try {
          const response = await fetch(
            `https://api.jolpi.ca/ergast/f1/${year}/${sessionType}/?offset=${offset}`
          );
          const data = await response.json();
          allData = [...allData, ...data.MRData.RaceTable.Races];
          offset += limit;
        } catch (err) {
          console.log(err);
        }
      }

      console.log(offset);

      let resultsArr = allData
        .filter((session) => {
          if (session.raceName === raceName) {
            return session;
          }
        })
        .map((session) => {
          return (
            session.Results ||
            session.QualifyingResults ||
            session.SprintResults
          );
        });

      if (resultsArr.length < 2) {
        let results = [...resultsArr[0]];

        return results;
      } else {
        let results = [...resultsArr[0], ...resultsArr[1]];

        return results;
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    return undefined;
  }
};

export { fetchResults };
