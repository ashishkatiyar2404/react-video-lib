import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import { STATUSES } from "./videoSlice";
import axios from "axios";

export const fetchWatchLater = createAsyncThunk(
  "watchLater/fetchWatchLater",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get("/api/user/watchLater", {
        headers: {
          authorization: data.token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error in fetch watchLater"
      );
    }
  }
);

export const addingToWatchLater = createAsyncThunk(
  "watchLater/addingToWatchLater",
  async (data, thunkAPI) => {
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
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error in adding to watchLater"
      );
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
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error in deleting from watchLater"
      );
    }
  }
);

const initialState = {
  status: STATUSES.IDLE,
  watchLater: [],
  error: null,
};

const watchLaterSlice = createSlice({
  name: "watchLater",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchLater.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchWatchLater.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCEEDED;
        if (action.payload?.watchlater) {
          state.watchLater = action.payload.watchlater;
        }
      })
      .addCase(fetchWatchLater.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(addingToWatchLater.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addingToWatchLater.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCEEDED;
        if (action.payload?.watchlater) {
          state.watchLater = action.payload.watchlater;
        }
      })
      .addCase(addingToWatchLater.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(deletingWatchLater.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(deletingWatchLater.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCEEDED;
        if (action.payload?.watchlater) {
          state.watchLater = action.payload.watchlater;
        }
      })
      .addCase(deletingWatchLater.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      });
  },
});

export default watchLaterSlice.reducer;

// Memoized Selectors
export const selectWatchLaterState = (state) => state.watch;

export const selectAllWatchLater = createSelector(
  [selectWatchLaterState],
  (watchState) => watchState?.watchLater || []
);

export const selectIsVideoInWatchLater = (videoId) =>
  createSelector([selectAllWatchLater], (watchLaterList) =>
    watchLaterList.some((item) => item._id === videoId)
  );
