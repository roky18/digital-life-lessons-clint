import React from "react";
import Banner from "./Banner";
import FeaturedLessons from "./FeaturedLessons";
import WhyLearning from "./WhyLearning";
import MostSavedLessons from "./MostSavedLessons";
import TopContributors from "./TopContributors";
import { Fade } from "react-awesome-reveal";

const Home = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Fade cascade damping={0.3} triggerOnce>
        <Banner></Banner>
        <FeaturedLessons></FeaturedLessons>
        <WhyLearning></WhyLearning>
        <TopContributors></TopContributors>
        <MostSavedLessons></MostSavedLessons>
      </Fade>
    </div>
  );
};

export default Home;
