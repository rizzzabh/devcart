import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";
import { Heart, Star, ShoppingCart, User } from "lucide-react";

function ToolCard({ tool, onUpdate }) {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [localTool, setLocalTool] = useState(tool);
  const isLiked = user && localTool.likes.includes(user._id);

  const handleBuy = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ toolId: tool._id, price: tool.price }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Purchase failed");
      toast.success("Tool purchased!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.info("Please login to like tools");
      return;
    }

    setLoading(true);

    const updatedLikes = isLiked
      ? localTool.likes.filter((id) => id !== user._id)
      : [...localTool.likes, user._id];

    setLocalTool((prev) => ({
      ...prev,
      likes: updatedLikes,
    }));

    try {
      const res = await fetch(
        `http://localhost:5050/api/tool/like/${tool._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to toggle like");
      // onUpdate && onUpdate();
    } catch (err) {
      setLocalTool(tool);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // For demo: fallback for missing fields
  const rating = tool.rating || 4.8;
  const reviews = tool.reviews || 0;
  const author = tool.author || "Unknown";
  const badge = tool.badge;
  const originalPrice = tool.originalPrice;
  const category = Array.isArray(localTool.tags)
    ? localTool.tags[0]
    : localTool.tags || "Tool";

  return (
    <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={localTool.image || "/placeholder.png"}
          alt={localTool.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badge */}
        {badge && (
          <div
            className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${
              badge === "Popular"
                ? "bg-orange-500 text-white"
                : badge === "New"
                ? "bg-green-500 text-white"
                : badge === "Trending"
                ? "bg-purple-500 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            {badge}
          </div>
        )}

        {/* Like Button */}
        <button
          onClick={handleLike}
          disabled={loading}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            isLiked
              ? "bg-red-500/20 text-red-400 border border-red-400/30"
              : "bg-gray-900/40 text-gray-300 hover:text-red-400 border border-gray-600/30 hover:border-red-400/30"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
        </button>

        {/* Discount Badge */}
        {originalPrice && (
          <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
            SAVE ₹{(originalPrice - localTool.price).toFixed(2)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
              {localTool.title}
            </h3>
            <p className="text-sm text-blue-400 font-medium">{category}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {localTool.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-white font-medium">{rating}</span>
            <span className="text-gray-500">({reviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400">{localTool.likes.length}</span>
          </div>
        </div>

        {/* Author */}
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
            {author.charAt(0)}
          </div>
          <span className="text-gray-400 text-sm">by {author}</span>
        </div>

        {/* Price and Purchase */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">
              ₹{localTool.price}
            </span>
            {originalPrice && (
              <span className="text-gray-500 line-through text-sm">
                ₹{originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={handleBuy}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToolCard;
