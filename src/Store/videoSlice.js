import axios from "axios";
import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";

// Standardized Statuses
export const STATUSES = Object.freeze({
  LOADING: "loading",
  ERROR: "error",
  IDLE: "idle",
  SUCCEEDED: "succeeded",
});

const initialState = {
  data: [],
  status: STATUSES.IDLE,
  error: null,
};

export const fetchingVideos = createAsyncThunk(
  "video/fetchingVideos",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/videos");
      return response.data.videos;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch videos"
      );
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchingVideos.pending, (state) => {
        state.status = STATUSES.LOADING;
        state.error = null;
      })
      .addCase(fetchingVideos.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCEEDED;
        state.data = action.payload || [];
      })
      .addCase(fetchingVideos.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload || "Failed to fetch videos";
      });
  },
});

export default videoSlice.reducer;

// Memoized Selectors
export const selectVideoState = (state) => state.video;

export const selectAllVideos = createSelector(
  [selectVideoState],
  (videoState) => videoState?.data || []
);

export const selectVideoStatus = createSelector(
  [selectVideoState],
  (videoState) => videoState?.status || STATUSES.IDLE
);

export const selectVideosByCategory = (category) =>
  createSelector([selectAllVideos], (videos) => {
    if (!category || category === "All") return videos;
    return videos.filter((item) => item.category === category);
  });
