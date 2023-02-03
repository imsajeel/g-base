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
    </div>
  );
};

export default MenuBar;
