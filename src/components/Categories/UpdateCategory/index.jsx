"use client";
import axios from "axios";
import AddchartIcon from "@mui/icons-material/Addchart";
import * as S from "../../../styles/style";
import React, { useEffect, useState } from "react";
import { InputAdornment, Link } from "@mui/material";
import { useRouter } from "next/navigation.js";

const UpdateCategory = ({categoryId}) => {
  const URL = 'https://controle-financeiro-02288fa9a600.herokuapp.com';
  // const URL = 'http://localhost:8080'const router = useRouter();
  const [name, setName] = useState("");
  const [oldName, setOldName] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    const getCategory = async () => {
      try {
        const token = localStorage.getItem('token');
        const {data: {data}} = await axios.get(`${URL}/category/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setName(data.name);
        setOldName(data.name);
      }catch (error) {
        handleNotification(error.response.data.message, "error");
      }
    }
    getCategory();
  },[]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const { data }  = await axios.put(
        `${URL}/category/${categoryId}`,
        { name },
        { headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleNotification(data.message, "success");
      setOldName(name)
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
        <h1>Update category '{oldName}'</h1>
        <S.TextField
          id="name"
          label="New name"
          type="text"
          variant="outlined"
          size="small"
          value={name}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AddchartIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setName(e.target.value)}
        />

        <S.Button variant="contained" type="submit">
          Update
        </S.Button>
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

export default UpdateCategory;
