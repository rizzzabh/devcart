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
import MyOrders from "./pages/MyOrders.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import EditTool from "./pages/EditTool.jsx";
import NotFound from "./pages/NotFound.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";

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
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/admin-orders" element={<AdminOrders />} />
        <Route path="/edit/:id" element={<EditTool />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </Router>
  );
}
