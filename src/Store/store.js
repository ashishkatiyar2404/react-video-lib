import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./videoSlice";
import authReducer from "./AuthSlice";
import watchLaterReducer from "./WatchLaterSlice";

const store = configureStore({
  reducer: {
    video: videoReducer,
    auth: authReducer,
    watch: watchLaterReducer,
  },
});

export default store;
