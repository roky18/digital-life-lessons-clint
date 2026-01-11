import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";
import { FaRegBookmark, FaRegHeart } from "react-icons/fa";

import LessonSkeleton from "../Share/LessonSkeleton";

const MostSavedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: favoriteCount = [], isLoading } = useQuery({
    queryKey: ["favoriteCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data;
    },
  });

  const latestSix = [...favoriteCount]
    .sort((a, b) => b.favoriteCount - a.favoriteCount)
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="w-11/12 mx-auto my-10 mb-16">
        <h3 className="text-primary text-center font-semibold mb-10 text-3xl">
          Most Saved Lessons <span className="text-sm ml-2">(Recent 5)</span>
        </h3>

        <div className="p-10 shadow-2xl rounded-2xl ">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(5)].map((_, index) => (
              <LessonSkeleton key={index} />
            ))}
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto my-6 mb-16">
      <h3 className="text-primary text-center font-semibold mb-10 text-3xl">
        Most Saved Lessons <br /> <span className="text-sm">(Top 5)</span>
      </h3>

      <div className="p-10 shadow-2xl rounded-2xl ">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestSix.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-base-100 dark:bg-gray-400 hover:bg-purple-100 shadow-lg flex flex-col items-center text-center space-y-3 p-5 rounded-xl overflow-hidden  transition-transform duration-300 ease-in-out hover:scale-105"
            >
              {/* image */}
              <img
                className="w-full h-36 object-cover rounded-xl"
                src={lesson.image}
                alt={lesson.title}
              />

              {/* title */}
              <h4 className="font-semibold text-lg text-pink-600">
                {lesson.title}
              </h4>

              {/* Description */}
              <p className="text-gray-600 text-sm">
                {lesson.description?.slice(0, 40)}...
              </p>

              {/* category*/}
              <div className="flex gap-16 items-center  font-semibold">
                <legend className="flex gap-1 items-center text-blue-500">
                  <FaRegBookmark />
                  <span className="text-sm flex items-center ">
                    <span>{lesson.favoriteCount}</span>
                  </span>
                </legend>
                <legend className="flex gap-1 items-center text-red-500">
                  <FaRegHeart />
                  <span className="text-sm flex items-center">
                    <span>{lesson.likesCount}</span>
                  </span>
                </legend>
              </div>

              {/* Details */}
              <Link
                to={`/lesson-details/${lesson._id}`}
                className="btn btn-accent btn-sm mt-2"
              >
                More Details →
              </Link>
            </div>
          ))}
        </section>
        <span className="flex justify-center mt-8 ">
          <button
            onClick={() => navigate(`/public-lessons`)}
            className="btn w-2/10 btn-dash btn-info"
          >
            All Lessons
          </button>
        </span>
      </div>
    </div>
  );
};

export default MostSavedLessons;
