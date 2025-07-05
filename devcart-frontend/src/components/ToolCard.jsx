import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";

function ToolCard({ tool, onUpdate }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [localTool, setLocalTool] = useState(tool);
  const isLiked = user && localTool.likes.includes(user._id);

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

      // Only call onUpdate if you need to sync with parent component
      // onUpdate();
    } catch (err) {
      // Revert optimistic update on error
      setLocalTool(tool);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4 shadow">
      <img
        src={localTool.image}
        alt={localTool.title}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl font-bold mt-2">{localTool.title}</h2>
      <p className="text-gray-700">{localTool.description}</p>
      <p className="text-sm text-gray-500 mt-1">Price: ₹{localTool.price}</p>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm text-gray-500">{localTool.tags}</span>

        <button
          type="button"
          disabled={loading}
          onClick={handleLike}
          className={`text-sm px-2 py-1 rounded border-none cursor-pointer ${
            isLiked ? "bg-red-100 text-red-500" : "bg-gray-200 text-gray-700"
          } ${loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"}`}
        >
          ❤️ {localTool.likes.length}
        </button>
      </div>
    </div>
  );
}

export default ToolCard;
