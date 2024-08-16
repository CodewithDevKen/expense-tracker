import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import globalReducer from "../slice/globalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    global: globalReducer,
  },
});
