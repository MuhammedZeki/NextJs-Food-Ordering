import Title from "@/app/ui/Title";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [orders, setOrders] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/order`
        );
        if (res.status == 200) {
          setOrders(
            res.data.filter((order) => order.customer === currentUser.fullName)
          );
        }
      } catch (error) {
        console.log(error.message || error.response.data.message);
      }
    };
    fetchOrder();
  }, [currentUser]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users`
        );
        if (res.status === 200) {
          setCurrentUser(
            res.data.filter((user) => user.email === session?.user.email)[0]
          );
        }
      } catch (error) {
        console.log(error.message || error.response.data.message);
      }
    };
    fetchUser();
  }, [session]);

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Orders</Title>
      <div className="overflow-x-auto w-full mt-5">
        <table className="w-full text-sm text-center text-gray-500 xl:min-w-[1000px] min-w-100%">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                ID
              </th>
              <th scope="col" className="py-3 px-6">
                ADRESS
              </th>
              <th scope="col" className="py-3 px-6">
                DATE
              </th>
              <th scope="col" className="py-3 px-6">
                TOTAL
              </th>
              <th scope="col" className="py-3 px-6">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.length > 0 &&
              orders.map((order) => (
                <>
                  <tr className="transition-all bg-secondary border-gray-700 hover:bg-primary ">
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                      <span>{order?._id.substring(0, 6)}...</span>
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order?.address}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      01-09-2022
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      ${order?.total}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      preparing
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
