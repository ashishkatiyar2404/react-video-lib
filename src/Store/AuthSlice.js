import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const localStorageEncodedToken = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      firstName: "",
      lastName: "",
      password: "password",
      token: localStorageEncodedToken,
      ERROR: {
        userNameERROR: "",
        emailERROR: "",
        passwordERROR: "",
      },
    },
  },

  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = { token: null };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = {
          token: action.payload.encodedToken,
          firstName: action.payload.foundUser.firstName,
          lastName: action.payload.foundUser.lastName,
        };
        localStorage.setItem("token", action.payload.encodedToken);
      })
      .addCase(userLogin.rejected, (state, action) => {
        const status = action?.payload.response.status;
        if (status === 404) {
          state.user.ERROR.emailERROR = "Email NOT REGISTERED YET";
          state.user.ERROR.passwordERROR = "";
        } else if (status === 401) {
          state.user.ERROR.emailERROR = "";
          state.user.ERROR.passwordERROR = "PASSWORD NOT MATCHING";
        } else {
          console.log(status, "try later");
          state.user.ERROR.passwordERROR = "PASSWORD NOT MATCHING";
        }
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.user = {
          token: action.payload.encodedToken,
          firstName: action.payload.createdUser.firstName,
          lastName: action.payload.createdUser.lastName,
        };
        localStorage.setItem("token", action.payload.encodedToken);
      })
      .addCase(userSignUp.rejected, (state, action) => {
        console.log("try later");
      });
  },
});

//  EXPORT
export default authSlice.reducer;
export const { logout } = authSlice.actions;

// API's
// login
export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (data, thunkAPI) => {
    console.log("bulawa aaya tha", data);
    try {
      const { email, password, navigate } = data;
      const response = await axios.post("/api/auth/login", {
        email: email,
        password: password,
      });
      navigate("/LandingPage");
      return response.data;
    } catch (ERROR) {
      return thunkAPI.rejectWithValue(ERROR);
    }
  }
);

// signUp
export const userSignUp = createAsyncThunk(
  "auth/userSignUp",
  async (data, thunkAPI) => {
    try {
      const { name, lastName, email, password, navigate } = data;
      const response = await axios.post("/api/auth/signup", {
        firstName: name,
        lastName: lastName,
        email: email,
        password: password,
      });
      navigate("/Login");
      return response.data;
    } catch (ERROR) {
      return thunkAPI.rejectWithValue(ERROR);
    }
  }
);
