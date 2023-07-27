import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const PostPage = () => {
  const {userId, id } = useParams();
  
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/posts/${userId}/post/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        // console.log(data)
        if (response.ok) {
          setPost(data);
        } else {
          console.log(data.message);  // log the error message
          navigate('/not-found'); // navigate to a 404 page or a general error page
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
      {post && (
        <div className="container mx-auto px-4 py-8">
          <div className="p-6 bg-white rounded shadow-md">
            <h1 className="text-2xl font-semibold mb-2">{post.title}</h1>
            <p className="text-gray-700">{post.content}</p>
            {/* Add any other post details you want to display here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;
