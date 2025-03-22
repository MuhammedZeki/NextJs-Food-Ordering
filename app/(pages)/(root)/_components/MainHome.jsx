import Carousel from "@/app/ui/Carousel";
import React from "react";
import Campaigns from "./Campaigns";
import BlurText from "@/app/ui/BlurText";
import MenuWrapper from "./MenuWrapper/MenuWrapper";
import About from "./AboutPage/About";
import AboutPage from "./AboutPage/About";
import Reservation from "./Reservation/Reservation";
import Customers from "./Customers/Customers";
import Footer from "./Footer";

const MainHome = () => {
  return (
    <div>
      <Carousel />
      <Campaigns />
      <MenuWrapper />
      <AboutPage />
      <Reservation />
      <Customers />
    </div>
  );
};

export default MainHome;
