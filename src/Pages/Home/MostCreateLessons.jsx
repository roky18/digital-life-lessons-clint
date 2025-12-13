import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../Share/Loading";

const MostCreateLessons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: creators = [], isLoading } = useQuery({
    queryKey: ["topCreators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons/top-creators");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  const topCreator = [...creators].sort(
    (a, b) => b.lessonCount - a.lessonCount
  )[0];

  if (!topCreator) return <Loading></Loading>;

  return (
    <div className="w-11/12 mx-auto my-6 mb-16">
      <h3 className="text-primary text-center font-semibold mb-10 text-3xl">
        Top Lessons Creator
      </h3>

      <div className="bg-gradient-to-r from-pink-500 to-orange-400 rounded-2xl shadow-md p-4 transform transition-transform hover:scale-105 hover:shadow-lg">
        <div className="text-sm text-gray-100 text-center">
          Total Lessons Created
        </div>
        <div className="stat-value text-lime-400 text-center">
          {topCreator.lessonCount}
        </div>
        <div className=" font-bold text-white text-center">
          {topCreator.name}
        </div>
      </div>
    </div>
  );
};

export default MostCreateLessons;
