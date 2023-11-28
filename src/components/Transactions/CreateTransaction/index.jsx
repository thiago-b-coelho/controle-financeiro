"use client";
import axios from "axios";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PaymentsTwoToneIcon from "@mui/icons-material/PaymentsTwoTone";
import EventTwoToneIcon from "@mui/icons-material/EditCalendarTwoTone";
import * as S from "../../../styles/style.jsx";
import React, { forwardRef, useEffect, useState } from "react";
import { InputAdornment, Modal } from "@mui/material";
import { useRouter } from "next/navigation.js";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";

const NumericFormatCustom = forwardRef(function NumericFormatCustom(
  props,
  ref,
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      valueIsNumericString
      decimalSeparator=","
      prefix="R$ "
    />
  );
});

const CreateTransaction = ({ open, setOpen }) => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState([]);
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
    getCategories();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        "http://localhost:8080/transaction",
        { description, value: value * 100, date, type, category_id: category },
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
      <Modal open={open} onClose={() => setOpen(false)}>
        <S.ModalBox>
          <S.Form onSubmit={onSubmit}>
            <h1>Create transaction</h1>
            <S.TextField
              id="name"
              label="Description"
              type="text"
              variant="outlined"
              size="small"
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
              label="Value"
              type="text"
              variant="outlined"
              size="small"
              InputProps={{
                inputComponent: NumericFormatCustom,
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
              label="Date"
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

export default CreateTransaction;
