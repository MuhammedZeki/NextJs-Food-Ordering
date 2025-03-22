"use client";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import Search from "../Search/Search";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiCancel } from "react-icons/gi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

const Header = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const pathname = usePathname();
  const cart = useSelector((store) => store.cart);
  const { data: session } = useSession();

  return (
    <div
      className={` h-[5.5rem] z-50 relative 
        ${pathname === "/" ? "bg-transparent" : "bg-secondary"}`}
    >
      <div
        className="container flex justify-between items-center 
        h-full mx-auto text-white"
      >
        <Logo />
        <nav
          className={` absolute top-0 left-0 z-50 w-full h-screen bg-white text-black hidden
             sm:static sm:w-auto sm:h-auto sm:text-white
              sm:bg-transparent  sm:flex 
              ${isMenu === true && "!grid place-content-center"}`}
        >
          {isMenu && (
            <button className=" absolute top-5 right-5">
              <GiCancel
                onClick={() => setIsMenu(false)}
                size={30}
                className="hover:text-primary transition-all hover:duration-300"
              />
            </button>
          )}
          <ul className={`flex flex-col sm:gap-2 sm:flex-row`}>
            <li
              className={`px-[5px] py-[15px] cursor-pointer uppercase hover:text-primary ${
                pathname === "/" && "text-primary"
              }`}
              onClick={() => setIsMenu(false)}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={`px-[5px] py-[15px] cursor-pointer uppercase hover:text-primary ${
                pathname === "/menu" && "text-primary"
              }`}
              onClick={() => setIsMenu(false)}
            >
              <Link href="/menu">Menu</Link>
            </li>
            <li
              className={`px-[5px] py-[15px] cursor-pointer uppercase hover:text-primary ${
                pathname === "/about" && "text-primary"
              }`}
              onClick={() => setIsMenu(false)}
            >
              <Link href="/about">About</Link>
            </li>
            <li
              className={`px-[5px] py-[15px] cursor-pointer uppercase hover:text-primary ${
                pathname === "/reservation" && "text-primary"
              }`}
              onClick={() => setIsMenu(false)}
            >
              <Link href="/reservation">Reservation</Link>
            </li>
          </ul>
        </nav>
        <div className="flex space-x-1 justify-center items-center">
          <Link href="/login">
            <FaUserAlt
              className={`mx-1 cursor-pointer hover:text-primary ${
                pathname.includes("/profile") || pathname === "/login"
                  ? "text-primary"
                  : "text-white"
              }`}
            />
          </Link>
          <Link href="/cart">
            <div className="relative">
              <FaShoppingCart
                className={`mx-1 cursor-pointer  hover:text-primary ${
                  pathname === "/cart" ? "text-primary" : "text-white"
                }`}
              />
              <span
                className={`absolute -top-3 -right-2 bg-primary rounded-full p-[10px] w-4 grid place-content-center h-4 `}
              >
                {cart.products.length === 0 || !session?.user
                  ? "0"
                  : cart.products.length}
              </span>
            </div>
          </Link>
          <div>
            <FaSearch
              className={`mx-1 cursor-pointer hover:text-primary ${
                isSearch && "text-primary"
              }`}
              onClick={() => setIsSearch(true)}
            />
          </div>
          <button className="hidden sm:inline-block">
            <a
              href="#"
              className={`mx-2 bg-primary rounded-md px-[15px] py-[8px]
                 hover:opacity-70 transition-all hover:ease-in-out hover:duration-700
                `}
            >
              {session?.user ? `${session?.user.name}` : "Order Online"}
            </a>
          </button>
          <div className="inline-block sm:hidden">
            <a href="#">
              <RxHamburgerMenu onClick={() => setIsMenu(true)} />
            </a>
          </div>
        </div>
      </div>

      {isSearch && <Search setIsSearch={setIsSearch} />}
    </div>
  );
};

export default Header;
