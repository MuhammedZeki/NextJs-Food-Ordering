"use client";
import Title from "@/app/ui/Title";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Categories = ({ categories: initialCategories }) => {
  const [categories, setCategories] = useState(initialCategories);
  const [handleInput, setHandleInput] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCreate = async () => {
    const newCategory = {
      title: handleInput,
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`,
        newCategory
      );

      if (response.status === 200) {
        setCategories((prevState) => [...prevState, response.data]);
        setHandleInput("");
        setLoading(true);
        console.log("Success");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleted = async (categoryId) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories/${categoryId}`
      );
      if (res.status === 200) {
        console.log("Success");
        setCategories((prev) =>
          prev.filter((category) => category._id !== categoryId)
        );
        setLoading(true);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto">
        <div className="min-h-[calc(100vh_-_433px)] grid place-content-center">
          <Title addClass="text-[40px]">Loading</Title>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Categories</Title>
      <div className="flex items-center w-full gap-x-2">
        <input
          type="text"
          onChange={(e) => setHandleInput(e.target.value)}
          value={handleInput}
          className="w-[80%] border-2 border-primary py-2 px-4"
          placeholder="Add new Category"
        />
        <button
          className="py-2 px-3 bg-primary w-[20%] text-white rounded-md"
          onClick={handleCreate}
        >
          Add
        </button>
      </div>
      {categories.map((category, i) => (
        <div key={i} className="flex items-center justify-between mt-2">
          <div>{category.title}</div>
          <button
            className="bg-red-700 py-2 px-3 text-white"
            onClick={() => handleDeleted(category._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Categories;
