import axios from "axios";
import { STATUSES } from "./videoSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlistManagement: [],
    status: STATUSES.IDLE,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addingNewPlaylist.pending, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(addingNewPlaylist.fulfilled, (state, action) => {
        if (action.payload) {
          state.playlist = action.payload.playlists;
        }
      })
      .addCase(addingNewPlaylist.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })

      .addCase(deletingPlaylist.pending, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(deletingPlaylist.fulfilled, (state, action) => {
        if (action.payload) {
          state.playlist = action.payload.playlists;
        }
      })
      .addCase(deletingPlaylist.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })

      .addCase(addingVideoToPlaylist.pending, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(addingVideoToPlaylist.fulfilled, (state, action) => {
        if (action.payload) {
          const updatedPlaylists = state.playlist.map((item) => {
            if (action.payload.playlist._id === item._id) {
              return action.payload.playlist;
            } else {
              return item;
            }
          });
          state.playlist = updatedPlaylists;
        }
      })
      .addCase(addingVideoToPlaylist.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })

      .addCase(removingVideoFromPlaylist.pending, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(removingVideoFromPlaylist.fulfilled, (state, action) => {
        if (action.payload) {
          const updatedRemovePlaylists = state.playlist.map((item) => {
            if (action.payload.playlist._id === item._id) {
              return action.payload.playlist;
            } else {
              return item;
            }
          });
          state.playlist = updatedRemovePlaylists;
        }
      })
      .addCase(removingVideoFromPlaylist.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(fetchingAllPlaylists.pending, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchingAllPlaylists.fulfilled, (state, action) => {
        if (action.payload) {
          state.playlist = action.payload.playlists;
        }
      })
      .addCase(fetchingAllPlaylists.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default playlistSlice.reducer;

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
      console.log(response.data, "ADDING NEW PLAYLIST IN PLAYLIST MANAGEMENT");
      return response.data;
    } catch (ERROR) {
      thunkAPI.rejectWithValue(ERROR);
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
    } catch (ERROR) {
      thunkAPI.rejectWithValue(ERROR);
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
    } catch (ERROR) {
      thunkAPI.rejectWithValue(ERROR);
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
    } catch (ERROR) {
      thunkAPI.rejectWithValue(ERROR);
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
    } catch (ERROR) {
      return thunkAPI.rejectWithValue(ERROR);
    }
  }
);
