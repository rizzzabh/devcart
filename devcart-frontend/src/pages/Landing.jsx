import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import Footer from "../components/Footer.jsx";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900/20 px-4">
        <div className="max-w-2xl w-full text-center py-20 bg-gray-900/80 backdrop-blur-lg border border-gray-800/50 rounded-2xl shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
              <Package className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-4 drop-shadow-sm">
            Welcome to DevCart
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-10 font-medium">
            Discover, share, and purchase the best developer tools in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold shadow transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white rounded-xl text-lg font-semibold shadow transition"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
