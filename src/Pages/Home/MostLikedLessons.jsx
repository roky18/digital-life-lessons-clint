import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MostLikedLessons = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [] } = useQuery({
    queryKey: ["most-liked"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");

      return res.data
        .sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0))
        .slice(0, 4);
    },
  });

  console.log(data);
  return (
    <div className="my-20 w-11/12 mx-auto">
      <h3 className="text-primary text-center font-semibold mb-10 text-3xl">
        Most Liked Lessons
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {data.map((lesson) => (
          <div
            key={lesson._id}
            className="flex gap-4 bg-white dark:bg-gray-900 p-4 rounded-xl shadow"
          >
            <img
              src={lesson.image}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold">{lesson.title}</h3>
              <p className="text-sm text-gray-500">
                ❤️ {lesson.likesCount} likes
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostLikedLessons;
