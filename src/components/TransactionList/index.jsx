import { DataGrid } from "@mui/x-data-grid";
import { React, useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Chart from "../Chart";

function formatCurrency(number) {
  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const columns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "description", headerName: "Description", flex: 1.5 },
  {
    field: "value",
    headerName: "Value",
    flex: 1,
    valueGetter: (params) => `R$ ${params.row.value / 100}`,
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
  },
  {
    field: "category",
    headerName: "Category",
    flex: 1,
    // valueGetter: (params) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    valueGetter: (params) =>
      `${format(new Date(params.row.date), "d MMMM yyyy", { locale: ptBR })}`,
  },
];

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const getTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const {
          data: { data },
        } = await axios.get(`http://localhost:8080/transaction`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(data);
      } catch (error) {
        console.log(error);
        //handleNotification(error.response.data.message, "error");
      }
    };
    getTransactions();
  }, [transactions]);

  return (
    <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
      <DataGrid
        rows={transactions}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        disableExtendRowFullWidth
        pageSizeOptions={[5, 10]}
        autoHeight
      />
      <Chart />
    </div>
  );
};

export default TransactionList;
