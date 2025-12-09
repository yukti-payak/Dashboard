

// import React, { useState } from "react";
// import { Route, Routes } from "react-router-dom";
// import App from './App.jsx'; 


// import Holdings from "./Holdings";
// import Orders from "./Orders";
// import Positions from "./Positions";
// import Summary from "./Summary";
// import WatchList from "./WatchList";
// import { GeneralContextProvider } from "./GeneralContext";
// import "./dashboard.css";



// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="dashboard-wrapper">
     
//       <button 
//         className={`menu-toggle ${isSidebarOpen ? 'open' : ''}`}
//         onClick={toggleSidebar}
//         aria-label="Toggle menu"
//       >
//         <span></span>
//         <span></span>
//         <span></span>
//       </button>

//       {/* Sidebar */}
//       <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
//         <GeneralContextProvider>
//           <WatchList />
//         </GeneralContextProvider>
//       </aside>

//       {/* Overlay */}
//       {isSidebarOpen && (
//         <div 
//           className="sidebar-overlay"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Main Content */}
//       <main className="dashboard-main">
//         <Routes>
//           <Route exact path="/" element={<Summary />} />
//           <Route path="/orders" element={<Orders />} />
//           <Route path="/holdings" element={<Holdings />} />
//           <Route path="/positions" element={<Positions />} />
//           <Route path="/apps" element={<App />} />
//         </Routes>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { GeneralContextProvider } from "./GeneralContext";
import "./dashboard.css";

// Lazy load route components
const App = lazy(() => import('./App.jsx'));
const Holdings = lazy(() => import("./Holdings"));
const Orders = lazy(() => import("./Orders"));
const Positions = lazy(() => import("./Positions"));
const Summary = lazy(() => import("./Summary"));
const WatchList = lazy(() => import("./WatchList"));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    minHeight: '200px'
  }}>
    <div style={{
      fontSize: '18px',
      color: '#666'
    }}>
      Loading...
    </div>
  </div>
);

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-wrapper">
      {/* Menu Toggle Button */}
      <button 
        className={`menu-toggle ${isSidebarOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <GeneralContextProvider>
          <Suspense fallback={<LoadingFallback />}>
            <WatchList />
          </Suspense>
        </GeneralContextProvider>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <main className="dashboard-main">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route exact path="/" element={<Summary />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/apps" element={<App />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default Dashboard;