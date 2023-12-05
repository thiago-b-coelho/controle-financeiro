"use client";

import Chart from "@/components/Chart";
import Panel from "@/components/Panel";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [user, setUser] = useState({ id: null });
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
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        router.push("/login");
      });
  }, []);

  return (
    <div>
      <h1>Olá, {user.name}</h1>
      <Panel />
      <Chart />
    </div>
  );
};

export default DashboardPage;
