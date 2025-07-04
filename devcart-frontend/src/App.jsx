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

function AppContent() {
  const location = useLocation();
  // Hide Navbar on login and register pages
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
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
