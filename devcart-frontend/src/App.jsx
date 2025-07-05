import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import AddTool from "./pages/AddTool.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Landing from "./pages/Landing.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function AppContent() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/add-tool"
          element={
            <PrivateRoute>
              <AddTool />
            </PrivateRoute>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddTool />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
