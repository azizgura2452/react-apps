import React from 'react'
import { AppBar, Box, Breadcrumbs, Container, IconButton, Link, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        React Apps - Aziz Gura
                    </Typography>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        React Apps - Aziz Gura
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link component={RouterLink} underline="hover" color="inherit" to="/">
                            Home
                        </Link>
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;