import React from "react";
import { useForm } from "react-hook-form";
import { FaRegImages } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const AddLesson = () => {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();

  const axiosSecure = useAxiosSecure();

  // user related-------->>
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);

      return res.data;
    },
  });
  console.log(users);

  const isPremiumUser = users.accessLevel === "premium";

  const handleAddLesson = async (data) => {
    try {
      console.log("lesson Created:", data);
      const result = await Swal.fire({
        title: "Are You Agree with Create Lesson?",
        text: `Your Lesson will be Posting!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes,Confirm!",
      });
      if (!result.isConfirmed) return;
      // Save to data in MongoDB--->

      // Save to img data ibb --->
      const lessonImg = data.image[0];

      const formData = new FormData();
      formData.append("image", lessonImg);

      const imageApi = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_Image_host
      }`;
      const res = await axios.post(imageApi, formData);
      const imageUrl = res.data.data.url;

      const lessonData = {
        ...data,
        image: imageUrl,

        lessonerEmail: user?.email,
        lessonerName: user?.displayName,
        lessonerImage: user?.photoURL,

        likes: [],
        likesCount: 0,

        favorites: [],
        favoriteCount: 0,

        comments: [],

        createdAt: new Date(),
      };

      // Save to img data ibb ---<

      const mongoDBres = await axiosSecure.post("/lessons", lessonData);

      console.log("after lesson post & save to MongoDB", mongoDBres.data);

      // Save to data in MongoDB---<

      await Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Lesson has created.",
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (error) {
      console.log("ERROR:", error.response?.data);
      Swal.fire("Error", "Please Enter a Image!", "error");
    }
  };

  return (
    <div className="w-11/12 mx-auto mb-8">
      <h3 className="text-primary text-center font-bold my-10 text-4xl">
        Add Lesson
      </h3>

      <div className="bg-base-200 shadow-2xl  py-8 px-12 rounded-2xl space-y-6">
        <form onSubmit={handleSubmit(handleAddLesson)} className="space-y-6">
          {/* Title */}
          <div className="form-control">
            <label className="text-indigo-700 font-semibold">
              Lesson Title <br />
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Enter lesson title"
              className="input md:w-11/12 input-bordered mt-2"
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className=" text-indigo-700 font-semibold">
              Full Story <br />
            </label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered mt-2 h-32  md:w-11/12"
              placeholder="Write your story or insight..."
            ></textarea>
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="font-semibold text-indigo-700">
              Category <br />
            </label>
            <select
              {...register("category")}
              className="select select-bordered font-semibold mt-2"
            >
              <option disabled>Select category</option>
              <option value="Personal Growth">Personal Growth</option>
              <option value="Career">Career</option>
              <option value="Relationships">Relationships</option>
              <option value="Mindset">Mindset</option>
              <option value="Mistakes Learned">Mistakes Learned</option>
            </select>
          </div>

          {/* Tone */}
          <div className="form-control">
            <label className="font-semibold text-indigo-700">
              Emotional Tone <br />
            </label>
            <select
              {...register("tone")}
              className="select font-semibold  select-bordered mt-2"
            >
              <option disabled>Select tone</option>
              <option value="Motivational">Motivational</option>
              <option value="Sad">Sad</option>
              <option value="Realization">Realization</option>
              <option value="Gratitude">Gratitude</option>
            </select>
          </div>

          {/* Image */}
          <div className="form-control">
            <label className="font-semibold text-indigo-700 flex items-center gap-2">
              <FaRegImages /> Image
            </label>
            <input
              type="file"
              {...register("image")}
              className="file-input file-input-bordered mt-2"
            />
          </div>

          {/* Privacy */}
          <div className="form-control">
            <label className="font-semibold text-indigo-700">
              Privacy <br />
            </label>
            <select
              {...register("privacy")}
              className="select select-bordered mt-2"
            >
              <option disabled>Select privacy</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          {/* Access */}
          <div className="form-control">
            <label className="font-semibold text-indigo-700">
              Access Level
            </label>

            <div
              className="tooltip"
              data-tip="Upgrade to Premium to create paid lessons"
            >
              <select
                {...register("access")}
                disabled={!isPremiumUser}
                className="select flex ml-2 select-bordered mt-2"
              >
                <option disabled>Select access level</option>
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <button className="btn btn-primary w-full py-3 rounded-xl text-lg">
            Create Lesson
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
