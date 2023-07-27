export default function Scores({ postScores }) {
  if (!postScores) {
    return null;
  }

  const { essayMetrics, paragraphMetrics, disciplineMetrics } = postScores;

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">Topic Classification Scores</h1>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col col-span-2">
          <div className=" border-indigo-400 border-2  p-4 rounded">
            <h2 className="text-xl font-bold">Disciplinary Grounding Index</h2>{" "}
            <p className="my-2">
              Number of unique disciplines = {essayMetrics.numUniqueDisciplines}
            </p>
            <p className="my-2">
              Number of paragraphs = {essayMetrics.numParagraphs}
            </p>
            <p className="my-2">
              {" "}
              DGI = Number of unique disciplines/Number of paragraphs <br></br>{" "}
              = {essayMetrics.DGI}
            </p>
          </div>
          <div className=" border-indigo-400 border-2  p-4 rounded">
            <h2 className="text-xl font-bold">
              Disciplinary Integration Index
            </h2>{" "}
            <p className="my-2">
              Number of paragraphs with more than 1 discipline ={" "}
              {paragraphMetrics.numMultiDisciplinaryParagraphs}
            </p>
            <p className="my-2">
              Number of paragraphs = {essayMetrics.numParagraphs}
            </p>
            <p className="my-2">
              {" "}
              DGI = Number of paragraphs with more than 1 discipline/Number of
              paragraphs<br></br> = {essayMetrics.DII}
            </p>
          </div>
          <div className=" border-indigo-400 border-2  p-4 rounded">
            <h2 className="text-xl font-bold">Disciplinary Evenness Index</h2>
            <h2 className="text-xl font-bold">
              Disciplinary Integration Index
            </h2>{" "}
            <p className="my-2">
              Number of sections labelled by humanities (s1) ={" "}
              {disciplineMetrics.humanities.count}
            </p>
            <p className="my-2">
              Number of sections labelled by business (s2) ={" "}
              {disciplineMetrics.business.count}
            </p>
            <p className="my-2">
              Number of sections labelled by sciences (s1) ={" "}
              {disciplineMetrics.science.count}
            </p>
            <p className="my-2">
              Number of sections labelled by technology (s1) ={" "}
              {disciplineMetrics.technology.count}
            </p>{" "}
            <p className="my-2">
              Sum ofthe sections labelled by all disciplines(sum) ={" "}
              {disciplineMetrics.total}
            </p>
            <p className="my-2">
              {" "}
              DEI = 1-[(s1/sum)^2+ .. + (s4/sum)^2]<br></br> ={" "}
              {essayMetrics.DEI}
            </p>
          </div>
        </div>
        <div>
          <div className="grid grid-rows-3 gap-4">
            <div className="border bg-indigo-200  p-4 rounded">
              <h2 className="text-xl font-bold">DGI</h2>
              <p className=" my-2 "> {essayMetrics.DGI}</p>
            </div>

            <div className="border bg-indigo-200 p-4 rounded">
              <h2 className="text-xl font-bold">DII</h2>

              <p className="my-2">DII: {essayMetrics.DII}</p>
            </div>

            <div className="border bg-indigo-200 p-4 rounded">
              <h2 className="text-xl font-bold">DEI</h2>
              <p className="my-2">DEI: {essayMetrics.DEI}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
