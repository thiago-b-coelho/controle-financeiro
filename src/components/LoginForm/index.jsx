"use client";
import axios from "axios";
import KeyIcon from "@mui/icons-material/Key";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import * as S from "./style.jsx";
import React, { useState } from "react";
import { InputAdornment, Link } from "@mui/material";
import { Key } from "@mui/icons-material";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { data },
      } = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      handleNotification(data.message, "success");
    } catch (error) {
      handleNotification(error.response.data.error, "error");
    }
  };

  const handleNotification = (message, severity) => {
    setNotification({
      open: true,
      message: message,
      severity: severity,
    });
  };

  const handleClose = (_, reason) => {
    if (reason == "clickaway") {
      return;
    }
    setNotification({
      open: false,
      message: "",
      severity: "",
    });
  };

  return (
    <>
      <S.Form onSubmit={onSubmit}>
        <h1>Login</h1>
        <S.TextField
          id="email"
          label="E-mail"
          type="text"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AlternateEmailIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <S.TextField
          id="password"
          label="Password"
          type="password"
          // helperText="Minimun 8 digits"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <S.Button variant="contained" type="submit">
          Login
        </S.Button>
        <p>
          Don't have an account? <Link href="/register">Register</Link>
        </p>
      </S.Form>

      <S.SnackBar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <S.Alert
          onClose={handleClose}
          severity={notification.severity}
          variant="filled"
        >
          {notification.message}
        </S.Alert>
      </S.SnackBar>
    </>
  );
};

export default LoginForm;
