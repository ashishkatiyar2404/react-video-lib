import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// STATUS'S
export const STATUSES = Object.freeze({
  LOADING: "Loading",
  ERROR: "Error",
  IDLE: "Idle",
});

const initialState = {
  data: [],
  status: STATUSES.IDLE,
};

//CREATING VIDEO SLICE
const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchingVideos.pending, (state) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(fetchingVideos.fulfilled, (state, action) => {
      state.status = STATUSES.IDLE;
      state.data = action.payload;
    });
    builder.addCase(fetchingVideos.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
    });
  },
});

export const fetchingVideos = createAsyncThunk(
  "video/fetchingVideos",
  async (thunkAPI) => {
    try {
      const response = await axios.get("/api/videos");
      //   console.log(response.data.videos);
      console.log(response.data);
      return response.data.videos;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export default videoSlice.reducer;
