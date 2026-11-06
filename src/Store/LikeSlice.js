import axios from "axios";
import { STATUSES } from "./videoSlice";
import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

export const fetchingLikes = createAsyncThunk(
  "like/fetchingLikes",
  async (data, thunkAPI) => {
    const { token } = data;
    try {
      const response = await axios.get("/api/user/likes", {
        headers: {
          authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch likes"
      );
    }
  }
);

export const addingLikes = createAsyncThunk(
  "like/addingLikes",
  async (data, thunkAPI) => {
    const { videoInfo, token } = data;
    try {
      const response = await axios.post(
        "/api/user/likes",
        { video: videoInfo },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add to likes"
      );
    }
  }
);

export const removingLikes = createAsyncThunk(
  "like/removingLikes",
  async (data, thunkAPI) => {
    const { videoId, token } = data;
    try {
      const response = await axios.delete(`/api/user/likes/${videoId}`, {
        headers: {
          authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove from likes"
      );
    }
  }
);

const initialState = {
  likes: [],
  status: STATUSES.IDLE,
  error: null,
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchingLikes.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchingLikes.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCEEDED;
        if (action.payload?.likes) {
          state.likes = action.payload.likes;
        }
      })
      .addCase(fetchingLikes.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(addingLikes.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addingLikes.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCEEDED;
        if (action.payload?.likes) {
          state.likes = action.payload.likes;
        }
      })
      .addCase(addingLikes.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(removingLikes.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(removingLikes.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCEEDED;
        if (action.payload?.likes) {
          state.likes = action.payload.likes;
        }
      })
      .addCase(removingLikes.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      });
  },
});

export default likeSlice.reducer;

// Memoized Selectors
export const selectLikeState = (state) => state.like;

export const selectAllLikes = createSelector(
  [selectLikeState],
  (likeState) => likeState?.likes || []
);

export const selectIsVideoLiked = (videoId) =>
  createSelector([selectAllLikes], (likes) =>
    likes.some((item) => item._id === videoId)
  );
