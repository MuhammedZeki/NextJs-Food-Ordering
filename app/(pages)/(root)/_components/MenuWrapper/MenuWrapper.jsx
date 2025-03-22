"use client";
import Title from "@/app/ui/Title";
import React, { useEffect, useState } from "react";
import MenuItems from "./MenuItems";
import axios from "axios";

const MenuWrapper = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [item, setItem] = useState(1);
  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`
        );
        if (res.status === 200) {
          setCategories(res.data);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/addProduct`
        );
        if (res.status === 200) {
          setProducts(res.data);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);
  useEffect(() => {
    if (categories.length > 0) {
      setFilter(
        products.filter(
          (product) =>
            product.category === categories[index]?.title?.toLowerCase()
        )
      );
    }
  }, [products, categories, index]);
  if (loading) {
    return (
      <div className="container mx-auto">
        <div className="min-h-[calc(100vh_-_433px)] grid place-items-center">
          <Title addClass="text-[40px]">Loading</Title>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto  my-10 flex flex-col items-center">
      <Title addClass="text-[40px] my-5 ">Our Menu</Title>
      <div className="flex items-center justify-center my-6">
        {categories.map((category, i) => (
          <button
            key={i}
            onClick={() => {
              setIndex(i);
              setItem(1);
            }}
            className={`px-6 py-3 ${
              index === i
                ? "bg-secondary text-white rounded-md"
                : "bg-white text-black"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>
      <div
        className={` grid gap-4 min-h-[433px] grid-cols-1 my-8 ${
          filter.length > 0 && "md:grid-cols-3 sm:grid-cols-2"
        }`}
      >
        {filter.length > 0 ? (
          filter
            .slice(0, item)
            .map((product) => <MenuItems product={product} key={product._id} />)
        ) : (
          <div className="grid place-content-center ">
            <Title addClass="text-[40px]">No Found</Title>
          </div>
        )}
      </div>
      <div>
        <button
          type="button"
          className="bg-primary px-2 py-1 mt-8 text-white rounded-md "
          onClick={() => setItem((prevState) => prevState + 3)}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default MenuWrapper;
