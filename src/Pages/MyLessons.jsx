import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import {
  MdEditSquare,
  MdFavorite,
  MdOutlineDateRange,
  MdOutlineInfo,
} from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import Swal from "sweetalert2";
import { Link } from "lucide-react";
import { useNavigate } from "react-router";
import { Fade } from "react-awesome-reveal";
import Loading from "./Share/Loading";

const MyLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: lessons = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myLessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons?email=${user.email}`);

      return res.data;
    },
  });

  const handleLessonDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do You want to Delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/lessons/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Lesson has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <Fade cascade damping={0.3} triggerOnce>
      <div className="w-11/12 mx-auto mb-8 py-5 shadow-2xl">
        <h3 className="text-primary text-center font-semibold my-6 mb-10 text-3xl">
          All of my Lessons : {lessons.length}
        </h3>
        <div className="overflow-x-auto">
          <table className="table text-center table-zebra">
            {/* head */}
            <thead>
              <tr className="text-purple-400">
                <th>#</th>
                <th>Important info</th>
                <th>Visibility</th>
                <th>Access level</th>
                <th>Details </th>
                <th> Stats</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson, index) => (
                <tr key={lesson._id}>
                  <th>{index + 1}</th>
                  <td>{lesson.title}</td>
                  <td>{lesson.privacy}</td>
                  <td>{lesson.access}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/lesson-details/${lesson._id}`)}
                      className="btn btn-dash btn-info"
                    >
                      <MdOutlineInfo />{" "}
                    </button>
                  </td>
                  <td>
                    <div className="flex-col flex items-center">
                      <span className="flex items-center">
                        <MdOutlineDateRange />
                        {new Date(lesson.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex flex-col md:flex-row">
                        <span className="flex text-blue-500 items-center">
                          <AiFillLike />
                          -- 99 ◾
                        </span>
                        <span className="flex text-red-500 items-center">
                          <MdFavorite />
                          -- 77
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="flex flex-col md:flex-row gap-2">
                      <button
                        onClick={() => navigate(`update-lesson/${lesson._id}`)}
                        className="btn btn-dash btn-warning"
                      >
                        <MdEditSquare />{" "}
                      </button>

                      <button
                        onClick={() => handleLessonDelete(lesson._id)}
                        className="btn btn-dash btn-error"
                      >
                        <RiDeleteBin6Line />{" "}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fade>
  );
};

export default MyLessons;
