import React, { useState, useContext, useEffect } from "react";
import { GoPerson } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalState";
import "./TopBar.css";

const TopBar = () => {
  const [showUserBox, setShowUserBox] = useState(false);

  const { logOutUser, user, site, resetSite } = useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="top-bar">
      <div className="site-name">{site.name}</div>
      <div className="user-box">
        <div className="user-box-button" onClick={() => setShowUserBox(true)}>
          <GoPerson />
        </div>
        <div
          className="model-back"
          style={{ display: showUserBox ? "block" : "none" }}
          onClick={() => setShowUserBox(false)}
        ></div>
        <div
          className="user-box-menu"
          style={{ display: showUserBox ? "block" : "none" }}
        >
          <li>User: {user?.username}</li>
          <hr />
          <li>User Settings</li>
          <li
            onClick={() => {
              if (logOutUser) {
                logOutUser();
                navigate("/login");
              }
            }}
          >
            Sign Out
          </li>
          <li
            onClick={() => {
              if (resetSite) {
                resetSite();
                navigate("/login");
              }
            }}
          >
            Site Reset
          </li>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
