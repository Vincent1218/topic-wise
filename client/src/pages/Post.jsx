import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Import your other components
import Scores from "../components/Scores";
//... more components

const PostPage = () => {
  const { userId, id } = useParams();

  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [option, setOption] = useState("essay"); // State for selected option

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:8082/api/posts/${userId}/post/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setPost(data);
        } else {
          console.log(data.message);
          navigate("/not-found");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [id, navigate]);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-3 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col p-4 h-min bg-gray-100 rounded">
          <button
            className={`text-left px-4 py-2 mb-2 block w-full rounded 
            ${
              option === "essay"
                ? "bg-indigo-500 text-white"
                : "hover:bg-gray-300"
            }`}
            onClick={() => setOption("essay")}
          >
            Essay
          </button>
          <button
            className={`text-left px-4 py-2 mb-2 block w-full rounded 
            ${
              option === "component1"
                ? "bg-indigo-500 text-white"
                : "hover:bg-gray-300"
            }`}
            onClick={() => setOption("component1")}
          >
            Topic Classification{" "}
          </button>
          <button
            className={`text-left px-4 py-2 mb-2 block w-full rounded 
            ${
              option === "component2"
                ? "bg-indigo-500 text-white"
                : "hover:bg-gray-300"
            }`}
            onClick={() => setOption("component2")}
          >
            Knowledge Graph{" "}
          </button>
          {/* add more buttons for other components */}
        </div>
        {post && (
          <div className="container  col-span-2 mx-auto px-4 py-8">
            <div className="p-6 bg-white rounded shadow-md">
              {option === "essay" && (
                <>
                  <h1 className="text-2xl font-semibold mb-2">{post.title}</h1>
                  <p className="text-gray-700">{post.content}</p>
                  {/* Add any other post details you want to display here */}
                </>
              )}
              {option === "component1" && <Scores />}
              {option === "component2" && <Scores />}
              {/* Render more components based on the selected option */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
