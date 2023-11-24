"use client";

import UpdateCategory from "@/components/Categories/UpdateCategory";
import CreateGoal from "@/components/Goals/CreateGoal";
import UpdateGoal from "@/components/Goals/UpdateGoal";
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
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <UpdateGoal goalId={1}/>
      {/* <UpdateCategory categoryId={2}/> */}
    </div>
  );
};

export default DashboardPage;
