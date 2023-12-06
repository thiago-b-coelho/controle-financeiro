"use client";
import React, { useEffect, useState } from "react";
import Cards from "../Cards";
import { Grid } from "@mui/material";
import { AccountBalanceWallet, AdsClick, LocalAtm, SwapHoriz } from "@mui/icons-material";
import axios from "axios";

const Panel = () => {
  const [goals, setGoals] = useState([]);
  const [balance, setBalance] = useState({
    balance: 0,
    income: 0,
    expense: 0
  })
  useEffect(() => {
    const getTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const {
          data: { data },
        } = await axios.get("http://localhost:8080/transaction", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const sum = {};
        for (const transaction of data) {
          if (transaction.type == "Income") {
            sum.income = sum.income
              ? sum.income + transaction.value
              : transaction.value;
          }
          if (transaction.type == "Expense") {
            sum.expense = sum.expense
              ? sum.expense + transaction.value
              : transaction.value;
          }
        }
        sum.balance = sum.income - sum.expense
        setBalance(sum)
      } catch (error) {
        console.log(error);
      }
    };
    getTransactions();
  }, []);

  useEffect(() => {
    const getGoals = async () => {
      try {
        const token = localStorage.getItem("token");
        const {
          data: { data },
        } = await axios.get("http://localhost:8080/goal", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGoals(data)
      } catch (error) {
        console.log(error);
      }
    };
    getGoals();
  }, []);

  return (
    <>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={6} >
          <Cards
            icon={<AccountBalanceWallet />}
            label="Current balance"
            value={`R$ ${balance.balance/100}`}
          />
          <Cards
            icon={<LocalAtm />}
            label="Incomes"
            value={`R$ ${balance.income/100}`}
          />
        </Grid>
        <Grid item xs={6}>
          <Cards
            icon={<SwapHoriz />}
            label="Expenses"
            value={`R$ ${balance.expense/100}`}
          />
          <Cards
            icon={<AdsClick />}
            label="Goals"
            balance={balance.balance}
            isGoal
            goals={goals}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Panel;
