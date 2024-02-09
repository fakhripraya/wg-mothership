import React, { useState, useEffect } from "react";
import "./style.scss";

const SkeletonWrapper = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.dependencyData) setIsLoading(false);
  }, [props.dependencyData]);

  return (
    <div
      className={`skeleton-wrapper ${
        isLoading ? "loading" : "loaded"
      }`}>
      <div
        className={`skeleton ${props.skeletonClassName}`}
      />
      {!isLoading && (
        <div className={`content ${props.className}`}>
          {props.children}
        </div>
      )}
    </div>
  );
};

export default SkeletonWrapper;
