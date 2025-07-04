import { useEffect, useState } from "react";
import ToolCard from "../components/ToolCard.jsx";
import { toast } from "react-toastify";

export default function Home() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5050/api/tool");
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch");

      setTools(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Explore Developer Tools</h2>
      {loading ? (
        <p>Loading tools...</p>
      ) : tools.length === 0 ? (
        <p>No tools available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool._id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
