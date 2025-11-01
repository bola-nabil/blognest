import React from 'react';

const LastBlogsSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-md p-5 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
              <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div className="space-y-2 mb-3">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-11/12"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>

          <div className="flex justify-between items-center border-t pt-3">
            <div className="flex gap-2">
              <div className="w-12 h-5 bg-gray-200 rounded-full"></div>
              <div className="w-12 h-5 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex gap-4">
              <div className="w-5 h-4 bg-gray-300 rounded"></div>
              <div className="w-5 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LastBlogsSkeleton;
