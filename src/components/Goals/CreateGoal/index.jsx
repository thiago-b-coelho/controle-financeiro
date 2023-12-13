"use client";
import axios from "axios";
import EmojiEventsIcon from "@mui/icons-material/EmojiEventsTwoTone";
import SavingsTwoToneIcon from "@mui/icons-material/SavingsTwoTone";
import * as S from "../../../styles/style.jsx";
import React, { forwardRef, useState } from "react";
import { InputAdornment, Modal } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { formatISO } from "date-fns";
import { ptBR } from "date-fns/locale";

/* Big chunk of code just to give the 'money' field some format */
const NumericFormatCustom = forwardRef(function NumericFormatCustom(
  props,
  ref
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

const CreateGoal = ({ open, setOpen }) => {
  const URL = 'https://controle-financeiro-02288fa9a600.herokuapp.com';
  // const URL = 'http://localhost:8080'
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
        `${URL}/goal`,
        {
          description,
          value: value * 100,
          date: formatISO(date, { representation: "date", locale: ptBR }),
        },
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
            <h1>Create goal</h1>
            <S.TextField
              id="goal"
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
              id="amount"
              label="Amount"
              type="text"
              variant="outlined"
              size="small"
              InputProps={{
                inputComponent: NumericFormatCustom,
                endAdornment: (
                  <InputAdornment position="end">
                    <SavingsTwoToneIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setValue(e.target.value)}
            />

            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ptBR}
            >
              <DatePicker
                onChange={(newValue) => setDate(newValue)}
                sx={{
                  "& .MuiOutlinedInput-input": {
                    padding: "8px",
                    fontSize: "14px",
                  },
                }}
              />
            </LocalizationProvider>

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

export default CreateGoal;
