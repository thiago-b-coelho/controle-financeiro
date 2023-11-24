"use client";

import CreateCategory from "@/components/Categories/CreateCategory";
import UpdateCategory from "@/components/Categories/UpdateCategory";
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
      <UpdateCategory categoryId={3} />
    </div>
  );
};

export default DashboardPage;
