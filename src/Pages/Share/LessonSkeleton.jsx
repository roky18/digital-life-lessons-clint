import React from 'react';

const LessonSkeleton = () => {
  return (
    <div className="bg-base-100 dark:bg-gray-500 animate-pulse shadow-lg flex flex-col items-center text-center space-y-3 p-5 rounded-xl">
      {/* Image Placeholder */}
      <div className="w-full h-36 bg-gray-300 rounded-xl"></div>

      {/* Title Placeholder */}
      <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
      <div className="h-4 w-1/2 bg-gray-300 rounded"></div>

      {/* Category Badges Placeholder */}
      <div className="flex gap-2 justify-center">
        <div className="h-6 w-16 bg-gray-300 rounded"></div>
        <div className="h-6 w-16 bg-gray-300 rounded"></div>
      </div>

      {/* Button Placeholder */}
      <div className="h-8 w-24 bg-gray-300 rounded"></div>
    </div>
  );
};

export default LessonSkeleton;