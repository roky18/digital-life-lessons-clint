import React from "react";

const FeaturedLessons = () => {
  return (
    <div className="w-11/12 mx-auto my-6 mb-16 ">
      <h3 className="text-primary text-center font-semibold mb-10 text-3xl">
        Featured Life Lessons
      </h3>
      <section className=" p-10 shadow-2xl rounded-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* ---------->> */}
        <div className="bg-pink-200 hover:bg-amber-200 flex flex-col items-center text-center w-66 mx-auto space-y-2 p-4 rounded-xl ">
          <img className="w-8 rounded-full  " src="" alt="" />
          <h4 className=" font-semibold">
            Helps You Understand Yourself Better
          </h4>
          <p className="text-gray-500 text-xs">
            Understanding your experiences helps you recognize your strengths,
            weaknesses, emotions, and values. This self-awareness makes your
            decisions clearer, your actions intentional, and your personal
            growth more meaningful.
          </p>
        </div>
        {/* ---------->> */}
      </section>
    </div>
  );
};

export default FeaturedLessons;
