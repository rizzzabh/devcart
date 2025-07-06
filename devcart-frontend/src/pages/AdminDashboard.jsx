import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const [tools, setTools] = useState([]);

  const fetchTools = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/tool");
      const data = await res.json();
      setTools(data);
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
    <>
      <div className="max-w-4xl mx-auto mt-6">
        <h2 className="text-2xl font-semibold mb-4"> Admin Dashboard</h2>
        {tools.map((tool) => (
          <div key={tool._id} className="border p-4 mb-2 rounded">
            <h3 className="fond-bold">{tool.title}</h3>
            <p>{tool.description}</p>
            <button
              onClick={() => deleteTool(tool._id)}
              className="text-red-500 text-sm mt-2"
            >
              Delete
            </button>
            <Link
              to={`/edit/${tool._id}`}
              className="text-blue-500 text-sm underline"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
