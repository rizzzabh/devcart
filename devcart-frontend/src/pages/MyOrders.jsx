import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";
import { Package, Calendar, IndianRupee } from "lucide-react";

export default function MyOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5050/api/order/my", {
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
    fetchOrders();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900/20 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-10 text-center flex items-center justify-center gap-2">
          <Package className="h-7 w-7 text-blue-400" /> My Orders
        </h2>
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
            <span className="font-semibold">Loading orders...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <svg
              className="h-10 w-10 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 17L9 21m5.25-4l.75 4m-7.5-8.5A4.5 4.5 0 0112 6.5a4.5 4.5 0 014.5 4.5c0 2.485-2.015 4.5-4.5 4.5s-4.5-2.015-4.5-4.5z"
              />
            </svg>
            <span>No orders found.</span>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-gray-900/80 backdrop-blur-lg border border-gray-800/50 rounded-2xl shadow-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-blue-500/10 hover:shadow-2xl transition"
              >
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-400" />{" "}
                    {order.tool?.title || "Tool"}
                  </h3>
                  <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-300" />
                    Ordered on:{" "}
                    <span className="font-medium text-white">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xl font-bold text-green-400 flex items-center gap-1">
                    <IndianRupee className="h-5 w-5" />
                    {order.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
