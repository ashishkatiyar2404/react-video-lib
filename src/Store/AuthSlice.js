import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

const localStorageEncodedToken = localStorage.getItem("token");

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (data, thunkAPI) => {
    try {
      const { email, password, navigate } = data;
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      if (typeof navigate === "function") {
        navigate();
      } else if (navigate) {
        navigate("/LandingPage");
      }
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.errors?.[0] ||
        error.response?.data?.message ||
        error.message ||
        "Login failed";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const userSignUp = createAsyncThunk(
  "auth/userSignUp",
  async (data, thunkAPI) => {
    try {
      const { lastName, email, password, navigate } = data;
      const firstName = data.firstName || data.name || "";
      const response = await axios.post("/api/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      if (typeof navigate === "function") {
        navigate();
      } else if (navigate) {
        navigate("/Login");
      }
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.errors?.[0] ||
        error.response?.data?.message ||
        error.message ||
        "Signup failed";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

const initialState = {
  user: {
    firstName: "",
    lastName: "",
    token: localStorageEncodedToken || null,
    ERROR: {
      userNameERROR: "",
      emailERROR: "",
      passwordERROR: "",
    },
  },
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = {
        firstName: "",
        lastName: "",
        token: null,
        ERROR: {
          userNameERROR: "",
          emailERROR: "",
          passwordERROR: "",
        },
      };
      state.error = null;
    },
    clearAuthError: (state) => {
      state.error = null;
      state.user.ERROR = {
        userNameERROR: "",
        emailERROR: "",
        passwordERROR: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload) {
          state.user = {
            token: action.payload.encodedToken,
            firstName: action.payload.foundUser?.firstName || "",
            lastName: action.payload.foundUser?.lastName || "",
            ERROR: {
              userNameERROR: "",
              emailERROR: "",
              passwordERROR: "",
            },
          };
          localStorage.setItem("token", action.payload.encodedToken);
        }
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed. Please check credentials.";
        state.user.ERROR.passwordERROR = state.error;
      })
      .addCase(userSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload) {
          state.user = {
            token: action.payload.encodedToken,
            firstName: action.payload.createdUser?.firstName || "",
            lastName: action.payload.createdUser?.lastName || "",
            ERROR: {
              userNameERROR: "",
              emailERROR: "",
              passwordERROR: "",
            },
          };
          localStorage.setItem("token", action.payload.encodedToken);
        }
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed. Please try again.";
        state.user.ERROR.passwordERROR = state.error;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;

// Memoized Selectors
export const selectAuthState = (state) => state.auth;

export const selectAuthUser = createSelector(
  [selectAuthState],
  (authState) => authState?.user
);

export const selectAuthToken = createSelector(
  [selectAuthUser],
  (user) => user?.token || null
);

export const selectIsAuthenticated = createSelector(
  [selectAuthToken],
  (token) => Boolean(token)
);

export const selectAuthLoading = createSelector(
  [selectAuthState],
  (authState) => Boolean(authState?.loading)
);

export const selectAuthError = createSelector(
  [selectAuthState],
  (authState) => authState?.error
);
