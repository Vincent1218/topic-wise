import { Link } from "react-router-dom";

export default function EssayCard({ userId, post }) {
  const contentPreview = post.content.slice(0, 150) + "...";
  if(!post.scores) return null;
  const postScores = post.scores.essayMetrics;

  return (
    <Link to={`${userId}/post/${post._id}`}>
      <div className="max-w-md  bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-3">
        <div className="md:flex">
          <div className="md:flex-shrink-0 p-2"></div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {post.title}
            </div>
            <p className="block mt-1 text-lg leading-tight font-medium text-black">
              {contentPreview}
            </p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <div className="mr-3">
                <div>DGI</div>
                <div className="font-bold">{postScores.DGI}</div>
              </div>
              <div className="mr-3">
                <div>DEI</div>
                <div className="font-bold">{postScores.DEI}</div>
              </div>
              <div className="mr-3">
                <div>DII</div>
                <div className="font-bold">{postScores.DII}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
