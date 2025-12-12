import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Share/Loading";
import { useNavigate, useParams } from "react-router";

const Profile = () => {
  const { user } = useAuth();
  const { email } = useParams();
  const userEmail = email || user?.email;
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch users Info -------->>>
  const { data: users } = useQuery({
    queryKey: ["users", userEmail],
    queryFn: async () => {
      if (!userEmail) return null;
      const res = await axiosSecure.get(`/users/email/${userEmail}`);
      return res.data;
    },
  });

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["userLessons", userEmail],
    queryFn: async () => {
      if (!userEmail) return [];
      const res = await axiosSecure.get(`/lessons?email=${userEmail}`);
      return res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="w-11/12 mx-auto my-10">
      {/* User info section ---------->>> */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
        <div className="relative">
          <img
            src={users?.photoURL}
            alt=""
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {users?.displayName}
          </h2>
          <p className="text-gray-500">{users?.email}</p>

          {/* Stats */}
          <div className="flex gap-6 mt-2">
            <div>
              <p className="font-semibold">{lessons.length}</p>
              <p className="text-sm text-gray-500">Lessons Created</p>
            </div>
            <div>
              <p className="font-semibold">
                {users?.savedLessons?.length || 0}
              </p>
              <p className="text-sm text-gray-500">Lessons Saved</p>
            </div>
          </div>

          {/* update */}
          <div className="flex flex-col items-center md:flex-row gap-4 mt-4">
            {users?.accessLevel === "premium" ? (
              <span className=" badge badge-success font-semibold p-4">
                Premium ⭐
              </span>
            ) : (
              " "
            )}
            <button className="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>

      {/* user lessons-------->>> */}
      <h3
        className="text-2xl text-primary
       font-semibold mb-6"
      >
        Your Public Lessons
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div key={lesson._id} className="card bg-base-100 shadow-lg">
            <img
              src={lesson.image}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="card-body">
              <h2 className="card-title text-lg font-bold">{lesson.title}</h2>
              <p className="text-sm text-gray-600">
                {lesson.description?.slice(0, 30)}...
              </p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="badge badge-outline">{lesson.category}</span>
                <span className="badge badge-outline">{lesson.tone}</span>
                <span
                  className={`badge ${
                    lesson.access === "premium"
                      ? "badge-warning"
                      : "badge-success"
                  } font-semibold p-2`}
                >
                  {lesson.access}
                </span>
              </div>
              <div className="card-actions justify-end mt-2">
                <button
                  onClick={() => navigate(`/lesson-details/${lesson._id}`)}
                  className="btn btn-primary btn-sm"
                >
                  See Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
