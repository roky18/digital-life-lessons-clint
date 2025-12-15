import React from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AuthorInfo = () => {
  const { email } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  // Fetch Author Details
  const { data: author = {} } = useQuery({
    queryKey: ["author", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${email}`);
      return res.data;
    },
  });

  //   Lessons
  const { data: lessons = [] } = useQuery({
    queryKey: ["author-lessons", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons?email=${email}`);
      return res.data;
    },
  });
  console.log(lessons);
  //   favorite
  const { data: favorites = [] } = useQuery({
    queryKey: ["myFavorites", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?email=${email}`);
      return res.data;
    },
  });
  console.log(favorites);

  return (
    <div className="w-11/12 mx-auto my-8">
      {/* Author Profile */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
        <div className="relative">
          <img
            referrerPolicy="no-referrer"
            src={author.photoURL}
            alt=""
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {author.displayName}
          </h2>
          <p className="text-gray-500">{author.email}</p>

          {/* Stats */}
          <div className="flex gap-6 mt-2">
            <div>
              <p className="font-semibold">{lessons.length}</p>
              <p className="text-sm text-gray-500">Lessons Created</p>
            </div>
            <div>
              <p className="font-semibold">{favorites.length}</p>
              <p className="text-sm text-gray-500">Lessons Saved</p>
            </div>
          </div>

          {/* update */}
          <div className="flex flex-col items-center md:flex-row gap-4 mt-4">
            {author.accessLevel === "premium" ? (
              <span className=" badge badge-success font-semibold p-4">
                Premium ⭐
              </span>
            ) : (
              " "
            )}
            <button className="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <h2 className="text-2xl text-center font-bold text-purple-700 mb-4">
        Lessons by :{" "}
        <span className="text-blue-600">{author.displayName}...</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div key={lesson._id} className="card bg-base-100 shadow-lg">
            <img
              src={lesson.image}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="card-body">
              <h2 className="card-title text-lg font-bold">{lesson.title}</h2>
              <p className="text-sm text-gray-600">
                {lesson.description?.slice(0, 30)}...
              </p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="badge badge-outline">{lesson.category}</span>
                <span className="badge badge-outline">{lesson.tone}</span>
                <span
                  className={`badge ${
                    lesson.access === "premium"
                      ? "badge-warning"
                      : "badge-success"
                  } font-semibold p-2`}
                >
                  {lesson.access}
                </span>
              </div>
              <div className="card-actions justify-end mt-2">
                <button
                  onClick={() => navigate(`/lesson-details/${lesson._id}`)}
                  className="btn btn-primary btn-sm"
                >
                  See Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AuthorInfo;
