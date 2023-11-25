"use client";

import UpdateCategory from "@/components/Categories/UpdateCategory";
import CreateGoal from "@/components/Goals/CreateGoal";
import UpdateGoal from "@/components/Goals/UpdateGoal";
import CreateTransaction from "@/components/Transactions/CreateTransaction";
import UpdateTransaction from "@/components/Transactions/UpdateTransaction";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const DashboardPage = () => {
  const router = useRouter();
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
      .then()
      .catch((error) => {
        router.push("/login");
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <UpdateGoal goalId={1}/> */}
      {/* <UpdateCategory categoryId={2}/> */}
      {/* <CreateTransaction /> */}
      <UpdateTransaction transactionId={1}/>
    </div>
  );
};

export default DashboardPage;
