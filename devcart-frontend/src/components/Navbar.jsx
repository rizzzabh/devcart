import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";
import { Menu, Package, Bell, Plus, User } from "lucide-react"; // Add this import

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand/Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Package className="h-6 w-6 text-white" />
            </div>
            <Link
              to={user ? "/home" : "/"}
              className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
            >
              DevCart
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/add-tool"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Tool
                </Link>
                <Link
                  to="/my-orders"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
                >
                  My Orders
                </Link>
                {user?.role === "admin" && (
                  <>
                    <Link
                      to="/admin"
                      className="text-blue-400 hover:text-white px-3 py-2 rounded-lg transition-colors"
                    >
                      Admin
                    </Link>
                    <Link
                      to="/admin-orders"
                      className="text-blue-400 hover:text-white px-3 py-2 rounded-lg transition-colors"
                    >
                      Admin Orders
                    </Link>
                  </>
                )}
                <button
                  className="text-gray-300 hover:text-white p-2 rounded-lg transition-colors relative"
                  title="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </button>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user.name?.charAt(0) || <User className="h-4 w-4" />}
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 shadow-sm px-4 pb-4">
          <div className="flex flex-col space-y-3 mt-2">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/add-tool"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <Plus className="h-4 w-4" />
                  Add Tool
                </Link>
                <Link
                  to="/my-orders"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  My Orders
                </Link>
                {user?.role === "admin" && (
                  <>
                    <Link
                      to="/admin"
                      className="text-blue-400 hover:text-white px-3 py-2 rounded-lg transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Admin
                    </Link>
                    <Link
                      to="/admin-orders"
                      className="text-blue-400 hover:text-white px-3 py-2 rounded-lg transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Admin Orders
                    </Link>
                  </>
                )}
                <button
                  className="text-gray-300 hover:text-white p-2 rounded-lg transition-colors relative"
                  title="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </button>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user.name?.charAt(0) || <User className="h-4 w-4" />}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="ml-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
