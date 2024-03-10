import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { UserContext } from "../context/user";
import { getUrl } from "../utils/urlConfig";

const Login = () => {
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        getUrl("login"),
        { email: formData.email, password: formData.password },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          updateUser({ email: response.data.email });
          localStorage.setItem("presist", true);
          navigate("/"); // Redirect to homepage on success
        } else {
          console.error("Login failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 400,
            width: "100%",
            padding: 3,
            borderRadius: 8,
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            bgcolor: "background.paper",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} container justifyContent="flex-end">
              <Button onClick={() => navigate("/")} variant="outlined">
                Go to App
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" align="center" gutterBottom>
                Login
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
