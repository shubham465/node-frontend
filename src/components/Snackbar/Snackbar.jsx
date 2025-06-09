import React from "react";
import "./Snackbar.css";

const Snackbar = ({ message, visible }) => {
  if (!visible) return null;

  return (
    <div className="snackbar">
      {message}
    </div>
  );
};

export default Snackbar;
