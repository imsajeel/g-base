import React from "react";
import {
  GoFile,
  GoGear,
  GoHistory,
  GoHome,
  GoPerson,
  GoSignOut,
} from "react-icons/go";
import { useNavigate } from "react-router-dom";

const MenuBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="menu-bar">
      <div className="menu-item" onClick={() => navigate("/dashboard")}>
        <GoHome />
      </div>
      <div
        className="menu-item"
        onClick={() => navigate("/dashboard/transactions")}
      >
        <GoFile />
      </div>
      <div className="menu-item">
        <GoHistory />
      </div>
      <div className="menu-item">
        <GoGear />
      </div>
      <div className="menu-item">
        <GoPerson />
      </div>
      <div className="menu-item" onClick={handleLogout}>
        <GoSignOut />
      </div>
    </div>
  );
};

export default MenuBar;
