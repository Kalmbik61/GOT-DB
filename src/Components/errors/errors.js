import React from "react";
import img from "./error.jpg";

const ErrorMsg = () => {
  return (
    <>
      <span className="font-weight-bold" style={{ color: "#fff" }}>
        Somethins goes wrong
      </span>
      <img src={img} style={{ width: 100 + "%" }} alt="error" />
    </>
  );
};

export default ErrorMsg;
