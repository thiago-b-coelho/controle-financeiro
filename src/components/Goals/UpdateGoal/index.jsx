"use client";
import axios from "axios";
import EmojiEventsIcon from "@mui/icons-material/EmojiEventsTwoTone";
import SavingsTwoToneIcon from '@mui/icons-material/SavingsTwoTone';
import EventTwoToneIcon from '@mui/icons-material/EditCalendarTwoTone';
import * as S from "./style.jsx";
import React, { useEffect, useState } from "react";
import { InputAdornment, Link } from "@mui/material";
import { useRouter } from "next/navigation.js";

const UpdateGoal = ({goalId}) => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [oldGoal, setOldGoal] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    const getGoal = async () => {
      try {
        const token = localStorage.getItem('token');
        const {data: {data}} = await axios.get(`http://localhost:8080/goal/${goalId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setOldGoal(data.description)
        setDescription(data.description);
        setValue(data.value)
        setDate(data.date)
      }catch (error) {
        handleNotification(error.response.data.message, "error");
      }
    }
    getGoal();
  },[]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const { data }  = await axios.put(
        `http://localhost:8080/goal/${goalId}`,
        { description, value, date },
        { headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleNotification(data.message, "success");
      setOldGoal(description)
    } catch (error) {
      console.log(error)
      //handleNotification(error.response.data.error, "error");
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
        <h1>Update Goal '{oldGoal}'</h1>
        <S.TextField
          id="name"
          label="New goal"
          type="text"
          variant="outlined"
          size="small"
          value={description}
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
          value={value}
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
          value={date}
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

export default UpdateGoal;
