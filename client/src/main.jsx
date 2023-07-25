import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";

import './index.css'

//importing pages
import Signup from './routes/Signup';
import ErrorPage from './error-page';
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
    element: <Signup/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
