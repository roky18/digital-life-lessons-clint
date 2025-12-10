import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const FeaturedLessons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [] } = useQuery({
    queryKey: ["featuredLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data;
    },
  });

  const latestSix = [...lessons]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <div className="w-11/12 mx-auto my-6 mb-16">
      <h3 className="text-primary text-center font-semibold mb-10 text-3xl">
        Featured Life Lessons (Recent 6)
      </h3>

      <section className="p-10 shadow-2xl rounded-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {latestSix.map((lesson) => (
          <div
            key={lesson._id}
            className="bg-base-100 hover:bg-amber-100 shadow-lg flex flex-col items-center text-center space-y-3 p-5 rounded-xl overflow-hidden  transition-transform duration-300 ease-in-out hover:scale-105"
          >
            {/* Image */}
            <img
              className="w-full h-36 object-cover rounded-xl"
              src={lesson.image}
              alt={lesson.title}
            />

            {/* Title */}
            <h4 className="font-semibold text-lg text-pink-600">
              {lesson.title}
            </h4>

            {/* Description */}
            <p className="text-gray-600 text-sm">
              {lesson.description?.slice(0, 40)}...
            </p>

            {/* Category*/}
            <div className="flex gap-2 justify-center font-semibold flex-wrap">
              <span className="badge badge-outline">{lesson.category}</span>
              <span className="badge badge-outline">{lesson.tone}</span>
            </div>

            {/* Details */}
            <Link
              to={`/lesson-details/${lesson._id}`}
              className="btn btn-primary btn-sm mt-2"
            >
              See Details →
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};
export default FeaturedLessons;
