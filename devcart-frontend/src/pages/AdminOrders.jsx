import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";

export default function AdminOrders() {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5050/api/order", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch orders");
        setOrders(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (user?.role === "admin") {
      fetchAllOrders();
    }
  }, [token, user]);

  if (user?.role !== "admin") return <p>Access Denied</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Orders (Admin)</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border rounded p-4">
              <h3 className="font-semibold">{order.tool?.title || "Tool"}</h3>
              <p>Price: ₹{order.price}</p>
              <p>Buyer: {order.buyer?.name || "Unknown"}</p>
              <p>Ordered on: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}