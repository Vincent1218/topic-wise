const postScores = [
  { heading: "DGI", value: 0.5 },
  { heading: "DEI", value: 0.5 },
  { heading: "DII", value: 0.5 },
];

export default function EssayCard({ post }) {
  const contentPreview = post.content.slice(0, 150) + "...";
  return (
    <div className="max-w-md  bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
      <div className="md:flex">
        <div className="md:flex-shrink-0 p-2">
          
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {post.title}
          </div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black">
            {contentPreview}
          </p>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            {postScores.map((score, index) => (
              <div key={index} className="mr-3">
                <div>{score.heading}</div>
                <div className="font-bold">{score.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
