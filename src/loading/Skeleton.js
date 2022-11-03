import React from "react";

const Skeleton = (props) => {
  return (
    <div
      className="skeleton"
      style={{ width: "100%", height: "100%", ...props }}
    ></div>
  );
};

export default Skeleton;
