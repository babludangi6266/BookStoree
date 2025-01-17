import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from "./components/Homepage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booklist" element={<ProtectedRoute><BookList /></ProtectedRoute>} />
          <Route path="/add-book" element={<ProtectedRoute><BookForm /></ProtectedRoute>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
