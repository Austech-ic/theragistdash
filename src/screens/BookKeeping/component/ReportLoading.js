import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = () => {
  return (
    <div>
      <Skeleton
        style={{
          //border: "1px solid #ccc",
          display: "block",
          lineHeight: 2,
          height: 170,
        }}
        className="w-full h-9 mt-3"
      />{" "}
    </div>
  );
};

export default LoadingSkeleton;
