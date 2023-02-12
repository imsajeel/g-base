import React from "react";
import { Outlet } from "react-router-dom";
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
