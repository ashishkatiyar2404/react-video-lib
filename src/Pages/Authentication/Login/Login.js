import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  userLogin,
  clearAuthError,
  selectAuthLoading,
  selectAuthError,
  selectIsAuthenticated,
} from "../../../Store/AuthSlice";
import "./Login.css";

const GUEST_CREDENTIALS = {
  email: "ashishkatiyar@gmail.com",
  password: "ashish@123",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Return to previous route if redirected by AuthRequire, otherwise /LandingPage
  const from = location.state?.from?.pathname || "/LandingPage";

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Clear any existing auth errors on component unmount
  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const inputChangeHandler = (e) => {
    if (authError) {
      dispatch(clearAuthError());
    }
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // HANDLING GUEST LOGIN
  const handlerGuest = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Fill inputs for clear visual feedback
    setLoginData(GUEST_CREDENTIALS);

    dispatch(
      userLogin({
        email: GUEST_CREDENTIALS.email,
        password: GUEST_CREDENTIALS.password,
        navigate: () => navigate(from, { replace: true }),
      })
    );
  };

  // STANDARD FORM LOGIN HANDLER
  function loginHandler(e) {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      alert("Please enter both email and password.");
      return;
    }

    dispatch(
      userLogin({
        email: loginData.email.trim(),
        password: loginData.password,
        navigate: () => navigate(from, { replace: true }),
      })
    );
  }

  return (
    <div className="center">
      <h1>Login</h1>

      {authError && (
        <div
          style={{
            margin: "0 2rem 1rem",
            padding: "0.6rem 1rem",
            backgroundColor: "#fee2e2",
            border: "1px solid #f87171",
            borderRadius: "8px",
            color: "#b91c1c",
            fontSize: "0.88rem",
            textAlign: "center",
          }}
          role="alert"
        >
          {authError}
        </div>
      )}

      <form onSubmit={loginHandler}>
        <div className="text__field">
          <input
            type="email"
            name="email"
            value={loginData.email}
            required
            onChange={inputChangeHandler}
            autoComplete="username"
          />
          <span></span>
          <label className={loginData.email ? "has-value" : ""}>
            Email Address
          </label>
        </div>

        <div className="text__field">
          <input
            type="password"
            name="password"
            value={loginData.password}
            required
            onChange={inputChangeHandler}
            autoComplete="current-password"
          />
          <span></span>
          <label className={loginData.password ? "has-value" : ""}>
            Password
          </label>
        </div>

        <div className="login_button_group" style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
          <button
            type="submit"
            className="guestLogin"
            disabled={loading}
            style={{
              flex: 1,
              backgroundColor: "#1976d2",
              color: "#ffffff",
              border: "none",
              borderRadius: "1.8rem",
              height: "3rem",
              fontSize: "1.05rem",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            className="guestLogin"
            onClick={handlerGuest}
            disabled={loading}
            style={{
              flex: 1,
              backgroundColor: "#f3f4f6",
              color: "#1976d2",
              border: "1.5px solid #1976d2",
              borderRadius: "1.8rem",
              height: "3rem",
              fontSize: "1.05rem",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            Guest Login
          </button>
        </div>
      </form>

      <div className="signup__link">
        Not a member? <Link to="/SignUp">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
