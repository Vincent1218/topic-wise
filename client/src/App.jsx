import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ErrorBoundary from "./pages/ErrorPage";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
