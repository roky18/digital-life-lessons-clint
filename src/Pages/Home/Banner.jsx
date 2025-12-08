import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import baner1 from "../../assets/banner2.jpg";
import baner2 from "../../assets/banner1.png";
import baner3 from "../../assets/banner3.jpg";

const Banner = () => {
  return (
    <Carousel
      className="w-11/12 mx-auto my-6"
      autoPlay={true}
      infiniteLoop={true}
    >
      <div>
        <img src={baner1} />
        <p className="legend">Digital Life Lessons 1</p>
      </div>
      <div>
        <img src={baner2} />
        <p className="legend">Digital Life Lessons 2</p>
      </div>
      <div>
        <img src={baner3} />
        <p className="legend">Digital Life Lessons 3</p>
      </div>
    </Carousel>
  );
};

export default Banner;
