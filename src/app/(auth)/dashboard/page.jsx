"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const DashboardPage = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
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

  return <div>DashboardPage</div>;
};

export default DashboardPage;
