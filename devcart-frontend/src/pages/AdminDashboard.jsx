import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Trash2, Edit3, Package } from "lucide-react";

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const [tools, setTools] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchTools = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/tool");
      const data = await res.json();
      setTools(Array.isArray(data.tools) ? data.tools : []);
      setTotal(data.total || 0);
      setPage(data.page || 1);
      setPages(data.pages || 1);
    } catch (error) {}
  };
  const deleteTool = async (id) => {
    try {
      const res = await fetch(`http://localhost:5050/api/tool/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "Deletion Not Allowed.");
        return;
      }

      setTools((prev) => prev.filter((t) => t._id !== id));
      toast.success("Tool Deleted");
      fetchTools();
    } catch (error) {
      toast.error("Failed to delete tool");
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  if (user?.role !== "admin") return <p>Access Denied</p>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900/20 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-10 text-center flex items-center justify-center gap-2">
          <Package className="h-7 w-7 text-blue-400" /> Admin Dashboard
        </h2>
        <div className="space-y-6">
          {tools.map((tool) => (
            <div
              key={tool._id}
              className="bg-gray-900/80 backdrop-blur-lg border border-gray-800/50 rounded-2xl shadow-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-blue-500/10 hover:shadow-2xl transition"
            >
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">
                  {tool.title}
                </h3>
                <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                  {tool.description}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-end sm:items-center">
                <button
                  onClick={() => deleteTool(tool._id)}
                  className="bg-red-500/20 text-red-400 font-semibold px-4 py-2 rounded-xl shadow hover:bg-red-500/40 transition text-sm flex items-center gap-2 border border-red-400/20 hover:border-red-400/40"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
                <Link
                  to={`/edit/${tool._id}`}
                  className="bg-blue-500/20 text-blue-300 font-semibold px-4 py-2 rounded-xl shadow hover:bg-blue-500/40 transition text-sm flex items-center gap-2 border border-blue-400/20 hover:border-blue-400/40 text-center"
                >
                  <Edit3 className="h-4 w-4" /> Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
