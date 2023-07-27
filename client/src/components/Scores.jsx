import React from "react";

export default function Scores({ postScores }) {
  if (!postScores) {
    return null;
  }

  const { essayMetrics, paragraphMetrics, disciplineMetrics } = postScores;

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">Topic Classification Scores</h1>
      <div className="grid grid-cols-3 gap-2">
        <div className="grid grid-rows-3 gap-4 col-span-2">
          <div className=" border-indigo-400 border-2  p-4 rounded">
            <h2 className="text-xl font-bold">Disciplinary Grounding Index</h2>{" "}
          </div>
          <div className=" border-indigo-400 border-2  p-4 rounded">
            <h2 className="text-xl font-bold">
              Disciplinary Integration Index
            </h2>
          </div>
          <div className=" border-indigo-400 border-2  p-4 rounded">
            <h2 className="text-xl font-bold">Disciplinary Evenness Index</h2>
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
