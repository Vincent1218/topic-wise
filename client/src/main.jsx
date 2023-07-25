import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";

import "./index.css";

//importing pages
import Signup from "./routes/Signup";
import ErrorPage from "./error-page";
import Dashboard from "./routes/Dashboard";

//import loaders
import { loader as postLoader } from "./routes/Dashboard";
import Login from "./routes/Login";

const userId = "64bfaa2fa6cbfb1884946975";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard userId={userId} />,
    loader: postLoader,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
