import React from "react";

const Loading = () => {
 return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-black space-x-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-3 h-9 bg-violet-700 animate-bounce"
          style={{ animationDelay: `${i * 0.1}s` }}
        ></div>
      ))}
    </div>
  );
};
export default Loading;
