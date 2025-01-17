import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks for async operations
export const fetchBooks = createAsyncThunk("books/fetchBooks", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("https://bookstore-k7ar.onrender.com/books/getbooks", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Error fetching books");
  }
});

export const addBook = createAsyncThunk("books/addBook", async (book, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post("https://bookstore-k7ar.onrender.com/books/addbooks", book, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Error adding book");
  }
});

// Book slice
const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      });
  },
});

export default bookSlice.reducer;
