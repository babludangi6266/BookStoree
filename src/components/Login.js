import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice"; 
import image from "../assets/bookstore.jpg";
import "../styles/LoginPage.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error } = useSelector((state) => state.auth); // Access Redux auth state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await dispatch(loginUser({ email, password }));
    if (response?.type === "auth/loginUser/fulfilled") {
      console.log("Login successful");
      navigate("/booklist"); // Redirect to home
    } else {
      console.error("Login failed:", response.payload);
    }
  };
  

  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="left-section">
        <h1>Welcome Back!</h1>
        <p className="description">
          Stay organized and focused with our Book Store App. Access your Books
          anywhere, anytime.
        </p>
        <img src={image} alt="Stay Organized" className="login-image" />
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="login-box">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="signup-link">
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
