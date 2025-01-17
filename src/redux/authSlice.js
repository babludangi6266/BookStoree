import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      // const response = await axios.post("http://localhost:5000/auth/register", userData);
      const response = await axios.post("https://bookstore-k7ar.onrender.com/auth/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://bookstore-k7ar.onrender.com/auth/login", { email, password });
      localStorage.setItem("token", response.data.token); // Save token in local storage
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!localStorage.getItem("token"),
    isLoading: false,
    error: null,
    user: null, // Stores user data
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("token"); // Clear token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user; // Assuming the API returns user data
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
