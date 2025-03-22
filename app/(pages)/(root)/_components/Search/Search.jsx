"use client";
import Title from "@/app/ui/Title";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";
import OutsideClickHandler from "react-outside-click-handler";

import SyncLoader from "react-spinners/SyncLoader";
const Search = ({ setIsSearch }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [getInput, setGetInput] = useState("");
  const { push } = useRouter();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/addProduct`
        );
        if (res.status === 200) {
          setProducts(res.data);
          setFiltered(res.data.slice(0, 5));
        }
      } catch (error) {
        console.log(error.message || error.response.data.message);
      }
    };
    setTimeout(() => fetchProducts(), 500);
  }, []);

  const handleFilter = (e) => {
    const fetchFiltered = products.filter((product) =>
      product?.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setGetInput(e.target.value);
    setFiltered(fetchFiltered);
  };
  return (
    <div
      className='w-screen h-screen z-50 top-0 left-0 fixed
    after:content-[""] after:w-screen after:h-screen after:absolute 
    after:top-0 after:left-0 grid place-content-center
    after:bg-white after:opacity-70
'
    >
      <OutsideClickHandler onOutsideClick={() => setIsSearch(false)}>
        <div className="grid place-content-center">
          <div
            className="relative z-50 sm:w-[600px] sm:h-[600px] w-[450px] h-[450px] bg-white border-2
            p-5"
          >
            <button className=" absolute top-4 right-5">
              <GiCancel
                onClick={() => setIsSearch(false)}
                size={20}
                className="hover:text-primary transition-all
                    hover:duration-300"
              />
            </button>
            <Title addClass="text-[40px] text-center">Search</Title>
            <input
              type="text"
              className="w-full border px-[4px] py-[10px] my-[1rem]"
              placeholder="Search..."
              onChange={handleFilter}
              value={getInput}
            />
            <div className="flex-col gap-y-1 items-center">
              {products.length > 0 ? (
                <>
                  {filtered.length > 0 ? (
                    filtered.slice(0, 5).map((product) => (
                      <div
                        key={product?._id}
                        className="flex justify-between items-center cursor-pointer hover:bg-primary transition-all my-4  px-[8px] py-[15px]hover:duration-300"
                        onClick={() => {
                          push(`/productDetails/${product?._id}`);
                          setIsSearch(false);
                        }}
                      >
                        <Image
                          src={product?.image}
                          alt={product?.title}
                          width={48}
                          height={48}
                        />
                        <span className="font-bold">{product?.title}</span>
                        <span className="font-bold">${product?.prices[0]}</span>
                      </div>
                    ))
                  ) : (
                    <p className="grid place-content-center font-semibold">
                      Ürün Bulunamadı
                    </p>
                  )}
                </>
              ) : (
                <div className="flex justify-center mt-5">
                  <SyncLoader color="#f5c944" />
                </div>
              )}
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Search;
