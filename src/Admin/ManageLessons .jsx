import React, { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../Pages/Share/Loading";

const ManageLessons = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch lessons----->>
  const {
    data: lessons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data;
    },
  });

  // State for search and filter
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all / reviewed / pending

  if (isLoading) return <Loading />;

  // Filter lessons
  const filteredLessons = lessons.filter((lesson) => {
    // Search title + creator + status
    const searchMatch =
      lesson.title.toLowerCase().includes(searchText.toLowerCase()) ||
      lesson.lessonerName.toLowerCase().includes(searchText.toLowerCase()) ||
      (lesson.reviewed ? "reviewed" : "pending").includes(
        searchText.toLowerCase()
      );

    // Status filter
    let statusMatch = true;
    if (statusFilter === "Public") statusMatch = lesson.privacy === "public";
    if (statusFilter === "Private") statusMatch = lesson.privacy === "private";

    return searchMatch && statusMatch;
  });

  const handleDeleteLesson = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/lessons/${id}`);
      Swal.fire("Deleted!", "Lesson has been deleted.", "success");
      refetch();
    }
  };

  const handleFeatureLesson = async (id, value) => {
    await axiosSecure.patch(`/lessons/${id}`, { featured: value });
    Swal.fire("Success!", "Lesson marked as featured.", "success");
    refetch();
  };

  const handleMarkReviewed = async (id, value) => {
    if (!value) return;
    await axiosSecure.patch(`/lessons/${id}`, { reviewed: true });
    Swal.fire("Success!", "Lesson marked as reviewed.", "success");
    refetch();
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="w-11/12 min-h-screen mx-auto my-6 mb-16">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Manage Lessons ({filteredLessons.length}/{lessons.length})
      </h2>

      {/* Search & Filter */}
      <div className="flex my-15 gap-4 mb-6 justify-end">
        <input
          type="text"
          placeholder="Search lessons..."
          className="input dark:bg-gray-600 input-bordered w-64"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          className="select dark:bg-gray-600 select-bordered w-40"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="table text-center dark:bg-gray-600 p-4 w-full">
          <thead className="bg-base-200 dark:bg-gray-300">
            <tr>
              <th>#</th>
              <th>Lesson Title</th>
              <th>Creator</th>
              <th className="text-center">Visibility</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLessons.length > 0 ? (
              filteredLessons.map((lesson, index) => (
                <tr key={lesson._id}>
                  <th>{index + 1}</th>
                  <td className="flex mt-5 md:mt-0  items-center gap-2">
                    <img
                      className="w-8 h-8 rounded-sm"
                      src={lesson.image}
                      alt=""
                    />
                    {lesson.title}
                  </td>
                  <td>{lesson.lessonerName}</td>
                  <td className="text-center">
                    {" "}
                    {lesson.privacy === "public" && (
                      <span className="badge badge-success">Public</span>
                    )}
                    {lesson.privacy === "private" && (
                      <span className="badge badge-error">Private</span>
                    )}
                  </td>
                  <td className="text-center">
                    {lesson.reviewed ? (
                      <span className="badge badge-success">Reviewed</span>
                    ) : (
                      <span className="badge badge-warning">Pending</span>
                    )}
                  </td>
                  <td className="text-center flex flex-col gap-1 md:flex-row space-x-2">
                    {/*  Feature ---> */}
                    <button
                      className={`btn ${
                        lesson.featured ? "btn-secondary" : "btn-primary"
                      }`}
                      onClick={() =>
                        handleFeatureLesson(lesson._id, !lesson.featured)
                      }
                    >
                      {lesson.featured ? "Unfeature" : "Feature"}
                    </button>

                    {/* Reviewed---> */}
                    <button
                      className={`btn btn-success ${
                        lesson.reviewed ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() => handleMarkReviewed(lesson._id, true)}
                      disabled={lesson.reviewed}
                    >
                      {lesson.reviewed ? "Reviewed" : "Mark Reviewed"}
                    </button>

                    <button
                      className="btn  btn-error"
                      onClick={() => handleDeleteLesson(lesson._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No lessons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLessons;
