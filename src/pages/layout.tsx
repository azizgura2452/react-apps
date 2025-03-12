import React from "react";
import Calculator from "../components/calculator";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid2, Link, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CalculateIcon from '@mui/icons-material/Calculate';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';

const apps = [
  {
    id: 1,
    name: 'Calculator',
    icon: <CalculateIcon fontSize="large" />,
    description: 'Calculator app with ability to switch between standard and scientific mode',
    route: 'calculator'
  },
  {
    id: 2,
    name: 'Stopwatch Timer',
    icon: <TimelapseIcon fontSize="large" />,
    description: 'Stopwatch timer app',
    route: 'timer'
  },
  {
    id: 3,
    name: 'Datepicker Utility',
    icon: <CalendarMonthIcon fontSize="large" />,
    description: 'Datepicker with ability to select only weekdays and filter out weekends',
    route: 'datepicker'
  },
  {
    id: 4,
    name: 'D3.Js Visualization',
    icon: <BarChartIcon fontSize="large" />,
    description: 'Interactive D3.Js visualization charts',
    route: 'data-visualization'
  }
]

const Layout = () => {
  return (
    <Container maxWidth="lg">
      <Paper sx={{ margin: 2, padding: 3, backgroundColor: '#fff' }} elevation={1}>
        <Grid2 container spacing={2}>
          {
            apps.map(a => {
              return <Grid2 size={4} key={a.id}>
                <Card sx={{ maxWidth: 345, height: '200px', padding: 1 }}>
                  <CardContent sx={{height: '65%'}}>
                    {a.icon}
                      <Typography gutterBottom variant="h5" component="div">
                        {a.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {a.description}
                      </Typography>
                  </CardContent>
                  <CardActions>
                    <Link component={RouterLink} to={`/${a.route}`}>Go to App</Link>
                  </CardActions>
                </Card></Grid2>
            })
          }
        </Grid2>
      </Paper>
    </Container>
  );
};

export default Layout;
