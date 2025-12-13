import React from "react";
import Banner from "./Banner";
import FeaturedLessons from "./FeaturedLessons";
import WhyLearning from "./WhyLearning";
import MostSavedLessons from "./MostSavedLessons";
import { Fade } from "react-awesome-reveal";
import MostCreateLessons from "./MostCreateLessons";

const Home = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Fade cascade damping={0.3} triggerOnce>
        <Banner></Banner>
        <FeaturedLessons></FeaturedLessons>
        <WhyLearning></WhyLearning>
        <MostSavedLessons></MostSavedLessons>
        <MostCreateLessons></MostCreateLessons>
      </Fade>
    </div>
  );
};

export default Home;
