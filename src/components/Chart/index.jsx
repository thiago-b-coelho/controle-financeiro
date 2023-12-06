import { BarChart } from "@mui/x-charts/BarChart";
import {  axisClasses } from "@mui/x-charts";
import axios from "axios";
import { useEffect, useState } from "react";
import * as S from "../../styles/style"
import Loader from "../Loader";

const chartSetting = {
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(10px, 20px)",
    },
  },
  width: 900,
};

const valueFormatter = (value) => `R$ ${value}`;

const Chart = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsChart, setTransactionsChart] = useState([]);
  const [year, setYear] = useState("all");
  const [years, setYears] = useState(["all"]);
  const [report, setReport] = useState([]);

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
        const years = data
          .map((transaction) => new Date(transaction.date).getFullYear())
          .filter((year, index, years) => years.indexOf(year) === index)
          .sort((a, b) => a - b);
        setYears(["all", ...years]);

        setTransactions(data);
        setTransactionsChart(data);

        const sum = [];
        for (const transaction of data) {
          const year = new Date(transaction.date).getFullYear();
          sum[year] = sum[year] ?? {};
          if (transaction.type == "Income") {
            sum[year].income = sum[year].income
              ? sum[year].income + transaction.value
              : transaction.value;
          }
          if (transaction.type == "Expense") {
            sum[year].expense = sum[year].expense
              ? sum[year].expense + transaction.value
              : transaction.value;
          }
        }
        const repo = [];
        sum.forEach((item, index) => {
          repo.push({
            year: index,
            income: item.income/100 ?? 0,
            expense: item.expense/100 ?? 0,
          });
        });
        setReport(repo);
      } catch (error) {
        console.log(error);
      }
    };
    getTransactions();
  }, [transactions]);

  return (
    <div>
      {report.length ? (
        <S.ChartContainer>
        <BarChart
          dataset={report}
          xAxis={[{ scaleType: "band", dataKey: "year", categoryGapRatio: 0.5 }]}
          series={[
            { dataKey: "income", label: "Income", valueFormatter },
            { dataKey: "expense", label: "Expense", color: "#9E9E9E", valueFormatter },
          ]}
          {...chartSetting}
        />
        </S.ChartContainer>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Chart;
