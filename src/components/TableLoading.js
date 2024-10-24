import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TableLoading = ({ cols }) => {
  return (
    <tr>
      <td className="text-center" colspan={cols}>
        <Skeleton
          style={{
            //border: "1px solid #ccc",
            display: "block",
            lineHeight: 2,
            height: 190,
          }}
          className="w-full h-9"
        />
      </td>
    </tr>
  );
};

export default TableLoading;
