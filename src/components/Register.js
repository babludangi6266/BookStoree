
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/authSlice"; // Redux action for registration
import { TextField, Button, Grid, Typography, Paper, Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const Background = styled(Box)({
  height: "550px",
  Width: "750px",
  display: "flex",
  borderRadius: "20px",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg,rgb(5, 30, 52) 0%, #00f2fe 100%)",
  color: "#fff",
});

const FormContainer = styled(Paper)({
  padding: "50px",
  Width: "550px",
  width: "100%",
  borderRadius: "20px",
  boxShadow: "0 8px 20px rgba(82, 233, 32, 0.2)",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
});

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(registerUser({ email, password }));
    if (response?.type === "auth/registerUser/fulfilled") {
      toast.success("Registration successful!", { position: "top-center" });
      navigate("/login");
    } else {
      toast.error("Registration failed. Please try again!", { position: "top-center" });
    }
  };

  return (
    <Background>
      <FormContainer elevation={10}>
        <Typography variant="h4" align="center" gutterBottom>
          Create an Account
        </Typography>
        {error && (
          <Typography variant="body2" color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputProps={{
                  style: { color: "#333" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  style: { color: "#333" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{
                  background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                  color: "#fff",
                }}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} style={{ color: "#fff" }} /> : "Register"}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography
          variant="body2"
          align="center"
          style={{ marginTop: "16px", color: "#555" }}
        >
          Already have an account?{" "}
          <a href="/" style={{ textDecoration: "none", color: "#6a11cb" }}>
            Login here
          </a>
        </Typography>
      </FormContainer>
    </Background>
  );
};

export default Register;
