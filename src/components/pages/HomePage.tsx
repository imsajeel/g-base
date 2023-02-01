import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      HomePage
      <br />
      Go to <Link to="login">Login Page</Link>
    </div>
  );
};

export default HomePage;
