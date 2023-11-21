"use client";
import * as S from './style.jsx'
import React from "react";

const LoginForm = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Login successful");
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Login Form</h1>
      <S.TextField id='email' label='E-mail' type='text' variant='standard'/>
      <S.TextField id='password' label='Password' type='password' helperText='Minimun 8 digits' variant='standard'/>
      <S.Button variant="outlined" type="submit">Login</S.Button>
    </form>
  );
};

export default LoginForm;
