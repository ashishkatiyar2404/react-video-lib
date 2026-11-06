import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./videoSlice";
import authReducer from "./AuthSlice";
import watchLaterReducer from "./WatchLaterSlice";
import historyReducer from "./HistorySlice";
import likeReducer from "./LikeSlice";
import playlistReducer from "./PlayListSLice";
import filterReducer from "./filterSlice";

const store = configureStore({
  reducer: {
    video: videoReducer,
    auth: authReducer,
    watch: watchLaterReducer,
    history: historyReducer,
    like: likeReducer,
    playlist: playlistReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
