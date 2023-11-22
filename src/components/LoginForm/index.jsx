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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data: {data}} = await axios.post('http://localhost:8080/auth/login', {email, password});
      localStorage.setItem('token', data.token);
      console.log(data.token)
    } catch(error){
      console.log(error);
    }

    console.log("Login successful", email, password);
  };

  return (
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
      <p>Don't have an account? <Link href="/register">Register</Link></p>
    </S.Form>
  );
};

export default LoginForm;
