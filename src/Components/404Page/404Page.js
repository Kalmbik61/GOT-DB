import React from "react";
import { Link } from "react-router-dom";
import { CardLink } from "reactstrap";

const errorPage = () => {
  const align = { textAlign: "center", color: "white" };
  const styled = {
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 30 + "px",
    color: "blue",
  };

  return (
    <div style={align}>
      <h1 style={align}>Oups...., Error 404!</h1>
      Please, go to the{" "}
      <Link to="/" style={styled}>
        Home page
      </Link>
      .
    </div>
  );
};

export default errorPage;
