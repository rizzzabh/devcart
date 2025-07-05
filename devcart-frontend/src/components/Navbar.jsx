import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="p-4 border-b flex justify-between">
      <Link to={user ? "/home" : "/"}>Home</Link>
      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
            <Link to="/add-tool" className="px-3">
              Add Tool
            </Link>
            {user?.role === "admin" && (
              <Link to="/admin" className="text-blue-500">
                Admin
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
