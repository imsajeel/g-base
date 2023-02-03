import React from "react";
import { Link } from "react-router-dom";

export const NoMatch = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "2rem",
        }}
      >
        <h1>gBase App</h1>
      </div>
      <h1 style={{ fontSize: "5rem" }}>404!</h1>
      <br />
      <br />
      <p>Page not found or you're not allowed to use this route</p>
      <br />
      <div>
        <Link to={"/"}>Home</Link>
        &nbsp; &nbsp; . &nbsp; &nbsp;
        <Link to={"/login"}>Login</Link>
      </div>
      <div
        style={{
          fontStyle: "italic",
          color: "gray",
          position: "absolute",
          bottom: "2rem",
        }}
      >
        Powered by &nbsp; &nbsp;
        <b>
          <a href="https://sourcecode.build" style={{ color: "gray" }}>
            sourcecode.build
          </a>
        </b>
      </div>
    </div>
  );
};
