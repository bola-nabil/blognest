import React from 'react';

const LoadingSkeleton = ({
  height = 'h-5',
  width = 'w-full',
  rounded = 'rounded-md',
}) => {
  return (
    <div
      className={`bg-gray-200 animate-pulse ${height} ${width} ${rounded}`}
    ></div>
  );
};

export default LoadingSkeleton;
