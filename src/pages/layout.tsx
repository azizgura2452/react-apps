import React from "react";
import Calculator from "../components/calculator";
import { Typography } from "@mui/material";

const Layout = () => {
  return (
    <React.Fragment>
      <Typography variant="h3" align={"center"} color="#fff">
        React Bayzat - Calculator
      </Typography>
      <Calculator />
    </React.Fragment>
  );
};

export default Layout;
