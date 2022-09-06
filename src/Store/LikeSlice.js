import axios from "axios";
import { STATUSES } from "./videoSlice";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const likeSlice = createSlice({
  name: "like",
  initialState: {
    likes: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchingLikes.pending, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchingLikes.fulfilled, (state, action) => {
        if (action.payload) {
          state.likes = action.payload.likes;
        }
      })
      .addCase(fetchingLikes.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })

      .addCase(addingLikes.pending, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(addingLikes.fulfilled, (state, action) => {
        if (action.payload) {
          state.likes = action.payload.likes;
        }
      })
      .addCase(addingLikes.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(removingLikes.pending, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(removingLikes.fulfilled, (state, action) => {
        if (action.payload) {
          state.likes = action.payload.likes;
        }
      })
      .addCase(removingLikes.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default likeSlice.reducer;

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
      console.log("FROM FETCHING LIKES");
      return response.data;
    } catch (ERROR) {
      return thunkAPI.rejectWithValue(ERROR);
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
      console.log("FROM ADDING TO LIKES");
      return response.data;
    } catch (ERROR) {
      return thunkAPI.rejectWithValue(ERROR);
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
      console.log("FROM DISLIKES", response.data);
      return response.data;
    } catch (ERROR) {
      return thunkAPI.rejectWithValue(ERROR);
    }
  }
);
