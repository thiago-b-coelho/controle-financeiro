import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import axios from "axios";

const chartSetting = {
  yAxis: [
    {
      label: "Reais",
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};
const dataset = [
  {
    income: 59,
    expense: 57,
    year: '2020',
  },
  {
    income: 50,
    expense: 52,
    year: '2021',
  },
  {
    income: 47,
    expense: 53,
    year: '2022',
  },
];

const valueFormatter = (value) => `R$ ${value/100}`;

const Chart = () => {
  return (
    <div>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: "year" }]}
        series={[
          { dataKey: "income", label: "Income", valueFormatter },
          { dataKey: "expense", label: "Expense", valueFormatter },
        ]}
        {...chartSetting}
      />
    </div>
  );
};

export default Chart;
