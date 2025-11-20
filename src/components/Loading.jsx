import React from "react";
import "./style/Loading.css"; // We'll create this CSS next
import logo from "../assets/loading.png"; // Replace with your logo or any image

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <img src={logo} alt="TOEFL Logo" className="loading-logo" />
      <div className="spinner"></div>
      <p>Loading TOEFL Companion...</p>
    </div>
  );
};

export default Loading;
