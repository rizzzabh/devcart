import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import {
  User,
  Settings,
  LogOut,
  UserCheck,
  Crown,
  Mail,
  Calendar,
} from "lucide-react";

export default function UserDropdown() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300); // Increased delay to 300ms
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    setIsOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold hover:scale-110 transition-transform duration-200 cursor-pointer">
        {user.name?.charAt(0) || <User className="h-4 w-4" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-xl border border-gray-800/50 rounded-xl shadow-2xl z-50 transform transition-all duration-200 ease-out">
          {/* User Info Header */}
          <div className="p-4 border-b border-gray-800/50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                {user.name?.charAt(0) || <User className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm">
                  {user.name}
                </h3>
                <p className="text-gray-400 text-xs">{user.email}</p>
                <div className="flex items-center mt-1">
                  {user.role === "admin" ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border border-yellow-500/30">
                      <Crown className="h-3 w-3 mr-1" />
                      Admin
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30">
                      <UserCheck className="h-3 w-3 mr-1" />
                      User
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* User Stats */}
          <div className="p-4 border-b border-gray-800/50">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-white font-bold text-lg">0</div>
                <div className="text-gray-400 text-xs">Orders</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-lg">0</div>
                <div className="text-gray-400 text-xs">Tools</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <button
              onClick={() => {
                navigate("/profile");
                setIsOpen(false);
              }}
              className="w-full flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors text-sm"
            >
              <User className="h-4 w-4 mr-3" />
              Profile
            </button>

            <button
              onClick={() => {
                navigate("/settings");
                setIsOpen(false);
              }}
              className="w-full flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors text-sm"
            >
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </button>

            <button
              onClick={() => {
                navigate("/my-orders");
                setIsOpen(false);
              }}
              className="w-full flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors text-sm"
            >
              <Calendar className="h-4 w-4 mr-3" />
              My Orders
            </button>

            {user.role === "admin" && (
              <button
                onClick={() => {
                  navigate("/admin");
                  setIsOpen(false);
                }}
                className="w-full flex items-center px-3 py-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors text-sm"
              >
                <Crown className="h-4 w-4 mr-3" />
                Admin Dashboard
              </button>
            )}
          </div>

          {/* Logout Section */}
          <div className="p-2 border-t border-gray-800/50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </button>
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-800/50">
            <p className="text-gray-500 text-xs text-center">
              Member since {formatDate(user.createdAt || new Date())}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
