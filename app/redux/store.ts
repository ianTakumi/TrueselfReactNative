import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import musicPlayerReducer from "./slices/SongSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    musicPlayer: musicPlayerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
