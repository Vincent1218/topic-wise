import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

//components
import UploadFile from "../components/UploadFile";
import Navbar from "../components/Navbar";
import EssayCard from "../components/EssayCard";
const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [uploadedNew, setUploadedNew] = useState(false);
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const response = await fetch("http://localhost:8082/api/verify", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      const { status, user } = data;
      // console.log(data);
      setUsername(user.email);
      setUserId(user._id);
      return status
        ? toast(`Hello ${user.email}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, []);
  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(
        `http://localhost:8082/api/posts/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setUserPosts(data);
    };
    getPosts();
    console.log(userPosts);
  }, [uploadedNew]);

  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };
  return (
    <div>
      <Navbar user={username} onLogout={Logout} />
      <div className="grid grid-cols-3">
        <div className="flex flex-col col-span-2 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="text-2xl font-normal tracking-tight text-gray-900">
            {" "}
            {username}&apos;s Posts
          </h2>
          <div className="flex flex-col">
            {userPosts.map((post) => {
              return <EssayCard key={post._id} post={post} />;
            })}
          </div>
        </div>
        <UploadFile userId={userId} setUploadedNew={setUploadedNew} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
