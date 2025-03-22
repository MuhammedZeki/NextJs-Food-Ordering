"use client";
import Title from "@/app/ui/Title";
import { addProducts } from "@/lib/features/CardSlicer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GiFullPizza } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [prices, setPrices] = useState([]);
  const [basePrice, setBasePrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState(0);
  const [extraItems, setExtraItems] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [isChecked, setIsChecked] = useState(false);
  const [count, setCount] = useState(1);
  const { push } = useRouter();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/addProduct/${id}`
        );
        if (res.status === 200) {
          console.log("Products is Success");
          setProduct(res.data);
        }
      } catch (error) {
        console.log(error.messsage);
      }
    };
    fetchProduct();
  }, [id]);
  useEffect(() => {
    if (product) {
      setPrices(product?.prices || []);
      setBasePrice(product?.prices[0] || 0);
      setPrice(product?.prices[0] || 0);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      const checkIfProductInCart = cart?.products?.find(
        (prev) => prev._id === product._id
      );
      setIsChecked(!!checkIfProductInCart);
    }
  }, [product, cart]);

  const handleSize = (sizeIndex) => {
    if (prices.length > 0) {
      const newBasePrice = prices[sizeIndex];
      setSize(sizeIndex);
      setBasePrice(newBasePrice);
      setPrice(newBasePrice * count);
    }
  };

  const extras = (e, item) => {
    const checked = e.target.checked;
    let newBasePrice = basePrice;

    if (checked) {
      newBasePrice += item.price;
      setExtraItems((prev) => [...prev, item]);
    } else {
      newBasePrice -= item.price;
      setExtraItems((prev) => prev.filter((extra) => extra.id !== item.id));
    }

    setBasePrice(newBasePrice);
    setPrice(newBasePrice * count);
  };

  const handleCountChange = (type) => {
    if (type === "increase") {
      setCount((prev) => {
        const newCount = prev + 1;
        setPrice(basePrice * newCount);
        return newCount;
      });
    } else if (type === "decrease" && count > 1) {
      setCount((prev) => {
        const newCount = prev - 1;
        setPrice(basePrice * newCount);
        return newCount;
      });
    }
  };

  const handleProduct = () => {
    dispatch(addProducts({ product, price, quantity: count }));
    push("/cart");
  };
  return (
    <div className="container mx-auto">
      <div
        className="h-screen flex flex-col items-center gap-y-10 my-10 
         md:flex md:flex-row"
      >
        <div className="relative h-[70%] w-[70%] ">
          <Image
            src={product?.image}
            alt=""
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="w-2/5">
          <div className="flex flex-col items-center md:items-start">
            <Title addClass="text-6xl px-20">{product?.title}</Title>
            <span
              className="text-primary font-bold 
          underline underline-offset-2 text-2xl my-4 px-20"
            >
              ${price}
            </span>
            <p className="px-20 max-w-[600px]">{product?.description}</p>
            {product?.category === "pizza" && (
              <div className="my-6 px-20">
                <h4 className="font-bold text-xl">Choose the size</h4>
                <div className="flex items-center gap-x-16">
                  <div
                    className="relative h-6 w-6 cursor-pointer"
                    onClick={() => handleSize(0)}
                  >
                    <GiFullPizza size={32} />
                    <span
                      className="bg-primary text-xs rounded-xl p-1
                    absolute top-0 -right-8"
                    >
                      Small
                    </span>
                  </div>
                  <div
                    className="relative h-8 w-8 cursor-pointer"
                    onClick={() => handleSize(1)}
                  >
                    <GiFullPizza size={48} />
                    <span
                      className="bg-primary text-xs rounded-xl p-1
                    absolute top-0 -right-10"
                    >
                      Medium
                    </span>
                  </div>
                  <div
                    className="relative h-12 w-12 cursor-pointer"
                    onClick={() => handleSize(2)}
                  >
                    <GiFullPizza size={64} />
                    <span
                      className="bg-primary text-xs rounded-xl p-1
                    absolute top-0 -right-10"
                    >
                      Large
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="my-6 px-16">
              <h4 className="font-bold text-xl mb-2">
                Choose additional ingredients
              </h4>
              <div className="flex items-center justify-center gap-x-4">
                {product?.extraOptions.map((item) => (
                  <label key={item.id} className="flex items-center gap-x-1">
                    <input
                      className="accent-primary w-5 h-5"
                      onChange={(e) => extras(e, item)}
                      type="checkbox"
                    />
                    <span className="font-semibold">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="my-6 px-20 flex flex-row gap-x-5">
              <button
                className={`bg-primary text-white py-2 px-3 rounded-lg ${
                  isChecked
                    ? "bg-gray-400 cursor-not-allowed "
                    : " cursor-pointer"
                }`}
                type="button"
                disabled={isChecked}
                onClick={handleProduct}
              >
                Add
              </button>
              <div className="flex flex-row gap-5 items-center justify-center">
                <div className="bg-primary  rounded-full  w-6 h-6 relative grid place-content-center">
                  <button
                    className="font-semibold text-2xl text-white "
                    onClick={() => handleCountChange("decrease")}
                  >
                    -
                  </button>
                </div>
                <span> {count}</span>
                <div className="bg-primary  rounded-full  w-6 h-6 relative grid place-content-center">
                  <button
                    className="font-semibold text-2xl text-white "
                    onClick={() => handleCountChange("increase")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
