import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../Store/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // INPUT HANDLER
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const inputChangeHandler = (e) => {
    e.preventDefault();
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // HANDLING GUEST DATA
  const handlerGuest = (e) => {
    e.preventDefault();
    dispatch(
      userLogin({
        email: "ashishkatiyar@gmail.com",
        password: "ashish@123",
        navigate,
      })
    );
  };

  // LOGIN HANDLER
  function loginHandler(e) {
    e.preventDefault();
    dispatch(
      userLogin({
        email: loginData.email,
        password: loginData.password,
        navigate,
      })
    );
  }

  return (
    <div className="center">
      <h1>Login</h1>
      <form action="">
        <div className="text__field">
          <input
            type="text"
            name="email"
            // value={loginData.email}
            required
            onChange={inputChangeHandler}
          />
          <span></span>
          <label>UserEmail</label>
        </div>
        <div className="text__field">
          <input
            type="password"
            name="password"
            // value={loginData.password}
            required
            onChange={inputChangeHandler}
          />
          <span></span>
          <label>Password</label>
        </div>
        <div className="pass">Forgot Password?</div>
        <input type="submit" value="Login" onClick={loginHandler} />
        <button className="guestLogin" onClick={handlerGuest}>
          Guest Login
        </button>
      </form>
      <div className="signup__link">
        Not a member? <Link to="/SignUp">SignUp</Link>
      </div>
    </div>
  );
};

export default Login;
