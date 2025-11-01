import React from 'react';

const BlogDetailsSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto py-6 animate-pulse">
      <div className="w-full h-80 bg-gray-200 dark:bg-gray-700 rounded-xl mb-6"></div>

      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-5"></div>

      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
      </div>

      <div className="flex justify-between border-t border-gray-300 dark:border-gray-700 pt-4">
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default BlogDetailsSkeleton;
