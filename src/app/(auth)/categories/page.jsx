"use client";
import CreateCategory from "@/components/Categories/CreateCategory";
import React from "react";
import { useState } from "react";
import * as S from "../../../styles/style"

const Categories = () => {
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  return (
    <>
      <S.Button variant="contained" onClick={() => setOpenCategoryModal(true)}>
        New category
      </S.Button>
      <CreateCategory open={openCategoryModal} setOpen={setOpenCategoryModal} />
    </>
  );
};

export default Categories;
