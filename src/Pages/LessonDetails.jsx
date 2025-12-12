import React from "react";
import { useNavigate, useParams } from "react-router";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdReport } from "react-icons/md";
import { FaRegBookmark, FaRegHeart, FaShareAlt } from "react-icons/fa";

const LessonDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: lesson = [] } = useQuery({
    queryKey: ["Lesson", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);

      return res.data;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);

      return res.data;
    },
  });

  const {
    title,
    description,
    category,
    tone,
    image,
    access,
    lessonerEmail,
    lessonerName,
    lessonerImage,
    createdAt,
  } = lesson;

  const isPremiumBlocked =
    access === "premium" && users.accessLevel !== "premium";

  return (
    <div className="w-11/12 mx-auto my-8">
      <section className="relative p-6 shadow-2xl bg-amber-100 py-8 rounded-2xl">
        {/* title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-purple-700">{title}</h1>
          <p className="text-sm mt-2 text-gray-600">
            Category:{" "}
            <span className="font-semibold text-lime-600">{category}</span> •
            Tone:
            <span className="font-semibold text-orange-600">{tone}</span>
          </p>

          <p className="text-gray-500 text-sm mt-1">
            Created: {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* image */}
        <div className="flex justify-center mb-8">
          <img
            src={image}
            className="rounded-xl shadow-md max-h-[350px] w-full md:w-3/4 object-cover"
          />
        </div>

        <div
          className={`rounded-2xl p-4 ${
            isPremiumBlocked ? "blur-sm pointer-events-none select-none" : ""
          }`}
        >
          {/* Description */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-2 leading-relaxed">
            <p className="text-gray-800 whitespace-pre-line">{description}</p>
          </div>

          {/* Author */}
          <div className="bg-white rounded-xl p-5 shadow-md">
            <h3 className="text-xl font-bold text-purple-700 mb-2">Author</h3>

            <div className="flex items-center gap-4">
              <img
                src={lessonerImage}
                className="w-16 h-16 rounded-full border-2 border-purple-400"
              />

              <div>
                <p className="font-semibold text-lg">{lessonerName}</p>
                <p className="text-sm text-gray-600">{lessonerEmail}</p>

                <button
                  onClick={() => navigate(`/dashboard/author/${lessonerEmail}`)}
                  className="btn btn-sm mt-2 btn-outline btn-primary"
                >
                  View Lessons by This Author
                </button>
              </div>
            </div>
          </div>

          {/* engaement */}
          <div className="bg-white my-2 rounded-2xl p-4 shadow-md text-center">
            <h3 className="text-lg font-bold mb-3">Engagement</h3>

            <div className="flex justify-center gap-6 text-xl">
              <button className="btn btn-ghost text-red-500">
                <FaRegHeart />
                <span className="text-sm">Like</span>
              </button>

              <button className="btn btn-ghost text-blue-500">
                <FaRegBookmark />
                <span className="text-sm">Save</span>
              </button>

              <button className="btn btn-ghost text-green-600">
                <FaShareAlt />
                <span className="text-sm">Share</span>
              </button>

              <button className="btn btn-ghost text-red-600">
                <MdReport />
                <span className="text-sm">Report</span>
              </button>
            </div>
          </div>

          {/* comments */}
          <div className="bg-white rounded-2xl pt-3 p-6 shadow-md">
            <h3 className="text-xl font-bold text-purple-700 mb-3">Comments</h3>

            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Write your comment..."
            ></textarea>

            <span className="flex justify-end">
              <button className="btn mr-6 btn-primary mt-3">
                Post Comment
              </button>
            </span>
          </div>
        </div>

        {/* Premium only */}
        {isPremiumBlocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-2">
              🔐 Premium Content 🔏
            </h2>
            <p className="text-gray-200 mb-4">
              This lesson is available only for Premium users.
            </p>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/upgrade")}
            >
              Upgrade to Premium
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
export default LessonDetails;
