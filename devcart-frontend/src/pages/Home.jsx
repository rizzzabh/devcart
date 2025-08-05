import { useEffect, useState } from "react";
import ToolCard from "../components/ToolCard.jsx";
import { toast } from "react-toastify";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import Footer from "../components/Footer.jsx";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [showAllTags, setShowAllTags] = useState(false);

  // Popular tags to prioritize
  const popularTags = [
    'JavaScript', 'React', 'Node.js', 'Python', 
    'CSS', 'Git', 'Docker', 'AWS', 'TypeScript', 'Vue'
  ];

  // Fetch tags from backend
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/tool/tags");
        if (!res.ok) throw new Error("Failed to load tags");
        const data = await res.json();
        
        // Sort tags: popular ones first, then others
        const popularOnes = data.filter(tag => popularTags.includes(tag));
        const others = data.filter(tag => !popularTags.includes(tag));
        setTags([...popularOnes, ...others]);
      } catch (err) {
        // Fallback to popular tags if API fails
        setTags(popularTags);
        toast.error(err.message || "Failed to load tags");
      }
    };
    fetchTags();
  }, []);

  // Fetch tools based on search, selected tag, and page
  const fetchTools = async () => {
    try {
      setLoading(true);
      let url = `http://localhost:5050/api/tool?search=${encodeURIComponent(
        searchTerm
      )}&page=${page}`;
      if (selectedTag) url += `&tag=${encodeURIComponent(selectedTag)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch");
      setTools(data.tools);
      setPages(data.pages || 1);
    } catch (err) {
      toast.error(err.message || "Failed to fetch tools");
    } finally {
      setLoading(false);
    }
  };

  // Debounce search and tag filtering, reset to page 1 on search/tag change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedTag]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchTools();
    }, 500);
    return () => clearTimeout(delayDebounce);
    // eslint-disable-next-line
  }, [searchTerm, selectedTag, page]);

  // Calculate how many tags to show
  const maxVisibleTags = 8;
  const visibleTags = showAllTags ? tags : tags.slice(0, maxVisibleTags);
  const hasMoreTags = tags.length > maxVisibleTags;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900/20">
      <div className="flex-1 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-4 text-center drop-shadow-sm">
              Explore Developer Tools
            </h2>
            <p className="text-gray-400 text-lg text-center mb-8">
              Find the perfect tools to boost your development workflow
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 justify-center">
              <div className="relative w-full sm:w-96 group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search for tools, categories, or authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>
            
            {/* Improved Tag Display */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center mb-3">
                {tags.length === 0 ? (
                  <span className="text-gray-400 italic">No tags found</span>
                ) : (
                  visibleTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() =>
                        setSelectedTag(tag === selectedTag ? "" : tag)
                      }
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedTag === tag
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                          : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50"
                      }`}
                    >
                      {tag}
                    </button>
                  ))
                )}
              </div>
              
              {/* Show More/Less Button */}
              {hasMoreTags && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowAllTags(!showAllTags)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600/50 transition-all"
                  >
                    {showAllTags ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Show {tags.length - maxVisibleTags} More Tags
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="min-h-[200px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-40 text-blue-400">
                <svg
                  className="animate-spin h-8 w-8 mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                <span className="font-semibold">Loading tools...</span>
              </div>
            ) : tools.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No tools found
                </h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search terms or filters
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedTag("");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {tools.map((tool) => (
                    <ToolCard
                      key={tool._id}
                      tool={tool}
                      onUpdate={fetchTools}
                    />
                  ))}
                </div>
                <div className="flex justify-center mt-8 space-x-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-lg border-2 border-blue-900 bg-gray-900 text-blue-200 font-semibold transition disabled:opacity-50 hover:bg-blue-900/40"
                  >
                    Prev
                  </button>
                  {[...Array(pages)].map((_, idx) => (
                    <button
                      key={idx + 1}
                      onClick={() => setPage(idx + 1)}
                      className={`px-4 py-2 rounded-lg border-2 font-semibold transition ${
                        page === idx + 1
                          ? "bg-blue-600 text-white border-blue-600 shadow"
                          : "bg-gray-900 text-blue-200 border-blue-900 hover:bg-blue-900/40"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(pages, p + 1))}
                    disabled={page === pages}
                    className="px-4 py-2 rounded-lg border-2 border-blue-900 bg-gray-900 text-blue-200 font-semibold transition disabled:opacity-50 hover:bg-blue-900/40"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
