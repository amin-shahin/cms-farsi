import React from "react";

import "./Header.css";

import { AiOutlineBell } from "react-icons/ai";
import { BsBrightnessHigh } from "react-icons/bs";
const Header = () => {
  return (
    <div className="header">
      
        <div className="header-profile-admin">
          <img src="images/logo192.png" alt="admin" className="admin-img" />
          <div className="information-admin">
            <h4>امین شاهین</h4>
            <small>برنامه نویس فرانت اند</small>
          </div>
        </div>
        
        <div className="header-left">
          <div className="header-search-box">
            <input type="text" placeholder="جستجو کنید..." />
            <button>جستجو</button>
          </div>
          <button className="left-icon-header">
            <AiOutlineBell className="header-icon" />
          </button>
          <button className="left-icon-header">
            <BsBrightnessHigh className="header-icon" />
          </button>
        </div>
  
    </div>
  );
};

export default Header;
