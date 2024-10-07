import React from "react";
import Calculator from "../components/calculator";
import { Stack, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <React.Fragment>
      <Typography variant="h3" align={"center"} color="#fff">
        React Apps - Aziz
      </Typography>
      <Stack direction={'column'}>
        <Link to={'/'}>Home</Link>
        <Link to={'/playground'}>Playground</Link>
      </Stack>
      
      <Outlet />
    </React.Fragment>
  );
};

export default Layout;
