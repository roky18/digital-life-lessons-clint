import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import Loading from "./Share/Loading";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { MdOutlineInfo } from "react-icons/md";

import { RiDeleteBin6Line } from "react-icons/ri";
import { Fade } from "react-awesome-reveal";
import { IoFilter } from "react-icons/io5";

const MyFavorites = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userEmail = user?.email;
  const axiosSecure = useAxiosSecure();

  const {
    data: favorites = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myFavorites", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?email=${userEmail}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (!favorites.length)
    return (
      <div className="text-center py-10 text-gray-500 font-semibold">
        No favorites yet.
      </div>
    );

  const handleLessonDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Removed from Favorite!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/lessons/favorite/${id}`, {
            email: userEmail,
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Removed!",
                text: "Your Lesson has been Removed from Favorite.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <Fade cascade damping={0.3} triggerOnce>
      <div className="w-11/12 mx-auto mb-8 py-5 shadow-2xl">
        <h3 className="text-primary text-center font-semibold my-6 mb-10 text-3xl">
          MY Favorite : {favorites.length}
        </h3>
        <div className="flex justify-end">
          <button className="btn btn-info w-2/10 mr-4 ">
            <IoFilter />
            Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table text-center table-zebra">
            {/* head */}
            <thead>
              <tr className="text-purple-400">
                <th>#</th>
                <th>Important info</th>
                <th>Remove favorites</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((favorite, index) => (
                <tr key={favorite._id}>
                  <th>{index + 1}</th>
                  <td className="flex mt-5 md:mt-0  items-center gap-2">
                    <img
                      className="w-12 h-12 rounded-xl"
                      src={favorite.image}
                      alt=""
                    />
                    {favorite.title}
                  </td>
                  <td>
                    <button
                      onClick={() => handleLessonDelete(favorite._id)}
                      className="btn btn-dash btn-error"
                    >
                      <RiDeleteBin6Line />{" "}
                    </button>
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        navigate(`/lesson-details/${favorite._id}`)
                      }
                      className="btn btn-dash btn-info"
                    >
                      <MdOutlineInfo />{" "}
                    </button>
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

export default MyFavorites;
