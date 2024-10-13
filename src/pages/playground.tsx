import { Box, Breadcrumbs, Container, Link, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const Playground = () => {
  return (
    <Container maxWidth="lg">
      <Paper sx={{margin: 2, padding: 1}} elevation={2}>
        <Outlet />
      </Paper>
    </Container>
  )

};

export default Playground;
