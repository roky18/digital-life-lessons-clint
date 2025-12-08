import React from "react";
import Banner from "./Banner";
import FeaturedLessons from "./FeaturedLessons";
import WhyLearning from "./WhyLearning";

const Home = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Banner></Banner>
      <FeaturedLessons></FeaturedLessons>
      <WhyLearning></WhyLearning>
      this is home
    </div>
  );
};

export default Home;
