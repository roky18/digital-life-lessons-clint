import React, { useState } from "react";
import Loading from "../Pages/Share/Loading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ReportLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedLesson, setSelectedLesson] = useState(null);

  const {
    data: reports = [],
    isLoading,
    refetch: refreshReport,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reports`);

      return res.data;
    },
  });

  const {
    data: lessons = [],
    isLoading: loadingLessons,
    refetch,
  } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data;
    },
  });

  if (isLoading || loadingLessons) return <Loading></Loading>;

  // Group reports by lessonId---->>>
  const grouped = {};
  reports.forEach((report) => {
    if (!grouped[report.lessonId]) grouped[report.lessonId] = [];
    grouped[report.lessonId].push(report);
  });

  const rows = Object.keys(grouped).map((lessonId) => {
    const lesson = lessons.find((lesson) => lesson._id === lessonId);
    return {
      lessonId,
      title: lesson ? lesson.title : "Unknown Title",
      reports: grouped[lessonId],
      count: grouped[lessonId].length,
    };
  });

  const handleDeleteReport = async (id) => {
    const result = await Swal.fire({
      title: "Delete Report?",
      text: "Are you Sure? You Do it!",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/reports/${id}`);
      Swal.fire("Deleted!", "Lesson has been deleted.", "success");
      refetch();
      refreshReport();
    }
  };

  return (
    <div className="w-11/12 mx-auto p-4">
      <h2 className="text-2xl text-primary text-center  font-bold mb-8">
        Reported Lessons
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th className="py-2 px-4 text-left">Lesson Title</th>
              <th className="py-2 px-4 text-center">Report Count</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.lessonId} className="border-t">
                <td>{index + 1}</td>
                <td className="py-2 px-4">{row.title}</td>
                <td className="py-2 text-red-500 font-semibold text-xl px-4 text-center">
                  {row.count}
                </td>
                <td className="py-2 flex flex-col gap-1 md:flex-row px-4 text-center space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => setSelectedLesson(row)}
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleDeleteReport(row.lessonId)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedLesson && (
        <div className="fixed w-11/12 mx-auto inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded shadow-lg p-4">
            <h3 className="text-xl font-semibold mb-3">
              Reports for : {selectedLesson.title}
            </h3>

            {selectedLesson.reports.map((rep) => (
              <div key={rep._id} className=" py-2">
                <p className="font-semibold">
                  Reason :-{" "}
                  <span className="font-medium text-red-500">{rep.reason}</span>
                </p>
              </div>
            ))}

            <div className="mt-4 text-right">
              <button
                className=" btn btn-error px-3 py-2 rounded"
                onClick={() => setSelectedLesson(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportLessons;
