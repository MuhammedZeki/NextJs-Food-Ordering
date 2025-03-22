"use client";
import Title from "@/app/ui/Title";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagramSquare,
  FaPinterest,
} from "react-icons/fa";
import { IoMail } from "react-icons/io5";
const Footer = () => {
  const [footer, setFooter] = useState([]);

  useEffect(() => {
    const getFooter = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/footer`
        );
        setFooter(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getFooter();
  }, []);
  return (
    <div className="bg-secondary">
      <div className="container mx-auto ">
        <div className="flex flex-col  gap-y-3">
          <div
            className="flex flex-col gap-y-2 items-center
                 justify-center py-5
                 md:flex md:flex-row md:gap-y-4 
                 "
          >
            <div className="flex md:flex-1 flex-col gap-y-2 items-center justify-center my-5 text-white">
              <Title addClass="text-[28px]">Contact Us</Title>
              <div className="flex flex-col gap-y-1">
                <a
                  className="flex justify-center items-center gap-x-1"
                  href="#"
                >
                  <FaMapMarkerAlt />
                  <span>{footer?.location}</span>
                </a>
                <a
                  className="flex justify-center items-center gap-x-1"
                  href="#"
                >
                  <FaPhoneAlt />
                  <span>Call +{footer?.phoneNumber}</span>
                </a>
                <a
                  className="flex justify-center items-center gap-x-1"
                  href="#"
                >
                  <IoMail />
                  <span>{footer?.email}</span>
                </a>
              </div>
            </div>
            <div className="flex md:flex-1 flex-col gap-y-2 items-center justify-center my-5 text-white">
              <Title addClass="text-[38px]">Fenae</Title>
              <div className="flex flex-col gap-y-1">
                <p className="text-[16px] px-4 text-center">
                  {footer?.description}
                </p>
                <div className="flex justify-center items-center gap-x-1 my-3">
                  <a
                    href=""
                    className="bg-white grid place-content-center rounded-full w-8 h-8 text-secondary hover:text-primary"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href=""
                    className="bg-white grid place-content-center rounded-full w-7 h-8 text-secondary hover:text-primary"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href=""
                    className="bg-white grid place-content-center rounded-full w-8 h-8 text-secondary hover:text-primary"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href=""
                    className="bg-white grid place-content-center rounded-full w-8 h-8 text-secondary hover:text-primary"
                  >
                    <FaInstagramSquare />
                  </a>
                  <a
                    href=""
                    className="bg-white grid place-content-center rounded-full w-8 h-8 text-secondary hover:text-primary"
                  >
                    <FaPinterest />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex md:flex-1 flex-col gap-y-2 items-center justify-center my-5 text-white">
              <Title addClass="text-[28px]">Opening Hours</Title>
              <div className="flex flex-col items-center gap-y-1">
                <p className="text-lg">{footer?.time?.day}</p>
                <p className="text-lg">{footer?.time?.hour}</p>
              </div>
            </div>
          </div>
          <div className="text-center text-white mb-5">
            <span className="font-semibold text-[16px]">
              © 2025 All Rights Reserved By Free Html Templates
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
