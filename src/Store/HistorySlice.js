import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { STATUSES } from "./videoSlice";
import axios from "axios";

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
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to clear history"
      );
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
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add to history"
      );
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
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch history"
      );
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
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove from history"
      );
    }
  }
);

const initialState = {
  status: STATUSES.IDLE,
  historyVideos: [],
  error: null,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(clearAllHistory.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(clearAllHistory.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCEEDED;
        if (action.payload?.history) {
          state.historyVideos = action.payload.history;
        } else {
          state.historyVideos = [];
        }
      })
      .addCase(clearAllHistory.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(fetchingHistory.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchingHistory.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCEEDED;
        if (action.payload?.history) {
          state.historyVideos = action.payload.history;
        }
      })
      .addCase(fetchingHistory.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(addingToHistory.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addingToHistory.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCEEDED;
        if (action.payload?.history) {
          state.historyVideos = action.payload.history;
        }
      })
      .addCase(addingToHistory.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(removingDataFromHistory.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(removingDataFromHistory.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCEEDED;
        if (action.payload?.history) {
          state.historyVideos = action.payload.history;
        }
      })
      .addCase(removingDataFromHistory.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      });
  },
});

export default historySlice.reducer;

// Memoized Selectors
export const selectHistoryState = (state) => state.history;

export const selectAllHistory = createSelector(
  [selectHistoryState],
  (historyState) => historyState?.historyVideos || []
);
