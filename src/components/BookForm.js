
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBook } from "../redux/bookSlice";
import "../styles/BookForm.css";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBook({ title, author }));
    setTitle("");
    setAuthor("");
  };

  return (
    <div className="book-form-container">
      <div className="welcome-section">
        <h1>Welcome to Your Book Store</h1>
        <p>
          Discover, share, and grow your collection of books. Add your favorite
          books to the library and explore the growing collection of timeless
          classics and modern hits.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="book-form">
        <h2>Add a New Book</h2>
        <input
          type="text"
          placeholder="Enter Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Author's Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>

      <button className="book-list-btn" onClick={() => navigate("/booklist")}>
        View Book List
      </button>
    </div>
  );
};

export default BookForm;
