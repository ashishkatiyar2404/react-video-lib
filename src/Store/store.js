import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./videoSlice";
import authReducer from "./AuthSlice";
import watchLaterReducer from "./WatchLaterSlice";
import historyReducer from "./HistorySlice";
import likeReducer from "./LikeSlice";
import PlaylistReducer from "./PlayListSLice";
// import { getDefaultMiddleware } from "@reduxjs/toolkit";
// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false,
// });
const store = configureStore({
  reducer: {
    video: videoReducer,
    auth: authReducer,
    watch: watchLaterReducer,
    history: historyReducer,
    like: likeReducer,
    playlist: PlaylistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
