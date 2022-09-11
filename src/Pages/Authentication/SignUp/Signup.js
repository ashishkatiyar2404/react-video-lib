import React, { useState } from "react";
import { userSignUp } from "../../../Store/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signUp, setSignUp] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const signUpHandler = (e) => {
    setSignUp((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  function handlerSignUp(e) {
    e.preventDefault();
    dispatch(
      userSignUp({
        firstName: signUp.name,
        lastName: signUp.lastName,
        email: signUp.email,
        password: signUp.password,
        navigate,
      })
    );
  }

  return (
    <div className="center">
      <h1>Signup</h1>
      <form action="">
        <div className="text__field">
          <input type="email" name="email" onChange={signUpHandler} required />
          <span></span>
          <label>Email</label>
        </div>
        <div className="text__field first__name">
          <input type="text" name="name" onChange={signUpHandler} required />
          <span></span>
          <label>first name</label>
        </div>
        <div className="text__field last__name">
          <input
            type="text"
            name="lastName"
            onChange={signUpHandler}
            required
          />
          <span></span>
          <label>What about your last name</label>
        </div>

        <div className="text__field">
          <input
            type="password"
            name="password"
            onChange={signUpHandler}
            required
          />
          <span></span>
          <label> Confirm Password</label>
        </div>

        <input type="submit" value="Submit" onClick={handlerSignUp} />
      </form>
    </div>
  );
};

export default Signup;
