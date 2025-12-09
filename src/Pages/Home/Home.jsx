import React from "react";
import Banner from "./Banner";
import FeaturedLessons from "./FeaturedLessons";
import WhyLearning from "./WhyLearning";
import MostSavedLessons from "./MostSavedLessons";
import TopContributors from "./TopContributors";

const Home = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Banner></Banner>
      <FeaturedLessons></FeaturedLessons>
      <WhyLearning></WhyLearning>
      <TopContributors></TopContributors>
      <MostSavedLessons></MostSavedLessons>
    </div>
  );
};

export default Home;
