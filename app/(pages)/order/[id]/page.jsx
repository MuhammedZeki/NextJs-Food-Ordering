"use client";
import Title from "@/app/ui/Title";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const OrderDetails = () => {
  const [orders, setOrders] = useState([] || null);
  const { data: session, status } = useSession();

  const getStatus = orders[0]?.status;
  useEffect(() => {
    const fetchData = async () => {
      if (session?.user) {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/order`
          );
          console.log("res data", res.data);
          if (res.status === 200) {
            setOrders(res.data);
          }
        } catch (error) {
          console.log(error.response.data.message || error.message);
        }
      } else {
        console.log("Please first Login");
      }
    };
    fetchData();
  }, [session, status]);
  console.log(orders);

  const handleStatus = (index) => {
    if (index - getStatus < 1) return "";
    if (index - getStatus === 1) return "animate-pulse";
    if (index - getStatus > 1) return "";
  };

  if (!session?.user && status === "unauthenticated") {
    return (
      <div className="container mx-auto">
        <div className="min-h-[calc(100vh_-_433px)] grid place-content-center">
          <Title addClass="text-[40px]">Please Login First !</Title>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-col items-center  text-white h-full mt-14   min-h-[calc(100vh_-_433px)] ">
      <div className="flex items-center my-2 w-full  overflow-x-auto">
        <table className="mx-5 min-w-[1000px]  w-full ">
          <thead className="bg-slate-600">
            <tr className="text-center my-2">
              <th className="text-slate-300 p-3">Order Id</th>
              <th className="text-slate-300 ">Customer</th>
              <th className="text-slate-300">Address</th>
              <th className="text-slate-300">Total</th>
            </tr>
          </thead>
          <tbody
            className={` py-2 ${
              getStatus === 2 ? "bg-green-500" : "bg-slate-800"
            }`}
          >
            {orders.length > 0 &&
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="text-center my-2 hover:text-slate-300 hover:bg-slate-500"
                >
                  <td className="flex justify-center items-center gap-x-1  p-2">
                    <span className="hover:text-slate-300">
                      {order?._id.substring(0, 6)}...
                    </span>
                  </td>
                  <td>
                    <span className="hover:text-slate-300">
                      {order?.customer}
                    </span>
                  </td>
                  <td>
                    <span className="hover:text-slate-300">
                      {order?.address}
                    </span>
                  </td>
                  <td>
                    <span className="hover:text-slate-300">${order.total}</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-y-5 items-center lg:flex lg:flex-row lg:items-center lg:justify-between p-8 mt-14 rounded-xl container mx-auto bg-primary w-full text-black mb-6">
        <div
          className={`relative flex-col gap-y-1 border-b-2 border-black lg:border-none ${handleStatus(
            0
          )}`}
        >
          <Image
            alt=""
            src="/images/paid.png"
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
          />
          <span>Payment</span>
        </div>
        <div
          className={`relative flex-col gap-y-1 border-b-2 border-black lg:border-none ${handleStatus(
            1
          )}`}
        >
          <Image
            alt=""
            src="/images/bake.png"
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
          />
          <span>Preparing</span>
        </div>
        <div
          className={`relative flex-col gap-y-1 border-b-2 border-black lg:border-none ${handleStatus(
            2
          )}`}
        >
          <Image
            alt=""
            src="/images/bike.png"
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
          />
          <span>On the way</span>
        </div>
        <div
          className={`relative flex-col gap-y-1 border-b-2 border-black lg:border-none ${handleStatus(
            3
          )}`}
        >
          <Image
            alt=""
            src="/images/delivered.png"
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
          />
          <span>Delivered</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
