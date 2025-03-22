"use client"

import Title from '@/app/ui/Title'
import React from 'react'
import CustomerItem from './CustomerItem'
import { IoIosArrowForward,IoIosArrowBack  } from "react-icons/io";
import Slider from "react-slick";
const Customers = () => {
    const NextArrow = ({ onClick }) => {
        return (
            <button 
                onClick={onClick} 
                className="absolute -bottom-12 ml-2 left-1/2 bg-primary flex items-center justify-center w-10 h-10 rounded-full text-white"
            >
                <IoIosArrowForward />
            </button>
        );
    };
    
    const PrevArrow = ({ onClick }) => {
        return (
            <button 
                onClick={onClick} 
                className="absolute -bottom-12 right-1/2 bg-primary flex items-center justify-center w-10 h-10 rounded-full text-white"
            >
                <IoIosArrowBack />
            </button>
        );
    };
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
      };
  return (
    <div className='container mx-auto my-20'>
        <div>
            <Title addClass="text-[40px] text-center">What Says Our Customers</Title>
            <Slider {...settings}>
                <CustomerItem imgSrc="/images/client1.jpg"/>
                <CustomerItem imgSrc="/images/client2.jpg"/>
                <CustomerItem imgSrc="/images/client1.jpg"/>
                <CustomerItem imgSrc="/images/client2.jpg"/>
            </Slider>                
        </div>
    </div>
  )
}

export default Customers