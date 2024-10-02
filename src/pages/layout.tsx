import React from "react";
import Calculator from "../components/calculator";
import { Typography } from "@mui/material";

const Layout = () => {
  return (
    <React.Fragment>
      <Typography variant="h4" align={"center"}>
        React Bayzat - Calculator
      </Typography>
      <Calculator />
    </React.Fragment>
  );
};

export default Layout;
