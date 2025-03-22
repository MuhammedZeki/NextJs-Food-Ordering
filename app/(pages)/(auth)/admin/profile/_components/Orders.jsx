"use client";
import Title from "@/app/ui/Title";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { data: session, status } = useSession();
  const [getStatus, setGetStatus] = useState([
    "preparing",
    "on the way",
    "delivered",
  ]);
  useEffect(() => {
    const fetchData = async () => {
      if (session?.user) {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/order`
          );
          if (res.status === 200) {
            setOrders(res.data);
          }
        } catch (error) {
          console.log(error.response.data.message || error.message);
        }
      } else {
        console.log("Please fist Login");
      }
    };
    fetchData();
  }, [session]);

  const handleStatus = async (id) => {
    const orderItem = orders.filter((order) => order._id === id);
    const currentStatus = orderItem[0]?.status;
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}`,
        { status: currentStatus + 1 }
      );
      if (res.status === 200) {
        setOrders((prevState) => [
          res.data,
          ...prevState.filter((prev) => prev._id !== id),
        ]);
      }
    } catch (error) {
      console.log(error.message || error.response.data.messaged);
    }
  };

  if (!session?.user || status === "unauthenticated") {
    return (
      <div className="container mx-auto">
        <div className="min-h-[calc(100vh_-_433px)] grid place-content-center">
          <Title addClass="text-[40px]">User not looged in </Title>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto">
        <div className="min-h-[calc(100vh_-_433px)] grid place-content-center">
          <Title addClass="text-[40px]">Orders not found </Title>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Orders</Title>
      <div className="overflow-x-auto w-full mt-5">
        <table className="w-full text-sm text-center text-gray-500 min-w-100% xl:min-w-[1000px] ">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                Product
              </th>
              <th scope="col" className="py-3 px-6">
                Customer
              </th>
              <th scope="col" className="py-3 px-6">
                Total
              </th>
              <th scope="col" className="py-3 px-6">
                Payment
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((order) => (
                  <tr
                    key={order?._id}
                    className="transition-all bg-secondary border-gray-700 hover:bg-primary cursor-pointer"
                  >
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order?._id.substring(0, 6)}...
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order?.customer}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      ${order?.total}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order?.method === 0 ? "Cash" : "Cart"}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {getStatus[order?.status]}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      <button
                        className={`bg-green-600 rounded-md py-1 px-2 text-white ${
                          order?.status > 1 ? "bg-yellow-600" : ""
                        }`}
                        onClick={() => handleStatus(order?._id)}
                        disabled={order?.status > 1}
                      >
                        {order?.status > 1 ? "Success" : "Next Stage"}
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
