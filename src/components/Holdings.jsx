


import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import "./holdings.css";

const API_BASE = import.meta.env.VITE_API_URL;

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE}/allHoldings`)
      .then((res) => {
        console.log(res.data);
        setAllHoldings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const labels = allHoldings.map((stock) => stock.name);

  // Create color array based on profit/loss
  const backgroundColors = allHoldings.map((stock) => {
    const curValue = stock.price * stock.qty;
    const pl = curValue - stock.avg * stock.qty;
    return pl >= 0
      ? "rgba(40, 167, 69, 0.7)" // Green for profit
      : "rgba(220, 53, 69, 0.7)"; // Red for loss
  });

  const borderColors = allHoldings.map((stock) => {
    const curValue = stock.price * stock.qty;
    const pl = curValue - stock.avg * stock.qty;
    return pl >= 0
      ? "rgba(40, 167, 69, 1)" // Solid green
      : "rgba(220, 53, 69, 1)"; // Solid red
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Current Value",
        data: allHoldings.map((stock) => (stock.price * stock.qty).toFixed(2)),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  // Calculate totals
  const totalInvestment = allHoldings.reduce(
    (sum, stock) => sum + stock.avg * stock.qty,
    0
  );
  const currentValue = allHoldings.reduce(
    (sum, stock) => sum + stock.price * stock.qty,
    0
  );
  const totalPL = currentValue - totalInvestment;
  const plPercentage =
    totalInvestment > 0 ? ((totalPL / totalInvestment) * 100).toFixed(2) : 0;

  if (loading) {
    return <div className="loading">Loading holdings...</div>;
  }

  return (
    <div className="holdings-container">
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      {/* Desktop Table View */}
      <div className="table-container desktop-view">
        <table className="holdings-table">
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const pl = curValue - stock.avg * stock.qty;
              const isProfit = pl >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td className="stock-name">{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>₹{stock.avg.toFixed(2)}</td>
                  <td>₹{stock.price.toFixed(2)}</td>
                  <td>₹{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {pl >= 0 ? "+" : ""}₹{pl.toFixed(2)}
                  </td>
                  <td className={profClass}>
                    {parseFloat(stock.net) >= 0 ? "+" : ""}
                    {stock.net}
                  </td>
                  <td className={dayClass}>
                    {parseFloat(stock.day) >= 0 ? "+" : ""}
                    {stock.day}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="mobile-view">
        <div className="holdings-cards">
          {allHoldings.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const pl = curValue - stock.avg * stock.qty;
            const isProfit = pl >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <div key={index} className="holding-card">
                <div className="card-header">
                  <h4 className="stock-name">{stock.name}</h4>
                  <span className={`pl-badge ${profClass}`}>
                    {pl >= 0 ? "+" : ""}
                    {pl.toFixed(2)}
                  </span>
                </div>

                <div className="card-body">
                  <div className="card-row">
                    <div className="card-item">
                      <span className="label">Qty</span>
                      <span className="value">{stock.qty}</span>
                    </div>
                    <div className="card-item">
                      <span className="label">Avg Cost</span>
                      <span className="value">{stock.avg.toFixed(2)}</span>
                    </div>
                    <div className="card-item">
                      <span className="label">LTP</span>
                      <span className="value">{stock.price.toFixed(2)}</span>
                    </div>
                    <div className="card-item">
                      <span className="label">Current Value</span>
                      <span className="value">{curValue.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="footer-item">
                      <span className="label">Net chg.</span>
                      <span className={`value ${profClass}`}>{stock.net}</span>
                    </div>
                    <div className="footer-item">
                      <span className="label">Day chg.</span>
                      <span className={`value ${dayClass}`}>{stock.day}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Section - Now visible on all screens */}
      <div className="summary-section">
        <div className="summary-row">
          <div className="summary-col">
            <h5>
              {totalInvestment.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </h5>
            <p>Total investment</p>
          </div>
          <div className="summary-col">
            <h5>
              {currentValue.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </h5>
            <p>Current value</p>
          </div>
          <div className="summary-col">
            <h5 className={totalPL >= 0 ? "profit" : "loss"}>
              {totalPL >= 0 ? "+" : ""}
              {totalPL.toFixed(2)} ({totalPL >= 0 ? "+" : ""}
              {plPercentage}%)
            </h5>
            <p>P&L</p>
          </div>
        </div>
      </div>

      {/* Chart Section - Now visible on all screens */}
      <div className="chart-section">
        <VerticalGraph data={data} />
      </div>
    </div>
  );
};

export default Holdings;