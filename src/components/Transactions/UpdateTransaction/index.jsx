"use client";
import axios from "axios";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PaymentsTwoToneIcon from "@mui/icons-material/PaymentsTwoTone";
import EventTwoToneIcon from "@mui/icons-material/EditCalendarTwoTone";
import * as S from "./style.jsx";
import React, { useEffect, useState } from "react";
import { InputAdornment, Link } from "@mui/material";
import { useRouter } from "next/navigation.js";

const UpdateTransaction = ({ transactionId }) => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [oldTransaction, setOldTransaction] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const {
          data: { data },
        } = await axios.get(`http://localhost:8080/category`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(data);
      } catch (error) {
        handleNotification(error.response.data.message, "error");
      }
    };

    const getTransaction = async () => {
      try {
        const token = localStorage.getItem("token");
        const {
          data: { data },
        } = await axios.get(
          `http://localhost:8080/transaction/${transactionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOldTransaction(data.description);
        setDescription(data.description);
        setCategory(data.category_id);
        setValue(data.value);
        setType(data.type);
        setDate(data.date);
      } catch (error) {
        handleNotification(error.response.data.message, "error");
      }
    };

    getCategories();
    getTransaction();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        `http://localhost:8080/transaction/${transactionId}`,
        { description, value, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleNotification(data.message, "success");
      setOldTransaction(description);
    } catch (error) {
      handleNotification(error.response.data.message, "error");
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
        <h1>Update Transaction '{oldTransaction}'</h1>
        <S.TextField
          id="name"
          label="New transaction"
          type="text"
          variant="outlined"
          size="small"
          value={description}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EditNoteIcon />
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
                <PaymentsTwoToneIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setValue(e.target.value)}
        />

        <S.FormControl fullWidth size="small">
          <S.InputLabel id="type">Type</S.InputLabel>
          <S.Select
            labelId="Type"
            id="types"
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
          >
            <S.MenuItem value="Expense">Expense</S.MenuItem>
            <S.MenuItem value="Income">Income</S.MenuItem>
          </S.Select>
        </S.FormControl>

        <S.FormControl fullWidth size="small">
          <S.InputLabel id="category">Category</S.InputLabel>
          <S.Select
            labelId="Category"
            id="categories"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => (
              <S.MenuItem key={category.id} value={category.id}>
                {category.name}
              </S.MenuItem>
            ))}
          </S.Select>
        </S.FormControl>

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

export default UpdateTransaction;
