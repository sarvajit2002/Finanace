import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import baseUrl from "../Helper/baseUrl";
import { ChartLineDown } from "../components/Header/Icons";
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //const [userType, setUserType] = useState("user"); // Initialize the user type state

  {
    /*const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };*/
  }

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/api/v1/user/login`, {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        alert("Login successfully");
        navigate("/");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div
      style={{
        background: "#4182cc",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background container */}
      <Container
        component="main"
        maxWidth="lg"
        sx={{ width: "57%", paddingRight: "65px", paddingLeft: "48px" }}
      >
        <CssBaseline />
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            alignItems: "center",
            borderRadius: "16px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            flex: "2",
          }}
        >
          <ChartLineDown
            width="200"
            height="200"
            style={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              marginRight: "20px",
            }}
          />
          <Grid container spacing={2} sx={{ flex: "6" }}>
            <Grid item xs={20}>
              <Avatar sx={{ bgcolor: "primary.main", marginRight: "16px" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h5" component="div" gutterBottom>
                Log in
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </form>
            </Grid>
            <Grid item xs={12}>
              <form>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </form>
            </Grid>
            {/*<Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="user-type-label">User Type</InputLabel>
                <Select
                  labelId="user-type-label"
                  id="user-type"
                  value={userType}
                  onChange={handleUserTypeChange}
                  label="User Type"
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="doctor">doctor</MenuItem>
                </Select>
              </FormControl>
          </Grid>*/}
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                color="primary"
                type="submit"
                onClick={handleSignIn}
              >
                Log in
              </Button>
              <Link to="/signup" className="m-2">
                Not a User Register Here
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default SignIn;
