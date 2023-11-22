"use client";
import axios from "axios";
import * as S from "./style.jsx";
import React, { useState } from "react";

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
    <form onSubmit={onSubmit}>
      <h1>Login Form</h1>
      <S.TextField
        id="email"
        label="E-mail"
        type="text"
        variant="standard"
        onChange={(e) => setEmail(e.target.value)}
      />
      <S.TextField
        id="password"
        label="Password"
        type="password"
        helperText="Minimun 8 digits"
        variant="standard"
        onChange={(e) => setPassword(e.target.value)}
      />
      <S.Button variant="outlined" type="submit">
        Login
      </S.Button>
    </form>
  );
};

export default LoginForm;
