"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as S from "../../../styles/style.jsx";
import CreateCategory from "@/components/Categories/CreateCategory";
import CreateGoal from "@/components/Goals/CreateGoal/index.jsx";
import CreateTransaction from "@/components/Transactions/CreateTransaction/index.jsx";
import TransactionList from "@/components/TransactionList/index.jsx";

const Transactions = () => {
  const router = useRouter();
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openGoalModal, setOpenGoalModal] = useState(false);
  const [user, setUser] = useState({
    id: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    axios
      .get("http://localhost:8080/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setUser(response.data.data))
      .catch((_) => {
        router.push("/login");
      });
  }, []);

  return (
    <div>
      <S.ModalButtonBox>
        <S.Button
          variant="contained"
          onClick={() => setOpenCategoryModal(true)}
        >
          New category
        </S.Button>
        <S.Button variant="contained" onClick={() => setOpenGoalModal(true)}>
          New goal
        </S.Button>
        <S.Button
          variant="contained"
          onClick={() => setOpenTransactionModal(true)}
        >
          New transaction
        </S.Button>
      </S.ModalButtonBox>
      <CreateCategory open={openCategoryModal} setOpen={setOpenCategoryModal} />
      <CreateGoal open={openGoalModal} setOpen={setOpenGoalModal} />
      <CreateTransaction
        open={openTransactionModal}
        setOpen={setOpenTransactionModal}
      />
      <TransactionList />
    </div>
  );
};

export default Transactions;
