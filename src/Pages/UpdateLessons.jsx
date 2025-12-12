import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Loading from "./Share/Loading";

const UpdateLessons = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/lessons/${id}`).then((res) => {
      setLesson(res.data);
      reset(res.data);
    });
  }, [id, reset, axiosSecure]);

  const onSubmit = async (data) => {
    try {
      await axiosSecure.patch(`/lessons/${id}`, data);
      Swal.fire("Success", "Lesson updated successfully!", "success");
      navigate("/dashboard/my-lessons");
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to update lesson", "error");
    }
  };

  if (!lesson) return <Loading></Loading>;

  return (
    <div className="w-11/12 mx-auto py-8">
      <h3 className="text-primary text-center font-bold my-10 text-4xl">
        Update Lesson
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            Access <br />
          </label>
          <select
            {...register("access")}
            className="select select-bordered mt-2"
          >
            <option disabled>free</option>
            <option value="free">free</option>
            <option value="premium">premium</option>
          </select>
        </div>

        {/* Submit */}
        <button className="btn btn-accent w-full py-3 rounded-xl text-lg">
          Update Lesson
        </button>
      </form>
    </div>
  );
};

export default UpdateLessons;
