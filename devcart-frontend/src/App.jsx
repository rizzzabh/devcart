import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import AddTool from "./pages/AddTool.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  return (
    <Router>
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
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}
