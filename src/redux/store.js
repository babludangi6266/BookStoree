import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    books: bookReducer,
    auth: authReducer,
  },
});

export default store;