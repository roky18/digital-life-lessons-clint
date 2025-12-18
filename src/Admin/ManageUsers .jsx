import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Pages/Share/Loading";
import { FaTrash, FaUserMinus, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: usersData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return res.data;
    },
  });

  const users = Array.isArray(usersData) ? usersData : [];

  const handleMakeAdmin = async (id) => {
    const result = await Swal.fire({
      title: "Make Admin?",
      text: "Are you sure you want to make this user an admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes,Agree!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await axiosSecure.patch(`/users/make-admin/${id}`);
      refetch();
      Swal.fire("Congratulations!", "User is now an admin.");
    }
  };

  const handleRemoveAdmin = async (id) => {
    const result = await Swal.fire({
      title: "Remove Admin?",
      text: "Are you sure you want to remove admin from this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await axiosSecure.patch(`/users/remove-admin/${id}`);
      refetch();
      Swal.fire("Removed!", "Admin role removed.", "success");
    }
  };

  const handleDeleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: "Are you Sure? You Do it!",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/users/${id}`);
      refetch();
      Swal.fire("Deleted!", "User has been deleted.", "success");
    }
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="w-11/12 mx-auto my-6 mb-16">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">
        Manage Users
      </h2>

      {users.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th className="text-center">Role</th>
                <th className="text-center">Total Lessons</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td className="flex mt-5 md:mt-0 mr-4 md-mr-0 items-center gap-2">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={user.photoURL}
                      alt=""
                    />
                    {user.displayName}
                  </td>
                  <td className="text-sm">{user.email}</td>
                  <td className="text-center">
                    <span
                      className={`badge ${
                        user.role === "admin"
                          ? "badge-success"
                          : "badge-neutral"
                      }`}
                    >
                      ✔{user.role}
                    </span>
                  </td>
                  <td className="text-center font-semibold">
                    {user.totalLessons}
                  </td>
                  <td className="text-center flex flex-col gap-2 md:flex-row space-x-2">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="btn btn-xs btn-success"
                        title="Make Admin"
                      >
                        <FaUserShield />
                      </button>
                    )}

                    {user.role === "admin" && (
                      <button
                        onClick={() => handleRemoveAdmin(user._id)}
                        className="btn btn-xs btn-warning"
                        title="Remove Admin"
                      >
                        <FaUserMinus />
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn btn-xs btn-error"
                      title="Delete User"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No users found.</p>
      )}
    </div>
  );
};

export default ManageUsers;
