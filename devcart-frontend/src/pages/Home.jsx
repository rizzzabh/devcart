import { useEffect, useState } from "react";
import ToolCard from "../components/ToolCard.jsx";
import { toast } from "react-toastify";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);

  // Fetch tags from backend
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/tool/tags");
        if (!res.ok) throw new Error("Failed to load tags");
        const data = await res.json();
        setTags(data);
      } catch (err) {
        toast.error(err.message || "Failed to load tags");
      }
    };
    fetchTags();
  }, []);

  // Fetch tools based on search and selected tag
  const fetchTools = async () => {
    try {
      setLoading(true);
      let url = `http://localhost:5050/api/tool?search=${encodeURIComponent(
        searchTerm
      )}`;
      if (selectedTag) url += `&tag=${encodeURIComponent(selectedTag)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch");
      setTools(data);
    } catch (err) {
      toast.error(err.message || "Failed to fetch tools");
    } finally {
      setLoading(false);
    }
  };

  // Debounce search and tag filtering
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchTools();
    }, 500);
    return () => clearTimeout(delayDebounce);
    // eslint-disable-next-line
  }, [searchTerm, selectedTag]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Explore Developer Tools</h2>
      <input
        type="text"
        placeholder="Search tools..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border mb-4"
      />
      <div className="mb-4 flex flex-wrap">
        {tags.length === 0 ? (
          <span className="text-gray-500">No tags found</span>
        ) : (
          tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? "" : tag)}
              className={`px-3 py-1 border rounded-full mr-2 mb-2 ${
                selectedTag === tag ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              {tag}
            </button>
          ))
        )}
      </div>
      {loading ? (
        <p>Loading tools...</p>
      ) : tools.length === 0 ? (
        <p>No tools available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool._id} tool={tool} onUpdate={fetchTools} />
          ))}
        </div>
      )}
    </div>
  );
}
