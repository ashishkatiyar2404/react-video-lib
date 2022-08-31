import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { GiStaticWaves } from "react-icons/gi";
import "./Navbar.css";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <GiStaticWaves />
        </IconButton>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Wave Library
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit">Categories</Button>
          <Button color="inherit">Explore</Button>
          <Link to="/Login" className="link_btn">
            <Button color="inherit">Login</Button>
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
