import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUSES } from "./videoSlice";
import axios from "axios";

const historySlice = createSlice({
  name: "history",
  initialState: {
    status: STATUSES.IDLE,
    historyVideos: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(clearAllHistory.pending, (state) => {
        state.status = STATUSES.pending;
      })
      .addCase(clearAllHistory.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          state.historyVideos = action.payload.history;
        }
      })
      .addCase(clearAllHistory.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(fetchingHistory.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchingHistory.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          state.historyVideos = action.payload.history;
        }
      })
      .addCase(fetchingHistory.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(addingToHistory.pending, (state) => {
        state.status = STATUSES.pending;
      })
      .addCase(addingToHistory.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          state.historyVideos = action.payload.history;
        }
      })
      .addCase(addingToHistory.rejected, (state) => {
        state.status = STATUSES.rejected;
      })
      .addCase(removingDataFromHistory.pending, (state) => {
        state.status = STATUSES.pending;
      })
      .addCase(removingDataFromHistory.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          state.historyVideos = action.payload.history;
        }
      })
      .addCase(removingDataFromHistory.rejected, (state) => {
        state.status = STATUSES.rejected;
      });
  },
});

export default historySlice.reducer;

export const clearAllHistory = createAsyncThunk(
  "history/clearAllHistory",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete("/api/user/history/all", {
        headers: {
          authorization: data.token,
        },
      });

      return response.data;
    } catch (ERROR) {
      return thunkAPI.rejectWithValue(ERROR);
    }
  }
);

export const addingToHistory = createAsyncThunk(
  "history/addingToHistory",
  async (data, thunkAPI) => {
    const { video, token } = data;
    try {
      const response = await axios.post(
        "/api/user/history",
        { video },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return response.data;
    } catch (ERROR) {
      return thunkAPI.rejectWithValue(ERROR);
    }
  }
);

export const fetchingHistory = createAsyncThunk(
  "history/fetchingHistory",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get("/api/user/history", {
        headers: {
          authorization: data.token,
        },
      });

      return response.data;
    } catch (ERROR) {
      return thunkAPI.rejectWithValue(ERROR);
    }
  }
);

export const removingDataFromHistory = createAsyncThunk(
  "history/removingDataFromHistory",
  async (data, thunkAPI) => {
    const { videoID, token } = data;
    try {
      const response = await axios.delete(`/api/user/history/${videoID}`, {
        headers: {
          authorization: token,
        },
      });
      console.log(response.data);
      console.log("FROM REMOVING DATA FROM HISTORY");
      return response.data;
    } catch (ERROR) {
      return thunkAPI.rejectWithValue(ERROR);
    }
  }
);
