import React from "react";

const WhyLearning = () => {
  return (
    <div className=" rounded-xl bg-amber-50 my-8 mb-16">
      <div className="p-6">
        <div className="text-center w-80 mx-auto">
          <h3 className="text-primary font-semibold mb-8 text-3xl">
            Why Learning From Life Matters
          </h3>
        </div>
        <section className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ---------------> */}
          <div className="bg-green-100 hover:scale-115 flex flex-col items-center text-center w-66 mx-auto space-y-2 p-4 rounded-xl ">
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
          {/* ---------------> */}
          <div className="bg-green-100 hover:scale-115 flex flex-col items-center text-center w-66 mx-auto space-y-2 p-4 rounded-xl ">
            <img className="w-8 rounded-full  " src="" alt="" />
            <h4 className="font-semibold">
              Makes Future Decision-Making Easier
            </h4>
            <p className="text-gray-500 text-xs">
              Learning from past experiences gives you clarity about what works
              and what doesn't. It helps you avoid confusion, choose wisely,
              stay focused on your goals, and make confident decisions in
              difficult situations.
            </p>
          </div>
          {/* ---------------> */}
          <div className="bg-green-100 hover:scale-115 flex flex-col items-center text-center w-66 mx-auto space-y-2 p-4 rounded-xl ">
            <img className="w-8 rounded-full  " src="" alt="" />
            <h4 className="font-semibold">
              Reduces Repeating the Same Mistakes
            </h4>
            <p className="text-gray-500 text-xs">
              Reflecting on past mistakes helps you learn valuable lessons,
              understand consequences, and make wiser choices. This awareness
              prevents repeating harmful patterns and leads to continuous
              personal improvement and resilience.
            </p>
          </div>
          {/* ---------------> */}
          <div className="bg-green-100 hover:scale-115 flex flex-col items-center text-center w-66 mx-auto space-y-2 p-4 rounded-xl ">
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

          {/* ---------------> */}
        </section>
      </div>
    </div>
  );
};

export default WhyLearning;
