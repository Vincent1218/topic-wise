// import { useLoaderData } from "react-router-dom";
// import UploadFile from "../components/UploadFile";
// export default function Dashboard({userId}) {
//   const userPosts = useLoaderData();
//   return (
//     <div>
  
//   );
// }
// export async function loader() {
//   const userID = "64bfaa2fa6cbfb1884946975";
//   const response = await fetch(`http://localhost:8082/api/posts/${userID}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Headers":
//         "Content-Type, Access-Control-Allow-Headers, X-Requested-With, Authorization",
//     },
//   });
//   const userPosts = await response.json();
//   return userPosts;
// }
