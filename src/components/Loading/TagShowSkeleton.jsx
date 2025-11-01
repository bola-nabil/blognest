import React from 'react';

const TagShowSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="text-center py-12 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg mb-12">
        <div className="mx-auto h-8 w-48 bg-white/30 rounded mb-4"></div>
        <div className="mx-auto h-4 w-64 bg-white/20 rounded"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4"
          >
            <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagShowSkeleton;
