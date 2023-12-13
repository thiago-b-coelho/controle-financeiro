"use client";
import axios from "axios";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import * as S from "../../styles/style.jsx";
import React, { useState } from "react";
import { InputAdornment, Link } from "@mui/material";
import { useRouter } from "next/navigation.js";

const LoginForm = () => {
  const URL = 'https://controle-financeiro-02288fa9a600.herokuapp.com';
  // const URL = 'http://localhost:8080'const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      } = await axios.post(`${URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      handleNotification(data.message, "success");
      router.push("/dashboard");
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
        <S.Typography variant="h1" color="primary" style={{marginBottom: "40px"}}>
          Login
        </S.Typography>
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

        <S.FormControl variant="outlined" size="small">
          <S.InputLabel htmlFor="password">Password</S.InputLabel>
          <S.OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <S.IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <S.VisibilityOff /> : <S.Visibility />}
                </S.IconButton>
              </InputAdornment>
            }
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </S.FormControl>

        {/* <S.TextField
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
        /> */}
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
