"use client";
import Title from "@/app/ui/Title";
import { reset } from "@/lib/features/CardSlicer";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Cagliostro } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const CardPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const { data: session, status } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users`
        );
        if (res.status === 200) {
          setUsers(res.data);
        }
      } catch (error) {
        console.log(error.res.data.message || error.message);
      }
    };
    fetchUser();
  }, []);

  const getUser =
    session && status === "authenticated"
      ? users?.find((user) => user.email === session?.user.email)
      : null;

  const handleCheckNow = async () => {
    const orderObj = {
      customer: getUser?.fullName,
      address: getUser?.address || "No address",
      total: cart.total,
      method: 0,
    };
    if (session?.user) {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/order`,
          orderObj
        );
        if (res.status === 200) {
          toast.success("Success", { autoClose: 2000 });
          dispatch(reset());
          push(`/order/${session?.user.id}`);
        }
      } catch (error) {
        console.log(error.response.data.message || error.message);
      }
    } else {
      toast.warning("Please Login First!!");
    }
  };

  if (!session?.user || !getUser) {
    return (
      <div className="container mx-auto">
        <div className="min-h-[calc(100vh_-_433px)] grid place-content-center">
          <Title addClass="text-[40px]"> Not logged in</Title>
        </div>
      </div>
    );
  }
  if (status === "loading") {
    return (
      <div className="container mx-auto">
        <div className="min-h-[calc(100vh_-_433px)] grid place-content-center">
          <Title addClass="text-[40px]">Loading...</Title>
        </div>
      </div>
    );
  }
  return (
    <div className="flex-col lg:flex lg:flex-row items-center  text-white min-h-[calc(100vh_-_400px)]  ">
      <div className="lg:w-4/5 flex items-center my-2 w-full overflow-x-auto">
        <div className="max-h-52 overflow-auto w-full">
          {cart?.products?.length > 0 ? (
            <table className="mx-5  min-w-[1000px] ">
              <thead className="bg-slate-600">
                <tr className="text-center my-2">
                  <th className="text-slate-300 p-3">Product</th>
                  <th className="text-slate-300 ">Extras</th>
                  <th className="text-slate-300">Price</th>
                  <th className="text-slate-300">Quntity</th>
                </tr>
              </thead>
              <tbody className="bg-slate-800 py-2">
                {cart.products.map((product) => (
                  <tr
                    key={product._id}
                    className="text-center my-2 hover:text-slate-300 hover:bg-slate-500"
                  >
                    <td className="flex justify-center items-center gap-x-1  p-2">
                      <Image
                        alt=""
                        src={product?.image}
                        width={50}
                        height={50}
                      />
                      <span className="hover:text-slate-300">
                        {product.title}
                      </span>
                    </td>
                    <td>
                      {product.extraOptions.length > 0
                        ? product.extraOptions.map((extra) => (
                            <span
                              key={extra.id}
                              className="hover:text-slate-300 mr-1"
                            >
                              {extra.text}
                            </span>
                          ))
                        : "Extra Yok"}
                    </td>
                    <td>
                      <span className="hover:text-slate-300">
                        ${product.price}
                      </span>
                    </td>
                    <td>
                      <span className="hover:text-slate-300">
                        {product.quantity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="grid place-content-center">
              <Title addClass="text-[40px] text-black">
                Siparişiniz Yoktur
              </Title>
            </div>
          )}
        </div>
      </div>
      <div className="lg:w-1/5 bg-secondary  lg:min-h-[calc(100vh_-_400px)] grid place-content-center">
        <div>
          <Title addClass="text-[56px] my-3">Cart Total</Title>
          <div className="flex flex-col gap-y-1 my-3">
            <span>SubTotal:${cart.total}</span>
            <span>Discount:$0.00</span>
            <span>Total:${cart.total}</span>
          </div>
          <button
            className="bg-primary py-2 px-3 rounded-lg my-2"
            onClick={handleCheckNow}
          >
            CheckOut Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
