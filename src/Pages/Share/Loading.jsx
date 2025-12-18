import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-base-100">
      <span className="loading text-primary w-32 h-32 loading-infinity loading-3xl"></span>
    </div>
  );
};

export default Loading;
