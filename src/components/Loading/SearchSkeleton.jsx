import React from 'react';

const Skeleton = ({ className }) => (
  <div
    className={`animate-pulse bg-gray-300 dark:bg-gray-700 rounded ${className}`}
  ></div>
);

const SearchSkeleton = ({ type }) => {
  if (type === 'blogs') {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="p-5 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 shadow-sm"
          >
            <Skeleton className="h-5 w-3/4 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-2/3 mb-2" />
            <div className="flex justify-between mt-4">
              <Skeleton className="h-3 w-1/4" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'categories') {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="p-5 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800"
          >
            <Skeleton className="h-5 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'tags') {
    return (
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>
    );
  }

  return null;
};

export default SearchSkeleton;
