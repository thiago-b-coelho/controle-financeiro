"use client";
import axios from "axios";
import * as S from "./style.jsx";
import KeyIcon from "@mui/icons-material/Key";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import React, { useState } from "react";
import { InputAdornment, Link } from "@mui/material";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { data },
      } = await axios.post("http://localhost:8080/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      console.log(data.token);
    } catch (error) {
      console.log(error);
    }

    console.log("Registered successfully", name, email, password);
  };

  return (
    <S.Form onSubmit={onSubmit}>
      <h1>Register</h1>
      <S.TextField
        id="name"
        label="Name"
        type="text"
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <PersonAddAltIcon />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setName(e.target.value)}
      />
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
        Register
      </S.Button>
      <p>Already registered? <Link href="/login">Login</Link></p>
    </S.Form>
  );
};

export default RegisterForm;
