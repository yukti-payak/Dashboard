import React, { useState } from "react";
import axios from "axios";
import "./Orders.css";
const API_BASE = import.meta.env.VITE_API_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`${API_BASE}/allOrders`)
      setOrders(response.data);
      setShowOrders(true);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="orders">
      {!showOrders ? (
        <div className="no-orders">
          <button className="btn" onClick={fetchOrders}>
            Get started
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <div className="orders-list">
          <h2>All Orders</h2>
          {loading ? (
            <p>Loading orders...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Mode</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>₹{order.price.toFixed(2)}</td>
                    <td>{order.mode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
