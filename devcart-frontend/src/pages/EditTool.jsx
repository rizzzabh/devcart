import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext.jsx";

export default function EditTool() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch tool details
    const fetchTool = async () => {
      try {
        const res = await fetch(`http://localhost:5050/api/tool/${id}`);
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || "Failed to fetch tool");
        }
        const data = await res.json();
        setForm({
          title: data.title,
          description: data.description,
          price: data.price,
          tags: data.tags,
        });
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchTool();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5050/api/tool/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to update tool");
      }

      const data = await res.json();
      toast.success("Tool updated successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== "admin") {
    return <p className="text-red-500 p-4">Access Denied: Admins Only</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Edit Tool</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
        />
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="w-full p-2 border rounded"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Updating..." : "Update Tool"}
        </button>
      </form>
    </div>
  );
}
