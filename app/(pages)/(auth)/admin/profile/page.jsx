"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaHome, FaMotorcycle } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { IoMdCard } from "react-icons/io";
import Products from "./_components/Products";
import Orders from "./_components/Orders";
import Categories from "./_components/Categories";
import Footer from "./_components/Footer";
import Title from "@/app/ui/Title";
import axios from "axios";
import AddNewProduct from "./_components/AddNewProduct";
import { signOut, useSession } from "next-auth/react";
const AdminProfile = () => {
  const [tabs, setTabs] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProduct, setIsProduct] = useState(false);
  const { data: session, status } = useSession();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`
        );
        const data = await res.data;
        if (!data) {
          console.log(data, "No Categories");
        }

        setCategories(data);
        setLoading(true);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!session?.user || status === "unauthenticated") {
    return (
      <div className="container mx-auto">
        <div className="min-h-[calc(100vh_-_433px)] grid place-content-center">
          <Title addClass="text-[40px]">Admin not looged in </Title>
        </div>
      </div>
    );
  }

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
    <div className=" p-10 min-h-[calc(100vh_-_400px)] ">
      <div className="md:flex md:flex-row md:items-start md:gap-x-10 flex flex-col gap-y-10">
        <div className="md:w-1/3 w-full flex flex-col gap-y-3 border-2 rounded-lg border-primary ">
          <div className="relative flex flex-col gap-y-1 p-5 justify-center items-center">
            <Image
              alt=""
              src="/images/admin.png"
              className="rounded-full"
              width={112}
              height={112}
              style={{ objectFit: "contain" }}
            />
            <span className="uppercase font-bold my-2">Admin </span>
          </div>
          <div className="flex flex-col">
            <div
              className={`flex cursor-pointer justify-center md:justify-start items-center  p-4 border-t-2 border-primary  gap-x-2 hover:text-white hover:bg-primary transition-all duration-300 ${
                tabs === 0 && "bg-primary text-white"
              }`}
              onClick={() => setTabs(0)}
            >
              <FaHome size={20} />
              Products
            </div>
            <div
              className={`flex cursor-pointer justify-center md:justify-start items-center  p-4 border-b-2 border-t-2 border-primary  gap-x-2 hover:text-white hover:bg-primary transition-all duration-300 ${
                tabs === 1 && "bg-primary text-white"
              }`}
              onClick={() => setTabs(1)}
            >
              <BiCategoryAlt size={20} /> Categories
            </div>
            <div
              className={`flex cursor-pointer justify-center md:justify-start items-center border-b-2 p-4  border-primary  gap-x-2 hover:text-white hover:bg-primary transition-all duration-300 ${
                tabs === 2 && "bg-primary text-white"
              }`}
              onClick={() => setTabs(2)}
            >
              <FaMotorcycle size={20} /> Orders
            </div>
            <div
              className={`flex cursor-pointer justify-center md:justify-start items-center  p-4 border-b-2  border-primary  gap-x-2 hover:text-white hover:bg-primary transition-all duration-300 ${
                tabs === 3 && "bg-primary text-white"
              }`}
              onClick={() => setTabs(3)}
            >
              <IoMdCard size={20} />
              Footer
            </div>
            <div
              className={`flex cursor-pointer justify-center md:justify-start items-center  p-4  border-primary  gap-x-2 hover:text-white hover:bg-primary transition-all duration-300 ${
                tabs === 4 && "bg-primary text-white"
              }`}
              onClick={() => signOut()}
            >
              <IoMdExit size={20} />
              Çıkış
            </div>
          </div>
        </div>
        <div className="md:w-2/3 w-full flex-col">
          {tabs === 0 && <Products />}
          {tabs === 1 && <Categories categories={categories} />}
          {tabs === 2 && <Orders />}
          {tabs === 3 && <Footer />}
          {isProduct && <AddNewProduct setIsProduct={setIsProduct} />}
        </div>
        <button
          onClick={() => setIsProduct(true)}
          className="absolute bottom-5  right-5 rounded-full text-white text-2xl  bg-primary w-12 h-12"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
