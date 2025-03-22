"use client";
import Image from "next/image";
import React from "react";
import Title from "./Title";
import Slider from "react-slick";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 30000,
    appendDots: (dots) => (
      <div>
        <ul className="container mx-auto w-full text-start">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-4 h-4 border bg-white rounded-full mt-10 "></div>
    ),
    arrows: false,
  };
  return (
    <div className="h-screen w-full ">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className=" h-full w-full relative">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <Slider {...settings}>
        <div>
          <div
            className="text-white flex flex-col items-start gap-y-10 container mx-auto"
            style={{ marginTop: "68px" }}
          >
            <Title addClass="text-5xl">Fast Food Restaurant</Title>
            <p className="text-sm sm:w-2/5 w-full">
              Doloremque, itaque aperiam facilis rerum, commodi, temporibus
              sapiente ad mollitia laborum quam quisquam esse error unde.
              Tempora ex doloremque, labore, sunt repellat dolore, iste magni
              quos nihil ducimus libero ipsam.
            </p>
            <button className="bg-primary py-[15px] px-[15px] rounded-xl">
              Order Now
            </button>
          </div>
        </div>
        <div>
          <div
            className="text-white flex flex-col items-start gap-y-5 container mx-auto"
            style={{ marginTop: "68px" }}
          >
            <Title addClass="text-5xl">Fast Food Restaurant</Title>
            <p className="text-md sm:w-2/5 w-full">
              Doloremque, itaque aperiam facilis rerum, commodi, temporibus
              sapiente ad mollitia laborum quam quisquam esse error unde.
              Tempora ex doloremque, labore, sunt repellat dolore, iste magni
              quos nihil ducimus libero ipsam.
            </p>
            <button className="bg-primary py-[15px] px-[15px] rounded-xl">
              Order Now
            </button>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
