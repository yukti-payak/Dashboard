import React, { useState } from "react";
import "./OrderWindow.css";
import axios from "axios";

const OrderWindow = ({ uid, mode, onClose }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const totalMargin = (stockQuantity * stockPrice).toFixed(2);
  const marginLabel = mode === "BUY" ? "Margin required" : "Margin received";
  const btnClass = mode === "BUY" ? "btn-blue" : "btn-red";
  const windowId = mode === "BUY" ? "buy-window" : "sell-window";

  const handleSubmit = async () => {
    const orderData = {
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode, // "BUY" or "SELL"
      timestamp: new Date().toISOString(),
    };

    try {
      setIsSubmitting(true);
      setError("");
      
      const response = await axios.post("http://localhost:3002/newOrders", orderData);

      console.log("Order submitted successfully:", response.data);

      setShowConfirm(false);
      onClose();
    } catch (err) {
      console.error("Order submission failed:", err);
      setError("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="order-modal-overlay">
      <div className="order-window" id={windowId}>
        <h2>{mode} Order for {uid}</h2>

        <div className="inputs">
          <fieldset>
            <legend>Qty</legend>
            <input
              type="number"
              name="qty"
              min="1"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(Number(e.target.value))}
            />
          </fieldset>
          <fieldset>
            <legend>Price (₹)</legend>
            <input
              type="number"
              name="price"
              step="0.05"
              min="0"
              value={stockPrice}
              onChange={(e) => setStockPrice(Number(e.target.value))}
            />
          </fieldset>
        </div>

        <div className="buttons">
          <span>{marginLabel}: ₹{totalMargin}</span>
          <div className="button-row">
            <button
              className={`btn ${btnClass}`}
              onClick={() => setShowConfirm(true)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : mode}
            </button>
            <button className="btn btn-grey" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {showConfirm && (
          <div className="confirmation-popup">
            <div className="popup-content">
              <p>
                Confirm to <strong>{mode}</strong> {stockQuantity} share(s) of <strong>{uid}</strong> at ₹{stockPrice} each?
              </p>
              <button className="btn btn-green" onClick={handleSubmit} disabled={isSubmitting}>
                Confirm
              </button>
              <button className="btn btn-grey" onClick={() => setShowConfirm(false)} disabled={isSubmitting}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderWindow;
