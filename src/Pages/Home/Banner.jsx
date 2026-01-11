import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import baner1 from "../../assets/banner2.jpg";
import baner2 from "../../assets/banner1.png";
import baner3 from "../../assets/banner3.jpg";

const Banner = () => {
  return (
    <div className="w-full flex justify-center my-6">
      <div className="w-full md:w-4/5">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
        >
          <div>
            <img
              src={baner2}
              className="w-full h-[60vh] object-cover rounded-xl"
            />
            <p className="legend">Digital Life Lessons 1</p>
          </div>
          <div>
            <img
              src={baner1}
              className="w-full h-[60vh] object-cover rounded-xl"
            />
            <p className="legend">Digital Life Lessons 2</p>
          </div>
          <div>
            <img
              src={baner3}
              className="w-full h-[60vh] object-cover rounded-xl"
            />
            <p className="legend">Digital Life Lessons 3</p>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
