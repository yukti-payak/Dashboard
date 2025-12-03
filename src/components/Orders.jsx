


import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./Orders.css";

const API_BASE = import.meta.env.VITE_API_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const generalContext = useContext(GeneralContext);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`${API_BASE}/allOrders`);
      setOrders(response.data);
      setShowOrders(true);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (showOrders && generalContext.orderRefreshTrigger > 0) {
      fetchOrders();
    }
  }, [generalContext.orderRefreshTrigger]);

  return (
    <div className="orders">
      {!showOrders ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <button className="btn" onClick={fetchOrders} disabled={loading}>
            {loading ? "Loading..." : "Get started"}
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <div className="orders-list">
          <h2>All Orders</h2>
          {loading ? (
            <div className="loading-container">
              <p>Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <p className="no-data">No orders found</p>
          ) : (
            <div className="table-container">
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
                      <td data-label="Stock">{order.name}</td>
                      <td data-label="Quantity">{order.qty}</td>
                      <td data-label="Price">₹{order.price.toFixed(2)}</td>
                      <td data-label="Mode">
                        <span className={`mode-badge ${order.mode.toLowerCase()}`}>
                          {order.mode}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;

