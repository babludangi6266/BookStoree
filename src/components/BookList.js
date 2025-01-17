
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../redux/bookSlice";
import { useNavigate } from "react-router-dom";
import image from "../assets/bookcover2.jpg";
import "../styles/BookList.css";

const BookList = () => {
  const { books, loading, error } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleAddBook = () => {
    navigate("/add-book");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="booklist-container">
      <header className="booklist-header">
        <h1>Welcome to the Book Library</h1>
        <p className="header-description">
          Explore a vast collection of timeless classics and modern bestsellers. Add your favorite books, stay organized, and dive into a world of knowledge.
        </p>
        <div className="button-group">
          <button className="add-button" onClick={handleAddBook}>
            Add Book
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="booklist-content">
        {loading && <p>Loading books...</p>}
        {error && <p>{error}</p>}
        {books.length > 0 ? (
          <ul className="booklist">
            {books.map((book) => (
              <li key={book._id} className="book-item">
                <img src={image} alt="Book Cover" className="book-image" />
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">by {book.author}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-books-text">
            No books available yet. Add your first book to get started!
          </p>
        )}
      </div>

      <footer className="booklist-footer">
        <p>
          📚 Discover new books every day | Created with ❤️ for book lovers
        </p>
      </footer>
    </div>
  );
};

export default BookList;
