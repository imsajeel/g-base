import React from "react";
import { Navigate, Outlet, Route, useLocation } from "react-router-dom";
import convertSearchToObject from "../../utils/convertSearchToObject";
import MenuBar from "../Layout/dashboard/MenuBar";
import TopBar from "../Layout/dashboard/TopBar";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <MenuBar />
      <div className="dashboard-content">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
