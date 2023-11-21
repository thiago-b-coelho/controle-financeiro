"use client";
import React from "react";

const RegisterForm = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Registered successfully");
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Login Form</h1>
      <label htmlFor="name">Name</label>
      <input type="text" placeholder="Name" id="name" name="name" />
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

export default RegisterForm;
