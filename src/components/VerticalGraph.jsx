

// import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const VerticalGraph = ({ data }) => {
//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//         position: "top",
//         labels: {
//           font: {
//             size: 14,
//             weight: "600",
//           },
//           padding: 15,
//           usePointStyle: true,
//         },
//       },
//       title: {
//         display: true,
//         text: "Holdings Portfolio Overview",
//         font: {
//           size: 18,
//           weight: "bold",
//         },
//         padding: {
//           top: 10,
//           bottom: 20,
//         },
//       },
//       tooltip: {
//         backgroundColor: "rgba(0, 0, 0, 0.8)",
//         padding: 12,
//         titleFont: {
//           size: 14,
//           weight: "bold",
//         },
//         bodyFont: {
//           size: 13,
//         },
//         callbacks: {
//           label: function (context) {
//             let label = context.dataset.label || "";
//             if (label) {
//               label += ": ";
//             }
//             if (context.parsed.y !== null) {
//               label += "₹" + context.parsed.y.toLocaleString("en-IN");
//             }
//             return label;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           font: {
//             size: 11,
//             weight: "500",
//           },
//           maxRotation: 0,
//           minRotation: 0,
//           autoSkip: false,
//         },
//       },
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: "rgba(0, 0, 0, 0.05)",
//         },
//         ticks: {
//           font: {
//             size: 12,
//           },
//           callback: function (value) {
//             return "₹" + value.toLocaleString("en-IN");
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div style={{ height: "450px", width: "100%", position: "relative" }}>
//       <Bar data={data} options={options} />
//     </div>
//   );
// };


import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const VerticalGraph = ({ data }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const options = {
    indexAxis: isMobile ? 'y' : 'x', // Horizontal on mobile, vertical on desktop
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: isMobile ? 12 : 14,
            weight: "600",
          },
          padding: isMobile ? 10 : 15,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: "Holdings Portfolio Overview",
        font: {
          size: isMobile ? 14 : 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: isMobile ? 15 : 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            const value = isMobile ? context.parsed.x : context.parsed.y;
            if (value !== null) {
              label += "₹" + value.toLocaleString("en-IN");
            }
            return label;
          },
        },
      },
    },
    scales: isMobile ? {
      // Horizontal bars for mobile
      x: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 9,
          },
          callback: function (value) {
            if (value >= 1000) {
              return "₹" + (value / 1000).toFixed(0) + "k";
            }
            return "₹" + value;
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
            weight: "500",
          },
          autoSkip: false,
        },
      },
    } : {
      // Vertical bars for desktop
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            weight: "500",
          },
          maxRotation: 45,
          minRotation: 0,
          autoSkip: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 12,
          },
          callback: function (value) {
            return "₹" + value.toLocaleString("en-IN");
          },
        },
      },
    },
  };

  return (
    <div style={{ 
      height: isMobile ? "600px" : "450px", 
      width: "100%", 
      position: "relative" 
    }}>
      <Bar data={data} options={options} />
    </div>
  );
};

