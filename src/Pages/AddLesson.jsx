import React from "react";
import { useForm } from "react-hook-form";
import { FaRegImages } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";

const AddLesson = () => {
  const { user } = useAuth();
  const userType = user?.role;
  const { register, handleSubmit } = useForm();

  const handleAddLesson = (data) => {
    console.log("lesson Created:", data);
    Swal.fire({
      title: "Are You Agree with Create Lesson?",
      text: `Your Lesson will be Posting!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Lesson has created.",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
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
            <label className="text-indigo-600 font-semibold">
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
            <label className=" text-indigo-600 font-semibold">
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
