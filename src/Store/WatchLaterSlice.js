import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./videoSlice";
import axios from "axios";

const watchLaterSlice = createSlice({
  name: "watchLater",
  initialState: {
    status: STATUSES.IDLE,
    watchLater: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchLater.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchWatchLater.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        // action.payload ? (state.watchLater = action.payload.watchLater) : "";
        if (action.payload) {
          state.watchLater = action.payload.watchlater;
        }
      })
      .addCase(fetchWatchLater.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(addingToWatchLater.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addingToWatchLater.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          state.watchLater = action.payload.watchlater;
        }
      })
      .addCase(addingToWatchLater.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })

      .addCase(deletingWatchLater.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(deletingWatchLater.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          state.watchLater = action.payload.watchlater;
        }
      })
      .addCase(deletingWatchLater.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const fetchWatchLater = createAsyncThunk(
  "watchLater/fetchWatchLater",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get("/api/user/watchLater", {
        headers: {
          authorization: data.token,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (ERROR) {
      console.log("ERROR in FETCH watchLater");
      return thunkAPI.rejectWithValue(ERROR);
    }
  }
);

export const addingToWatchLater = createAsyncThunk(
  "watchLater/addingToWatchLater",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const { video, token } = data;
      const response = await axios.post(
        "/api/user/watchlater",
        { video },
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (ERROR) {
      console.log("ERROR in adding watchLater");
      return thunkAPI.rejectWithValue(ERROR);
    }
  }
);

export const deletingWatchLater = createAsyncThunk(
  "watchLater/deletingWatchLater",
  async (data, thunkAPI) => {
    try {
      const { videoID, token } = data;
      const response = await axios.delete(`/api/user/watchlater/${videoID}`, {
        headers: {
          authorization: token,
        },
      });
      console.log(response.data, "hogya delete");
      return response.data;
    } catch (ERROR) {
      console.log("ERROR in deleting watchLater");
      return thunkAPI.rejectWithValue(ERROR);
    }
  }
);

export default watchLaterSlice.reducer;
