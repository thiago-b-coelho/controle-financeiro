"use client";
import React from "react";

const LoginForm = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Login successful");
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Login Form</h1>
      <label htmlFor="email">Email</label>
      <input type="text" placeholder="E-mail" id="email" name="email" />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="Password"
        id="password"
        name="password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
