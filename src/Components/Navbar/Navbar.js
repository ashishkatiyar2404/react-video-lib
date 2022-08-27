import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { GiStaticWaves } from "react-icons/gi";

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
          <Button color="inherit">Login</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
