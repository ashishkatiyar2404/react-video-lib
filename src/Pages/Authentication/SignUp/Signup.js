import React from "react";
// import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="center">
      <h1>Signup</h1>
      <form action="">
        <div className="text__field">
          <input
            type="email"
            name="email"
            //    onChange={signUpHandler}
            required
          />
          <span></span>
          <label>Email</label>
        </div>
        <div className="text__field first__name">
          <input
            type="text"
            name="name"
            //    onChange={signUpHandler}
            required
          />
          <span></span>
          <label>first name</label>
        </div>
        <div className="text__field last__name">
          <input
            type="text"
            name="lastName"
            // onChange={signUpHandler}
            required
          />
          <span></span>
          <label>What about your last name</label>
        </div>

        <div className="text__field">
          <input
            type="password"
            name="password"
            // onChange={signUpHandler}
            required
          />
          <span></span>
          <label> Confirm Password</label>
        </div>

        <input
          type="submit"
          value="Submit"
          //   onClick={(e) => signUpData(e, signUp, navigate, AuthDispatch)}
        />
      </form>
    </div>
  );
};

export default Signup;
