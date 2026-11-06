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

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1976d2", zIndex: 1100 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: { xs: 1, sm: 2 } }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton size="medium" edge="start" color="inherit" aria-label="Wave Library Home" component={Link} to="/">
            <GiStaticWaves className="wave" size={28} />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.5px",
              color: "white",
              textDecoration: "none",
              fontSize: { xs: "1.15rem", sm: "1.5rem" },
            }}
          >
            Wave Library
          </Typography>
        </Stack>

        <Stack direction="row" spacing={{ xs: 1, sm: 2 }} alignItems="center">
          <Link to="/LandingPage" className="link_btn">
            <Button
              color="inherit"
              variant="outlined"
              size="small"
              sx={{ borderColor: "rgba(255,255,255,0.6)", color: "white", textTransform: "none", borderRadius: "8px" }}
            >
              Explore
            </Button>
          </Link>
          {token === null ? (
            <Link to="/Login" className="link_btn">
              <Button
                color="inherit"
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "white",
                  color: "#1976d2",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#f3f4f6" },
                }}
              >
                Login
              </Button>
            </Link>
          ) : (
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                dispatch(logout());
              }}
              sx={{ color: "white", textTransform: "none" }}
            >
              Logout
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
