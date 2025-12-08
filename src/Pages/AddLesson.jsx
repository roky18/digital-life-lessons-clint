import React from "react";
import { useForm } from "react-hook-form";
import { FaRegImages } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";

const AddLesson = () => {
  const { user } = useAuth();
  const userType = user?.role;
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("lesson Created:", data);
  };

  return (
    <div className="w-11/12 mx-auto mb-8">
      <h3 className="text-primary text-center font-bold my-10 text-4xl">
        Add Lesson
      </h3>

      <div className="bg-base-200 shadow-2xl  py-8 px-12 rounded-2xl space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div className="form-control">
            <label className="text-indigo-600 font-semibold">
              Lesson Title <br />
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Enter lesson title"
              className="input input-bordered mt-2"
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className=" text-indigo-600 font-semibold">
              Full Story <br />
            </label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered mt-2 h-32"
              placeholder="Write your story or insight..."
            ></textarea>
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="font-semibold text-indigo-600">
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
            <label className="font-semibold text-indigo-600">
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
            <label className="font-semibold text-indigo-600 flex items-center gap-2">
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
            <label className="font-semibold text-indigo-600">
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
            <label className="font-semibold text-indigo-600">
              Access Level
            </label>

            <div
              className="tooltip"
              data-tip="Upgrade to Premium to create paid lessons"
            >
              <select
                {...register("access")}
                disabled={userType !== "premium"}
                className="select select-bordered mt-2"
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
