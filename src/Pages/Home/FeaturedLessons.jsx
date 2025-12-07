import React from "react";

const FeaturedLessons = () => {
  return (
    <div className="w-11/12 mx-auto my-6 mb-16 ">
      <h3 className="text-primary text-center font-semibold mb-10 text-3xl">
        Featured Life Lessons
      </h3>
      <section className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        <div className="bg-pink-200 hover:bg-amber-200 flex flex-col items-center text-center w-66 mx-auto space-y-2 p-4 rounded-xl ">
          <img className="w-8 rounded-full  " src="" alt="" />
          <h4 className="font-semibold">Makes Future Decision-Making Easier</h4>
          <p className="text-gray-500 text-xs">
            Learning from past experiences gives you clarity about what works
            and what doesn't. It helps you avoid confusion, choose wisely, stay
            focused on your goals, and make confident decisions in difficult
            situations.
          </p>
        </div>
        {/* ---------->> */}
        <div className="bg-pink-200 hover:bg-amber-200 flex flex-col items-center text-center w-66 mx-auto space-y-2 p-4 rounded-xl ">
          <img className="w-8 rounded-full  " src="" alt="" />
          <h4 className="font-semibold">Reduces Repeating the Same Mistakes</h4>
          <p className="text-gray-500 text-xs">
            Reflecting on past mistakes helps you learn valuable lessons,
            understand consequences, and make wiser choices. This awareness
            prevents repeating harmful patterns and leads to continuous personal
            improvement and resilience.
          </p>
        </div>
        {/* ---------->>> */}
        <div className="bg-pink-200 hover:bg-amber-200 flex flex-col items-center text-center w-66 mx-auto space-y-2 p-4 rounded-xl ">
          <img className="w-8 rounded-full  " src="" alt="" />
          <h4 className="font-semibold">Inspires Others Around You</h4>
          <p className="text-gray-500 text-xs">
            Your life lessons can motivate others by showing real examples of
            growth, courage, and wisdom. Sharing,and make wiser choices. This
            awareness prevents experiences encourages people to stay strong,
            learn, and make Sharing experiences positive changes in their own
            journeys.
          </p>
        </div>
        {/*---------->> */}
      </section>
    </div>
  );
};

export default FeaturedLessons;
