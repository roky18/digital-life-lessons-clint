import { useQuery } from "@tanstack/react-query";

import { Users, BookOpen, Crown } from "lucide-react";
import Loading from "../Share/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PlatformStats = () => {
const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["platform-stats"],
    queryFn: async () => {
      const users = await axiosSecure.get("/users");
      const lessons = await axiosSecure.get("/lessons");

      return {
        users: users.data.length,
        lessons: lessons.data.length,
        premium: users.data.filter((u) => u.accessLevel === "premium").length,
      };
    },
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div>
      <h3 className="text-primary text-center font-semibold mb-10 text-3xl">
        Platform
      </h3>
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
        <StatCard icon={<Users />} title="Users" value={data.users} />
        <StatCard icon={<BookOpen />} title="Lessons" value={data.lessons} />
        <StatCard icon={<Crown />} title="Premium" value={data.premium} />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white flex flex-col justify-center gap-2 hover:border-2 dark:bg-gray-900 p-6 rounded-xl shadow items-center text-center">
    <div className="text-purple-500 mb-2">{icon}</div>
    <h3 className="text-xl font-semibold">{value}</h3>
    <p className="text-gray-500">{title}</p>
  </div>
);

export default PlatformStats;
