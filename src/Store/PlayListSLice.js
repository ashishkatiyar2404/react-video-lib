import axios from "axios";
import { STATUSES } from "./videoSlice";
import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";

// API FOR ADDING NEW PLAYLIST
export const addingNewPlaylist = createAsyncThunk(
  "playlist/addingNewPlaylist",
  async (data, thunkAPI) => {
    const { token, playlist } = data;
    try {
      const response = await axios.post(
        "/api/user/playlists",
        {
          playlist,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create playlist"
      );
    }
  }
);

// API FOR DELETING EXISTING PLAYLIST
export const deletingPlaylist = createAsyncThunk(
  "playlist/deletingPlaylist",
  async (data, thunkAPI) => {
    const { token, playlistId } = data;
    try {
      const response = await axios.delete(`/api/user/playlists/${playlistId}`, {
        headers: {
          authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete playlist"
      );
    }
  }
);

// API FOR ADDING A SINGLE VIDEO TO PERTICULAR PLAYLIST
export const addingVideoToPlaylist = createAsyncThunk(
  "playlist/addingVideoToPlaylist",
  async (data, thunkAPI) => {
    const { token, playlistId, video } = data;
    try {
      const response = await axios.post(
        `/api/user/playlists/${playlistId}`,
        {
          video,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add video to playlist"
      );
    }
  }
);

// DELETING/REMOVING A PERTICULAR VIDEO FROM A PLAYLIST
export const removingVideoFromPlaylist = createAsyncThunk(
  "playlist/removingVideoFromPlaylist",
  async (data, thunkAPI) => {
    const { token, playlistId, videoId } = data;
    try {
      const response = await axios.delete(
        `/api/user/playlists/${playlistId}/${videoId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove video from playlist"
      );
    }
  }
);

// API FOR GETTING ALL THE LIST OF PLAYLIST
export const fetchingAllPlaylists = createAsyncThunk(
  "playlist/fetchingAllPlaylists",
  async (data, thunkAPI) => {
    const { token } = data;
    try {
      const response = await axios.get("/api/user/playlists", {
        headers: {
          authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch playlists"
      );
    }
  }
);

const initialState = {
  playlist: [],
  status: STATUSES.IDLE,
  error: null,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addingNewPlaylist.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addingNewPlaylist.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCEEDED;
        if (action.payload?.playlists) {
          state.playlist = action.payload.playlists;
        }
      })
      .addCase(addingNewPlaylist.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(deletingPlaylist.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(deletingPlaylist.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCEEDED;
        if (action.payload?.playlists) {
          state.playlist = action.payload.playlists;
        }
      })
      .addCase(deletingPlaylist.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(addingVideoToPlaylist.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addingVideoToPlaylist.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCEEDED;
        if (action.payload?.playlist) {
          const index = state.playlist.findIndex(
            (p) => p._id === action.payload.playlist._id
          );
          if (index !== -1) {
            state.playlist[index] = action.payload.playlist;
          } else {
            state.playlist.push(action.payload.playlist);
          }
        }
      })
      .addCase(addingVideoToPlaylist.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(removingVideoFromPlaylist.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(removingVideoFromPlaylist.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCEEDED;
        if (action.payload?.playlist) {
          const index = state.playlist.findIndex(
            (p) => p._id === action.payload.playlist._id
          );
          if (index !== -1) {
            state.playlist[index] = action.payload.playlist;
          }
        }
      })
      .addCase(removingVideoFromPlaylist.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(fetchingAllPlaylists.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchingAllPlaylists.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCEEDED;
        if (action.payload?.playlists) {
          state.playlist = action.payload.playlists;
        }
      })
      .addCase(fetchingAllPlaylists.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      });
  },
});

export default playlistSlice.reducer;

// Memoized Selectors
export const selectPlaylistState = (state) => state.playlist;

export const selectAllPlaylists = createSelector(
  [selectPlaylistState],
  (playlistState) => playlistState?.playlist || []
);
