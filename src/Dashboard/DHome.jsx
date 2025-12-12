import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { FaBook, FaBookmark, FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router";
import Loading from "../Pages/Share/Loading";
import useAuth from "../Hooks/useAuth";

const DHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // resently----->>>
  const { data: lessons = [] } = useQuery({
    queryKey: ["lessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons`);
      return res.data;
    },
  });

  // likee----->>>
  const { data: likes = [], isLoading: lessonsLoading } = useQuery({
    queryKey: ["likes", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/like?email=${user.email}`);
      return res.data;
    },
  });

  // favorite------>>
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?email=${user.email}`);
      return res.data;
    },
  });

  const recentLessons = lessons.slice(0, 3);

  if (isLoading || lessonsLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-11/12 mx-auto my-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-purple-100 shadow-md p-4 flex items-center gap-4">
          <FaBook className="text-4xl text-purple-700" />
          <div>
            <p className="text-sm text-gray-600">Total Lessons created</p>
            <h2 className="text-2xl text-center font-bold">{likes.length}</h2>
          </div>
        </div>

        <div className="card bg-blue-100 shadow-md p-4 flex items-center gap-4">
          <FaBookmark className="text-4xl text-blue-700" />
          <div>
            <p className="text-sm text-gray-600">Total Saved</p>
            <h2 className="text-2xl text-center font-bold">
              {favorites.length}
            </h2>
          </div>
        </div>

        <div className="card bg-amber-100 shadow-md p-4 flex items-center gap-4">
          <FaPlusCircle className="text-4xl text-amber-700" />
          <div>
            <p className="text-sm text-gray-600">Quick Action</p>
            <Link
              to="/dashboard/add-lessons"
              className="btn btn-sm btn-primary mt-1"
            >
              Add Lesson
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Lessons */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-purple-700 mb-4">
          Recently Added Lessons
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentLessons.length === 0 && (
            <p className="text-gray-500">No recent lessons.</p>
          )}
          {recentLessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-purple-50 p-4 rounded-lg shadow-sm"
            >
              <h4 className="font-semibold">{lesson.title}</h4>
              <p className="text-sm text-gray-600 truncate">
                {lesson.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-purple-700 mb-4">
          Weekly Reflections
        </h3>
        <h1>Up Coming Soon... </h1>
      </div>
    </div>
  );
};

export default DHome;
