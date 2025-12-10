import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { MdFavorite, MdOutlineDateRange } from "react-icons/md";
import { SlLike } from "react-icons/sl";

const MyLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [] } = useQuery({
    queryKey: ["myLessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons?email=${user.email}`);

      return res.data;
    },
  });
  console.log(lessons);
  return (
    <div className="w-11/12 mx-auto">
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
              <th> stats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, index) => (
              <tr key={lesson._id}>
                <th>{index + 1}</th>
                <td>{lesson.tone}</td>
                <td>{lesson.privacy}</td>
                <td>{lesson.access}</td>
                <td>
                  <button className="btn btn-dash btn-info">Details </button>
                </td>
                <td>
                  <div className="flex-col text-lime-700 flex items-center">
                    <MdOutlineDateRange />{lesson.createdAt} ◾
                    <SlLike /> ◾
                    <MdFavorite /> ◾
                  </div>
                </td>

                <td>
                  <div className="flex flex-col md:flex-row gap-2">
                    <button className="btn btn-dash btn-warning">Update </button>
                  
                  <button className="btn btn-dash btn-error">Delete </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLessons;
