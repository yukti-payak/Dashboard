


import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const location = useLocation();
  // const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMobileMenuOpen(false);
  };

  // const handleProfileClick = () => {
  //   setIsProfileDropdownOpen(!isProfileDropdownOpen);
  // };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: "/", label: "Dashboard" },
    { path: "/orders", label: "Orders" },
    { path: "/holdings", label: "Holdings" },
    { path: "/positions", label: "Positions" },
    // { path: "/funds", label: "Funds" },
    // { path: "/apps", label: "Apps" },
  ];

  return (
    <div className="menu-container">
      <img src="logo.png" className="logo" alt="Logo" />
      
      <div className={`menus ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={handleMenuClick}
                className={isActive(item.path) ? "menu selected" : "menu"}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        
       
      </div>

      <button 
        className="hamburger-btn" 
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>
  );
};

export default Menu;