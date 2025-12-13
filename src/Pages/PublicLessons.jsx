import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { FaLock } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { AuthContext } from "../Contexts/AuthContext";
import useAuth from "../Hooks/useAuth";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: lessons = [] } = useQuery({
    queryKey: ["publicLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${lessons}`);

      return res.data;
    },
  });
  console.log(lessons.access);

  // user related-------->>
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);

      return res.data;
    },
  });
  console.log(users);

  const isPremiumUser = users.accessLevel === "premium";

  return (
    <Fade cascade damping={0.3} triggerOnce>
      <div className="w-11/12 mx-auto">
        <h3 className="text-primary text-center font-semibold my-6 mb-10 text-3xl">
          Public Lessons : {lessons.length}
        </h3>

        {/* Card Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 mb-8 lg:grid-cols-3 gap-8">
          {lessons.map((lesson) => {
            const isPremiumLesson = lesson.access === "premium";
            const locked = isPremiumLesson && !isPremiumUser;

            return (
              <div
                key={lesson._id}
                className="card bg-base-100 shadow-xl  relative overflow-hidden"
              >
                {/* premium lessons */}
                {locked && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-20 text-white flex-col gap-2">
                    <FaLock className="text-4xl" />
                    <p className="font-semibold text-lg">
                      Premium Lesson - Upgrade to view
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/upgrade")}
                    >
                      Upgrade & View
                    </button>
                  </div>
                )}

                <div className={`card-body ${locked ? "opacity-40" : ""}`}>
                  {/* Title */}
                  <h2 className="card-title text-xl font-bold text-pink-500">
                    {lesson.title}
                  </h2>

                  {/* image */}
                  <img
                    className="w-full h-40 md:h-48 lg:h-52 object-cover rounded-xl"
                    src={lesson.image}
                    alt=""
                  />

                  {/* Description */}
                  <p className="text-sm mt-2 text-gray-600">
                    {lesson.description?.slice(0, 40)}...
                  </p>

                  {/* Access */}
                  <div className="flex justify-center flex-wrap gap-2 mt-3">
                    <span className="badge badge-outline font-semibold ">
                      {lesson.category}
                    </span>
                    <span className="badge badge-outline font-semibold">
                      {lesson.tone}
                    </span>
                    <span
                      className={`badge text-xs ${
                        lesson.access === "premium"
                          ? "badge-warning"
                          : "badge-success"
                      }`}
                    >
                      {lesson.access}
                    </span>
                  </div>

                  {/* user Info */}
                  <div className="flex items-center gap-3 mt-4">
                    <img
                      src={lesson.lessonerImage}
                      alt="creator"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{lesson.lessonerName}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(lesson.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* See Details */}
                  <div className="card-actions justify-end mt-4">
                    <Link
                      to={`/lesson-details/${lesson._id}`}
                      className="btn btn-primary btn-sm"
                      disabled={locked}
                    >
                      See Details →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
        <span className="flex justify-center mb-12 mt-6">
        <button
          onClick={() => navigate(`/`)}
          className="btn w-2/10 btn-dash btn-info"
        >
         ⬅ Back to Home
        </button>
      </span>
    </Fade>
  );
};

export default PublicLessons;
