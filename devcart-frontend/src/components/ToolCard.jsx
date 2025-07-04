import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";

function ToolCard({ tool, onUpdate }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const isLiked = user && tool.likes.includes(user._id);

  const handleLike = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.info("Please login to like tools");
      return;
    }

    setLoading(true);
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

      onUpdate();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4 shadow">
      <img
        src={tool.image}
        alt={tool.title}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl font-bold mt-2">{tool.title}</h2>
      <p className="text-gray-700">{tool.description}</p>
      <p className="text-sm text-gray-500 mt-1">Price: ₹{tool.price}</p>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm text-gray-500">{tool.tags}</span>

        <button
          type="button"
          disabled={loading}
          onClick={handleLike}
          className={`text-sm px-2 py-1 rounded ${
            isLiked ? "bg-red-100 text-red-500" : "bg-gray-200 text-gray-700"
          }`}
        >
          ❤️ {tool.likes.length}
        </button>
      </div>
    </div>
  );
}

export default ToolCard;
