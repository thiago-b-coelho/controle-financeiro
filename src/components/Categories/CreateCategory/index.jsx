"use client";
import axios from "axios";
import AddchartIcon from "@mui/icons-material/Addchart";
import * as S from "../../../styles/style.jsx";
import { Modal } from "@mui/material";
import React, { useState } from "react";
import { InputAdornment, Link } from "@mui/material";
import { useRouter } from "next/navigation.js";

const CreateCategory = ({ open, setOpen }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        "http://localhost:8080/category",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleNotification(data.message, "success");
      setOpen(false);
    } catch (error) {
      console.log(error);
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
      <Modal open={open} onClose={() => setOpen(false)}>
        <S.ModalBox>
          <S.Form onSubmit={onSubmit}>
            <h1>Create category</h1>
            <S.TextField
              id="name"
              label="Name"
              type="text"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AddchartIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setName(e.target.value)}
            />
            <S.ModalButtonBox>
              <S.Button variant="outlined" onClick={() => setOpen(false)}>
                Cancel
              </S.Button>
              <S.Button variant="contained" type="submit">
                Create
              </S.Button>
            </S.ModalButtonBox>
          </S.Form>
        </S.ModalBox>
      </Modal>

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

export default CreateCategory;
