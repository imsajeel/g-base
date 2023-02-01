import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "100vw",
        height: "100vh",
        // backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
      }}
    >
      <img
        src="https://tbphelps.com/skin/frontend/ultimo/default/images/wating.gif"
        alt="Loading.."
        style={{ width: "80%", maxWidth: "300px" }}
      />
    </div>
  );
};

export default Loading;
