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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/AuthSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((store) => store.auth);

  const tokens = localStorage.getItem("token");
  console.log(tokens, typeof token);
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <Link to="/" className="wave">
            <GiStaticWaves />
          </Link>
        </IconButton>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Wave Library
        </Typography>
        <Stack direction="row" spacing={2}>
          {/* <Link to="/" className="link_btn">
            <Button color="inherit">Categories</Button>
          </Link> */}
          <Link to="/LandingPage" className="link_btn">
            <Button color="inherit">Explore</Button>
          </Link>
          {/* <Link to="/Login" className="link_btn">
            <Button color="inherit">Login</Button>
          </Link> */}
          {tokens === null ? (
            <Link to="/Login" className="link_btn">
              <Button color="inherit">Login</Button>
            </Link>
          ) : (
            <Link to="/" className="link_btn">
              <Button
                color="inherit"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                LogOut
              </Button>
            </Link>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
