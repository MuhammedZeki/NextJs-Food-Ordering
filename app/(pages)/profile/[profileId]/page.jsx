"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaHome, FaKey, FaMotorcycle } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";
import axios from "axios";
import Account from "../_components/Account";
import Password from "../_components/Password";
import Orders from "../_components/Orders";
import Title from "@/app/ui/Title";

const UserProfile = () => {
  const params = useParams();
  const { profileId } = params;
  const [user, setUser] = useState(null);
  const [tabs, setTabs] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/user/${profileId}`
        );
        if (res.status === 200) {
          const userData = await res.data;
          setUser(userData);
        }
      } catch (error) {
        console.log(error.message || error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [profileId]);
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
    <div className="p-10 min-h-[calc(100vh_-_400px)]">
      <div className="md:flex md:flex-row md:items-start md:gap-x-10 flex flex-col gap-y-10">
        <div className="md:w-1/3 w-full flex flex-col gap-y-3 border-2 rounded-lg border-primary ">
          <div className="relative flex flex-col gap-y-1 p-5 justify-center items-center">
            <Image
              alt=""
              src={user?.image || "/images/client1.jpg"}
              className="rounded-full"
              width={112}
              height={112}
              style={{ objectFit: "contain" }}
            />
            <span className="uppercase font-bold my-2">
              {user?.fullName || ""}
            </span>
          </div>
          <div className="flex flex-col">
            <div
              className={`flex cursor-pointer justify-center md:justify-start items-center  p-4 border-t-2 border-primary  gap-x-2 hover:text-white hover:bg-primary transition-all duration-300 ${
                tabs === 0 && "bg-primary text-white"
              }`}
              onClick={() => setTabs(0)}
            >
              <FaHome size={20} />
              Account
            </div>
            <div
              className={`flex cursor-pointer justify-center md:justify-start items-center  p-4 border-b-2 border-t-2 border-primary  gap-x-2 hover:text-white hover:bg-primary transition-all duration-300 ${
                tabs === 1 && "bg-primary text-white"
              }`}
              onClick={() => setTabs(1)}
            >
              <FaKey /> Password
            </div>
            <div
              className={`flex cursor-pointer justify-center md:justify-start items-center border-b-2 p-4  border-primary  gap-x-2 hover:text-white hover:bg-primary transition-all duration-300 ${
                tabs === 2 && "bg-primary text-white"
              }`}
              onClick={() => setTabs(2)}
            >
              <FaMotorcycle /> Orders
            </div>
            <div
              className={`flex cursor-pointer justify-center md:justify-start items-center  p-4  border-primary  gap-x-2 hover:text-white hover:bg-primary transition-all duration-300`}
              onClick={() => signOut()}
            >
              <IoMdExit />
              Çıkış
            </div>
          </div>
        </div>
        <div className="md:w-2/3 w-full flex-col">
          {tabs === 0 && user && <Account userSettings={user} />}
          {tabs === 1 && <Password userSettings={user} />}
          {tabs === 2 && <Orders />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
