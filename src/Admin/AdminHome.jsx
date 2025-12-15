import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaBookOpen, FaChartLine, FaFlag, FaUsers } from "react-icons/fa";
import { MdToday } from "react-icons/md";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import Loading from "../Pages/Share/Loading";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // total lessons -->
  const { data: lessons = [], isLoading: lessonsLoading } = useQuery({
    queryKey: ["lessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons`);
      return res.data;
    },
  });
  // today lesson -->
  const today = new Date().toDateString();

  const todayLessons = lessons.filter(
    (lesson) => new Date(lesson.createdAt).toDateString() === today
  );

  // total users -->
  const { data: usersData = [], isLoading: usersLoading } = useQuery({
    queryKey: ["usersData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });
  //   // total report -->
  //   const { data: reports = [] } = useQuery({
  //     queryKey: ["reports"],
  //     queryFn: async () => {
  //       const res = await axiosSecure.get(`/reports`);

  //       return res.data;
  //     },
  //   });

  //   most Contributorss----->>

  const { data: creators = [], isLoading: contribitsLoading } = useQuery({
    queryKey: ["topCreators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons/top-creators");
      return res.data;
    },
  });

  const topCreators = [...creators]
    .sort((a, b) => b.lessonCount - a.lessonCount)
    .slice(0, 3);

  if (lessonsLoading || usersLoading || contribitsLoading) {
    return <Loading></Loading>;
  }
  console.log(topCreators);
  return (
    <div className="w-11/12 mx-auto my-6 mb-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary text-center">
        ⭐ Admin Dashboard Overview ⭐
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total user */}
        <div className="bg-blue-100 shadow-2xl rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-white text-blue-600 rounded-full text-xl">
            <FaUsers />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <h3 className="text-2xl font-bold">{usersData.length}</h3>
          </div>
        </div>

        {/* Total lessons */}
        <div className="bg-green-100 shadow-2xl rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-white text-green-600 rounded-full text-xl">
            <FaBookOpen />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Public Lessons</p>
            <h3 className="text-2xl font-bold">{lessons.length}</h3>
          </div>
        </div>

        {/* Today's Lessons */}
        <div className="bg-purple-100  shadow-2xl rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-white text-purple-600 rounded-full text-xl">
            <MdToday />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Today's Lessons</p>
            <h3 className="text-2xl font-bold">{todayLessons.length}</h3>
          </div>
        </div>
        {/* Reported lessons */}
        <div className="bg-red-100 shadow-2xl rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-white text-red-600 rounded-full text-xl">
            <FaFlag />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Reported Lessons</p>
            <h3 className="text-2xl font-bold">{999}</h3>
          </div>
        </div>
      </div>

      <div className=" mt-8">
        {/* Most Active Contributors */}
        <div className="bg-gray-100  shadow-2xl rounded-xl p-6">
          <h3 className="text-lg text-center text-fuchsia-600 font-semibold mb-4">
            ⭐ Most Active Contributors
          </h3>
          <div className="overflow-x-auto">
            <table className="table text-center">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Lessons Create</th>
                </tr>
              </thead>
              <tbody>
                {topCreators.map((creator, index) => {
                  // Find user in users array
                  const userInfo = usersData.find(
                    (u) => u.email === creator._id
                  );

                  return (
                    <tr key={creator._id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={
                                  userInfo?.photoURL || creator.lessonerImage
                                }
                                alt={creator.name}
                                className="h-12 w-12 rounded-full"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-blue-500">
                              {creator.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{creator._id}</td>
                      <td className="font-bold text-green-500">
                        {creator.lessonCount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
