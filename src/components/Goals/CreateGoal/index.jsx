"use client";
import axios from "axios";
import EmojiEventsIcon from "@mui/icons-material/EmojiEventsTwoTone";
import SavingsTwoToneIcon from '@mui/icons-material/SavingsTwoTone';
import EventTwoToneIcon from '@mui/icons-material/EditCalendarTwoTone';
import * as S from "./style.jsx";
import React, { useState } from "react";
import { InputAdornment } from "@mui/material";
import { useRouter } from "next/navigation.js";

const CreateGoal = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
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
        "http://localhost:8080/goal",
        { description, value, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleNotification(data.message, "success");
    } catch (error) {
      console.log(error);
      handleNotification(error[0], "error");
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
        <h1>Create goal</h1>
        <S.TextField
          id="name"
          label="Goal"
          type="text"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmojiEventsIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setDescription(e.target.value)}
        />

        <S.TextField
          id="name"
          label="Amount"
          type="text"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SavingsTwoToneIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setValue(e.target.value)}
        />

        <S.TextField
          id="name"
          label="Final Date"
          type="text"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EventTwoToneIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setDate(e.target.value)}
        />

        <S.Button variant="contained" type="submit">
          Create
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

export default CreateGoal;
