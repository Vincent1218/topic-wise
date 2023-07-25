import { useLoaderData } from "react-router-dom";
export default function Dashboard() {
  const userPosts = useLoaderData();
  return (
    <div>
      <h1>Dashboard</h1>
      <h2> Your Posts</h2>
      {userPosts.map((post) => {
        return (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        );
      })}
    </div>
  );
}
export async function loader() {
  const userID = "64bfaa2fa6cbfb1884946975";
  const response = await fetch(`http://localhost:8082/api/posts/${userID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers":
        "Content-Type, Access-Control-Allow-Headers, X-Requested-With, Authorization",
    },
  });
  const userPosts = await response.json();
  return userPosts;
}
