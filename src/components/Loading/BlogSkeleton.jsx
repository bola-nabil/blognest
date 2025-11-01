import React from 'react';

const BlogSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-60 bg-gray-300 rounded-2xl mb-4"></div>

      {/* Header (avatar + title) */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-300"></div>
        <div className="flex-1">
          <div className="h-5 w-3/4 bg-gray-300 rounded mb-2"></div>
          <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Excerpt skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
        <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-4">
        <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
        <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
      </div>

      {/* Footer (icons) */}
      <div className="flex justify-between border-t pt-3">
        <div className="flex gap-6">
          <div className="h-4 w-10 bg-gray-300 rounded"></div>
          <div className="h-4 w-10 bg-gray-300 rounded"></div>
        </div>
        <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default BlogSkeleton;
