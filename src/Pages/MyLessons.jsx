import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

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

  return (
    <div className="w-11/12 mx-auto">
      <h3 className="text-primary text-center font-semibold my-6 mb-10 text-3xl">
        All of my Lessons : {lessons.length}
      </h3>
    </div>
  );
};

export default MyLessons;
